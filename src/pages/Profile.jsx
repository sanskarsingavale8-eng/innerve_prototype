import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiUser, HiMail, HiGlobe, HiLocationMarker, 
  HiPlus, HiX, HiBell, HiShieldCheck, HiDownload,
  HiLogout, HiTrash
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const [skills, setSkills] = useState([
    'Smart Contracts', 'Solidity', 'Web3.js', 'React', 'Node.js', 'DeFi'
  ]);
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('userProfile');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [newSkill, setNewSkill] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    payment: true,
    aiVerification: true,
    disputes: true,
    marketing: false,
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      toast.success('Skill added successfully', {
        icon: '✨',
        duration: 2000,
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    toast.success('Skill removed', {
      icon: '🗑️',
      duration: 2000,
    });
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    const loadingToast = toast.loading('Saving changes...');
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Profile updated successfully!');
    }, 1500);
  };

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Profile Settings</h1>
          <p>Manage your account and preferences</p>
        </motion.div>

        <div className="profile-grid">
          {/* Sidebar */}
          <motion.div
            className="profile-sidebar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="profile-avatar-section">
              <motion.div 
                className="profile-avatar-large"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                JD
              </motion.div>
              <button className="btn-secondary btn-sm">Change Avatar</button>
            </div>

            <div className="profile-stats-card">
              <div className="profile-stat">
                <strong>23</strong>
                <span>Projects Completed</span>
              </div>
              <div className="profile-stat">
                <strong>98.5%</strong>
                <span>Success Rate</span>
              </div>
              <div className="profile-stat">
                <strong>4.9/5.0</strong>
                <span>Rating</span>
              </div>
            </div>

            <div className="wallet-info-card">
              <h4>Connected Wallet</h4>
              <div className="wallet-address-box">
                <span className="mono">0x742d35Cc...95f4a2c</span>
                <button className="btn-icon" onClick={() => {
                  navigator.clipboard.writeText('0x742d35Cc6634C0532925a3b844Bc9e7595f4a2c');
                  toast.success('Address copied!');
                }}>
                  <HiDownload />
                </button>
              </div>
              <button className="btn-outline btn-sm mt-3">
                <HiLogout />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="profile-content">
            {/* Personal Information */}
            <motion.div
              className="profile-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Personal Information</h3>
              
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  defaultValue={userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName || ''}` : 'John Doe'}
                  placeholder="Your name"
                  onChange={(e) => setUserProfile(prev => ({ ...(prev||{}), displayName: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  rows="4"
                  defaultValue={userProfile?.bio || 'Full-stack developer specializing in blockchain and Web3 applications. 5+ years of experience in smart contract development and DeFi protocols.'}
                  placeholder="Tell us about yourself..."
                  onChange={(e) => setUserProfile(prev => ({ ...(prev||{}), bio: e.target.value }))}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-with-icon">
                    <HiMail />
                    <input
                      type="email"
                      defaultValue={userProfile?.email || 'john.doe@example.com'}
                      placeholder="your@email.com"
                      onChange={(e) => setUserProfile(prev => ({ ...(prev||{}), email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Twitter Handle</label>
                  <div className="input-with-icon">
                    <span className="icon-text">@</span>
                    <input
                      type="text"
                      defaultValue={userProfile?.twitter || 'johndoe'}
                      placeholder="username"
                      onChange={(e) => setUserProfile(prev => ({ ...(prev||{}), twitter: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Website</label>
                  <div className="input-with-icon">
                    <HiGlobe />
                    <input
                      type="url"
                      defaultValue={userProfile?.website || 'https://johndoe.dev'}
                      placeholder="https://yourwebsite.com"
                      onChange={(e) => setUserProfile(prev => ({ ...(prev||{}), website: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <div className="input-with-icon">
                    <HiLocationMarker />
                    <input
                      type="text"
                      defaultValue={userProfile?.location || 'San Francisco, CA'}
                      placeholder="City, Country"
                      onChange={(e) => setUserProfile(prev => ({ ...(prev||{}), location: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <button className="btn-primary" onClick={() => {
                // Save to localStorage
                const toSave = {
                  ...userProfile,
                  displayName: userProfile?.displayName || `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`.trim(),
                };
                localStorage.setItem('userProfile', JSON.stringify(toSave));
                setUserProfile(toSave);
                handleSave();
              }}>
                Save Changes
              </button>
            </motion.div>

            {/* Skills & Expertise */}
            <motion.div
              className="profile-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Skills & Expertise</h3>
              
              <div className="skills-container">
                <AnimatePresence mode="popLayout">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      layout
                    >
                      <span>{skill}</span>
                      <motion.button 
                        onClick={() => removeSkill(skill)}
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiX />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="form-group">
                <label>Add Skill</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Type a skill..."
                  />
                  <button className="btn-primary btn-sm" onClick={addSkill}>
                    <HiPlus />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              className="profile-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Notification Preferences</h3>
              
              <div className="notification-options">
                <NotificationToggle
                  icon={<HiMail />}
                  title="Email Notifications"
                  description="Receive updates about your escrows via email"
                  checked={notifications.email}
                  onChange={() => handleNotificationToggle('email')}
                />
                <NotificationToggle
                  icon={<HiBell />}
                  title="Payment Alerts"
                  description="Get notified when payments are received"
                  checked={notifications.payment}
                  onChange={() => handleNotificationToggle('payment')}
                />
                <NotificationToggle
                  icon={<HiShieldCheck />}
                  title="AI Verification Updates"
                  description="Receive updates when AI completes verification"
                  checked={notifications.aiVerification}
                  onChange={() => handleNotificationToggle('aiVerification')}
                />
                <NotificationToggle
                  icon={<HiBell />}
                  title="Dispute Notifications"
                  description="Alert when disputes are opened or resolved"
                  checked={notifications.disputes}
                  onChange={() => handleNotificationToggle('disputes')}
                />
                <NotificationToggle
                  icon={<HiMail />}
                  title="Marketing Communications"
                  description="Receive news and updates about EscrowAI"
                  checked={notifications.marketing}
                  onChange={() => handleNotificationToggle('marketing')}
                />
              </div>
            </motion.div>

            {/* Security */}
            <motion.div
              className="profile-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3>Security</h3>
              
              <div className="security-options">
                <div className="security-item">
                  <div>
                    <strong>Two-Factor Authentication</strong>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <button className="btn-outline btn-sm">Enable 2FA</button>
                </div>

                <div className="security-item">
                  <div>
                    <strong>Session Management</strong>
                    <p>View and manage your active sessions</p>
                  </div>
                  <button className="btn-outline btn-sm">Manage Sessions</button>
                </div>

                <div className="security-item">
                  <div>
                    <strong>Export Data</strong>
                    <p>Download all your data from EscrowAI</p>
                  </div>
                  <button className="btn-outline btn-sm">
                    <HiDownload />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              className="profile-section danger-zone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3>Danger Zone</h3>
              
              <div className="danger-item">
                <div>
                  <strong>Delete Account</strong>
                  <p>Permanently delete your account and all data. This action cannot be undone.</p>
                </div>
                <button className="btn-danger">
                  <HiTrash />
                  <span>Delete Account</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationToggle = ({ icon, title, description, checked, onChange }) => (
  <div className="notification-item">
    <div className="notification-info">
      <div className="notification-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-slider"></span>
    </label>
  </div>
);

export default Profile;
