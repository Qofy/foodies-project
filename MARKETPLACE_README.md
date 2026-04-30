# Food Marketplace Feature

## Overview
A complete food marketplace implementation for the Foodies project with shopping cart, favorites, and social sharing features.

## Features Implemented

### 🛍️ Food Marketplace (`/buyFood`)
- **Product Grid Layout**: Responsive grid displaying all available meals
- **Product Cards**: Professional cards with images, ratings, pricing, and seller information
- **Discount Badges**: Visual indicators for items on sale
- **Stock Status**: Shows in-stock and out-of-stock items
- **Search & Filters**: Filter by price range, sort by popularity/rating/price
- **Loading States**: Skeleton loaders for better UX

### 🛒 Shopping Cart
- **Floating Cart Button**: Fixed position cart icon with item count badge
- **Side Modal**: Slide-in cart panel with full cart management
- **Quantity Controls**: Adjust item quantities with +/- buttons
- **Remove Items**: Delete individual items from cart
- **Cart Persistence**: LocalStorage integration - cart survives page refreshes
- **Total Calculation**: Real-time price calculations with discounts
- **Checkout**: Checkout button (ready for payment integration)

### ❤️ Favorites System
- **Toggle Favorites**: Click heart icon to save favorite items
- **Visual Feedback**: Different states for favorited/unfavorited items
- **Persistence**: Favorites saved in localStorage

### 📤 Social Sharing
- **Native Share API**: Use device's native share functionality when available
- **Fallback**: Copy link to clipboard on unsupported devices
- **Share Notifications**: User-friendly feedback messages

### 💰 Pricing Features
- **Dynamic Pricing**: Consistent pricing based on meal titles
- **Discount System**: Random discounts (10-40% off on select items)
- **Price Display**: Shows original and discounted prices
- **Rating System**: Star ratings (3.5-5.0) with review counts

## File Structure

```
lib/
├── marketplace.js          # Marketplace data functions
└── cartContext.js          # Cart & favorites state management

component/marketplace/
├── FoodCard.js            # Individual food item card component
├── FoodCard.module.css    # Food card styles
├── CartModal.js           # Shopping cart modal component
└── CartModal.module.css   # Cart modal styles

app/buyFood/
├── page.js                # Main marketplace page
└── page.module.css        # Marketplace page styles
```

## Key Components

### CartProvider
Global state management for cart and favorites using React Context API.

**Available Methods:**
- `addToCart(item)` - Add item to cart
- `removeFromCart(slug)` - Remove item from cart
- `updateQuantity(slug, quantity)` - Update item quantity
- `toggleFavorite(item)` - Add/remove from favorites
- `isFavorite(slug)` - Check if item is favorited
- `clearCart()` - Empty the cart
- `cartTotal` - Total cart price
- `cartCount` - Total items in cart

### FoodCard
Displays individual food items with all actions.

**Features:**
- Responsive image with hover effects
- Rating display with review count
- Seller information
- Discount badges
- Action buttons (Add to cart, Like, Share)
- Toast notifications for user actions

### CartModal
Full-featured shopping cart interface.

**Features:**
- Slide-in animation from right
- Item list with thumbnails
- Quantity adjustment controls
- Remove item functionality
- Price calculations with discounts
- Checkout and clear cart buttons
- Empty cart state

## Responsive Design
- **Desktop**: Multi-column grid (3-4 items per row)
- **Tablet**: 2-3 items per row
- **Mobile**: Single column, optimized touch targets

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Native share API with clipboard fallback
- LocalStorage for persistence

## Future Enhancements
- User authentication integration
- Payment processing (Stripe/PayPal)
- Order history
- Real-time inventory management
- Advanced filtering (dietary restrictions, cuisine type)
- Wishlist feature
- Product reviews and ratings from users
- Recommended products
- Multi-vendor support

## Testing
Navigate to `/buyFood` to test:
1. Browse food items
2. Add items to cart using "Add to Cart" button
3. Click heart icon to favorite items
4. Use share button to share items
5. Open cart modal from floating button
6. Adjust quantities in cart
7. Test checkout flow
8. Refresh page to verify persistence

## Notes
- Prices are generated consistently based on meal title hashes
- Ratings and review counts are randomized for demo purposes
- In production, connect to a real inventory/pricing database
- Implement proper checkout with payment gateway
