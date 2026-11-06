
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { problems } from "../data/problems";
import { loadQuestionContent } from "../data/questionContent";
import { useProgress } from "../context/useProgress";

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
  const [loadedSolution, setLoadedSolution] = useState(null);
  const [solutionError, setSolutionError] = useState(null);

  useEffect(() => {
    let active = true;

    if (problem?.contentStatus === "complete" && !problem.content) {
      loadQuestionContent(problem)
        .then((content) => {
          if (active) setLoadedSolution({ problemId: problem.id, content });
        })
        .catch((error) => {
          if (active) setSolutionError({ problemId: problem.id, error });
        });
    }

    return () => {
      active = false;
    };
  }, [problem]);
  const solutionContent =
    problem?.content ??
    (loadedSolution?.problemId === problem?.id ? loadedSolution.content : "");
  const contentLoadError =
    solutionError?.problemId === problem?.id ? solutionError.error : null;

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

      {problem.contentStatus === "draft" && (
        <p className="draft-content-notice" role="note">
          Draft question: examples and a worked solution have not been
          added yet.
        </p>
      )}

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
        contentLoadError ? (
          <p role="alert">
            Unable to load the worked solution: {contentLoadError.message}
          </p>
        ) : solutionContent ? (
          <MarkdownRenderer content={solutionContent} />
        ) : (
          <p role="status">Loading worked solution...</p>
        )
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
