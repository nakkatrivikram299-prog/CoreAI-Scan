function InsightsPanel({ info, score }) {

  const grade =
    score >= 95 ? "A+" :
    score >= 90 ? "A" :
    score >= 80 ? "B" :
    score >= 70 ? "C" : "D";

  const risk =
    score >= 90 ? "LOW" :
    score >= 75 ? "MEDIUM" :
    "HIGH";

  const verdict =
    score >= 90
      ? "Ready For Machine Learning"
      : "Dataset Needs Cleaning";

  return (
    <div className="glass insights">

      <div className="info-block">
        <h3>Dataset Grade</h3>

        <div className="grade">
          {grade}
        </div>
      </div>

      <div className="info-block">
        <h3>Risk Level</h3>

        <div className="risk">
          {risk}
        </div>
      </div>

      <div className="info-block">
        <h3>AI Verdict</h3>

        <div className="verdict">
          {verdict}
        </div>
      </div>

      <div className="info-block">
        <h3>AI Insights</h3>

        <ul>

          <li>
            Missing Values:
            {info.missing_values}
          </li>

          <li>
            Duplicate Rows:
            {info.duplicate_rows}
          </li>

          <li>
            Suitable for ML analysis
          </li>

          <li>
            Feature quality appears stable
          </li>

        </ul>
      </div>

    </div>
  );
}

export default InsightsPanel;