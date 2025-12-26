// Utility Helper Functions

export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatCurrency = (amount, currency = 'USDC') => {
  return `$${amount.toLocaleString()} ${currency}`;
};

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(date);
};

export const getStatusColor = (status) => {
  const colors = {
    active: 'primary',
    pending: 'warning',
    completed: 'success',
    disputed: 'error',
  };
  return colors[status] || 'primary';
};

export const calculateProgress = (current, total) => {
  if (!total) return 0;
  return Math.round((current / total) * 100);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const validateEthereumAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
