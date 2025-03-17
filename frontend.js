// src/components/MatchDashboard.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MatchDashboard = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        setMatches(data.items);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    
    fetchMatches();
    const interval = setInterval(fetchMatches, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {matches.map(match => (
        <Card key={match.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {match.team1} vs {match.team2}
            </Typography>
            <Typography>Status: {match.status}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MatchDashboard;