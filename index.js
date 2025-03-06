import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Sign_up from './components/Sign_up';
import Sign_in from './components/sign_in';
import Homepage from './components/Homepage';
import reportWebVitals from './reportWebVitals';
import History from './components/History';
import Ai_Check_Component from './components/Ai_Check_Component';
import Fact_Check_Component from './components/Fact_Check_Component.jsx';
import MainPage from './components/MainPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router= createBrowserRouter([{
  path:'/',
  element: <Homepage />,
  errorElement:<div>4040404</div>,
},{
  path:'/Signup',
  element: <Sign_up />,
},{
  path:'/Signin',
  element: <Sign_in />,
},{
  path:'/History',
  element: <History/>,
},{
  path:'/MainPage',
  element: <MainPage/>,
}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
