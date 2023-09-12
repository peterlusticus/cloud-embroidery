import { uuidv4 } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { CheckboxGroupMultiColor } from "../../components/bookings/checkboxGroupMultiColor";
import { Input } from "../../components/bookings/input";
import { RadioButtonsFrame } from "../../components/bookings/radioButtons";
import { RadioButtonsColored } from "../../components/bookings/radioButtonsColored";
import { RadioButtonsSingleColor } from "../../components/bookings/radioButtonsSingleColor";
import { SelectGroupMultiColor } from "../../components/bookings/selectGroupMultiColor";
import { SpeedSlider } from "../../components/bookings/slider";
import ProcessSteps from "../../components/bookings/steps";
import { UploadGcode } from "../../components/bookings/uploadGcode";
import BookingContainer from "../../components/container/bookingContainer";
import { coloredOptions, frames, needles, suffix } from "../../components/data/data";
import FormContainer from "../../components/form/formContainer";
import FormContainerEnd from "../../components/form/formContainerEnd";
import FormItem from "../../components/form/formItem";
import FormSection from "../../components/form/formSection";
import { auth, db } from "../../config/firebase";
"../../components/bookings/multicolor";

type Obj = { [key: string]: [key: [key: string] | string | boolean] | string }
var process: Obj = {}
var processId: String;

export const setProcessValue = (value: any, prop: any) => {
    process[prop] = value
    set(ref(db, 'processes/' + processId), process); //todo nicht optimal hier, lieber beim zwischenspeichern
}

export const setProcess = (obj: Obj) => {
    process = obj;
}

export const setProcessId = (id: string) => {
    processId = id;
}

export const deleteBookingValue = (prop: any) => {
    if (prop in process) {
        delete process[prop]
    }
}

