
function ComplexityCard({ time, space }) {
  return (
    <div className="complexity-grid">
      <div className="complexity-item">
        <span>Time Complexity</span>
        <strong>{time}</strong>
      </div>

      <div className="complexity-item">
        <span>Space Complexity</span>
        <strong>{space}</strong>
      </div>
    </div>
  );
}

export default ComplexityCard;
