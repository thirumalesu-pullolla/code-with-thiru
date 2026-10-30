
import { Link, useParams } from "react-router";

import { problems } from "../data/problems";
import { useProgress } from "../context/ProgressContext";

import ProblemHeader from "../components/problems/ProblemHeader";
import ProblemExample from "../components/problems/ProblemExample";
import SolutionViewer from "../components/problems/SolutionViewer";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";

import NotFound from "./NotFound";

function ProblemDetailPage() {
  const { topicId, patternId, problemId } = useParams();

  const { isCompleted, toggleCompleted } = useProgress();

  const problem = problems.find(
    (item) =>
      item.id === problemId &&
      item.topicId === topicId &&
      item.patternId === patternId
  );

  if (!problem) {
    return <NotFound />;
  }

  const completed = isCompleted(problem.id);

  return (
    <div className="problem-page">
      <Link
        to={`/dsa/${topicId}/${patternId}`}
        className="back-link"
      >
        ← Back to Questions
      </Link>

      <ProblemHeader
        title={problem.title}
        difficulty={problem.difficulty}
        description={problem.description}
      />

      <button
        type="button"
        className={
          completed
            ? "complete-button completed"
            : "complete-button"
        }
        onClick={() => toggleCompleted(problem.id)}
      >
        {completed
          ? "✓ Completed"
          : "Mark as Completed"}
      </button>

      {problem.contentType === "markdown" ? (
        <MarkdownRenderer content={problem.content} />
      ) : (
        <>
          <section className="problem-section">
            <h2>Examples</h2>

            {problem.examples.map((example, index) => (
              <ProblemExample
                key={index}
                example={example}
                index={index}
              />
            ))}
          </section>

          <section className="problem-section">
            <h2>Constraints</h2>

            <ul>
              {problem.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </section>

          <SolutionViewer
            key={problem.id}
            solutions={problem.solutions}
          />

          <section className="problem-section">
            <h2>Dry Run</h2>

            <div className="dry-run-table-wrapper">
              <table className="dry-run-table">
                <thead>
                  <tr>
                    <th>Current Step</th>
                    <th>Result / Maximum</th>
                  </tr>
                </thead>

                <tbody>
                  {problem.dryRun.map((step, index) => (
                    <tr key={index}>
                      <td>{step.element}</td>
                      <td>{step.maximum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default ProblemDetailPage;
