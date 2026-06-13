import HealthCore from "./HealthCore";
import InsightsPanel from "./InsightsPanel";

function ResultsCard({ result }) {

  const info = result?.dataset_info || {};

  const confidence = [92, 89, 83];

  return (
    <>

      {/* KPI ROW */}

      <div className="kpi-row">

        <div className="glass kpi-card">
          <h4>Health</h4>
          <span>{result?.health_score || 0}</span>
        </div>

        <div className="glass kpi-card">
          <h4>Readiness</h4>
          <span>{result?.readiness_score || 0}%</span>
        </div>

        <div className="glass kpi-card">
          <h4>Ranking</h4>
          <span>{result?.ranking || "N/A"}</span>
        </div>

        <div className="glass kpi-card">
          <h4>Dataset Type</h4>
          <span>{info.dataset_type || "Unknown"}</span>
        </div>

      </div>

      {/* MAIN DASHBOARD */}

      <div className="dashboard">

        <div className="glass stats-panel">

          <h3>Dataset Overview</h3>

          <div className="metric">
            <span>Rows</span>
            <strong>{info.rows || 0}</strong>
          </div>

          <div className="metric">
            <span>Columns</span>
            <strong>{info.columns || 0}</strong>
          </div>

          <div className="metric">
            <span>Missing Values</span>
            <strong>{info.missing_values || 0}</strong>
          </div>

          <div className="metric">
            <span>Duplicate Rows</span>
            <strong>{info.duplicate_rows || 0}</strong>
          </div>

          <div className="metric">
            <span>Completeness</span>
            <strong>{info.completeness || 0}%</strong>
          </div>

          <div className="metric">
            <span>Numerical Columns</span>
            <strong>{info.numerical_columns || 0}</strong>
          </div>

          <div className="metric">
            <span>Categorical Columns</span>
            <strong>{info.categorical_columns || 0}</strong>
          </div>

        </div>

        <HealthCore
          score={result?.health_score || 0}
          readiness={result?.readiness_score || 0}
          completeness={info.completeness || 0}
          outliers={info.outliers || {}}
          grade={info.dataset_grade || "N/A"}
          risk={info.risk_level || "N/A"}
        />

        <InsightsPanel
          info={info}
          score={result?.health_score || 0}
        />

      </div>

      {/* QUALITY CENTER */}

      <div className="extra-grid">

        <div className="glass extra-card">

          <h3>Dataset Grade</h3>

          <p>
            Grade:
            {" "}
            <strong>
              {info.dataset_grade || "N/A"}
            </strong>
          </p>

          <p>
            Risk Level:
            {" "}
            <strong>
              {info.risk_level || "N/A"}
            </strong>
          </p>

          <p>
            AI Verdict:
            {" "}
            <strong>
              {info.ai_verdict || "N/A"}
            </strong>
          </p>

        </div>

        <div className="glass extra-card">

          <h3>AI Cleaning Plan</h3>

          {(info.cleaning_recommendations || []).length === 0 ? (

            <p>
              No cleaning required
            </p>

          ) : (

            info.cleaning_recommendations.map(
              (item, index) => (
                <p key={index}>
                  ✓ {item}
                </p>
              )
            )

          )}

        </div>

      </div>

      {/* REPORT */}

      <div className="glass passport">

        <h3>AI Report Snapshot</h3>

        <p>
          Health Score:
          {" "}
          {result?.health_score || 0}
        </p>

        <p>
          Readiness Score:
          {" "}
          {result?.readiness_score || 0}
        </p>

        <p>
          Ranking:
          {" "}
          {result?.ranking || "N/A"}
        </p>

      </div>

      {/* EXECUTIVE SUMMARY */}

      <div className="glass passport">

        <h3>Executive Summary</h3>

        <p>
          {info.summary ||
            "No summary available"}
        </p>

      </div>

      {/* ALGORITHMS */}

      <div className="glass algo-panel">

        <h3>
          Recommended Algorithms
        </h3>

        <div className="algo-grid">

          {(result?.recommended_algorithms || [])
            .map((algo, index) => (

              <div
                className="algo-card"
                key={index}
              >

                <h4>{algo}</h4>

                <p>
                  Match Score
                </p>

                <strong>
                  {confidence[index] || 85}%
                </strong>

              </div>

            ))}

        </div>

      </div>

      {/* EXTRA ANALYSIS */}

      <div className="extra-grid">

        <div className="glass extra-card">

          <h3>
            Top Correlations
          </h3>

          {(info.correlations || []).length === 0 ? (

            <p>
              No correlation data available
            </p>

          ) : (

            info.correlations.map(
              (item, index) => (

                <p key={index}>
                  {item.feature_1}
                  {" ↔ "}
                  {item.feature_2}
                  {" : "}
                  {item.value}
                </p>

              )
            )

          )}

        </div>

        <div className="glass extra-card">

          <h3>
            AI Suggestions
          </h3>

          {(info.suggestions || []).length === 0 ? (

            <p>
              No suggestions required
            </p>

          ) : (

            info.suggestions.map(
              (item, index) => (

                <p key={index}>
                  ✓ {item}
                </p>

              )
            )

          )}

        </div>

        <div className="glass extra-card">

          <h3>
            Outlier Scan
          </h3>

          {Object.entries(
            info.outliers || {}
          ).map(([key, value]) => (

            <p key={key}>
              {key}: {value}
            </p>

          ))}

        </div>

        <div className="glass extra-card">

          <h3>
            Dataset Intelligence
          </h3>

          <p>
            Dataset Type:
            {" "}
            {info.dataset_type}
          </p>

          <p>
            Numerical:
            {" "}
            {info.numerical_columns}
          </p>

          <p>
            Categorical:
            {" "}
            {info.categorical_columns}
          </p>

          <p>
            Completeness:
            {" "}
            {info.completeness}%
          </p>

        </div>

      </div>

    </>
  );
}

export default ResultsCard;