import { faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from 'react';
import { storage } from "../../config/firebase";
import { setProcessValue } from "../../pages/bookings/new";

export function UploadGcode(props: any) {
  // State to store uploaded file
  const [file, setFile] = useState<File>();
  const storageRef = ref(storage, '/files/' + props.FirebaseKey + '/gcode.txt');


  useEffect(() => {
    if (props.process.File) {
      setFile(new File([""], ""));
    }
  }, []);

  // Upload file on change
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  // Handle file upload event and update state
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (file?.size) {
      const content = file;
      uploadBytes(storageRef, content).then((snapshot) => {
        console.log(snapshot.metadata)
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <FontAwesomeIcon icon={faFileCode} />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>{!file && "GCODE Datei hochladen"}{file && "GCODE Datei erfolgreich hochgeladen"}</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">.TXT oder .GCODE bis Maximal 10MB</p>
        </div>
      </div>
    </div>
  )
}