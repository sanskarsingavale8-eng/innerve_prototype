import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiViewGrid, HiLockClosed, HiCheckCircle, HiTrendingUp,
  HiSearch, HiFilter, HiPlus, HiDotsVertical, HiEye,
  HiClock, HiUser, HiCalendar, HiSparkles
} from 'react-icons/hi';
import './MyEscrows.css';
import toast from 'react-hot-toast';

const MyEscrows = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const stats = [
    { icon: HiViewGrid, value: '5', label: 'Active Escrows', color: 'primary' },
    { icon: HiLockClosed, value: '$12,450', label: 'Funds in Escrow', color: 'warning' },
    { icon: HiCheckCircle, value: '23', label: 'Completed Projects', color: 'success' },
    { icon: HiTrendingUp, value: '96%', label: 'Success Rate', color: 'secondary' },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'incomplete', label: 'Incomplete' },
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending Review' },
    { id: 'completed', label: 'Completed' },
    { id: 'disputed', label: 'Disputed' },
  ];

  // load escrows from localStorage if present
  let escrowsFromStorage = [];
  try {
    const raw = localStorage.getItem('escrows');
    escrowsFromStorage = raw ? JSON.parse(raw) : [];
  } catch (e) {
    escrowsFromStorage = [];
  }

  const fallbackEscrows = [
    {
      id: 1,
      title: 'E-Commerce Website Development',
      escrowId: '#ESC-2024-001',
      status: 'active',
      amount: 5000,
      progress: 50,
      milestone: '2 of 4',
      freelancer: '0x9f8a...bc3d',
      deadline: 'Feb 28, 2024',
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      escrowId: '#ESC-2024-002',
      status: 'pending',
      amount: 3200,
      aiScore: 85,
      freelancer: '0x4f2b...8a1e',
      submitted: '2 hours ago',
    },
    {
      id: 3,
      title: 'Logo Design & Brand Identity',
      escrowId: '#ESC-2024-003',
      status: 'completed',
      amount: 1500,
      aiScore: 95,
      paidAmount: 1425,
      freelancer: '0x7a3c...5f9b',
      completedDate: 'Jan 15, 2024',
    },
    {
      id: 4,
      title: 'Content Writing - Blog Series',
      escrowId: '#ESC-2024-004',
      status: 'active',
      amount: 2400,
      progress: 33,
      milestone: '1 of 3',
      freelancer: '0x2e9d...4c7f',
      deadline: 'Mar 10, 2024',
    },
    {
      id: 5,
      title: 'Smart Contract Audit',
      escrowId: '#ESC-2024-005',
      status: 'pending',
      amount: 8000,
      aiScore: 80,
      freelancer: '0x1a5b...9e2c',
      submitted: '1 day ago',
    },
  ];

  // use state so we can update on submit
  const [escrows, setEscrows] = useState(() => escrowsFromStorage.length ? escrowsFromStorage : fallbackEscrows);

  const [userProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('userProfile');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const filteredEscrows = escrows.filter(escrow => {
    const matchesFilter = activeFilter === 'all' || escrow.status === activeFilter;
    const matchesSearch = (escrow.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (escrow.escrowId || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const submitWork = (id) => {
    setEscrows(prev => {
      const updated = prev.map(e => e.id === id ? { ...e, status: 'pending', submitted: 'Just now' } : e);
      try { localStorage.setItem('escrows', JSON.stringify(updated)); } catch (err) { console.warn(err); }
      return updated;
    });
    toast.success('Work submitted — awaiting AI review');
  };

  return (
    <div className="my-escrows-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>My Escrows</h1>
            <p>Manage and track all your escrow contracts</p>
          </div>
          <Link to="/new-escrow" className="btn-primary">
            <HiPlus />
            <span>Create New Escrow</span>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="stats-overview">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`stat-box stat-${stat.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div 
                className="stat-icon-wrapper"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="stat-icon" />
              </motion.div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="filter-tabs">
            {filters.map(filter => {
              const count = filter.id === 'all' ? escrows.length : escrows.filter(e => e.status === filter.id).length;
              return (
                <button
                  key={filter.id}
                  className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="filter-actions">
            <div className="search-box">
              <HiSearch />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <HiFilter />
              <span>Sort by: Latest</span>
            </button>
          </div>
        </motion.div>

        {/* Escrow Cards */}
        <AnimatePresence mode="wait">
          <motion.div className="escrows-grid" layout>
            {filteredEscrows.map((escrow, index) => (
              <EscrowCard 
                key={escrow.id} 
                escrow={escrow} 
                index={index}
                isHovered={hoveredCard === escrow.id}
                onHover={() => setHoveredCard(escrow.id)}
                onLeave={() => setHoveredCard(null)}
                isFreelancer={userProfile?.role === 'freelancer'}
                onSubmitWork={submitWork}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredEscrows.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HiViewGrid className="empty-icon" />
            <h3>No escrows found</h3>
            <p>Try adjusting your filters or create a new escrow</p>
            <Link to="/new-escrow" className="btn-primary">
              <HiPlus />
              <span>Create New Escrow</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const EscrowCard = ({ escrow, index, isHovered, onHover, onLeave, isFreelancer, onSubmitWork }) => {
  const getStatusConfig = (status) => {
    const configs = {
      incomplete: { label: 'Incomplete', color: 'warning', icon: HiClock },
      active: { label: 'Active', color: 'primary', icon: HiClock },
      pending: { label: 'AI Review Pending', color: 'warning', icon: HiSparkles },
      completed: { label: 'Completed', color: 'success', icon: HiCheckCircle },
    };
    return configs[status] || configs.active;
  };

  const statusConfig = getStatusConfig(escrow.status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      className="escrow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -6,
        transition: { duration: 0.3 }
      }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      layout
    >
      <div className="escrow-header">
        <div className="escrow-title-section">
          <h3>{escrow.title}</h3>
          <div className="escrow-meta">
            <span className="escrow-id">{escrow.escrowId}</span>
            <span className={`status-badge badge-${statusConfig.color}`}>
              <StatusIcon />
              {statusConfig.label}
            </span>
          </div>
        </div>
        <div className="escrow-amount">
          <span className="amount-value">${escrow.amount.toLocaleString()}</span>
          <span className="amount-label">USDC</span>
        </div>
      </div>

      {escrow.status === 'incomplete' && (
        <div className="incomplete-box">
          <strong>Incomplete Project</strong>
          <p>Project setup was not finished. Complete the setup to deposit funds and start the escrow.</p>
        </div>
      )}

        {escrow.status === 'active' && (
          <div className="progress-section">
          <div className="progress-info">
            <span>Milestone {escrow.milestone}</span>
            <motion.span
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            >
              {escrow.progress}% Complete
            </motion.span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${escrow.progress}%` }}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.1 + 0.3,
                ease: "easeOut" 
              }}
            />
          </div>
        </div>
      )}

      {escrow.status === 'pending' && (
        <div className="ai-status-box">
          <div className="ai-icon-wrapper">
            <HiSparkles />
          </div>
          <div>
            <strong>AI Verification in Progress</strong>
            <p>Analyzing deliverables and generating completion score...</p>
          </div>
        </div>
      )}

      {escrow.status === 'completed' && escrow.aiScore && (
        <div className="ai-result-box">
          <div className="ai-score-circle">
            <svg className="score-ring" width="60" height="60">
              <circle cx="30" cy="30" r="25" />
              <motion.circle
                cx="30"
                cy="30"
                r="25"
                initial={{ strokeDashoffset: 157 }}
                animate={{ strokeDashoffset: 157 - (157 * escrow.aiScore) / 100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <span className="score-value">{escrow.aiScore}%</span>
          </div>
          <div className="score-info">
            <strong>AI Score: {escrow.aiScore >= 90 ? 'Excellent' : 'Good'}</strong>
            <p>Auto-released ${escrow.paidAmount?.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="escrow-details">
        <div className="detail-item">
          <HiUser />
          <span>Freelancer: <span className="mono">{escrow.freelancer}</span></span>
        </div>
        {escrow.deadline && (
          <div className="detail-item">
            <HiCalendar />
            <span>Deadline: {escrow.deadline}</span>
          </div>
        )}
        {escrow.submitted && (
          <div className="detail-item">
            <HiClock />
            <span>Submitted: {escrow.submitted}</span>
          </div>
        )}
        {escrow.completedDate && (
          <div className="detail-item">
            <HiCheckCircle />
            <span>Completed: {escrow.completedDate}</span>
          </div>
        )}
      </div>

      <div className="escrow-actions">
        <button className="btn-secondary btn-sm">
          <HiEye />
          <span>View Details</span>
        </button>
        {escrow.status === 'active' && isFreelancer && (
          <button className="btn-primary btn-sm" onClick={() => onSubmitWork(escrow.id)}>Submit Work</button>
        )}
        {escrow.status === 'pending' && (
          <Link to={`/dispute/${escrow.id}`} className="btn-outline btn-sm">
            Open Dispute
          </Link>
        )}
        {escrow.status === 'completed' && (
          <button className="btn-primary btn-sm">Leave Review</button>
        )}
      </div>
    </motion.div>
  );
};

export default MyEscrows;
