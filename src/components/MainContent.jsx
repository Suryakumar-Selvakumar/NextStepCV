import { Sidebar } from "./Sidebar";
import { Resume } from "./Resume";
import { useEffect, useState } from "react";

export function MainContent({ appData, setAppData }) {
  return (
    <main>
      <Sidebar appData={appData} setAppData={setAppData} />
      <Resume appData={appData} />
    </main>
  );
}
