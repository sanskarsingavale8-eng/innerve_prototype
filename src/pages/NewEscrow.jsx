import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiCheckCircle, HiArrowRight, HiArrowLeft, HiPlus, 
  HiTrash, HiInformationCircle, HiSparkles 
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import './NewEscrow.css';

const NewEscrow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    category: '',
    deadline: '',
    freelancerAddress: '',
    milestones: [{ title: '', description: '', amount: '', date: '' }],
    autoRelease: true,
    disputeWindow: 7,
    verificationOptions: {
      qualityCheck: true,
      completeness: true,
      plagiarism: false,
      performance: false,
    },
  });

  const steps = [
    { number: 1, title: 'Project Details', icon: HiInformationCircle },
    { number: 2, title: 'Milestones', icon: HiCheckCircle },
    { number: 3, title: 'Terms & Deposit', icon: HiSparkles },
    { number: 4, title: 'Review', icon: HiCheckCircle },
  ];

  const categories = [
    'Design & Creative',
    'Development & IT',
    'Writing & Content',
    'Marketing & Sales',
    'Video & Animation',
    'Other',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index][field] = value;
    setFormData(prev => ({ ...prev, milestones: newMilestones }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', description: '', amount: '', date: '' }],
    }));
  };

  const removeMilestone = (index) => {
    if (formData.milestones.length > 1) {
      setFormData(prev => ({
        ...prev,
        milestones: prev.milestones.filter((_, i) => i !== index),
      }));
    }
  };

  const getTotalAmount = () => {
    return formData.milestones.reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.projectTitle && formData.projectDescription && 
               formData.category && formData.deadline && formData.freelancerAddress;
      case 2:
        return formData.milestones.every(m => m.title && m.description && m.amount && m.date);
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const loadingToast = toast.loading('Creating escrow contract...');
    try {
      // simulate contract creation delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // build escrow object to persist locally
      const id = Date.now();
      const totalAmount = getTotalAmount();
      const escrowObj = {
        id,
        title: formData.projectTitle || 'Untitled Project',
        escrowId: `#ESC-${new Date().getFullYear()}-${String(id).slice(-6)}`,
        status: 'active',
        amount: totalAmount,
        progress: 0,
        milestone: `0 of ${formData.milestones.length}`,
        freelancer: formData.freelancerAddress || '',
        deadline: formData.deadline ? new Date(formData.deadline).toLocaleDateString() : '',
        createdAt: new Date().toISOString(),
        milestones: formData.milestones,
      };

      // read existing escrows and append
      try {
        const raw = localStorage.getItem('escrows');
        const existing = raw ? JSON.parse(raw) : [];
        existing.unshift(escrowObj);
        localStorage.setItem('escrows', JSON.stringify(existing));
      } catch (e) {
        console.warn('Failed to persist escrow to localStorage', e);
      }

      toast.dismiss(loadingToast);
      toast.success('Escrow created successfully!', { icon: '🎉', duration: 2000 });
      setTimeout(() => navigate('/my-escrows'), 700);
    } catch (e) {
      toast.dismiss(loadingToast);
      toast.error('Failed to create escrow');
      console.error(e);
    }
  };

  return (
    <div className="new-escrow-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Create New Escrow</h1>
          <p>Set up a secure, AI-verified escrow contract for your project</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step) => (
            <React.Fragment key={step.number}>
              <motion.div
                className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.number * 0.1 }}
              >
                <div className="step-circle">
                  {currentStep > step.number ? (
                    <HiCheckCircle />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span className="step-label">{step.title}</span>
              </motion.div>
              {step.number < 4 && <div className="step-connector" />}
            </React.Fragment>
          ))}
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="form-container"
          >
            {currentStep === 1 && <Step1 formData={formData} handleInputChange={handleInputChange} categories={categories} />}
            {currentStep === 2 && <Step2 formData={formData} handleMilestoneChange={handleMilestoneChange} addMilestone={addMilestone} removeMilestone={removeMilestone} getTotalAmount={getTotalAmount} />}
            {currentStep === 3 && <Step3 formData={formData} handleInputChange={handleInputChange} />}
            {currentStep === 4 && <Step4 formData={formData} getTotalAmount={getTotalAmount} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button className="btn-secondary btn-nav" onClick={prevStep}>
              <HiArrowLeft />
              <span>Back</span>
            </button>
          )}
          {currentStep < 4 ? (
            <button className="btn-primary btn-nav ml-auto" onClick={nextStep}>
              <span>Continue</span>
              <HiArrowRight />
            </button>
          ) : (
            <button className="btn-primary btn-nav btn-large ml-auto" onClick={handleSubmit}>
              <HiSparkles />
              <span>Create Escrow & Deposit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Step 1: Project Details
const Step1 = ({ formData, handleInputChange, categories }) => {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <div className="form-step">
      <div className="form-card">
        <h2>Project Information</h2>
        
        <motion.div 
          className="form-group"
          animate={focusedField === 'title' ? { scale: 1.01 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <label>Project Title *</label>
          <input
            type="text"
            value={formData.projectTitle}
            onChange={(e) => handleInputChange('projectTitle', e.target.value)}
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)}
            placeholder="e.g., Logo Design for Tech Startup"
          />
        </motion.div>

        <motion.div 
          className="form-group"
          animate={focusedField === 'description' ? { scale: 1.01 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <label>Project Description *</label>
          <textarea
            rows="5"
            value={formData.projectDescription}
            onChange={(e) => handleInputChange('projectDescription', e.target.value)}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
            placeholder="Describe the project scope, deliverables, and requirements..."
          />
        </motion.div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Project Deadline *</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Freelancer Wallet Address *</label>
          <input
            type="text"
            value={formData.freelancerAddress}
            onChange={(e) => handleInputChange('freelancerAddress', e.target.value)}
            placeholder="0x..."
            className="mono-input"
          />
          <small>Enter the Ethereum address of the freelancer who will complete this work</small>
        </div>
      </div>
    </div>
  );
};

// Step 2: Milestones
const Step2 = ({ formData, handleMilestoneChange, addMilestone, removeMilestone, getTotalAmount }) => (
  <div className="form-step">
    <div className="form-card">
      <h2>Project Milestones</h2>
      <p className="form-subtitle">Break down your project into measurable milestones</p>

      <div className="milestones-container">
        {formData.milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="milestone-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="milestone-header">
              <h3>Milestone {index + 1}</h3>
              {formData.milestones.length > 1 && (
                <button
                  type="button"
                  className="btn-icon-danger"
                  onClick={() => removeMilestone(index)}
                >
                  <HiTrash />
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Milestone Title *</label>
              <input
                type="text"
                value={milestone.title}
                onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                placeholder="e.g., Initial Design Concepts"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                rows="3"
                value={milestone.description}
                onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                placeholder="What should be delivered in this milestone?"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Amount (USDC) *</label>
                <input
                  type="number"
                  value={milestone.amount}
                  onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
                  placeholder="500"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Expected Date *</label>
                <input
                  type="date"
                  value={milestone.date}
                  onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button type="button" className="btn-add-milestone" onClick={addMilestone}>
        <HiPlus />
        <span>Add Another Milestone</span>
      </button>

      <div className="total-amount">
        <span>Total Project Amount:</span>
        <span className="amount">${getTotalAmount().toLocaleString()} USDC</span>
      </div>
    </div>
  </div>
);

// Step 3: Terms & Deposit
const Step3 = ({ formData, handleInputChange }) => (
  <div className="form-step">
    <div className="form-card">
      <h2>Escrow Terms</h2>
      
      <div className="info-box info-primary">
        <HiInformationCircle />
        <div>
          <strong>How AI Verification Works</strong>
          <p>Our AI oracle will analyze deliverables and assign a completion score (0-100%). Payment is automatically calculated: <code style={{ background: 'rgba(6, 243, 255, 0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>payout = amount × (score/100)</code></p>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.autoRelease}
            onChange={(e) => handleInputChange('autoRelease', e.target.checked)}
          />
          <span>Enable Automatic Release on AI Approval</span>
        </label>
        <small style={{ marginLeft: '32px', display: 'block', marginTop: '8px' }}>If AI scores ≥90%, funds are released immediately. Otherwise, manual review required.</small>
      </div>

      <div className="form-group">
        <label>Dispute Window (days)</label>
        <select
          value={formData.disputeWindow}
          onChange={(e) => handleInputChange('disputeWindow', e.target.value)}
        >
          <option value="3">3 days</option>
          <option value="7">7 days (Recommended)</option>
          <option value="14">14 days</option>
        </select>
        <small>Time window for raising disputes after AI verification</small>
      </div>

      <div className="form-group">
        <label>AI Verification Requirements</label>
        <div className="checkbox-group">
          {Object.entries(formData.verificationOptions).map(([key, value]) => (
            <label key={key} className="checkbox-label">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleInputChange('verificationOptions', {
                  ...formData.verificationOptions,
                  [key]: e.target.checked
                })}
              />
              <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="info-box info-warning">
        <HiInformationCircle />
        <div>
          <strong>Important</strong>
          <p>Funds will be locked in a smart contract. Neither you nor the freelancer can access them without proper verification.</p>
        </div>
      </div>
    </div>
  </div>
);

// Step 4: Review
const Step4 = ({ formData, getTotalAmount }) => {
  const platformFee = getTotalAmount() * 0.02;
  const totalPay = getTotalAmount() + platformFee;

  return (
    <div className="form-step">
      <div className="form-card">
        <h2>Review & Confirm</h2>
        
        <div className="review-section">
          <h3>Project Details</h3>
          <div className="review-grid">
            <div className="review-item">
              <span>Title:</span>
              <strong>{formData.projectTitle}</strong>
            </div>
            <div className="review-item">
              <span>Category:</span>
              <strong>{formData.category}</strong>
            </div>
            <div className="review-item">
              <span>Deadline:</span>
              <strong>{new Date(formData.deadline).toLocaleDateString()}</strong>
            </div>
            <div className="review-item">
              <span>Freelancer:</span>
              <strong className="mono">{formData.freelancerAddress?.slice(0, 10)}...{formData.freelancerAddress?.slice(-8)}</strong>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3>Milestones ({formData.milestones.length})</h3>
          {formData.milestones.map((milestone, index) => (
            <div key={index} className="milestone-review">
              <div className="milestone-review-header">
                <strong>Milestone {index + 1}: {milestone.title}</strong>
                <span className="milestone-amount">${parseFloat(milestone.amount).toLocaleString()} USDC</span>
              </div>
              <p>Expected: {new Date(milestone.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        <div className="review-section">
          <h3>Payment Summary</h3>
          <div className="payment-summary">
            <div className="payment-row">
              <span>Total Amount:</span>
              <span>${getTotalAmount().toLocaleString()} USDC</span>
            </div>
            <div className="payment-row">
              <span>Platform Fee (2%):</span>
              <span>${platformFee.toLocaleString()} USDC</span>
            </div>
            <div className="payment-row total">
              <span>You Pay:</span>
              <span className="gradient-text">${totalPay.toLocaleString()} USDC</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input type="checkbox" required />
            <span>I agree to the Terms of Service and understand that funds will be locked in a smart contract</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewEscrow;
