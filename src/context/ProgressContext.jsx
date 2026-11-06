
import {
  useCallback,
  useMemo
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import ProgressContext from "./ProgressContextValue";

export function ProgressProvider({ children }) {
  const [completedProblems, setCompletedProblems] =
    useLocalStorage(
      "cwt-completed-problems",
      [],
      (value) =>
        Array.isArray(value) &&
        value.every(
          (problemId) =>
            typeof problemId === "string" &&
            problemId.trim() !== ""
        )
    );

  const isCompleted = useCallback(
    (problemId) => completedProblems.includes(problemId),
    [completedProblems]
  );

  const toggleCompleted = useCallback((problemId) => {
    setCompletedProblems((previous) =>
      previous.includes(problemId)
        ? previous.filter((id) => id !== problemId)
        : [...previous, problemId]
    );
  }, [setCompletedProblems]);

  const contextValue = useMemo(
    () => ({
      completedProblems,
      isCompleted,
      toggleCompleted
    }),
    [completedProblems, isCompleted, toggleCompleted]
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
}
