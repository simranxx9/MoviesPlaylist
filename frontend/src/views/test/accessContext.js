import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import { GlobalContext } from '../../contexts/GlobalContext.js';


const Test = () => {
    const { name, changeName, deleteName } = useContext(GlobalContext);
    return (    
        <div>
            <Drawer>
                {/* All components */}
                { name }
                <input value={name} onChange={ (event) => changeName(event.target.value) } />
                
            </Drawer>
        </div>
    )
}


export default Test;