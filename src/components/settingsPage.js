import React, { useState } from "react";
import "../styles/settings.css";

const Settings = () => {
  const [language, setLanguage] = useState(true);
  const [safeSearch, setSafeSearch] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(!language);
  };

  const handleSafeSearchToggle = () => {
    setSafeSearch(!safeSearch);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="toggle-container">
        <label htmlFor="language-toggle">Language:</label>
        <div className="toggle">
          <input
            type="checkbox"
            id="language-toggle"
            checked={language}
            onChange={handleLanguageToggle}
          />
          <span className="slider round"></span>
        </div>
      </div>
      <div className="toggle-container">
        <label htmlFor="safe-search-toggle">Safe Search:</label>
        <div className="toggle">
          <input
            type="checkbox"
            id="safe-search-toggle"
            checked={safeSearch}
            onChange={handleSafeSearchToggle}
          />
          <span className="slider round"></span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
