/* This example requires Tailwind CSS v2.0+ */
import { colors } from '../data/data';
import { SelectMultiColor } from './selectMultiColor';

export function SelectGroupMultiColor(props: any) {
    const items: string[] = props.items;

    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
            {items.map((item, index) => (
                <SelectMultiColor key={index} id={index} process={props.process} title={item} FirebaseKey={props.FirebaseKey} items={colors} />
            ))}
        </div>
    )
}