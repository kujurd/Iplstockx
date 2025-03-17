// src/components/AdminDashboard.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const AdminDashboard = ({ data }) => {
  const columns = [
    { field: 'userId', headerName: 'User', width: 200 },
    { field: 'totalBets', headerName: 'Total Bets', width: 150 },
    { field: 'profitLoss', headerName: 'P&L', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};