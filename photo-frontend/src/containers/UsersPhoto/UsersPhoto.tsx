import React, { useState } from 'react';
import { Typography, Grid, Snackbar, Alert, Card, CardMedia, Backdrop, Button } from '@mui/material';
import PhotoItem from '@/components/Photo/PhotoItem';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetUsersPhotosQuery } from '@/store/services/user';
import { useDeletePhotoMutation } from '@/store/services/photos';
import { apiUrl } from '@/common/constants';
import { IPhoto } from '@/interfaces/IPhoto';
import { Link, useParams } from 'react-router-dom';

const UserPhoto = () => {
    const { id } = useParams()
    const { data: photos } = useGetUsersPhotosQuery(id);
    const { user } = useAppSelector(state => state.auth);
    const [modalImage, setModalImage] = useState('')
    const [open, setOpen] = useState(false);
    const [deletePhoto] = useDeletePhotoMutation();
    const handleDelete = async (id: string): Promise<void> => {
        await deletePhoto(id)
    }

    const handleClose = () => {
        setOpen(false);
    }
    const openModal = async (photo: IPhoto) => {
        setOpen(true);
        setModalImage(photo.image)
    }

    return (
        <Grid sx={{ marginBottom: 5 }} container direction="column" spacing={2}>
            <>
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
                                height="440"
                                image={`${apiUrl}/uploads/${modalImage}`}
                            />
                        </Card>
                    </Alert>
                </Snackbar>
            </Backdrop>

            <Grid item container direction="row" justifyContent='space-between'>
                <Grid item>
                    <Typography variant="h4">
                        {photos && photos.length > 0 ? `${ photos[0].author.username}'s PhotoGallery` : null}
                    </Typography>
                </Grid>
                {user ?
                    user._id === id ?
                        <Grid item>
                            <Button color="primary" component={Link} to={"/photos/new"}>
                                Add new photo
                            </Button>
                        </Grid>
                        : null
                    : null
                }
            </Grid>
            {photos && photos.length === 0 ? <Grid xs item><Typography variant="h3" gutterBottom>No Photos yet</Typography></Grid> : null}
            <Grid item container direction="row" spacing={1}>
                {photos && photos.map(photo => (
                    <PhotoItem
                        deletePhoto={() => { handleDelete(photo._id)}}
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
        </>
            
        </Grid >
    );
}

export default UserPhoto;
