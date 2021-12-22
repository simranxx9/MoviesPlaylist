import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import { GlobalContext } from '../../contexts/GlobalContext.js';


const Test = () => {
    const { name, changeName, deleteName } = useContext(GlobalContext);
    return (    
        <div>
            <Drawer>
                {/* All components */}
                
            </Drawer>
        </div>
    )
}


export default Test;