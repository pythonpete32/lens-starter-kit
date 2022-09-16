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
  const snap = useSnapshot(state)
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

      if (auth?.data?.authenticate?.token !== null) {
        state.isAuthenticated = true;
        Cookies.set(
          "accessToken",
          auth.data.authenticate.accessToken,
        );
        Cookies.set(
          "refreshToken",
          auth.data.authenticate.refreshToken,
        );
      }


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
        state.profiles = profiles;
        state.currentUser = profiles[0];
        console.log("latest profile from handle sign", profiles[0]);
        // console.log("all profiles from handle sign", profiles);
      }
    } catch (error) {
      toast(error?.message, ERROR);
      console.log(error);
    }
  };

  useEffect(() => {
    if (snap.isAuthenticated) {
      (async function () {
        try {
          const { data: profilesData } = await getProfiles({
            variables: { request: { ownedBy: address } },
          });
          if (profilesData?.profiles?.items?.length === 0) {
            console.log("No profiles");
            state.profiles = []
          } else {
            const profiles = profilesData?.profiles?.items
              ?.slice()
              ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
              ?.sort((a: Profile, b: Profile) =>
                !(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1
              );
            console.log("Profiles DATA (sorted)", profiles);
            state.profiles = profiles;
            state.currentUser = profiles[0];
          }
        } catch (e) {
          console.log("Fetch profile Error", e);
        }
      })();
    }
  }, [
    snap.isAuthenticated,
    address,
  ]);

  return (
    <div className="flex gap-4 flex-col sm:flex-row items-center justify-center" >
      <Transition
        as={Fragment}
        show={!snap.isAuthenticated}
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 scale-50"
      >
        {signLoading || challenegeLoading || authLoading || profilesLoading
          ? (<button
            className='btn btn-md glass btn-secondary rounded-lg h-0.5 loading'
            disabled
            onClick={handleSign}
          >Sign in 🗳️</button>)
          : (<button
            className='btn btn-md h shadow-lg glass btn-secondary rounded-lg '
            // disabled
            onClick={handleSign}
          >Sign in 🗳️</button>)
        }
      </Transition>
      <ConnectButton chainStatus='icon' accountStatus='full' showBalance={false} />
    </div >
  );
}


export default WalletConnector;