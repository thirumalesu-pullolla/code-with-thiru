
import { useState } from "react";
import ComplexityCard from "./ComplexityCard";

function SolutionViewer({ solutions }) {
  const [selectedSolution, setSelectedSolution] =
    useState("optimized");

  const [copied, setCopied] = useState(false);

  const solution = solutions[selectedSolution];

  function handleSolutionChange(type) {
    setSelectedSolution(type);
    setCopied(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(solution.code);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy code:", error);
      setCopied(false);
    }
  }

  return (
    <section className="solution-section">
      <h2>Java Solutions</h2>

      <div className="solution-tabs">
        <button
          type="button"
          className={
            selectedSolution === "bruteForce" ? "active" : ""
          }
          onClick={() => handleSolutionChange("bruteForce")}
        >
          Brute Force
        </button>

        <button
          type="button"
          className={
            selectedSolution === "optimized" ? "active" : ""
          }
          onClick={() => handleSolutionChange("optimized")}
        >
          Optimized
        </button>
      </div>

      <h3>{solution.title}</h3>

      <p className="solution-explanation">
        {solution.explanation}
      </p>

      <div className="code-container">
        <div className="code-header">
          <span>Java</span>

          <button type="button" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <pre>
          <code>{solution.code}</code>
        </pre>
      </div>

      <ComplexityCard
        time={solution.timeComplexity}
        space={solution.spaceComplexity}
      />
    </section>
  );
}

export default SolutionViewer;
