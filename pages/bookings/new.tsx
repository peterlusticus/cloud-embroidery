import { useEffect, useState } from "react";

import { get, ref, set } from "firebase/database";
import Head from "next/head";
import { CheckboxGroupMultiColor } from "../../components/bookings/checkboxGroupMultiColor";
import { InputsAlign } from "../../components/bookings/inputsAlign";
import { ColorSelection } from "../../components/bookings/multicolor";
import RadioButtons from "../../components/bookings/radioButtons";
import { RadioButtonsSingleColor } from "../../components/bookings/radioButtonsSingleColor";
import { SelectGroupMultiColor } from "../../components/bookings/selectGroupMultiColor";
import { SpeedSlider } from "../../components/bookings/slider";
import ProcessSteps from "../../components/bookings/steps";
import { UploadGcode } from "../../components/bookings/uploadGcode";
import BookingContainer from "../../components/container/bookingContainer";
import { colors, frames, needles, suffix } from "../../components/data/data";
import FormContainer from "../../components/form/formContainer";
import FormContainerEnd from "../../components/form/formContainerEnd";
import FormItem from "../../components/form/formItem";
import FormSection from "../../components/form/formSection";
import { auth, db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { uuidv4 } from "@firebase/util";
"../../components/bookings/multicolor";

type Obj = { [key: string]: [key: [key: string] | string] | string }
const process: Obj = {}
var processId = uuidv4();

export const setProcessValue = (value: any, prop: any) => {
    process[prop] = value
}

export const deleteBookingValue = (prop: any) => {
    if (prop in process) {
        delete process[prop]
    }
}


export default function NewBooking() {
    const [colored, setColored] = useState(false);
    const [needleSingle, setNeedleSingle] = useState(null);
    const [needlesMulti, setNeedlesMulti] = useState(null);
    const [colorsMulti, setColorsMulti] = useState(null);

    const [allBookings, setAllBookings] = useState(Object);
    const [currentStep, setCurrentStep] = useState(1);
    const [frame, setFrame] = useState(null);
    const [startpoint, setStartpoint] = useState(null);

    const uid = auth.currentUser == null ? "" : auth.currentUser.uid;

    setProcessValue(uid, "UserID")
    setProcessValue("open", "State")
    setProcessValue(processId, "Name")
    setProcessValue(false, "File");

    const user = useAuth();

    //get all bookings
    useEffect(() => {
        get(ref(db, 'bookings/')).then((snapshot) => {
            if (snapshot.exists()) {
                setAllBookings(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    //next/back step
    function handleSetCurrentStep(operator: string) {
        if (operator == "+")
            setCurrentStep(currentStep + 1)
        else if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    function saveProcess() {
        const time = Date().toLocaleString()
        setProcessValue(time, "LastChangeTime")
        set(ref(db, 'processes/' + processId), process);
        setCurrentStep(currentStep + 1)
        //processId = uuidv4();
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
                <title>Neuer Stickvorgang {suffix}</title>
                <meta property="og:title" content="Neuer Stickvorgang" key="title" />
            </Head>
            <BookingContainer>
                <div className="flex justify-center mx-auto">
                    <div className="grow max-w-7xl px-4 sm:px-6 ">
                        <div>
                            <div className="py-4">
                                {
                                    <button className="button-secondary mb-4" onClick={() => handleSetCurrentStep("-")} >&larr; Zurück</button>
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
                                                        <ColorSelection colored={colored} setColored={setColored} FirebaseKey="Colored" />
                                                    </FormItem>
                                                </FormSection>
                                                {colored == false && <FormSection>
                                                    <FormItem title="Nadel auswählen">
                                                        <RadioButtonsSingleColor setValue={setNeedleSingle} items={needles} FirebaseKey="NeedleSingle" />
                                                    </FormItem>
                                                </FormSection>}
                                                {colored == true &&
                                                    <div>
                                                        <FormSection>
                                                            <FormItem title="Nadeln auswählen">
                                                                <CheckboxGroupMultiColor items={needles} FirebaseKey="NeedlesMulti" />
                                                            </FormItem>
                                                        </FormSection>
                                                        <FormSection>
                                                            <FormItem title="Farben zuordnen">
                                                                <SelectGroupMultiColor items={needles} FirebaseKey="ColorsMulti" />
                                                            </FormItem>
                                                        </FormSection>
                                                    </div>}
                                                <FormContainerEnd>
                                                    <button className="button-primary w-full" onClick={saveProcess} >Weiter &rarr;</button>
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
                                            <RadioButtons setValue={setFrame} items={frames} FirebaseKey="Frame" />
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={saveProcess} >Weiter &rarr;</button>
                                    </FormContainerEnd>
                                </FormContainer>
                            }
                            {
                                currentStep == 3 &&
                                <FormContainer title="Stickcode platzieren">
                                    <FormSection>
                                        <FormItem title="Stickdatei hochladen">
                                            <UploadGcode FirebaseKey={processId} />
                                        </FormItem>
                                    </FormSection>
                                    <FormSection>
                                        <FormItem title="Startpunkt angeben">
                                            <InputsAlign setValue={setStartpoint} FirebaseKey="Startpoint" />
                                        </FormItem>
                                    </FormSection>
                                    <FormContainerEnd>
                                        <button className="button-primary w-full" onClick={saveProcess} >Weiter &rarr;</button>
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
                                        <button className="button-primary w-full" onClick={saveProcess} >Weiter &rarr;</button>
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
            </BookingContainer>
        </div>

    )
}