import { useState } from 'react'
import './styles/App.css'
import { General } from './components/General'
import { EducationSection } from './components/EducationSection'
import { Work } from './components/Work'

function App() {
  return (
    <>
      <General />
      <EducationSection />
      <Work />
    </>
  )
}

export default App
