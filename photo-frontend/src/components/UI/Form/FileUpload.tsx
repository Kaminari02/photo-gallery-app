import React, { ChangeEventHandler, useState, ChangeEvent } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import {deepPurple} from '@mui/material/colors'

interface Props {
    onChange: ChangeEventHandler<HTMLInputElement>;
    name: string;
    label: string
}

const FileUpload = ({ onChange, name, label }: Props) => {
    const [fileName, setFileName] = useState('');


    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name)
        } else {
            setFileName('')
        }
        onChange(e);
    }

    return (
        <>
        <Typography variant="h5">{label}</Typography>
            <Button sx={{ bgcolor: deepPurple[500], "&:hover": {bgcolor: deepPurple[500]} }}  variant="contained" component="label">
                Browse
                <input name={name} hidden accept="image/*" type="file" onChange={onFileChange} />
            </Button>
            <Grid container direction='row' spacing={2} alignItems='center'>
                <Grid item xs>
                    {fileName}
                </Grid>
            </Grid>
        </>
    )
}

export default FileUpload;