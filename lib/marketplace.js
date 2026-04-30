import sql from "better-sqlite3";

const db = sql("meals.db");

// Get all food items for marketplace with random prices
export async function getFoodListings() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const meals = db.prepare("SELECT * FROM meals").all();
  
  // Add marketplace data to each meal
  return meals.map((meal) => ({
    ...meal,
    price: generatePrice(meal.title),
    rating: generateRating(),
    reviews: generateReviewCount(),
    inStock: Math.random() > 0.1, // 90% in stock
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0, // 30% chance of discount
  }));
}

// Get single food item
export async function getFoodItem(slug) {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  
  if (!meal) return null;
  
  return {
    ...meal,
    price: generatePrice(meal.title),
    rating: generateRating(),
    reviews: generateReviewCount(),
    inStock: true,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
  };
}

// Helper to generate consistent price based on title
function generatePrice(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash) + title.charCodeAt(i);
    hash = hash & hash;
  }
  const basePrice = Math.abs(hash % 30) + 10;
  return parseFloat(basePrice.toFixed(2));
}

// Generate rating between 3.5 and 5
function generateRating() {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
}

// Generate review count
function generateReviewCount() {
  return Math.floor(Math.random() * 500) + 10;
}
