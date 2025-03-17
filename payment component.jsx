// src/components/Payment.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const PaymentInterface = () => {
  const [amount, setAmount] = useState('');

  const handleWithdrawal = async () => {
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount })
      });
      
      const data = await response.json();
      if(data.success) {
        alert('Withdrawal initiated successfully!');
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Withdrawal Portal
      </Typography>
      <TextField
        label="Amount (₹)"
        variant="outlined"
        fullWidth
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleWithdrawal}
        fullWidth
      >
        Withdraw to UPI
      </Button>
      
      {/* UPI ID Display */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Direct Transfer UPI ID:
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
          dkdeepkong55@axl
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentInterface;