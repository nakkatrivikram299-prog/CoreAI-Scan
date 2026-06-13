import { useState } from "react";
import { uploadDataset } from "./api";

function UploadBox({ setResult }) {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Choose a CSV file");
      return;
    }

    try {
      const data = await uploadDataset(file);
      setResult(data);
    } catch (error) {
    console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("STATUS:", error.response.status);
    console.log("DATA:", error.response.data);
  }

  alert("Upload failed");
    }
  };

  return (
    <div className="upload-box">

      <input
        type="file"
        accept=".csv"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={handleUpload}>
        Analyze Dataset
      </button>

    </div>
  );
}

export default UploadBox;
