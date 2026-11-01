import { Link } from "react-router";

import { dsaTopics } from "../data/dsa";
import { problems } from "../data/problems";
import { useProgress } from "../context/ProgressContext";
import ProgressBar from "../components/problems/ProgressBar";

const allPatterns = dsaTopics
  .flatMap((topic) =>
    topic.patterns.map((pattern) => ({
      ...pattern,
      topicId: topic.id,
      topicTitle: topic.title,
      number: Number(pattern.title.match(/^Pattern (\d+):/)?.[1] ?? 0)
    }))
  )
  .sort((a, b) => a.number - b.number);

function DsaPage() {
  const { isCompleted } = useProgress();

  const completedCount = problems.filter((problem) =>
    isCompleted(problem.id)
  ).length;

  return (
    <section className="content-page">
      <h1>DSA Patterns</h1>

      <p className="page-description">
        Learn Data Structures and Algorithms through structured
        pattern-wise practice.
      </p>

      <div className="dsa-progress-compact">
        <ProgressBar
          completed={completedCount}
          total={problems.length}
        />
      </div>

      <div className="dsa-pattern-grid">
        {allPatterns.map((pattern) => {
          const patternProblems = problems.filter(
            (problem) =>
              problem.topicId === pattern.topicId &&
              problem.patternId === pattern.id
          );

          const solvedCount = patternProblems.filter((problem) =>
            isCompleted(problem.id)
          ).length;

          return (
            <article
              className="pattern-card"
              key={`${pattern.topicId}/${pattern.id}`}
            >
              <Link
                to={`/dsa/${pattern.topicId}/${pattern.id}`}
                className="pattern-card dsa-pattern-card"
                key={`${pattern.topicId}/${pattern.id}`}
              >
                <h2>{pattern.title.replace(/^Pattern \d+:\s*/, "")}</h2>

                <p className="pattern-count">
                  {solvedCount} / {patternProblems.length} solved
                </p>

                <span className="pattern-link">View Questions →</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default DsaPage;
