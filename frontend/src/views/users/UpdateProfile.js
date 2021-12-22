import React, { useState, useEffect, useRef, useContext } from 'react';
import Drawer from '../../components/Drawer.js';
import UpdateProfile from '../../components/users/UpdateProfile.js';

const UpdateProfileView = () => {
    return (    
        <div>
            <Drawer>
                {/* All components */}
                <UpdateProfile />
            </Drawer>
        </div>
    )
}


export default UpdateProfileView;