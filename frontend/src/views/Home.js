import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../components/Drawer.js';
import Home from '../components/Home.js';

const HomeView = () => {
    return (    
        <div>
            <Drawer>
                <img 
                    style={{
                        position: "absolute",
                        width: "100%",
                        overflow: "hidden",
                        opacity: ".9",
                        top: "0px",
                        left: "0px",
                        zIndex: "-1"
                    }}
                    src="https://raw.githubusercontent.com/jhabarsingh/MOVIE-RECOMMENDER/main/docs/Home_page.jpg" 
                />
            
                <Home/>
            </Drawer>
        </div>
    )
}


export default HomeView;