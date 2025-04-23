import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, toggleViewed } from '../redux/imagesSlice';
import { Button, Grid, Card, CardMedia, CardActions } from '@mui/material';

export default function Gallery() {
  const dispatch = useDispatch();
  const { data, viewed, status, error } = useSelector(state => state.images);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const filtered = data.filter(img =>
    filter === 'viewed' ? viewed[img.id] :
    filter === 'unviewed' ? !viewed[img.id] :
    true
  );

  return (
    <>
      <div style={{ margin: '10px' }}>
        <Button onClick={() => setFilter('all')}>Todos</Button>
        <Button onClick={() => setFilter('viewed')}>Vistos</Button>
        <Button onClick={() => setFilter('unviewed')}>No vistos</Button>
      </div>
      <Grid container spacing={2}>
        {filtered.map(img => (
          <Grid item xs={12} sm={6} md={3} key={img.id}>
            <Card>
              <CardMedia component="img" image={img.thumbnailUrl} alt={img.title} />
              <CardActions>
                <Button onClick={() => dispatch(toggleViewed(img.id))}>
                  {viewed[img.id] ? 'Marcar como no visto' : 'Marcar como visto'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
