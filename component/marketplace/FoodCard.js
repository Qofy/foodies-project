'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import classes from './FoodCard.module.css';

export default function FoodCard({ food }) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const finalPrice = food.discount > 0 
    ? (food.price * (1 - food.discount / 100)).toFixed(2)
    : food.price.toFixed(2);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(food);
    showMessage('Added to cart!');
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(food);
    showMessage(isFavorite(food.slug) ? 'Removed from favorites' : 'Added to favorites!');
  };

  const handleShare = async (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/meals/${food.slug}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: food.title,
          text: food.summary,
          url: url,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showMessage('Link copied to clipboard!');
  };

  const showMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className={classes.card}>
      {food.discount > 0 && (
        <div className={classes.badge}>{food.discount}% OFF</div>
      )}
      
      <Link href={`/meals/${food.slug}`} className={classes.imageWrapper}>
        <Image
          src={food.image}
          alt={food.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={classes.image}
        />
      </Link>

      <div className={classes.content}>
        <Link href={`/meals/${food.slug}`} className={classes.titleLink}>
          <h3 className={classes.title}>{food.title}</h3>
        </Link>

        <div className={classes.meta}>
          <div className={classes.rating}>
            <Star className={classes.starIcon} size={14} fill="currentColor" />
            <span>{food.rating}</span>
            <span className={classes.reviews}>({food.reviews})</span>
          </div>
          {!food.inStock && <span className={classes.outOfStock}>Out of Stock</span>}
        </div>

        <p className={classes.seller}>
          by <span>{food.creator}</span>
        </p>

        <p className={classes.summary}>{food.summary}</p>

        <div className={classes.priceRow}>
          <div className={classes.priceContainer}>
            {food.discount > 0 && (
              <span className={classes.originalPrice}>${food.price.toFixed(2)}</span>
            )}
            <span className={classes.price}>${finalPrice}</span>
          </div>
        </div>

        <div className={classes.actions}>
          <button
            className={`${classes.btn} ${classes.btnPrimary}`}
            onClick={handleAddToCart}
            disabled={!food.inStock}
          >
            <ShoppingCart size={16} />
            {food.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            className={`${classes.btn} ${classes.btnIcon} ${isFavorite(food.slug) ? classes.btnFavorited : ''}`}
            onClick={handleToggleFavorite}
            title={isFavorite(food.slug) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={isFavorite(food.slug) ? 'currentColor' : 'none'} />
          </button>

          <button
            className={`${classes.btn} ${classes.btnIcon}`}
            onClick={handleShare}
            title="Share this food"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {showNotification && (
        <div className={classes.notification}>{notificationMessage}</div>
      )}
    </div>
  );
}
