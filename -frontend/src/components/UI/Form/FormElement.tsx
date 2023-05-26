import { IAlbum } from "@/interfaces/IAlbum";
import { IArtist } from "@/interfaces/IArtist";
import { ITrack } from "@/interfaces/ITrack";
import { TextField, Grid, MenuItem } from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
    value: string;
    label: string;
    name: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    type?: HTMLInputTypeAttribute | 'select';
    id?: string;
    required?: boolean;
    error?: string;
    multiline?: boolean;
    rows?: number;
    options?: IArtist[] | IAlbum[] | ITrack[];
    select?: boolean;
    placeholder?: string
}

const FormElement = ({value, label, name, onChange, type, id, required = false, error, multiline, rows, options, select, placeholder}: Props) => {
    let inputChildren = null;
    if (type === 'select') {
        if(options) {
            inputChildren = options.map((option) => (
    
                <MenuItem key={option._id} value={option._id}>
          
                  {option.title}
          
                </MenuItem>
          ))
        }
    }
    return (
        <Grid item xs={12}>
            <TextField
                type={type}
                id={id}
                required
                value={value}
                onChange={onChange}
                name={name}
                variant='outlined'
                fullWidth
                label={label}
                error={!!error}
                helperText={error}
                multiline={multiline}
                rows={rows}
                select={select}
                placeholder={placeholder}
            >{inputChildren}: {<div></div>}</TextField>
        </Grid>
    )
}

export default FormElement;