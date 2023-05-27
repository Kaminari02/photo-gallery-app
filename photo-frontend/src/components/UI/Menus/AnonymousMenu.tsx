import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <Button color='inherit' component={Link} to='/register'>
                Sign up
            </Button>
            <Button color='inherit' component={Link} to='/login'>
                Sign in
            </Button>
        </>
    )

}

export default AnonymousMenu;