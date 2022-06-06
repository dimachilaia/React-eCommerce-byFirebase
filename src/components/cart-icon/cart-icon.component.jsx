//icon რო გვაქვს მაგისაა რასაც ვხედავთ ეგრევე დაჭერამდე

import {ReactComponent as ShoppingIcon} from '../../assets/111 shopping-bag.svg'

import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import './cart-icon.style.scss'

const CartIcon = ()=>{
 const {isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

 const toggleIsCartOpen = ()=> setIsCartOpen(!isCartOpen)

 return (
  <div className='cart-icon-container'>
    <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
    <span className='item-count'>{cartCount}</span>
  </div>
 )
}

export default CartIcon