
import { Link } from "react-router";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-label">
        YOUR CODING JOURNEY STARTS HERE
      </div>

      <h1>
        Learn. Practice.
        <br />
        <span>Become a Better Developer.</span>
      </h1>

      <p>
        Master DSA patterns, Core Java, Spring Boot,
        Microservices, React and AWS with structured
        learning paths and practical examples.
      </p>

      <Link className="primary-button" to="/dsa">
        Explore DSA Patterns →
      </Link>
    </section>
  );
}

export default Hero;
