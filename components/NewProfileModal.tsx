import React, { Fragment, FC, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CLAIM_HANDLE } from "../src/gql/Handle";
import { GET_PROFILES } from "../src/gql/User";
import { Dialog, Transition } from '@headlessui/react'
import toast from "react-hot-toast";

import { useSnapshot } from 'valtio'
import { state } from "../src/state";
import { useAccount } from "wagmi";

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


export default function MyModal() {
  let { isAuthenticated } = useSnapshot(state);

  const { address } = useAccount();
  let [isOpen, setIsOpen] = useState(false)
  const [handle, setHandle] = useState('')
  const [claimed, setClaimed] = useState(false)

  const [claimHandle, { error: errorClaimHandle, loading: claimHandleLoading }] =
    useMutation(CLAIM_HANDLE, {
      onCompleted: (data) => {
        console.log("Handle Claimed: ", data)
        toast(`Claimed: ${handle} `, SUCCESS);
        setClaimed(true)
      },
    })

  const [getProfiles, { error: errorProfiles, loading: profilesLoading }] =
    useLazyQuery(GET_PROFILES, {
      onCompleted() {
        console.log("Get Profiles", `Got Profiles`);
      },
    });

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleRegisterNewUser = async () => {
    try {
      toast("Claiming...", WARNING)
      closeModal()
      const { data } = await claimHandle({
        variables: {
          request: { handle },
        },
      })
      console.log(data)

    } catch (error) {
      console.log(error)
      toast(error?.message, ERROR);
    }
  }

  useEffect(() => {
    console.log("in useEffect after claimed", handle)
    if (isAuthenticated) {
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
              ?.sort((a, b) => Number(a.id) - Number(b.id))
              ?.sort((a, b) =>
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
  }, [claimed])

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="btn btn-accent btn-outline shadow-xxl"
      >
        Claim Lens handle
      </button>


      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"

                  >
                    Register your Lens handle
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm text-gray-500">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                          <div>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="lens-handle"
                                id="lens-handle"
                                className="rounded-l-md block w-full min-w-0 flex-1 rounded-none  border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="msgD0tsender"
                                onChange={(e) => setHandle(e.target.value)}
                              />
                              <span className="inline-flex items-center  rounded-r-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                .lens
                              </span>

                            </div>
                          </div>

                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Profile Picture
                            </label>
                            <div className="mt-1">
                              <div>
                                <div className="mt-1 sm:col-span-2 sm:mt-0">
                                  <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                      <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div className="flex text-sm text-gray-600">
                                        <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                          <span>Upload a file</span>
                                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                      </div>
                                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </form>
                      </div>
                    </div>
                  </Dialog.Description>
                  <div className="mt-6"> </div>
                  <div className="flex items-center justify-around">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleRegisterNewUser()}
                    >
                      Register
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
