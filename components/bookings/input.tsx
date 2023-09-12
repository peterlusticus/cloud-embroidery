import { useEffect, useState } from "react";
import { setProcessValue } from "../../pages/bookings/new";

export function Input(props: any) {
  const [value, setValue] = useState(props.process[props.FirebaseKey])

  useEffect(() => {
    setProcessValue(value, props.FirebaseKey)
  }, [value]);

  function handleChange(event: any) {
    setValue(event.target.value);
  }

  return (
    <div className="relative mt-1 rounded-none shadow-sm">
      <input
        type="text"
        className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
        placeholder={props.title}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}