
function ProgressBar({ completed, total }) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-card">
      <div className="progress-heading">
        <h3>Your Progress</h3>

        <span>
          {completed} / {total} solved
        </span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Coding problems completed"
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p>{percentage}% completed</p>
    </div>
  );
}

export default ProgressBar;
