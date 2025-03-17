// src/components/TradingInterface.js
import React, { useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const TradingInterface = ({ playerId }) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'players', playerId), (doc) => {
      console.log("Current price:", doc.data().price);
      // Update UI with real-time price
    });
    
    return () => unsubscribe();
  }, [playerId]);

  return (
    <div>
      <h3>Live Trading</h3>
      {/* Add trading form and charts */}
    </div>
  );
};
