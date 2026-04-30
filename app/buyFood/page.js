'use client';

import { useState, useEffect } from 'react';
import FoodCard from '@/component/marketplace/FoodCard';
import classes from './page.module.css';
import { Search, SlidersHorizontal, DollarSign, Utensils, ChefHat, Star } from 'lucide-react';

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
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');

  // Load foods on mount
  useEffect(() => {
    async function loadFoods() {
      setLoading(true);
      try {
        const response = await fetch('/api/foods');
        const data = await response.json();
        setFoods(data);
        setFilteredFoods(data);
      } catch (error) {
        console.error('Failed to load foods:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFoods();
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    let result = [...foods];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (food) =>
          food.title.toLowerCase().includes(query) ||
          food.summary.toLowerCase().includes(query) ||
          food.creator.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      result = result.filter((food) => {
        const finalPrice = food.discount > 0 
          ? food.price * (1 - food.discount / 100) 
          : food.price;
        
        switch (priceRange) {
          case 'under15':
            return finalPrice < 15;
          case '15-25':
            return finalPrice >= 15 && finalPrice <= 25;
          case '25-35':
            return finalPrice >= 25 && finalPrice <= 35;
          case 'over35':
            return finalPrice > 35;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setFilteredFoods(result);
  }, [foods, searchQuery, sortBy, priceRange]);
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}><SlidersHorizontal size={14} /> Sort By</label>
            <select 
              className={classes.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}><DollarSign size={14} /> Price Range</label>
            <select 
              className={classes.select}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under15">Under $15</option>
              <option value="15-25">$15 - $25</option>
              <option value="25-35">$25 - $35</option>
              <option value="over35">Over $35</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filteredFoods.length > 0 ? (
          <div className={classes.grid}>
            {filteredFoods.map((food) => (
              <FoodCard key={food.slug} food={food} />
            ))}
          </div>
        ) : (
          <div className={classes.noResults}>
            <p>No dishes found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSortBy('popular');
                setPriceRange('all');
              }}
              className={classes.resetBtn}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </>
  );
}
