import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext.js';
import SearchBar from './SearchBar'

const Home = () => {
    const { name, changeName, deleteName } = useContext(GlobalContext);

    return (
        <div
            
        >
            <h1
                style={{
                    textAlign: "center",
                    textTransform: "upperCase",
                    fontWeight: "bold",
                    color: "white"
                }}
            >
                Search Movies
            </h1>
            <br />
            <div
                style={{
                    backgroundColor: "white"
                }}
            >
                <SearchBar/>
            </div>
        </div>
    )
}


export default Home;