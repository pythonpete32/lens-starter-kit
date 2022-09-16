import { useLazyQuery, useMutation } from "@apollo/client";
import { AUTHENTICATE_MUTATION, CHALLENGE_QUERY } from "../src/gql/Authentication";
import { GET_PROFILES } from "../src/gql/User";
import Cookies from "js-cookie";
import React, { Fragment, FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Transition } from '@headlessui/react'

import { useSnapshot } from 'valtio'
import { state } from "../src/state";
import { Profile } from "next-auth";

const TOAST = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
}

const WARNING = {
  ...TOAST, icon: 'ℹ️',
}

const SUCCESS = {
  ...TOAST, icon: '✅',
}

const ERROR = {
  ...TOAST, icon: '❌',
}

const WalletConnector: FC = () => {
  const [isShowing, setIsShowing] = useState(false)

  let { profiles, isAuthenticated, currentUser } = useSnapshot(state);
  const { address } = useAccount();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({
    onError(error) {
      toast(error?.message, ERROR);
    },
  });

  const [
    loadChallenge,
    { error: errorChallenege, loading: challenegeLoading },
  ] = useLazyQuery(CHALLENGE_QUERY, {
    fetchPolicy: "no-cache",
  });

  const [authenticate, { error: errorAuthenticate, loading: authLoading }] =
    useMutation(AUTHENTICATE_MUTATION, {
      onCompleted: (data) => {
        console.log("Authenticated: ", data)
        toast("Authenticated", SUCCESS);
        state.isAuthenticated = true;
      },
    })

  const [getProfiles, { error: errorProfiles, loading: profilesLoading }] =
    useLazyQuery(GET_PROFILES, {
      onCompleted() {
        console.log("Get Profiles", `Got Profiles`);
      },
    });

  const handleSign = async () => {
    try {
      const challenge = await loadChallenge({
        variables: { request: { address } },
      });

      if (!challenge?.data?.challenge?.text)
        return toast("Something went wrong", ERROR);

      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text,
      });

      const auth = await authenticate({
        variables: { request: { address, signature } },
      });

      // if (auth?.data?.authenticate?.token !== null) toast.success("Authenticated with Lens!");
      Cookies.set(
        "accessToken",
        auth.data.authenticate.accessToken,
        // COOKIE_CONFIG
      );
      Cookies.set(
        "refreshToken",
        auth.data.authenticate.refreshToken,
        // COOKIE_CONFIG
      );

      console.log("Address", address);
      const request = { ownedBy: address }
      const { data: profilesData } = await getProfiles({
        variables: { request },
      });


      if (profilesData?.profiles?.items?.length === 0) {
        state.profiles = [];
        toast(
          "Wallet doesn't a Lens profile", WARNING
        );
      } else {
        const profiles = profilesData?.profiles?.items
          ?.slice()
          ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
          ?.sort((a: Profile, b: Profile) =>
            !(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1
          );
        state.isAuthenticated = true;
        console.log("Authenticated???", isAuthenticated)
        state.profiles = profiles;
        // state.currentUser = profiles[0];
      }
    } catch (error) {
      toast(error?.message, ERROR);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      (async function () {
        try {
          const { data: profilesData } = await getProfiles({
            variables: { request: { ownedBy: address } },
          });

          if (profilesData?.profiles?.items?.length === 0) {
            state.profiles = []
          } else {
            const profiles = profilesData?.profiles?.items
              ?.slice()
              ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
              ?.sort((a: Profile, b: Profile) =>
                !(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1
              );
            state.profiles = profiles;
            state.currentUser = profiles[0];
          }
        } catch (e) {
          console.log("Fetch profile Error", e);
        }
      })();
    }
  }, [
    isAuthenticated,
    address,
    currentUser,
    // profiles,
  ]);


  // if is not authenticated , show both buttons 

  return (
    <div className="flex gap-4 flex-col sm:flex-row items-center justify-center" >

      <Transition
        as={Fragment}
        // show={!isAuthenticated}
        // enter="transform transition duration-[400ms]"
        // enterFrom="opacity-0 rotate-[-120deg] scale-50"
        // enterTo="opacity-100 rotate-0 scale-100"
        // leave="transform duration-200 transition ease-in-out"
        // leaveFrom="opacity-100 rotate-0 scale-100 "
        // leaveTo="opacity-0 scale-95 "
        show={!isAuthenticated}
        // enter="transition-opacity duration-700"
        // enterFrom="opacity-0"
        // enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        // leave="transition-opacity duration-18400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 scale-50"
      >
        {signLoading || challenegeLoading || authLoading || profilesLoading
          ? (<button
            className='btn glass btn-primary rounded-lg h-3 loading'
            disabled
            onClick={handleSign}
          >Sign in 🗳️</button>)
          : (<button
            className='btn glass btn-primary rounded-lg h-3'
            // disabled
            onClick={handleSign}
          >Sign in 🗳️</button>)
        }
      </Transition>



      <ConnectButton chainStatus={"none"} accountStatus='address' />
    </div >
  );
}


export default WalletConnector;