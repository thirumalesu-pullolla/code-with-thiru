
import { Link } from "react-router";

import { dsaTopics } from "../data/dsa";
import { legacyProblems }   from "../data/legacyProblems";
import { useProgress } from "../context/ProgressContext";
import ProgressBar from "../components/problems/ProgressBar";

function DsaPage() {
  const { isCompleted } = useProgress();

  const completedCount = problems.filter(
    (problem) => isCompleted(problem.id)
  ).length;

  return (
    <section className="content-page">
      <h1>DSA Patterns</h1>

      <p className="page-description">
        Learn Data Structures and Algorithms
        through structured pattern-wise practice.
      </p>

      <ProgressBar
        completed={completedCount}
        total={problems.length}
      />

      <div className="topics-grid">
        {dsaTopics.map((topic) => {
          const topicProblems = problems.filter(
            (problem) => problem.topicId === topic.id
          );

          const solved = topicProblems.filter(
            (problem) => isCompleted(problem.id)
          ).length;

          return (
            <article className="topic-card" key={topic.id}>
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>

              <p>
                {solved} / {topicProblems.length} solved
              </p>

              <Link
                className="topic-footer"
                to={`/dsa/${topic.id}`}
              >
                Explore Patterns →
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default DsaPage;
