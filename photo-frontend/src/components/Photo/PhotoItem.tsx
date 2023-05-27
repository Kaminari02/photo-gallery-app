import React from 'react';
import { Grid, Card, CardHeader, CardActions, CardMedia, Button, CardContent, IconButton, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiUrl } from '@/common/constants';
import { useParams } from 'react-router-dom';
import { IAuthor } from '@/interfaces/IAuthor';

interface Props {
  title: string;
  image: string;
  _id: string
  author: IAuthor;
  authorId: string;
  deletePhoto?: () => Promise<void>;
  openModal: () => void
}

const PhotoItem = ({ title, image, _id, author, deletePhoto, authorId, openModal }: Props) => {
  let cardImage;
  const { id } = useParams();

  if (image) {
    cardImage = `${apiUrl}/uploads/${image}`;
  }
  return (
    <Grid sx={{marginTop: 5}} item xs={12} sm={12} md={6} lg={4} minWidth={350}>
      <Card onClick={openModal} sx={{ height: "100%", maxWidth: 345, margin: 'auto', cursor: 'pointer' }}>
        <CardContent sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
         {id ? author._id === authorId 
                      ? <IconButton onClick={deletePhoto} aria-label="delete"><DeleteIcon /></IconButton> 
                      : null
          : null}
         </CardContent>
        {cardImage ? <CardMedia sx={{ height: 230, objectFit: 'contain' }} image={cardImage} title={title} /> : null}
        <CardHeader title={`Author: ${author.username}`} />
        <CardActions>
            <Link onClick={openModal} href={'#'}>{title}</Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PhotoItem;