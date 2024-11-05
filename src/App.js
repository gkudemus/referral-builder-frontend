import React from "react";
import ReferralList from "./components/ReferralList";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Referral Builder</h1>
      <ReferralList />
    </div>
  );
};

export default App;
