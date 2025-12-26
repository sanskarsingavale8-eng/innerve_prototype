import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  HiArrowLeft, HiSparkles, HiUpload, HiInformationCircle,
  HiExclamation, HiUserGroup, HiShieldCheck, HiCheckCircle 
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import './Dispute.css';

const Dispute = () => {
  const { id } = useParams();
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDetails, setDisputeDetails] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const escrowInfo = {
    title: 'Mobile App UI/UX Design',
    escrowId: '#ESC-2024-002',
    amount: 3200,
    aiScore: 75,
    submitted: 'Jan 20, 2024',
  };

  const handleSubmitDispute = async () => {
    if (!disputeReason || !disputeDetails) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Submitting to AI Mediator...');
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    toast.dismiss(loadingToast);
    toast.success('Dispute submitted successfully!', {
      icon: '⚖️',
      duration: 4000,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="dispute-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <Link to="/my-escrows" className="back-link">
              <HiArrowLeft />
              <span>Back to Escrows</span>
            </Link>
            <h1>Dispute Resolution</h1>
            <p>Fair, transparent resolution powered by AI and decentralized arbitration</p>
          </div>
        </motion.div>

        {/* Escrow Info */}
        <motion.div
          className="dispute-escrow-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="info-card">
            <h3>{escrowInfo.title}</h3>
            <div className="info-meta">
              <span className="escrow-id">{escrowInfo.escrowId}</span>
              <span className="badge badge-warning">In Dispute</span>
            </div>
            <div className="info-details">
              <div className="detail-row">
                <span>Amount in Escrow:</span>
                <strong>${escrowInfo.amount.toLocaleString()} USDC</strong>
              </div>
              <div className="detail-row">
                <span>AI Completion Score:</span>
                <strong>{escrowInfo.aiScore}%</strong>
              </div>
              <div className="detail-row">
                <span>Submitted:</span>
                <strong>{escrowInfo.submitted}</strong>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resolution Levels */}
        <div className="resolution-levels">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Two-Level Dispute Resolution System
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            We handle 99% of disputes at Level 1 with AI. Only complex cases escalate to human arbitration.
          </motion.p>

          {/* Level 1: AI Resolution */}
          <motion.div
            className="level-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="level-header">
              <div className="level-badge level-1">
                <div className="level-number">1</div>
                <div>
                  <h3>AI-Powered Resolution</h3>
                  <p>Fast, objective, and free dispute mediation</p>
                </div>
              </div>
              <span className="badge badge-success">
                <HiCheckCircle />
                Current Stage
              </span>
            </div>

            <div className="level-content">
              <div className="how-it-works-section">
                <h4>How AI Resolution Works</h4>
                <div className="steps-horizontal">
                  <div className="step-h">
                    <div className="step-h-icon">
                      <HiShieldCheck />
                    </div>
                    <strong>1. Deep Analysis</strong>
                    <p>AI re-analyzes deliverables, contract terms, and communication history</p>
                  </div>

                  <div className="step-h">
                    <div className="step-h-icon">
                      <HiUpload />
                    </div>
                    <strong>2. Evidence Review</strong>
                    <p>Both parties submit evidence and arguments</p>
                  </div>

                  <div className="step-h">
                    <div className="step-h-icon">
                      <HiSparkles />
                    </div>
                    <strong>3. Final Decision</strong>
                    <p>AI generates binding verdict with detailed reasoning</p>
                  </div>
                </div>
              </div>

              <div className="dispute-form-section">
                <h4>Submit Your Case to AI Mediator</h4>
                
                <div className="form-group">
                  <label>What is your dispute about? *</label>
                  <select value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)}>
                    <option value="">Select reason</option>
                    <option value="incomplete">Work is incomplete</option>
                    <option value="quality">Quality doesn't meet requirements</option>
                    <option value="different">Deliverable is different than agreed</option>
                    <option value="deadline">Missed deadline without communication</option>
                    <option value="payment">Payment calculation dispute</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Detailed Explanation *</label>
                  <textarea
                    rows="5"
                    value={disputeDetails}
                    onChange={(e) => setDisputeDetails(e.target.value)}
                    placeholder="Explain your dispute clearly. Be specific about what was promised vs. what was delivered..."
                  />
                </div>

                <div className="form-group">
                  <label>Evidence (Screenshots, Files, Links)</label>
                  <div className="file-upload-area">
                    <HiUpload />
                    <p>Drag & drop files here or click to browse</p>
                    <small>Supported: Images, PDFs, Documents (Max 10MB each)</small>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Proposed Solution</label>
                  <textarea
                    rows="3"
                    value={proposedSolution}
                    onChange={(e) => setProposedSolution(e.target.value)}
                    placeholder="What outcome are you seeking? (e.g., Full refund, Partial payment, Revision request)"
                  />
                </div>

                <div className="info-box info-primary">
                  <HiInformationCircle />
                  <div>
                    <strong>AI Mediation is Free & Fast</strong>
                    <p>Average resolution time: 2-6 hours. No fees charged. AI decision is binding unless you escalate to Level 2.</p>
                  </div>
                </div>

                <motion.button 
                  className="btn-primary btn-large" 
                  onClick={handleSubmitDispute}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <HiSparkles />
                      </motion.div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <HiSparkles />
                      <span>Submit to AI Mediator</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Level 2: Kleros */}
          <motion.div
            className="level-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="level-header">
              <div className="level-badge level-2">
                <div className="level-number">2</div>
                <div>
                  <h3>Kleros Decentralized Court</h3>
                  <p>Human arbitration for complex or disputed cases</p>
                </div>
              </div>
              <span className="badge badge-secondary">Escalation Option</span>
            </div>

            <div className="level-content">
              <div className="info-box info-warning">
                <HiExclamation />
                <div>
                  <strong>When to Escalate to Level 2</strong>
                  <p>Only if you strongly disagree with AI decision. Level 2 involves fees and takes 3-7 days.</p>
                </div>
              </div>

              <div className="how-it-works-section">
                <h4>How Kleros Arbitration Works</h4>
                <div className="kleros-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <HiUserGroup />
                    </div>
                    <div>
                      <strong>Random Juror Selection</strong>
                      <p>Cryptographically random jurors from Kleros network are assigned</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <HiCheckCircle />
                    </div>
                    <div>
                      <strong>Evidence Review & Voting</strong>
                      <p>Jurors independently review evidence and vote on the outcome</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <HiShieldCheck />
                    </div>
                    <div>
                      <strong>Transparent On-Chain</strong>
                      <p>All votes and decisions are recorded on blockchain</p>
                    </div>
                  </div>

                  <div className="feature-item">
                    <div className="feature-icon">
                      <HiSparkles />
                    </div>
                    <div>
                      <strong>Final & Binding</strong>
                      <p>Majority decision is enforced automatically by smart contract</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="kleros-pricing">
                <h4>Arbitration Fees</h4>
                <div className="pricing-card">
                  <div className="pricing-row">
                    <span>Arbitration Fee:</span>
                    <strong>$150 USDC</strong>
                  </div>
                  <div className="pricing-row">
                    <span>Paid by:</span>
                    <strong>Dispute initiator (refunded if you win)</strong>
                  </div>
                  <div className="pricing-row">
                    <span>Expected Resolution:</span>
                    <strong>3-7 days</strong>
                  </div>
                  <div className="pricing-row">
                    <span>Number of Jurors:</span>
                    <strong>3-7 (based on case complexity)</strong>
                  </div>
                </div>
              </div>

              <div className="info-box info-secondary">
                <HiInformationCircle />
                <div>
                  <strong>Fair & Decentralized</strong>
                  <p>Kleros uses blockchain and game theory to ensure fair, tamper-proof arbitration. Learn more at <a href="https://kleros.io" target="_blank" rel="noopener noreferrer" className="link">kleros.io</a></p>
                </div>
              </div>

              <button className="btn-outline btn-large" disabled>
                Escalate to Kleros Court
                <small>(Available after AI decision)</small>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dispute;
