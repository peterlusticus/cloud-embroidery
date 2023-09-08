/* This example requires Tailwind CSS v2.0+ */
import { faFileCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { storage } from '../../config/firebase'
import { setProcessValue } from '../../pages/bookings/new'

export function UpdateCModal(props: any) {
  const router = useRouter()
  const cancelButtonRef = useRef(null)
  // State to store uploaded file
  const [file, setFile] = useState<File>();

  // Upload file on change
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  // Handle file upload event and update state
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    const storageRef = ref(storage, '/codes/c/main.ino');
    const content = file == undefined ? new File([""], "") : file;
    uploadBytes(storageRef, content).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      setProcessValue(true, "File");
      router.reload()
    });
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setOpen}>
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    C Code updaten
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex flex-col">
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <FontAwesomeIcon icon={faFileCode} />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>{!file && "C Datei hochladen"}{file && "C Datei erfolgreich hochgeladen"}</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} />
                            </label>
                            <p className="pl-1">{!file && "oder hereinziehen"}</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">.INO bis Maximal 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-none border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:text-sm"
                  onClick={() => props.setOpen(false)}
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