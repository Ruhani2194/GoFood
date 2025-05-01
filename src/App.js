// import './App.css';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'; 
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// import {CartProvider} from './components/ContextReducer.js';
// import Home from './screens/Home';
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import ProfileDahboard from './components/ProfileDahboard';
// import UploadFoodItem from './components/UploadFoodItem.js';

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";

// function App() {
//   const handleItemAdded = () => {
//     console.log('Food item added successfully!');
//   };
//   return (
//     <CartProvider>
//       <Router>
//         <div>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/Signup" element={<Signup />} />
//             <Route path="/ProfileDahboard" element={<ProfileDahboard />} />
//             {/* <Route path="/MyOrder" element={<MyOrder/>} /> */}
//             <Route path="/upload-items" element={<UploadFoodItem />} />
//             {/* <UploadFoodItem onItemAdded={handleItemAdded} /> */}
//             <Home onItemAdded={handleItemAdded} />
           
//           </Routes>
//         </div>
//       </Router>
//       </CartProvider>
//   );
// }

// export default App;


import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.js';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ProfileDahboard from './components/ProfileDahboard';
import UploadFoodItem from './components/UploadFoodItem.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  const handleItemAdded = () => {
    console.log('Food item added successfully!');
  };
  <img src={`${process.env.PUBLIC_URL}/uploads/image.jpg`} alt="Food Item" />


  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home onItemAdded={handleItemAdded} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/ProfileDahboard" element={<ProfileDahboard />} />
            <Route path="/upload-items" element={<UploadFoodItem />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
