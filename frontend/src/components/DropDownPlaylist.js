import React, { useState, useContext, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContext.js';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function DropDownPlaylist({ setPlayid }) {
    const state = useContext(GlobalContext);
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [selected, setSelected] = React.useState();
    useEffect(async () => {

        let token = localStorage.getItem("access_token");
        // console.log(token)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            axios.get(state.url + "movies/myplaylist/", config)
                .then(data => {
                    console.log(data);
                    return data.data;
                })
                .then(data => {
                    return (data.data);

                }).then(p => {
                    p = Object.entries(p);
                    let d = []

                    for (let i = 0; i < p.length; i++) {
                        d.push(p[i][1]);
                    }
                    setPersonName(d);

                })
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPlayid(event.target.value);
        setSelected(event);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Playlist Name</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput label="Playlist Name" />}
                    MenuProps={MenuProps}
                >
                    {personName.map((name) => (
                        <MenuItem
                            key={name._id} 
                            // onClick={setPlayid(name._id)}
                            value={name._id}
                            style={getStyles(name, personName, theme)}
                        >
                            {name.playlistName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
