import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import {UserProvider} from './contexts/user.context.jsx'
import {CartProvider} from './contexts/cart.context'
import {CategoriesProvider} from './contexts/categories.context'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <UserProvider>
       <CategoriesProvider>
         <CartProvider>
          <App />
         </CartProvider>
       </CategoriesProvider>
     </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
,document.getElementById('root'));