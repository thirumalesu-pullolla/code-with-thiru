
import { Link } from "react-router";
import { useProgress } from "../../context/ProgressContext";

function ProblemList({ problems }) {
  const { isCompleted, toggleCompleted } = useProgress();

  if (problems.length === 0) {
    return (
      <div className="coming-soon">
        <h2>No matching problems</h2>
        <p>Try changing your search or difficulty filter.</p>
      </div>
    );
  }

  return (
    <div className="question-list">
      {problems.map((problem, index) => (
        <div className="question-row" key={problem.id}>
          <div className="question-main">
            <input
              type="checkbox"
              checked={isCompleted(problem.id)}
              onChange={() => toggleCompleted(problem.id)}
              aria-label={`Mark ${problem.title} as completed`}
            />

            <Link
              to={`/dsa/${problem.topicId}/${problem.patternId}/${problem.id}`}
              className="question-title"
            >
              {index + 1}. {problem.title}
            </Link>
          </div>

          <span
            className={`difficulty ${problem.difficulty.toLowerCase()}`}
          >
            {problem.difficulty}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProblemList;
