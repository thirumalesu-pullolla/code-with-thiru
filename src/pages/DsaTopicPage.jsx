
import { Link, useParams } from "react-router";

import { dsaTopics } from "../data/dsa";
import  { legacyProblems }  from "../data/legacyProblems";
import NotFound from "./NotFound";

function DsaTopicPage() {
  const { topicId } = useParams();

  const topic = dsaTopics.find(
    (item) => item.id === topicId
  );

  if (!topic) {
    return <NotFound />;
  }

  return (
    <section className="content-page">
      <Link to="/dsa" className="back-link">
        ← Back to DSA
      </Link>

      <h1>{topic.title}</h1>
      <p className="page-description">
        {topic.description}
      </p>

      <div className="pattern-list">
        {topic.patterns.map((pattern) => {
          const count = legacyProblems.filter(
            (problem) =>
              problem.topicId === topicId &&
              problem.patternId === pattern.id
          ).length;

          return (
            <article className="pattern-card" key={pattern.id}>
              <h2>{pattern.title}</h2>

              <p>{count} coding questions</p>

              <Link
                to={`/dsa/${topicId}/${pattern.id}`}
                className="pattern-link"
              >
                View Questions →
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default DsaTopicPage;
