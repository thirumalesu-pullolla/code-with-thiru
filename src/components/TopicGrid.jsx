
import TopicCard from "./TopicCard";
import { topics } from "../data/topics";

function TopicGrid() {
  return (
    <section className="topics-section" id="topics">
      <div className="section-heading">
        <h2>Explore Learning Paths</h2>
        <p>Choose a topic and start learning.</p>
      </div>

      <div className="topics-grid">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            icon={topic.icon}
            title={topic.title}
            description={topic.description}
            path={topic.path}
          />
        ))}
      </div>
    </section>
  );
}

export default TopicGrid;
