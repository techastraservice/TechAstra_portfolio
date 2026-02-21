import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import Home from './components/Home';
// Import Admin component (creating it next, but reference for plan)
import Admin from './components/Admin';

import { TeamProvider } from './context/TeamContext';

const App = () => {
  return (
    <ProjectProvider>
      <TeamProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </TeamProvider>
    </ProjectProvider>
  );
};

export default App;
