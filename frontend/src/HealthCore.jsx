function HealthCore({
  score = 0,
  readiness = 0,
  completeness = 0,
  outliers = {},
  grade = "N/A",
  risk = "N/A"
}) {

  const outlierCount = Object.values(
    outliers
  ).reduce(
    (a, b) => a + b,
    0
  );

  return (

    <div className="health-core glass">

      <div className="hud-stat top-left">
        <span>{completeness}%</span>
        <small>Complete</small>
      </div>

      <div className="hud-stat top-right">
        <span>{readiness}%</span>
        <small>Ready</small>
      </div>

      <div className="hud-stat bottom-left">
        <span>{outlierCount}</span>
        <small>Outliers</small>
      </div>

      <div className="hud-stat bottom-right">
        <span>{grade}</span>
        <small>Grade</small>
      </div>

      <div className="outer-ring">

        <div className="middle-ring">

          <div className="inner-core">

            <span className="score">
              {score}
            </span>

            <span className="label">
              HEALTH
            </span>

            <small
              style={{
                marginTop: "10px",
                color: "#bfc7d8"
              }}
            >
              {risk} Risk
            </small>

          </div>

        </div>

      </div>

    </div>

  );
}

export default HealthCore;