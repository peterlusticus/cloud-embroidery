import { useEffect, useState } from "react";
import { setProcessValue } from "../../pages/bookings/new";

export function SpeedSlider(props: any) {
  const [value, setValue] = useState(props.process[props.FirebaseKey])

  useEffect(() => {
    setProcessValue(value, props.FirebaseKey)
  }, [value]);

  function handleChange(event: any) {
    setValue(event.target.value);
  }
  return (
    <div>
      <input
        type="range"
        className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200 mt-5"
        id="customSpeed"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}