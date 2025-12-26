import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiClock, HiBriefcase, HiTrendingUp, HiCheckCircle,
  HiEye, HiDownload, HiStar
} from 'react-icons/hi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './Earnings.css';

const Earnings = () => {
  const [chartPeriod, setChartPeriod] = useState('30D');
  const [animateChart, setAnimateChart] = useState(false);

  const stats = [
    { icon: HiClock, value: '$47,850', label: 'Total Earnings', change: '+12.5%', positive: true },
    { icon: HiBriefcase, value: '$8,450', label: 'This Month', change: '+8.2%', positive: true },
    { icon: HiTrendingUp, value: '$2,085', label: 'Avg. Project Value', change: '0%', neutral: true },
    { icon: HiCheckCircle, value: '98.5%', label: 'Success Rate', change: '+2.1%', positive: true },
  ];

  const chartData = [
    { date: 'Jan 1', earnings: 2400 },
    { date: 'Jan 5', earnings: 3200 },
    { date: 'Jan 10', earnings: 2800 },
    { date: 'Jan 15', earnings: 4100 },
    { date: 'Jan 20', earnings: 3800 },
    { date: 'Jan 25', earnings: 5200 },
    { date: 'Jan 30', earnings: 4800 },
  ];

  const transactions = [
    {
      id: 1,
      project: 'E-Commerce Website Development',
      escrowId: '#ESC-2024-001',
      client: '0x9f8a...bc3d',
      aiScore: 95,
      amount: 5000,
      status: 'completed',
      date: 'Jan 20, 2024',
    },
    {
      id: 2,
      project: 'Mobile App UI/UX Design',
      escrowId: '#ESC-2024-002',
      client: '0x4f2b...8a1e',
      aiScore: 82,
      amount: 2624,
      status: 'completed',
      date: 'Jan 18, 2024',
    },
    {
      id: 3,
      project: 'Logo Design & Brand Identity',
      escrowId: '#ESC-2024-003',
      client: '0x7a3c...5f9b',
      aiScore: 95,
      amount: 1425,
      status: 'completed',
      date: 'Jan 15, 2024',
    },
    {
      id: 4,
      project: 'Content Writing - Blog Series',
      escrowId: '#ESC-2024-004',
      client: '0x2e9d...4c7f',
      aiScore: 92,
      amount: 800,
      status: 'completed',
      date: 'Jan 12, 2024',
    },
    {
      id: 5,
      project: 'Smart Contract Development',
      escrowId: '#ESC-2024-005',
      client: '0x1a5b...9e2c',
      aiScore: 98,
      amount: 12000,
      status: 'completed',
      date: 'Jan 08, 2024',
    },
  ];

  useEffect(() => {
    setAnimateChart(true);
  }, []);

  return (
    <div className="earnings-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Earnings Dashboard</h1>
            <p>Track your income and payment history</p>
          </div>
          <button className="btn-secondary">
            <HiDownload />
            <span>Export Report</span>
          </button>
        </motion.div>

        {/* Stats Overview */}
        <div className="earnings-stats">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="earnings-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={`stat-icon-wrapper ${stat.positive ? 'positive' : stat.neutral ? 'neutral' : ''}`}>
                <stat.icon />
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className={`stat-change ${stat.positive ? 'positive' : stat.neutral ? 'neutral' : 'negative'}`}>
                  {stat.change} from last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="chart-header">
            <h3>Earnings Over Time</h3>
            <div className="chart-filters">
              {['7D', '30D', '90D', '1Y', 'ALL'].map(period => (
                <motion.button
                  key={period}
                  className={`chart-filter ${chartPeriod === period ? 'active' : ''}`}
                  onClick={() => {
                    setChartPeriod(period);
                    setAnimateChart(false);
                    setTimeout(() => setAnimateChart(true), 50);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06F3FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06F3FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.3)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26, 27, 46, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                  animationDuration={300}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#06F3FF"
                  strokeWidth={3}
                  fill="url(#colorEarnings)"
                  animationDuration={2000}
                  animationEasing="ease-in-out"
                  isAnimationActive={animateChart}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          className="transactions-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="section-header">
            <h3>Recent Payments</h3>
            <select className="filter-select">
              <option>All Time</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Client</th>
                  <th>AI Score</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <td>{tx.date}</td>
                    <td>
                      <div className="project-cell">
                        <strong>{tx.project}</strong>
                        <span className="escrow-id">{tx.escrowId}</span>
                      </div>
                    </td>
                    <td><span className="mono">{tx.client}</span></td>
                    <td>
                      <div className={`ai-score-badge ${tx.aiScore >= 90 ? 'high' : 'medium'}`}>
                        {tx.aiScore}%
                      </div>
                    </td>
                    <td><strong className="amount">${tx.amount.toLocaleString()}</strong></td>
                    <td>
                      <button className="btn-icon">
                        <HiEye />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Earnings;
