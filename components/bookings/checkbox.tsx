import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { setProcessValue } from "../../pages/bookings/new";
type Obj = { [key: string]: { [key: string]: boolean } }
let valueObj: Obj = {};

export default function Checkbox(props: any) {
    const [value, setValue] = useState(false)

    valueObj[props.FirebaseKey] = { ...valueObj[props.FirebaseKey], [props.title]: value };
    setProcessValue(valueObj[props.FirebaseKey], props.FirebaseKey)
    if(props.checked){
        setValue(true)
    }
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    function handleClick() {
        if (value) { setValue(false) }
        else { setValue(true) }
    }

    return (
        <div className={classNames(value ? "ring-2 ring-green-500" : "", 'relative bg-white border shadow-sm p-4 flex focus:outline-none radio-button')} onClick={handleClick}>

            <div className="flex-1 flex">
                <div className="flex flex-col">
                    <div className='flex'>
                        <span id="comments-description" className="block w-full text-left font-medium text-gray-900">
                            <span>{props.title}</span>
                        </span>
                    </div>

                </div>
            </div>
            <CheckIcon
                className={classNames(!value ? 'invisible' : '', 'h-5 w-5 text-green-500')}
                aria-hidden="true"
            />
            <div
                className={classNames(
                    value ? 'border-2' : 'border-2',
                    value ? 'border-green-500' : 'border-transparent',
                    'absolute -inset-px rounded-none pointer-events-none'
                )}
                aria-hidden="true"
            />
        </div>
    )

}