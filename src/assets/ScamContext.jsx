import React, { createContext, useContext, useState } from "react";

const ScamContext = createContext(null);

export function ScamProvider({ children }) {
  // Current round data
  const [savedMessages, setSavedMessages] = useState([]);
  const [correctScams, setCorrectScams] = useState([]); // ground truth for current round
  // Last finished round (result page should read from these)
  const [resultSavedMessages, setResultSavedMessages] = useState([]);
  const [resultCorrectScams, setResultCorrectScams] = useState([]);

  const saveScamMessage = (message) => {
    setSavedMessages((prev) => {
      const key = `${message.sourceApp}-${message.id}`;
      if (prev.some((m) => `${m.sourceApp}-${m.id}` === key)) return prev;
      return [...prev, message];
    });
  };

  const removeScamMessage = (messageKey) => {
    // messageKey is expected to be `${sourceApp}-${id}`
    setSavedMessages((prev) => prev.filter((m) => `${m.sourceApp}-${m.id}` !== messageKey));
  };

  // Finalize: copy current round into result buffers, then clear current
  const finalizeScamSession = () => {
    setResultSavedMessages(savedMessages);
    setResultCorrectScams(correctScams);
    setSavedMessages([]);
    setCorrectScams([]);
  };

  // Reset only current (keep last results intact)
  const resetScamSession = () => {
    setSavedMessages([]);
    setCorrectScams([]);
  };

  // Optional: clear stored results if needed externally
  const clearResults = () => {
    setResultSavedMessages([]);
    setResultCorrectScams([]);
  };

  return (
    <ScamContext.Provider value={{
      // current round
      savedMessages,
      saveScamMessage,
      removeScamMessage,
      correctScams,
      setCorrectScams,
      // results
      resultSavedMessages,
      resultCorrectScams,
      finalizeScamSession,
      // utilities
      resetScamSession,
      clearResults,
    }}>
      {children}
    </ScamContext.Provider>
  );
}

export function useScamContext() {
  return useContext(ScamContext);
}
