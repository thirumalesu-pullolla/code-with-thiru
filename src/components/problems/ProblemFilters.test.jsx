import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ProblemFilters from "./ProblemFilters";

describe("ProblemFilters", () => {
  it("reports search and difficulty changes", () => {
    const onSearchChange = vi.fn();
    const onDifficultyChange = vi.fn();

    render(
      <ProblemFilters
        search=""
        onSearchChange={onSearchChange}
        difficulty="All"
        onDifficultyChange={onDifficultyChange}
      />
    );

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "tree" }
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Hard" }
    });

    expect(onSearchChange).toHaveBeenCalledWith("tree");
    expect(onDifficultyChange).toHaveBeenCalledWith("Hard");
  });
});