import { useState } from 'react'
import './styles/App.css'
import { General } from './components/General'
import { EducationSection } from './components/EducationSection'
import { WorkSection } from './components/WorkSection'

function App() {
  return (
    <>
      <General />
      <EducationSection />
      <WorkSection />
    </>
  )
}

export default App
