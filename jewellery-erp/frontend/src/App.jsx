import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

// Placeholder components for other pages
const Billing = () => <div className="p-6"><h1 className="text-3xl font-bold">Billing</h1><p className="mt-4">Billing module - Create invoices and bills</p></div>;
const Invoices = () => <div className="p-6"><h1 className="text-3xl font-bold">Invoices</h1><p className="mt-4">Invoice management module</p></div>;
const Accounting = () => <div className="p-6"><h1 className="text-3xl font-bold">Accounting</h1><p className="mt-4">Accounting and ledger management</p></div>;
const Users = () => <div className="p-6"><h1 className="text-3xl font-bold">Users</h1><p className="mt-4">User management module</p></div>;

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <PrivateRoute>
            <Billing />
          </PrivateRoute>
        }
      />
      <Route
        path="/invoices"
        element={
          <PrivateRoute>
            <Invoices />
          </PrivateRoute>
        }
      />
      <Route
        path="/accounting"
        element={
          <PrivateRoute>
            <Accounting />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
