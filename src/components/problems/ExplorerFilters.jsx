
function ExplorerFilters({
  filters,
  topics,
  patterns,
  onFilterChange,
  onReset
}) {
  return (
    <div className="explorer-filters">
      <div className="explorer-search">
        <label htmlFor="problem-search">
          Search Problems
        </label>

        <input
          id="problem-search"
          type="search"
          placeholder="Search by title or description..."
          value={filters.search}
          onChange={(event) =>
            onFilterChange("search", event.target.value)
          }
        />
      </div>

      <div className="explorer-filter-grid">
        <div className="filter-field">
          <label htmlFor="topic-filter">Topic</label>

          <select
            id="topic-filter"
            value={filters.topic}
            onChange={(event) =>
              onFilterChange("topic", event.target.value)
            }
          >
            <option value="all">All Topics</option>

            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="pattern-filter">Pattern</label>

          <select
            id="pattern-filter"
            value={filters.pattern}
            onChange={(event) =>
              onFilterChange("pattern", event.target.value)
            }
          >
            <option value="all">All Patterns</option>

            {patterns.map((pattern) => (
              <option key={pattern.id} value={pattern.id}>
                {pattern.title}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="difficulty-filter">
            Difficulty
          </label>

          <select
            id="difficulty-filter"
            value={filters.difficulty}
            onChange={(event) =>
              onFilterChange("difficulty", event.target.value)
            }
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="status-filter">
            Completion Status
          </label>

          <select
            id="status-filter"
            value={filters.status}
            onChange={(event) =>
              onFilterChange("status", event.target.value)
            }
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="sort-filter">Sort By</label>

          <select
            id="sort-filter"
            value={filters.sort}
            onChange={(event) =>
              onFilterChange("sort", event.target.value)
            }
          >
            <option value="default">Default</option>
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="difficulty-asc">
              Easy to Hard
            </option>
            <option value="difficulty-desc">
              Hard to Easy
            </option>
          </select>
        </div>
      </div>

      <button
        type="button"
        className="reset-filters-button"
        onClick={onReset}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default ExplorerFilters;
