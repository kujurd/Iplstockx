// Razorpay Integration
const initializeRazorpay = async (amount) => {
  const options = {
    key: 'RAZORPAY_KEY',
    amount: amount * 100,
    currency: 'INR',
    name: 'IPL StockX',
    handler: async (response) => {
      // Handle payment success
    }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};