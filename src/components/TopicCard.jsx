import { Link } from "react-router";

function TopicCard({ icon, title, description, path }) {
  return (
    <Link className="topic-card" to={path}>
      <div className="topic-icon">{icon}</div>

      <h3>{title}</h3>
      <p>{description}</p>

      <span className="topic-footer">
        <span>Start Learning</span>
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default TopicCard;
