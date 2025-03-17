// server.js
const express = require('express');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

// Match Data Route
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/cricket/v1/matches?key=AIzaSyAu0AGOo3e52FkhAef6ZlvkbNSrFQgJp1I`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// User Trading Route
app.post('/api/trade', async (req, res) => {
  const { userId, playerId, action, quantity } = req.body;
  
  // Add trading logic with Firestore
  const tradeRef = admin.firestore().collection('trades').doc();
  await tradeRef.set({
    userId,
    playerId,
    action,
    quantity,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });
  
  res.status(200).json({ message: 'Trade executed' });
});

// Admin Dashboard Route
app.get('/admin/analytics', async (req, res) => {
  // Verify admin role
  const token = req.headers.authorization.split(' ')[1];
  const decoded = await admin.auth().verifyIdToken(token);
  
  if(decoded.role !== 'admin') {
    return res.status(403).send('Unauthorized');
  }

  // Fetch analytics data
  const snapshot = await admin.firestore().collection('trades').get();
  // Add analytics processing logic
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));