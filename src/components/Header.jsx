import "../styles/Header.css";

export function Header() {
  return (
    <header>
      <div className="logo">
        <img src="./public/nextGold.svg" alt="logo of the app" id="logo-img" />
        <p id="logo-text">NextStepCV</p>
      </div>
      <div className="header-buttons">
        <button>Load Dummy</button>
        <button>Clear Resume</button>
        <button>Download</button>
      </div>
    </header>
  );
}
