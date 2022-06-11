import React from 'react';
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import Layout from './components/Layout';
import './App.css';
import BooksManagement from './pages/BooksManagement';
import UsersManagement from './pages/UsersManagement';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BooksManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
