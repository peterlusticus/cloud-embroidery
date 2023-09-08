import { Slider } from "@material-tailwind/react";
 
export function SpeedSlider() {
  return (
    <div className="w-96">
      <Slider color="green" defaultValue={50} />
    </div>
  );
}