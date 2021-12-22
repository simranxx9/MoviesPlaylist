import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DropDownPlaylist from './DropDownPlaylist'
import axios from 'axios';


import { GlobalContext } from '../contexts/GlobalContext.js';

export default function MovieCard({ setOpen, details }) {
    const [playid, setPlayid] = React.useState();
    const state = React.useContext(GlobalContext);
    const [msg, setmsg] = React.useState(false);
        
    async function handleClick(e) {
        let token = localStorage.getItem("access_token");
        try {
            let res = await axios.put(state.url + 'movies/add-into-playlist/',
                {
                    "playlistId": playid,
                    "movieId": details.imdbID
                }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            setOpen(false);
            setmsg(false);
        }
        catch(err) {
            setmsg(true);
        }
    }
    return (
        <Card sx={{ maxWidth: 1000 }}>
            <CardMedia
                component="img"
                image={details.Poster}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {details.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {details.Plot}
                </Typography>
            </CardContent>
            <CardActions>
                <DropDownPlaylist setPlayid={setPlayid} />
                <Button variant="contained" size="small" onClick={handleClick}>ADD To Playlist</Button>
                
            </CardActions>
            {
            msg && (<div style={{padding:"10px", color:"red",
            display:"flex", justifyContent:"center"}}>
                Movie already exist in playlist
            </div>)
            }
        </Card>
    );
}