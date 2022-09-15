// This is the connect button

import { useLazyQuery, useMutation } from "@apollo/client";
import { AUTHENTICATE_MUTATION, CHALLENGE_QUERY } from "../src/gql/Authentication";
import { COOKIE_CONFIG } from "@helpers/apollo-client";
import { Profile } from "@helpers/schema";
import setError from "@utils/setError";
import setSuccess from "@utils/setSuccess";
import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import config from "src/envs-config";
import {
  Connector,
  useAccount,
  useConnect,
  useNetwork,
  useSignMessage,
} from "wagmi";

// const getProfilesRequest = (address: string) => {
//   const request = { ownedBy: address }
//   return apolloClient.query({
//     query: gql(GET_PROFILES),
//     variables: {
//       request,
//     },
//   });
// };

import { CURRENT_USER_QUERY } from "./AppLayout";
import ConnectWalletButton from "./ConnectWalletButton";
import SwitchNetwork from "./SwitchNetwork";
import Button from "./UI/Button";
import Spinner from "./UI/Spinner";
import { useSnapshot } from 'valtio'
import { state } from "../src/state";



const WalletConnector: FC = () => {
  const { setProfiles } = useSnapshot(state);
  const { setIsAuthenticated, setCurrentUser, isAuthenticated } = useSnapshot(state);
  const { chain } = useNetwork();
  const { address, connector: activeConnector } = useAccount();
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
    useLazyQuery(CURRENT_USER_QUERY, {
      onCompleted() {
        setSuccess("Auth", `Authenticated with Lens!`);
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
        COOKIE_CONFIG
      );
      Cookies.set(
        "refreshToken",
        auth.data.authenticate.refreshToken,
        COOKIE_CONFIG
      );

      const { data: profilesData } = await getProfiles({
        variables: { ownedBy: address },
      });

      if (profilesData?.profiles?.items?.length === 0) {
        setProfiles([]);
        setError(
          "Profiles",
          "Wallet doesn't a Lens profile. You can still collect and follow."
        );
      } else {
        const profiles: Profile[] = profilesData?.profiles?.items
          ?.slice()
          ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
          ?.sort((a: Profile, b: Profile) =>
            !(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1
          );
        setIsAuthenticated(true);
        setProfiles(profiles);
        setCurrentUser(profiles[0]);
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
            setProfiles([]);
            setError("Profiles", "Wallet doesn't own profiles");
          } else {
            const profiles: Profile[] = profilesData?.profiles?.items
              ?.slice()
              ?.sort((a: Profile, b: Profile) => Number(a.id) - Number(b.id))
              ?.sort((a: Profile, b: Profile) =>
                !(a.isDefault !== b.isDefault) ? 0 : a.isDefault ? -1 : 1
              );
            setIsAuthenticated(true);
            setProfiles(profiles);
            setCurrentUser(profiles[0]);
          }
        } catch (e) {
          setError("Fetch profile", "Error fetching profiles on auth");
        }
      })();
    }
  }, [
    isAuthenticated,
    address,
    getProfiles,
    setCurrentUser,
    setIsAuthenticated,
    setProfiles,
  ]);

  if (!isAuthenticated && activeConnector?.id) {
    return (
      <div className= "flex gap-4 flex-col sm:flex-row items-center justify-center" >
      <ConnectWalletButton />
      < Button
    disabled = {
      signLoading || challenegeLoading || authLoading || profilesLoading
  }
  icon = {
    signLoading ||
    challenegeLoading ||
    authLoading ||
    profilesLoading ? (
      <Spinner size= { 15} />
            ) : (
  <img src= "/assets/lens-icon.svg" alt = "Lens" className = "h-6 w-6" />
            )
          }
onClick = { handleSign }
label = "Sign-In with Lens"
  />
  </div>
    );
  }

return activeConnector?.id ? (
  <div className= "space-y-3" >
    { chain?.id === config.chain.CHAIN_ID ? (
    <ConnectWalletButton />
  ) : (
    <SwitchNetwork />
  )}
{
  (errorChallenege || errorAuthenticate || errorProfiles) && (
    <div className="flex items-center space-x-1 font-bold text-red-500" >
      <div>Something went wrong < /div>
        < /div>
      )
}
</div>
  ) : (
  <div>
  <ConnectWalletButton />
  < /div>
);
};

export default WalletConnector;