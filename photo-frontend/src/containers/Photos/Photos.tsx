import React, { useState } from 'react';
import { Typography, Grid, Snackbar, Alert, Card, CardMedia, CardActions, Button, Backdrop } from '@mui/material';
import PhotoItem from '@/components/Photo/PhotoItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetPhotosQuery } from '@/store/services/photos';
import { apiUrl } from '@/common/constants';
import { IPhoto } from '@/interfaces/IPhoto';

const Photos = () => {
  const { data: photos } = useGetPhotosQuery();
  const { user } = useAppSelector(state => state.auth);
  const [modalImage, setModalImage] = useState('')
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const openModal = async (photo: IPhoto) => {
    setOpen(true);
    setModalImage(photo.image)
  }

  return (
    <Grid sx={{ marginBottom: 5 }} container direction="column" spacing={2}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                alt="image"
                height="340"
                image={`${apiUrl}/uploads/${modalImage}`}
              />
            </Card>
          </Alert>
        </Snackbar>
      </Backdrop>

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
            authorId={user ? user._id : undefined}
            openModal={() => { openModal(photo) }}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Photos;
