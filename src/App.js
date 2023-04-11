// import React from 'react';
// import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

// import SideBar from './components/Sidebar';
// import sidebar_menu from './constants/sidebar-menu';

// import './App.css';
// import Orders from './pages/Orders';
// import Orders2 from './components/Orders2';

// import Loginform from './components/loginform/loginforms';

// function App () {
//   return(
//     <Router>
//       <div className='dashboard-container'>
//         <SideBar menu={sidebar_menu} />
          
//           <div className='dashboard-body'>
//               <Routes>
//                   <Route path="*" element={<div></div>} />
//                   <Route exact path="/" element={<div></div>} />
//                   <Route exact path="/orders" element={< Orders/>} />
//                   <Route exact path="/orders2" element={< Orders2/>} />
               
//                   <Route exact path="/locations" element={<div></div>} />
//                   <Route exact path="/loginforms" element={< Loginform/>} />
                  
                  
//               </Routes>
//           </div>
//       </div>
//     </Router>
//   )
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Orders from './pages/Orders';
import Orders2 from './components/Orders2';
import Loginform from './components/loginform/loginforms';


function App() {
  return (
    <Router>
      {/* <div className='loginform'>
        <Routes>
          <Route exact path='/loginforms' element={<Loginform />} />
        </Routes>
        
      </div> */}
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
        <div className='dashboard-body'>
          <Routes>
            <Route path='*' element={<div></div>} />
            <Route exact path='/' element={<div></div>} />
            <Route exact path='/orders' element={<Orders />} />
            <Route exact path='/orders2' element={<Orders2 />} />
            <Route exact path='/loginforms' element={<Loginform />} />
            <Route exact path='/popoto' element={<iframe src='http://127.0.0.1:5501/index.html' height="770" width="1265" title='popoto' />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
