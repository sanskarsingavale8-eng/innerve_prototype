import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { HiViewGrid, HiPlusCircle, HiTrendingUp, HiUser, HiMenu, HiX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [particles, setParticles] = useState([]);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const connectWallet = async () => {
    const loadingToast = toast.loading('Connecting wallet...');
    
    const burst = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 30) * Math.PI * 2,
      velocity: 2 + Math.random() * 3,
    }));
    setParticles(burst);
    
    setTimeout(() => {
      setWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f4a2c');
      setWalletConnected(true);
      toast.dismiss(loadingToast);
      toast.success('Wallet connected successfully!', {
        icon: '🎉',
        style: { borderRadius: '12px', background: '#1A1B2E', color: '#fff' },
      });
      setTimeout(() => setParticles([]), 2000);
    }, 1500);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem('userProfile');
      setUserProfile(raw ? JSON.parse(raw) : null);
    } catch (e) {
      setUserProfile(null);
    }
    const onStorage = (e) => {
      if (e.key === 'userProfile' || e.key === 'loggedInUserId') {
        try {
          const raw = localStorage.getItem('userProfile');
          setUserProfile(raw ? JSON.parse(raw) : null);
        } catch (err) {
          setUserProfile(null);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('loggedInUserId');
    window.location.reload();
  };

  const navItems = [
    { path: '/my-escrows', label: 'My Escrows', icon: HiViewGrid },
    { path: '/new-escrow', label: 'New Escrow', icon: HiPlusCircle },
    { path: '/earnings', label: 'Earnings', icon: HiTrendingUp },
    { path: '/profile', label: 'Profile', icon: HiUser },
  ];

  const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div className="scroll-progress-bar" style={{ scaleX }}>
          <motion.div 
            className="progress-glow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              style={{
                position: 'absolute',
                right: '20%',
                top: '50%',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06F3FF, #7C3AED)',
                boxShadow: '0 0 20px rgba(6, 243, 255, 0.8)',
                pointerEvents: 'none',
              }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: Math.cos(particle.angle) * particle.velocity * 100,
                y: Math.sin(particle.angle) * particle.velocity * 100,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
        
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <motion.div 
              className="brand-logo-container"
              whileHover={{ 
                scale: 1.15,
              }}
              transition={{ duration: 0.3, type: 'spring' }}
            >
              <motion.img
                src="/logo.png"
                alt="TrustVault"
                className="brand-logo"
                animate={{
                  filter: [
                    'drop-shadow(0 0 15px rgba(124, 58, 237, 0.8)) drop-shadow(0 0 25px rgba(6, 243, 255, 0.6))',
                    'drop-shadow(0 0 25px rgba(6, 243, 255, 0.8)) drop-shadow(0 0 35px rgba(124, 58, 237, 0.6))',
                    'drop-shadow(0 0 15px rgba(124, 58, 237, 0.8)) drop-shadow(0 0 25px rgba(6, 243, 255, 0.6))',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <motion.span 
              className="brand-name"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="trust-text"
                animate={{
                  color: ['#06F3FF', '#7C3AED', '#06F3FF'],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Trust
              </motion.span>
              <motion.span
                className="vault-text"
                animate={{
                  color: ['#7C3AED', '#06F3FF', '#7C3AED'],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Vault
              </motion.span>
            </motion.span>
          </Link>

          <div className="navbar-links">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div 
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                >
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      animate={isActive ? { 
                        y: [0, -3, 0],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ 
                        y: { duration: 0.6, repeat: Infinity, repeatType: 'reverse' },
                        rotate: { duration: 0.5 }
                      }}
                    >
                      <Icon className="nav-icon" />
                    </motion.div>
                    <span>{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        className="active-underline"
                        layoutId="underline"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="navbar-actions">
            {userProfile ? (
              <div className="user-badge"> 
                <Link to="/profile" className="user-link">
                  <div className="avatar">
                    {(userProfile.firstName || userProfile.lastName)
                      ? `${(userProfile.firstName||'').charAt(0)}${(userProfile.lastName||'').charAt(0)}`.toUpperCase()
                      : (userProfile.email ? userProfile.email.charAt(0).toUpperCase() : 'U')}
                  </div>
                  <span className="user-name">{userProfile.firstName ? `${userProfile.firstName} ${userProfile.lastName||''}`.trim() : userProfile.email}</span>
                </Link>
                <button className="btn-ghost signout-btn" onClick={handleSignOut}>Sign Out</button>
              </div>
            ) : (
              <button className="btn-primary" onClick={() => { window.location.href = 'http://localhost:5500/index.html'; }}>
                Sign In
              </button>
            )}

            {walletConnected ? (
              <motion.button 
                className="wallet-connected"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <motion.div 
                  className="wallet-status-dot"
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(16, 185, 129, 0.7)',
                      '0 0 0 10px rgba(16, 185, 129, 0)',
                      '0 0 0 0 rgba(16, 185, 129, 0)',
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {formatAddress(walletAddress)}
                </motion.span>
              </motion.button>
            ) : (
              <motion.button 
                className="btn-connect-wallet"
                onClick={connectWallet}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 50px rgba(6, 243, 255, 0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(6, 243, 255, 0.3)',
                    '0 0 30px rgba(6, 243, 255, 0.5)',
                    '0 0 20px rgba(6, 243, 255, 0.3)',
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <motion.svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 18 18" 
                  fill="none"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <motion.path 
                    d="M13 9.5H14" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.svg>
                <span>Connect Wallet</span>
              </motion.button>
            )}

            <motion.button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <HiX /> : <HiMenu />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="mobile-menu-content">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon />
                        </motion.div>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
