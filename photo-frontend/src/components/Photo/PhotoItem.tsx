import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Card, CardHeader, CardActions, CardMedia, Button, CardContent, IconButton } from '@mui/material';
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
      <Card sx={{ height: "100%", maxWidth: 345 }}>
        <CardContent sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
         {id ? author._id === authorId 
                      ? <IconButton onClick={deletePhoto} aria-label="delete"><DeleteIcon /></IconButton> 
                      : null
          : null}
         </CardContent>
        {cardImage ? <CardMedia sx={{ height: 350 }} image={cardImage} title={title} /> : null}
        <CardHeader title={`Author: ${author}`} />
        <CardActions>
          <Button onClick={openModal} sx={{ bgcolor: '#4caf50', color: '#fff', margin: 1, "&:hover": { bgcolor: '#81c784' } }}>{title}</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PhotoItem;