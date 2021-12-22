import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import MyPlaylist from '../../components/users/MyPlaylist.js';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';

const MyPlaylistView = () => {
    const history = useHistory();

    return (    
        <div>
            <Drawer
            >
                <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                    <MyPlaylist 
                        topic="Public Playlist"
                        paragraph="You can click here to view your public playlist."
                        link="/my-public-playlist"
                        image="https://thepublicvoice.org/wp-content/uploads/2019/10/TPV-people-hp.jpg"
                    />
                    <MyPlaylist 
                         topic="Private Playlist"
                         paragraph="You can click here to view your private playlist."
                         link="/my-private-playlist"
                         image="https://www.lifewire.com/thmb/xIkazjnSYXBVPdXmD0jD8lhI1KU=/1500x1000/filters:fill(auto,1)/make-instagram-account-private-3485850-8a453f8e0cff40019b0b7346b4f06d26.png"
                    />
                </Box>
                {/* My components */}
                
            </Drawer>
        </div>
    )
}


export default MyPlaylistView;