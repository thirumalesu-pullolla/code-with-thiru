
import { Link } from "react-router";

function TopicCard({ icon, title, description, path }) {
  return (
    <article className="topic-card">
      <div className="topic-icon">{icon}</div>

      <h3>{title}</h3>
      <p>{description}</p>

      <Link className="topic-footer" to={path}>
        <span>Start Learning</span>
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default TopicCard;
