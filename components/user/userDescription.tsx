/* This example requires Tailwind CSS v2.0+ */

import { uuidv4 } from "@firebase/util";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { get, ref, set } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db, storage } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import ChangeAddressModal from "./changeaddressmodal";
import { DeleteProcessModal } from "./deleteprocessmodal";
import DeleteProfileModal from "./deleteprofilemodal";
import ResetPasswordModal from "./resetpasswordmodal";
import { ShowProcessModal } from "./showprocessmodal";
import { UpdateCModal } from "./updatecmodal copy";
import { UpdatePythonModal } from "./updatepythonmodal";

export default function UserDescription(props: any) {
    const [userdata, setUserdata] = useState(Object);
    const [userProcesses, setUserProcesses] = useState(Object);
    const [open0, setOpen0] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);

    const [modalData, setModalData] = useState({});


    const router = useRouter()

    //get userdata and processes
    const auth = useAuth()

    //get python or c code url
    const [pythonCodeUrl, setPythonCodeUrl] = useState("");
    const [cCodeUrl, setCCodeUrl] = useState("");

    const cCodePath = storageRef(storage, 'codes/c/main.ino');
    getDownloadURL(cCodePath).then((url) => {
        setCCodeUrl(url)
    })

    const pythonCodePath = storageRef(storage, 'codes/python/main.py');
    getDownloadURL(pythonCodePath).then((url) => {
        setPythonCodeUrl(url)
    })

    function duplicateProcess(item: any) {
        //todo
        get(ref(db, 'processes/' + item.ProcessId)).then((snapshot) => {
            if (snapshot.exists()) {
                const newProcessiId = uuidv4();
                const newProcess = snapshot.val();
                newProcess.ProcessId = newProcessiId;
                newProcess.Name = newProcess.Name + " Copy";
                newProcess.LastChangeTime = Date().toLocaleString()
                set(ref(db, 'processes/' + newProcessiId), newProcess);
                router.reload()
            }
        })
    }

    useEffect(() => {
        get(ref(db, 'users/' + auth.user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                //get userdata
                setUserdata(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        get(ref(db, 'processes/')).then((snapshot) => {
            if (snapshot.exists()) {
                //get all processes
                const processes = snapshot.val()
                const selected = []
                for (const key in processes) {
                    if (processes.hasOwnProperty(key)) {
                        if (processes[key]["UserID"] == auth.user.uid) {
                            processes[key]["ProcessId"] = key
                            selected.push(processes[key])
                        }
                    }
                }
                setUserProcesses(selected)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [auth])

    return (
        <>
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Ihre Benutzerdaten</h3>
                <p className="mt-1 max-w-3xl text-sm text-gray-500">Hier können Sie Ihre Benutzerdaten, die Maschineneinstellungen und Stickvorgänge sehen, die Rechnungsadresse ändern und Ihr Passwort zurücksetzen</p>
            </div>
            <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Vorname</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Vorname}</span>
                        </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Nachname</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Name}</span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">E-Mail</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Email}</span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Geburtsdatum</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Geburtsdatum}</span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userdata.Adresse_Formatiert}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    onClick={() => setOpen3(true)}
                                >
                                    Ändern
                                </button>
                                <ChangeAddressModal open={open3} setOpen={setOpen3}></ChangeAddressModal>
                            </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Passwort</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">*********</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    onClick={() => setOpen4(true)}
                                >
                                    Zurücksetzen
                                </button>
                                <ResetPasswordModal open={open4} setOpen={setOpen4} Email={userdata.Email}></ResetPasswordModal>
                            </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Maschinencode Arduino</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <a href={cCodeUrl} className="link-main truncate">{cCodeUrl}</a>
                            <div className="ml-4 flex-shrink-0 flex space-x-4">

                                <button
                                    type="button"
                                    className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    onClick={() => {
                                        //setModalData(item);
                                        setOpen5(true)
                                    }}
                                >
                                    Aktualisieren
                                </button>
                                <UpdateCModal open={open5} setOpen={setOpen5} />
                            </div>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Maschinencode Python</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <a href={pythonCodeUrl} className="link-main truncate">{pythonCodeUrl}</a>
                            <div className="ml-4 flex-shrink-0 flex space-x-4">

                                <button
                                    type="button"
                                    className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    onClick={() => {
                                        //setModalData(item);
                                        setOpen6(true)
                                    }}
                                >
                                    Aktualisieren
                                </button>
                                <UpdatePythonModal open={open6} setOpen={setOpen6} />
                            </div>
                        </dd>
                    </div>

                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Voreinstellungen</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">...voreinstellungen anzeigen (können bei process generiert werden)</span>
                        </dd>
                    </div>

                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Stickvorgänge</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul role="list" className="border border-gray-200 rounded-none divide-y divide-gray-200">
                                {Array.isArray(userProcesses)
                                    ? userProcesses.map((item: any) => {
                                        return <li key={item.ProcessId} className={"pl-3 pr-4 py-3 flex items-center justify-between text-sm "}>
                                            <div className="w-0 flex-1 flex items-center">
                                                {item.State == "open" ? <ExclamationCircleIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" /> : <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />}
                                                <span className="ml-2 flex-1 w-0 truncate">Vorgang "{item.Name}", zuletzt geändert am {item.Date}</span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0 flex space-x-4">
                                                <button
                                                    type="button"
                                                    className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    onClick={() => {
                                                        setModalData(item);
                                                        setOpen0(true)
                                                    }}
                                                >
                                                    Anzeigen
                                                </button>
                                                <ShowProcessModal open={open0} setOpen={setOpen0} process={modalData}></ShowProcessModal>
                                                <span className="text-gray-300" aria-hidden="true">
                                                    |
                                                </span>
                                                <button
                                                    type="button"
                                                    className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    onClick={() => {
                                                        duplicateProcess(item);
                                                    }}
                                                >
                                                    Kopie
                                                </button>
                                                <span className="text-gray-300" aria-hidden="true">
                                                    |
                                                </span>
                                                <button
                                                    type="button"
                                                    className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    onClick={() => {
                                                        setModalData(item);
                                                        setOpen1(true)
                                                    }}
                                                >
                                                    Löschen
                                                </button>
                                                <DeleteProcessModal open={open1} setOpen={setOpen1} process={modalData} />
                                            </div>
                                        </li>
                                    }) :
                                    <p>Keine Stickvorgänge</p>
                                }
                            </ul>
                            <br /><br /><br />
                            <button
                                type="button"
                                className="rounded-none font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                onClick={() => setOpen2(true)}
                            >
                                Mein Konto löschen
                            </button>
                            <DeleteProfileModal open={open2} setOpen={setOpen2} />
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    )
}