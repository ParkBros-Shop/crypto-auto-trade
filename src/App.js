import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Start from './pages/Start';
import Login from './pages/Login';
import Header from './components/Layouts/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Start 페이지를 ProtectedRoute로 보호 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Start />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
