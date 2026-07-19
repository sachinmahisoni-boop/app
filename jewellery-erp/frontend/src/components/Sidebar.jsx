import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaFileInvoice, FaCalculator, FaUsers, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/products', icon: FaBox, label: 'Products' },
    { path: '/billing', icon: FaFileInvoice, label: 'Billing' },
    { path: '/invoices', icon: FaFileInvoice, label: 'Invoices' },
    { path: '/accounting', icon: FaCalculator, label: 'Accounting' },
    { path: '/users', icon: FaUsers, label: 'Users' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Jewellery ERP</h1>
          <p className="text-sm text-gray-400 mt-1">Accounting & Billing</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden bg-gray-900 text-white p-2 rounded-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </>
  );
};

export default Sidebar;
