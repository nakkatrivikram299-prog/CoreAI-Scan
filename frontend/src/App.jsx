import { useState } from "react";
import UploadBox from "./UploadBox";
import ResultsCard from "./ResultsCard";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">

      <div className="hero">
        <h1>CoreAI Scan</h1>

        <p>
          Intelligent Dataset Quality Analysis &
          ML Recommendation Engine
        </p>
      </div>

      <UploadBox setResult={setResult} />

      {result && (
        <ResultsCard result={result} />
      )}

    </div>
  );
}

export default App;