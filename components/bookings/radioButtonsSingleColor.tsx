import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { setProcessValue } from '../../pages/bookings/new';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function RadioButtonsSingleColor(props: any) {
    const items: any[] = props.items;
    console.log(props.process)
    const [selectedItem, setSelectedItem] = useState(props.process.NeedleSingle);

    if (selectedItem.length > 0) { props.setValue(selectedItem) }
    else { props.setValue(null) }

    setProcessValue(selectedItem, props.FirebaseKey)

    return (
        <RadioGroup value={selectedItem} onChange={setSelectedItem}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
                {items.map((item) => (
                    <RadioGroup.Option
                        key={item}
                        value={item}
                        className={({ checked, active }) => classNames(checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-green-500' : '', 'relative bg-white border shadow-sm p-4 flex focus:outline-none radio-button')}>
                        {({ checked, active }) => (
                            <>
                                <div className="flex-1 flex">
                                    <div className="flex flex-col">
                                        <div className='flex'>
                                            <RadioGroup.Label as="p" className="block w-full text-left font-medium text-gray-900">
                                                {item}
                                            </RadioGroup.Label>
                                        </div>
                                        
                                    </div>
                                </div>
                                <CheckIcon
                                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-green-500')}
                                    aria-hidden="true"
                                />
                                <div
                                    className={classNames(
                                        active ? 'border-2' : 'border-2',
                                        checked ? 'border-green-500' : 'border-transparent',
                                        'absolute -inset-px rounded-none pointer-events-none'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}