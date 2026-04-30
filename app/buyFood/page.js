import { Suspense } from 'react';
import { getFoodListings } from '@/lib/marketplace';
import FoodCard from '@/component/marketplace/FoodCard';
import classes from './page.module.css';
import { Search, SlidersHorizontal, DollarSign, Utensils, ChefHat, Star } from 'lucide-react';

export const metadata = {
  title: 'Buy Food | Foodies Marketplace',
  description: 'Browse and buy delicious meals from our food marketplace',
};

async function FoodGrid() {
  const foods = await getFoodListings();

  return (
    <div className={classes.grid}>
      {foods.map((food) => (
        <FoodCard key={food.slug} food={food} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className={classes.grid}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={classes.skeleton}>
          <div className={classes.skeletonImage}></div>
          <div className={classes.skeletonContent}>
            <div className={classes.skeletonTitle}></div>
            <div className={classes.skeletonText}></div>
            <div className={classes.skeletonText}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BuyFoodPage() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <h1>
            <span className={classes.highlight}>Food Marketplace</span>
          </h1>
          <p>Discover and order delicious meals from talented food creators</p>
        </div>
        <div className={classes.headerStats}>
          <div className={classes.stat}>
            <div className={classes.statIcon}><Utensils size={24} /></div>
            <span className={classes.statNumber}>100+</span>
            <span className={classes.statLabel}>Dishes</span>
          </div>
          <div className={classes.stat}>
            <div className={classes.statIcon}><ChefHat size={24} /></div>
            <span className={classes.statNumber}>50+</span>
            <span className={classes.statLabel}>Chefs</span>
          </div>
          <div className={classes.stat}>
            <div className={classes.statIcon}><Star size={24} fill="#ff6b35" /></div>
            <span className={classes.statNumber}>4.8</span>
            <span className={classes.statLabel}>Average Rating</span>
          </div>
        </div>
      </header>

      <main className={classes.main}>
        <div className={classes.filters}>
          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}><Search size={14}/> Search</label>
            <input 
              type="search" 
              placeholder="Search for dishes..." 
              className={classes.searchInput}
            />
          </div>
          
          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}><SlidersHorizontal size={14} /> Sort By</label>
            <select className={classes.select}>
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Newest</option>
            </select>
          </div>

          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}><DollarSign size={14} /> Price Range</label>
            <select className={classes.select}>
              <option>All Prices</option>
              <option>Under $15</option>
              <option>$15 - $25</option>
              <option>$25 - $35</option>
              <option>Over $35</option>
            </select>
          </div>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <FoodGrid />
        </Suspense>
      </main>
    </>
  );
}
