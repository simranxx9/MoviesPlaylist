import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AllPlaylist({imdbID}) {
    
    const [details, setDetails] = React.useState([])
    React.useEffect(() => {
        let url = `http://www.omdbapi.com/?i=${imdbID}&apikey=ea499806`

            fetch(url).then((req) => {
                return req.json();
            }).then((data) => {
                let s = data
                console.log(s);
                setDetails(s)
            });
    }, [])
    return (

    <List sx={{ width: '100%', padding: "10px", bgcolor: 'background.paper' }}>
      
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={details.Poster} />
        </ListItemAvatar>
        <ListItemText
          primary={details.Actors && details.Actors.split(",")[0]}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {details.Title}
              </Typography>
              {details.Plot}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}