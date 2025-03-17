// Withdrawal processing with UPI ID
app.post('/api/withdraw', async (req, res) => {
  const { userId, amount } = req.body;
  
  // Payment configuration
  const paymentData = {
    upiId: 'dkdeepkong55@axl', // Your UPI ID
    amount: amount,
    currency: 'INR',
    note: 'IPL StockX Withdrawal'
  };

  // Integrate with UPI SDK or Payment Gateway
  try {
    // Here you would integrate with actual UPI API
    const paymentResult = await processUPIPayment(paymentData);
    
    // Record transaction in Firestore
    await admin.firestore().collection('transactions').add({
      userId,
      amount,
      type: 'withdrawal',
      status: 'processed',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({ success: true, message: 'Withdrawal initiated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Withdrawal failed' });
  }
});