export default function NewProcess() {
    const [colored, setColored] = useState(false);
    const [needleSingle, setNeedleSingle] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [frame, setFrame] = useState(null);
    const [startpoint, setStartpoint] = useState(null);
    const [wait, setWait] = useState(true);

    //Todo darf nicht null sein oder die "vorgangsinitialdatensetzung" wartet auf uid
    const isAuth = getAuth().currentUser?.uid;
    const [uid, setUid] = useState("");

    useEffect(() => {
        if (isAuth) {
            setUid(isAuth);
        }
    }, [isAuth])


    const queryParameters = new URLSearchParams(window.location.search)
    const existingProcessId = queryParameters.get("processid");

    const initialized = useRef(false) //to prevent double load

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            if (existingProcessId) {
                setProcessId(existingProcessId);
                get(ref(db, 'processes/' + existingProcessId + '/')).then((snapshot) => {
                    if (snapshot.exists()) {
                        setProcess(snapshot.val());
                        setWait(false)
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                //todo statt alles einzeln ein objekt setzen
                const newProcessId = uuidv4();
                setProcessId(newProcessId)
                const time = Date().toLocaleString()
                setProcessValue(time, "LastChangeTime")
                setProcessValue(processId, "Name")
                setProcessValue(processId, "ProcessId");
                setProcessValue("open", "State")
                setProcessValue(false, "File");
                setProcessValue(false, "Colored");
                setProcessValue(["Bitte wählen", "Bitte wählen", "Bitte wählen", "Bitte wählen", "Bitte wählen", "Bitte wählen"], "ColorsMulti");
                setProcessValue("Groß", "Frame");
                setProcessValue("1", "NeedleSingle");
                setProcessValue("", "XCoordinate");
                setProcessValue("", "YCoordinate");
                setProcessValue([false, false, false, false, false, false], "NeedlesMulti");
                setProcessValue(uid, "UserID")

                Router.push("/bookings/new?processid=" + processId);
                setWait(false)
            }
        }
    }, [uid, existingProcessId])

    //next/back step
    function handleSetCurrentStep(operator: string) {
        if (operator == "+")
            setCurrentStep(currentStep + 1)
        else if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    function startProcess() {
        setProcessValue("completed", "State")
        set(ref(db, 'processes/' + processId), process);
    }

    function stopProcess() {

    }

    return (
        <div>
            <Head>
                <title>Jetzt besticken {suffix}</title>
                <meta property="og:title" content="Jetzt besticken" key="title" />
            </Head>
            {!wait && <BookingContainer>
                <div className="flex justify-center mx-auto">
                    <div className="grow max-w-7xl px-4 sm:px-6 ">
                        <div>
                            <div className="py-4">
                                {
                                    <div className="flex">
                                        <button className="w-1/5 text-left button-secondary mb-4" onClick={() => handleSetCurrentStep("-")} >&larr; Zurück</button>
                                        <div className="w-4/5 text-right font-medium text-gray-900 mb-4">
                                            Vorgang "{processId}"
                                        </div>
                                    </div>

                                }
                                <ProcessSteps currentId={currentStep} />
                            </div>
                            {
                                currentStep == 1 &&
                                <div className="flex">
                                    <div className="flex flex-col w-full">
                                        <div>
                                            <FormContainer title="Farben konfigurierenrieren">
                                                <FormSection>
                                                    <FormItem title="Einfarbig/Mehrfarbig">
                                                        <RadioButtonsColored process={process} setValue={setColored} items={coloredOptions} FirebaseKey="Colored" />
                                                    </FormItem>
                                                </FormSection>
                                                {colored == false && <FormSection>
                                                    <FormItem title="Nadel auswählen">
                                                        <RadioButtonsSingleColor process={process} setValue={setNeedleSingle} items={needles} FirebaseKey="NeedleSingle" />
                                                    </FormItem>
                                                </FormSection>}
                                                {colored == true &&
                                                    <div>
                                                        <FormSection>
                                                            <FormItem title="Nadeln auswählen">
                                                                <CheckboxGroupMultiColor items={needles} process={process} FirebaseKey="NeedlesMulti" />
                                                            </FormItem>
                                                        </FormSection>
                                                        <FormSection>
                                                            <FormItem title="Farben zuordnen">
                                                                <SelectGroupMultiColor items={needles} process={process} FirebaseKey="ColorsMulti" />
                                                            </FormItem>
                                                        </FormSection>
                                                    </div>}
                                                <FormContainerEnd>
                                                    <button className="button-primary w-full" onClick={() => handleSetCurrentStep("+")} >Weiter &rarr;</button>
                                                </FormContainerEnd>
                                            </FormContainer>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                currentStep == 2 &&
                                <FormContainer title="Rahmen auswählen">
                                    <FormSection>
                                        <FormItem title="Rahmen">
                                            <RadioButtonsFrame setValue={setFrame} items={frames} process={process} FirebaseKey="Frame" />
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={() => handleSetCurrentStep("+")} >Weiter &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 3 &&
                                <FormContainer title="Stickcode platzieren">
                                    <FormSection>
                                        <FormItem title="Stickdatei hochladen">
                                            <UploadGcode process={process} FirebaseKey={processId} />
                                        </FormItem>
                                    </FormSection>
                                    <FormSection>
                                        <FormItem title="Startpunkt angeben">
                                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                <Input title="X-Koordinate" process={process} FirebaseKey="XCoordinate" />
                                                <Input title="Y-Koordinate" process={process} FirebaseKey="YCoordinate" />
                                            </div>
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={() => handleSetCurrentStep("+")} >Weiter &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 4 &&
                                <FormContainer title="Voreinstellungen anpassen">
                                    <FormSection>
                                        <FormItem title="todo">
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={() => handleSetCurrentStep("+")} >Weiter &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 5 &&
                                <FormContainer title="Stickvorgang">
                                    <FormSection>
                                        <FormItem title="Geschwindigkeit anpassen">
                                            <SpeedSlider />
                                        </FormItem>
                                        <FormItem title="Geschwindigkeit anpassen">
                                            <p>Start/Stop/Pause</p>
                                            <button className="button-secondary w-full" onClick={startProcess} >Start &rarr;</button>
                                            <button className="button-secondary w-full" onClick={stopProcess} >Stop &rarr;</button>
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={() => setCurrentStep(currentStep + 1)} >Weiter &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                        </div>
                    </div>
                </div>
            </BookingContainer>}
        </div>

    )
}