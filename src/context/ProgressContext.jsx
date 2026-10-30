
import {
  createContext,
  useContext,
  useMemo
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completedProblems, setCompletedProblems] =
    useLocalStorage("cwt-completed-problems", []);

  function isCompleted(problemId) {
    return completedProblems.includes(problemId);
  }

  function toggleCompleted(problemId) {
    setCompletedProblems((previous) =>
      previous.includes(problemId)
        ? previous.filter((id) => id !== problemId)
        : [...previous, problemId]
    );
  }

  const contextValue = useMemo(
    () => ({
      completedProblems,
      isCompleted,
      toggleCompleted
    }),
    [completedProblems]
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error(
      "useProgress must be used inside ProgressProvider"
    );
  }

  return context;
}
