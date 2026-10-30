
import { useParams } from "react-router";
import { topics } from "../data/topics";
import NotFound from "./NotFound";

function TechnologyPage() {
  const { technology } = useParams();

  const topic = topics.find(
    (item) => item.id === technology && item.id !== "dsa"
  );

  if (!topic) {
    return <NotFound />;
  }

  return (
    <section className="content-page">
      <div className="technology-icon">{topic.icon}</div>

      <h1>{topic.title}</h1>

      <p className="page-description">
        {topic.description}
      </p>

      <div className="coming-soon">
        <h2>Learning content coming soon</h2>

        <p>
          We'll add concepts, coding examples,
          interview questions, and real-world projects
          to this learning path.
        </p>
      </div>
    </section>
  );
}

export default TechnologyPage;
