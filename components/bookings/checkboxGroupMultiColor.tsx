import Checkbox from "./checkbox";

export function CheckboxGroupMultiColor(props: any) {
    const items: string[] = props.items;
    function getChecked(index: number) {
        console.log(index, props.process.NeedlesMulti[index + 1])
        return props.process.NeedlesMulti[index + 1]
    }

    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
            {items.map((item, index) => (
                <Checkbox key={index} id={index} process={props.process} title={item} FirebaseKey={props.FirebaseKey} checked={getChecked(index)} />
            ))}
        </div>
    )
}