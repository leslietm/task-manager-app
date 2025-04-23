import React from 'react';
import { Grid, Paper } from '@mui/material';

export default function RandomGrid() {
  const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>{item}</Paper>
        </Grid>
      ))}
    </Grid>
  );
}