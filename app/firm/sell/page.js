'use client';
import React, { useEffect, useState } from 'react'
import SearchMedicine from './SearchMedicine'
import ProductSelect from './ProductSelect';
import Checkout from './Checkout';
import { Modal, ModalOverlay } from '@chakra-ui/react';

function Sell() {
  const [product, setProduct] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(cart);
  }, [cart])
  return (
    <div>
      <SearchMedicine product={product} setProduct={setProduct} />
      {product &&
        <ProductSelect product={product} setCart={setCart} cart={cart} />
      }
      {
        cart.length > 0 && <Checkout cart={cart} setCart={setCart} />
      }
    </div>
  )
}

export default Sell