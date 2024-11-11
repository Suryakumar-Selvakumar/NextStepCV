import "./styles/App.css";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./components/MyDocument";

function App() {
  const storedAppData = JSON.parse(localStorage.getItem("app-data"));
  const [appData, setAppData] = useState(
    Object.keys(storedAppData).length > 0
      ? storedAppData
      : {
          contactDetails: {},
          courses: [],
          skills: [],
          experiences: [],
          projects: [],
        }
  );

  useEffect(() => {
    localStorage.setItem("app-data", JSON.stringify(appData));
  }, [appData]);

  return (
    <>
      <Header appData={appData} setAppData={setAppData} />
      <MainContent appData={appData} setAppData={setAppData} />
      <PDFViewer>
        <MyDocument appData={appData} />
      </PDFViewer>
    </>
  );
}

export default App;
