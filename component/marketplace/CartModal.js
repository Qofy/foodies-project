'use client';

import { useCart } from '@/lib/cartContext';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import classes from './CartModal.module.css';

export default function CartModal() {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const handleCheckout = () => {
    alert('Checkout functionality coming soon! 🚀');
    // In a real app, this would redirect to checkout
  };

  return (
    <>
      <button className={classes.cartButton} onClick={toggleCart}>
        <ShoppingCart size={24} />
        {cartCount > 0 && <span className={classes.badge}>{cartCount}</span>}
      </button>

      {isOpen && (
        <>
          <div className={classes.overlay} onClick={toggleCart}></div>
          <div className={classes.modal}>
            <div className={classes.header}>
              <h2>Shopping Cart</h2>
              <button className={classes.closeBtn} onClick={toggleCart}>
                <X size={24} />
              </button>
            </div>

            <div className={classes.content}>
              {cart.length === 0 ? (
                <div className={classes.empty}>
                  <div className={classes.emptyIcon}>
                    <ShoppingCart size={64} strokeWidth={1.5} />
                  </div>
                  <p>Your cart is empty</p>
                  <button className={classes.shopBtn} onClick={toggleCart}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className={classes.items}>
                    {cart.map((item) => {
                      const finalPrice = item.discount > 0 
                        ? (item.price * (1 - item.discount / 100)).toFixed(2)
                        : item.price.toFixed(2);
                      
                      return (
                        <div key={item.slug} className={classes.item}>
                          <div className={classes.itemImage}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="80px"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          
                          <div className={classes.itemDetails}>
                            <h4>{item.title}</h4>
                            <p className={classes.itemPrice}>${finalPrice}</p>
                          </div>

                          <div className={classes.itemActions}>
                            <div className={classes.quantity}>
                              <button
                                onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                                className={classes.qtyBtn}
                              >
                                <Minus size={14} />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                                className={classes.qtyBtn}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.slug)}
                              className={classes.removeBtn}
                              title="Remove from cart"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={classes.footer}>
                    <div className={classes.total}>
                      <span>Total:</span>
                      <span className={classes.totalAmount}>${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <button className={classes.checkoutBtn} onClick={handleCheckout}>
                      Proceed to Checkout
                    </button>
                    
                    <button className={classes.clearBtn} onClick={clearCart}>
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
