import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { invoiceService, accountingService } from '../services';
import { FaRupeeSign, FaFileInvoice, FaBox, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalInvoices: 0,
    totalProducts: 0,
    pendingPayments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In a real app, you would have a dedicated dashboard API
      // For now, we'll use mock data
      setStats({
        totalSales: 1250000,
        totalInvoices: 45,
        totalProducts: 234,
        pendingPayments: 85000
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Sales',
      value: `₹${stats.totalSales.toLocaleString()}`,
      icon: FaRupeeSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Invoices',
      value: stats.totalInvoices,
      icon: FaFileInvoice,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FaBox,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Payments',
      value: `₹${stats.pendingPayments.toLocaleString()}`,
      icon: FaUsers,
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to Jewellery ERP System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-full`}>
                <card.icon className="text-white w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Invoices</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Invoice #</th>
                  <th className="text-left py-2 text-sm font-semibold text-gray-600">Customer</th>
                  <th className="text-right py-2 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-right py-2 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No recent invoices
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              Create New Invoice
            </button>
            <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
              Add Product
            </button>
            <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors">
              View Reports
            </button>
            <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors">
              Accounting Entry
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
