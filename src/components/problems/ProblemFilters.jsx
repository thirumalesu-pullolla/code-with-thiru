
function ProblemFilters({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange
}) {
  return (
    <div className="problem-filters">
      <input
        type="search"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search coding problems..."
        aria-label="Search coding problems"
      />

      <select
        value={difficulty}
        onChange={(event) =>
          onDifficultyChange(event.target.value)
        }
        aria-label="Filter by difficulty"
      >
        <option value="All">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
}

export default ProblemFilters;
