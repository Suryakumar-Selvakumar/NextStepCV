import "./styles/App.css";
import { Sidebar } from "./components/Sidebar";
import { Resume } from "./components/Resume";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Resume />
      </main>
    </>
  );
}

export default App;
