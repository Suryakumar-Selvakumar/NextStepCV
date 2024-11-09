import "./styles/App.css";
import { Sidebar } from "./components/Sidebar";
import { Resume } from "./components/Resume";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";

function App() {
  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}

export default App;
