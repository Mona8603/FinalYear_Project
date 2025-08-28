import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import SearchForm from './components/SearchForm';
import LeadTable from './components/LeadTable';

function App() {
  return (
    <Router>
      <Header />
      <SearchForm />
      <LeadTable />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
