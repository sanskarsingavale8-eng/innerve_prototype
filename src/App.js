import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyEscrows from './pages/MyEscrows';
import NewEscrow from './pages/NewEscrow';
import Earnings from './pages/Earnings';
import Profile from './pages/Profile';
import Dispute from './pages/Dispute';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const uid = params.get('uid');
      const email = params.get('email');
      const firstName = params.get('firstName');
      const lastName = params.get('lastName');
      const role = params.get('role');
      if (uid) {
        // merge into existing profile stored in localStorage
        const raw = localStorage.getItem('userProfile');
        const existing = raw ? JSON.parse(raw) : {};
        const merged = { ...existing, uid, email, firstName, lastName };
        if (role) merged.role = role;
        localStorage.setItem('userProfile', JSON.stringify(merged));
        // Also retain loggedInUserId for legacy logic
        localStorage.setItem('loggedInUserId', uid);
        // Remove query params from URL for cleanliness
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, document.title, url.toString());
      }
    } catch (e) {
      console.error('Error syncing user profile from URL params', e);
    }
    // If there's no user profile or loggedInUserId, redirect to the standalone login page
    try {
      const raw = localStorage.getItem('userProfile');
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      const isOnLoginSite = window.location.hostname === 'localhost' && (window.location.port === '5500');
      // If we have a uid but no stored profile, try fetching from Firestore REST API
      if (!raw && loggedInUserId && !isOnLoginSite) {
        try {
          const FIREBASE_PROJECT = 'login-webpage-b4c26';
          const FIREBASE_API_KEY = 'AIzaSyCx0xkyxX7TPrUtpkTnor0SiJPiFLweTuA';
          const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT}/databases/(default)/documents/users/${loggedInUserId}?key=${FIREBASE_API_KEY}`;
          fetch(url).then(async (res) => {
            if (!res.ok) return;
            const doc = await res.json();
            const fields = doc.fields || {};
            const profile = {};
            Object.keys(fields).forEach((k) => {
              const v = fields[k];
              if (v.stringValue !== undefined) profile[k] = v.stringValue;
              else if (v.integerValue !== undefined) profile[k] = Number(v.integerValue);
              else if (v.doubleValue !== undefined) profile[k] = Number(v.doubleValue);
              else if (v.booleanValue !== undefined) profile[k] = v.booleanValue;
              else if (v.mapValue && v.mapValue.fields) {
                // shallow map conversion
                const sub = {};
                Object.keys(v.mapValue.fields).forEach(sk => {
                  const sv = v.mapValue.fields[sk];
                  if (sv.stringValue !== undefined) sub[sk] = sv.stringValue;
                });
                profile[k] = sub;
              }
            });
            profile.uid = loggedInUserId;
            localStorage.setItem('userProfile', JSON.stringify(profile));
            // reload so components pick up the profile from localStorage
            window.location.reload();
          }).catch(() => {});
        } catch (e) {
          // ignore fetch errors and fall through to redirect logic below
          console.warn('Profile fetch failed', e);
        }
      }

      if (!raw && !loggedInUserId && !isOnLoginSite) {
        // redirect to login static site (ensure you start the static server on port 5500)
        window.location.href = 'http://localhost:5500/index.html';
      }
    } catch (e) {
      console.error('Error checking authentication state', e);
    }
  }, []);
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-escrows" element={<MyEscrows />} />
          <Route path="/new-escrow" element={<NewEscrow />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dispute/:id" element={<Dispute />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1B2E',
              color: '#fff',
              border: '1px solid #2D3748',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
