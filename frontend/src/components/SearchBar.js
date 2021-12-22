import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import MovieDetails from './MovieDetails';

export default function ComboBox() {
    const [top100Films, setTop100Films] = React.useState([]);
    const [show, setShow] = React.useState(false)

    const [details, setDetails] = React.useState([])
    function searchMovies(e) {
        let m = `http://www.omdbapi.com/?s=${e.target.value}&apikey=ea499806`;
        fetch(m).then((req) => {
            return req.json();
        }).then((data) => {
            let s = data.Search || [];
            setTop100Films(s);
        });
    }

    function movieDetail(option) {
        console.log(option.imdbID);
        let url = `http://www.omdbapi.com/?i=${option.imdbID}&apikey=ea499806`

        fetch(url).then((req) => {
            return req.json();
        }).then((data) => {
            let s = data
            setShow(true);
            setDetails(s)
        });
    }

    return (
        <>

            <Autocomplete
                disablePortal
                // id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.Title}
                onInput={(e) => searchMovies(e)}
                renderOption={(props, option) => (
                    <Box component="li" {...props}
                        onClick={() => movieDetail(option)}    
                        variant="contained"
                        
                    >
                        {option.Title}
                    </Box>
                )
                }
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />

            {<MovieDetails open={show} setOpen={setShow} details={details} />}
        </>
    );
}
