// import React from 'react';

// import './styles.css';


// function DashboardHeader ({ btnText, btnText1, onClick }) {
//     return(
//         <div className='dashbord-header-container'>
//             {btnText ? <button className='dashbord-header-btn' onClick={() => onClick('/orders')}>{btnText}</button> : null}
//             {btnText1 ? <button className='dashbord-header-btn1' onClick={() => onClick('/loginforms')}>{btnText1}</button> : null}


        
//         </div>
//     )
// }

// export default DashboardHeader;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

function DashboardHeader ({ btnText, btnText1 }) {
    const navigate = useNavigate();

    const handleBtnClick = () => {
        navigate('/orders');
        window.location.reload(); // Reloads the current page
    };

    const handleBtn1Click = () => {
        // navigate('/loginforms');
        window.location.reload(); // Reloads the current page
    };

    return(
        <div className='dashbord-header-container'>
            {btnText ? <button className='dashbord-header-btn' onClick={handleBtnClick}>{btnText}</button> : null}
            {btnText1 ? <button className='dashbord-header-btn1' onClick={handleBtn1Click}>{btnText1}</button> : null}
        </div>
    )
}

export default DashboardHeader;



