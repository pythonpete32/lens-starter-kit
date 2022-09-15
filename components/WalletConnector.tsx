import { useLazyQuery, useMutation } from "@apollo/client";
import { AUTHENTICATE_MUTATION, CHALLENGE_QUERY } from "../src/gql/Authentication";
import { GET_PROFILES } from "../src/gql/User";
import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useSnapshot } from 'valtio'
import { state } from "../src/state";
import { Profile } from "next-auth";

const WalletConnector: FC = () => {
  let { profiles, isAuthenticated, currentUser } = useSnapshot(state, { sync: true });
  const { address } = useAccount();
  const { signMessageAsync, isLoading: signLoading } = useSignMessage({
    onError(error) {
      toast.error(error?.message);
    },
  });

  const [
    loadChallenge,
    { error: errorChallenege, loading: challenegeLoading },
  ] = useLazyQuery(CHALLENGE_QUERY, {
    fetchPolicy: "no-cache",
  });

  const [authenticate, { error: errorAuthenticate, loading: authLoading }] =
    useMutation(AUTHENTICATE_MUTATION);

  const [getProfiles, { error: errorProfiles, loading: profilesLoading }] =
    useLazyQuery(GET_PROFILES, {
      onCompleted() {
        console.log("Auth", `Authenticated with Lens!`);
      },
    });

  const handleSign = async () => {
    try {
      const challenge = await loadChallenge({
        variables: { request: { address } },
      });

      if (!challenge?.data?.challenge?.text)
        return toast.error("Something went wrong");

      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text,
      });

      const auth = await authenticate({
        variables: { request: { address, signature } },
      });
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

      const { data: profilesData } = await getProfiles({
        variables: { ownedBy: address },
      });

      if (profilesData?.profiles?.items?.length === 0) {
        state.profiles = [];
        console.log(
          "Profiles",
          "Wallet doesn't a Lens profile. You can still collect and follow."
        );
      } else {
        const profiles = profilesData?.profiles?.items
          ?.slice()
          ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
          ?.sort((a: Profile, b: Profile) =>
            !(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1
          );
        state.isAuthenticated = true;
        state.profiles = profiles;
        state.currentUser = profiles[0];
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      (async function () {
        try {
          const { data: profilesData } = await getProfiles({
            variables: { ownedBy: address },
          });

          if (profilesData?.profiles?.items?.length === 0) {
            state.profiles = []
            console.log("Profiles", "Wallet doesn't own profiles");
          } else {
            const profiles = profilesData?.profiles?.items
              ?.slice()
              ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
              ?.sort((a: Profile, b: Profile) =>
                !(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1
              );
            state.isAuthenticated = true;
            state.profiles = profiles;
            state.currentUser = profiles[0];
          }
        } catch (e) {
          console.log("Fetch profile", "Error fetching profiles on auth");
        }
      })();
    }
  }, [
    isAuthenticated,
    address,
    getProfiles,
    currentUser,
    isAuthenticated,
    profiles,
  ]);


  // if is not authenticated , show both buttons 
  if (!isAuthenticated) {
    return (
      <div className="flex gap-4 flex-col sm:flex-row items-center justify-center" >
        {signLoading || challenegeLoading || authLoading || profilesLoading
          ? (<button
            className='btn glass btn-primary rounded-lg h-3 loading'
            disabled
            onClick={handleSign}
          >Sign in with Lens</button>)
          : (<button
            className='btn glass btn-primary rounded-lg h-3'
            // disabled
            onClick={handleSign}
          >Sign in with Lens</button>)
        }

        <ConnectButton chainStatus={"none"} accountStatus='address' showBalance={false} />
      </div >
    );
  } else {
    return (
      <div className="flex gap-4 flex-col sm:flex-row items-center justify-center" >
        <ConnectButton chainStatus={"none"} accountStatus='address' showBalance={false} />
      </div>
    )
  }
}


export default WalletConnector;