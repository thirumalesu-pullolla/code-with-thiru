
function ProblemHeader({ title, difficulty, description }) {
  return (
    <header className="problem-header">
      <div className="problem-heading-row">
        <h1>{title}</h1>

        <span
          className={`difficulty ${difficulty.toLowerCase()}`}
        >
          {difficulty}
        </span>
      </div>

      <p>{description}</p>
    </header>
  );
}

export default ProblemHeader;
