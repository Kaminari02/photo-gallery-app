import React from 'react';
import { Grid, Card, CardHeader, CardActions, CardMedia, CardContent, IconButton, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiUrl } from '@/common/constants';
import { useParams } from 'react-router-dom';
import { IAuthor } from '@/interfaces/IAuthor';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  image: string;
  _id: string
  author: IAuthor;
  authorId: string;
  deletePhoto?: () => void;
  openModal: () => void
}

const PhotoItem = ({ title, image, author, deletePhoto, authorId, openModal }: Props) => {
  const navigate = useNavigate();
  let cardImage;
  const { id } = useParams();

  if (image) {
    cardImage = `${apiUrl}/uploads/${image}`;
  }
  return (
    <Grid sx={{marginTop: 5}} item xs={12} sm={12} md={6} lg={4} minWidth={350}>
      <Card sx={{ height: "100%", maxWidth: 345, margin: 'auto', cursor: 'pointer' }}>
        <CardContent sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
         {id ? author._id === authorId 
                      ? <IconButton sx={{fontSize: 18}} onClick={deletePhoto} aria-label="delete"><DeleteIcon /> Delete</IconButton> 
                      : null
          : null}
         </CardContent>
        {cardImage ? <CardMedia onClick={openModal} sx={{ height: 230, objectFit: 'contain' }} image={cardImage} title={title} /> : null}
        {id ? null : <CardHeader onClick={() => {navigate(`/users/${author._id}`)}} sx={{textDecoration: 'underline', color: '#4caf50'}} title={`Author: ${author.username}`} />}
        
        <CardActions>
            <Link sx={{marginLeft: 1}} onClick={openModal} href={'#'}>{title}</Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PhotoItem;