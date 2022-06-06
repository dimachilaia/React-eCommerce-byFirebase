//აიქონზე დაჭერის მერე რო გამოჩნდება შესაბამისი რაღაცეები ეგაა და უკავშირდება cartDropdown ს

import './cart-item.styles.scss'

const CartItem = ({cartItem})=>{
  const {name, quantity,price, imageUrl} = cartItem

  return (
   <div className='cart-item-container'>
    <img src={imageUrl} alt={`${name}`}/>
    <div className='item-details'>
     <span className='name'>{name}</span>
     <span className='price'>{quantity} x ${price}</span>
    </div>
   </div>
  )
}

export default CartItem