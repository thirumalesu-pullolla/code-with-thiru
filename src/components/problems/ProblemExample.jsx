
function ProblemExample({ example, index }) {
  return (
    <div className="example-card">
      <h3>Example {index + 1}</h3>

      <div className="example-content">
        <p>
          <strong>Input:</strong> {example.input}
        </p>

        <p>
          <strong>Output:</strong> {example.output}
        </p>

        <p>
          <strong>Explanation:</strong> {example.explanation}
        </p>
      </div>
    </div>
  );
}

export default ProblemExample;
