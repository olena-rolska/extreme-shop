import React, {useState, createContext} from 'react'

export const CartContext = createContext(null) 


export default function CartProvider({children}) {
  const [items, setItems] = useState([])

  function addToCart(item) {
    setItems(prevState => [...prevState, item] )
  }


  function itemsWithQuantities(items) {
    return items.reduce((acc, item) => {
      const found = acc.find(_item => _item.sku === item.sku)
      if (found) {
        found.quantity = found.quantity +1
      } else {
        acc.push({
          quantity: 1,
          ...item
        })
      }
        return acc
    }, [])
  }

  return (
    <CartContext.Provider
      value={{
        items: itemsWithQuantities(items), 
        itemsCount: items.length,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}