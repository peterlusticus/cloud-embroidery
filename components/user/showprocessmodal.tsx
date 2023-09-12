/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { ref, set } from 'firebase/database'
import Router, { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { setProcessValue } from '../../pages/bookings/new'
import { ProcessList } from './processlist'

export function ShowProcessModal(props: any) {
  const [processName, setProcessName] = useState("");
  
  const handleClick = () => {
    Router.push("/bookings/new?processid=" + props.process.ProcessId);
  }

  useEffect(() => {
    if (processName != props.process.Name) {
      set(ref(db, 'processes/' + props.process.ProcessId + "/Name"), processName);
    }
  }, [processName]);

  function handleProcessNameChange(event: any) {
    setProcessName(event.target.value);
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <input
                    className="text-lg leading-6 font-medium text-gray-900"
                    value={processName || props.process.Name}
                    onChange={handleProcessNameChange}
                  />
                  <div className="mt-2">
                    <ProcessList process={props.process}></ProcessList>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center sm:mt-4">
                <button
                  type="button"
                  className="rounded-none text-base font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                  onClick={handleClick}
                >
                  Vorgang wiederholen
                </button>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-none border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:text-sm"
                  onClick={() => {
                    props.setOpen(false);
                    window.location.reload();
                  }}
                >
                  Zurück zum Profil
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}