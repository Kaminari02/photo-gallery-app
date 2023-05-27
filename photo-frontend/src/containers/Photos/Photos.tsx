import React, { useState } from 'react';
import { Typography, Grid, Snackbar, Alert } from '@mui/material';
import PhotoItem from '@/components/Photo/PhotoItem';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks';
import { useGetPhotosQuery, useGetPhotoByIdQuery } from '@/store/services/photos';
import { setPhotoData } from '@/store/features/contactSlice';

const Photos = () => {
  const dispatch = useAppDispatch();
  const { data: photos } = useGetPhotosQuery();
  const { user } = useAppSelector(state => state.auth);
  const { photo } = useAppSelector(state => state.photo)
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const openModal = (id: string) => {
    setOpen(true);
    const index = photos && photos.findIndex(item => item._id === id);
    if (photos && index) {
      const photo = { ...photos[index] }
      dispatch(setPhotoData(photo))
    }
  }

  return (
    <Grid sx={{ marginBottom: 5 }} container direction="column" spacing={2}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>

        </Alert>
      </Snackbar>
      <Grid item container direction="row">
        <Grid item>
          <Typography variant="h4">
            Palais du Louvre
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        {photos && photos.map(photo => (
          <PhotoItem
            key={photo._id}
            _id={photo._id}
            title={photo.title}
            image={photo.image}
            author={photo.author}
            authorId={user._id}
            openModal={() => {openModal(photo._id) }}
            deletePhoto={() => { }}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Photos;
