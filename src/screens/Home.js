import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadFoodItems = async () => {
    setLoading(true);
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      // console.log("API Response:", data);

      if (Array.isArray(data) && data.length === 2) {
        setFoodItems(data[0] || []);
        setFoodCat(data[1] || []);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error loading food items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar />
      <Carousel onSearchChange={setSearch} />
      <div className='container py-4'>
        {loading ? (
          <div className="text-center text-light">Loading...</div>
        ) : foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div className='row mb-3' key={category.id}>
              <div className='fs-3 m-3'>
                {category.CategoryName}
              </div>
              <hr id="hr-success" style={{ height: "4px", backgroundImage: "linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
              {foodItems.length > 0 ? foodItems
                .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map(filteredItem => (
                  <div key={filteredItem.id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem={filteredItem}  options={filteredItem.options[0]}  />
                  </div>
                ))
                : <div className="text-center text-light">No Such Data</div>}
            </div>
          ))
        ) : (
          <div className="text-center text-light">No Categories Available</div>
        )}
      </div>
      <Footer/>
    </div>
    
  );
}

