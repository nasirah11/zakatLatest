import React from "react";
import ResultCard from "../../../src/team_aiman/components/ResultCard";
import ActionButtons from "../../../src/team_aiman/components/ActionButtons";

export default function ResultPage({ result, onSave, onReset, onProceed }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Zakat Result</h1>

      <ResultCard result={result} />

      <ActionButtons
        onSave={onSave}
        onReset={onReset}
        onProceed={onProceed}
      />
    </div>
  );
}