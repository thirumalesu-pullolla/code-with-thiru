import { Link } from "react-router";

import { dsaTopics } from "../data/dsa";
import { problems } from "../data/problems";
import { useProgress } from "../context/useProgress";
import ProgressBar from "../components/problems/ProgressBar";

function getPatternNumber(title) {
  return Number(title.match(/^Pattern (\d+):/)?.[1] ?? 0);
}

function DsaPage() {
  const { completedProblems } = useProgress();
  const completedSet = new Set(completedProblems);

  const patternStats = problems.reduce((stats, problem) => {
    const key = `${problem.topicId}/${problem.patternId}`;
    const current = stats.get(key) ?? { total: 0, solved: 0 };

    current.total += 1;
    if (completedSet.has(problem.id)) current.solved += 1;

    stats.set(key, current);
    return stats;
  }, new Map());

  const completedCount = problems.filter((problem) =>
    completedSet.has(problem.id)
  ).length;
  const contentReadyCount = problems.filter(
    (problem) => problem.contentStatus !== "draft"
  ).length;

  const allPatterns = dsaTopics
    .flatMap((topic) =>
      topic.patterns.map((pattern) => ({
        ...pattern,
        topicId: topic.id,
        topicTitle: topic.title,
        number: getPatternNumber(pattern.title)
      }))
    )
    .sort((a, b) => a.number - b.number);

  return (
    <section className="content-page dsa-page">
      <h1>DSA Patterns</h1>

      <p className="page-description">
        Learn Data Structures and Algorithms through structured
        pattern-wise practice.
      </p>

      <p className="page-description">
        Worked solutions available: {contentReadyCount} of {problems.length}
        {" "}questions.
      </p>

      <div className="dsa-progress-compact">
        <ProgressBar
          completed={completedCount}
          total={problems.length}
        />
      </div>

      <div className="dsa-pattern-grid">
        {allPatterns.map((pattern) => {
          const key = `${pattern.topicId}/${pattern.id}`;
          const { total, solved } = patternStats.get(key) ?? {
            total: 0,
            solved: 0
          };

          const card = (
            <>
              <span className="dsa-pattern-topic">
                {pattern.topicTitle}
              </span>

              <h2>{pattern.title.replace(/^Pattern \d+:\s*/, "")}</h2>

              <span className="pattern-count">
                {total === 0
                  ? "Coming soon"
                  : `${solved} / ${total} solved`}
              </span>
            </>
          );

          const className =
            `pattern-card dsa-pattern-card dsa-topic-${pattern.topicId}`;

          return total === 0 ? (
            <article
              className={`${className} dsa-pattern-card-disabled`}
              key={key}
            >
              {card}
            </article>
          ) : (
            <Link
              to={`/dsa/${pattern.topicId}/${pattern.id}`}
              className={className}
              key={key}
            >
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default DsaPage;