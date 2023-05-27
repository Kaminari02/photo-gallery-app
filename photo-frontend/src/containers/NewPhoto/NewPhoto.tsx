import React from "react";
import PhotoForm from "@/components/PhotoForm/PhotoForm";
import { useNavigate } from 'react-router-dom';
import { useAddPhotoMutation } from "@/store/services/photos";


const NewPhoto = () => {
    const navigate = useNavigate();
    const [addPhoto] = useAddPhotoMutation();

    const onPhotoFormSubmit = async (photo: FormData) => {
        const data = await addPhoto(photo);
        if (!(data as { error: object }).error) {
            navigate('/');
        }
    };

    return (
        <>
            <PhotoForm onSubmit={onPhotoFormSubmit} />
        </>
    );
};

export default NewPhoto;