import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599593915565-a131b7482811", cost: "$15", description: "Produces oxygen at night" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313f0724d1cb", cost: "$12", description: "Filters indoor air effectively" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593482834175-d2426317b6d1", cost: "$18", description: "Removes toxins and blooms white" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42", cost: "$14", description: "Adds lush green texture" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1525498128493-380d1990a112", cost: "$20", description: "Shiny thick leaves" },
        { name: "Bamboo Palm", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", cost: "$22", description: "Brings tropical vibes" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", cost: "$10", description: "Calming floral fragrance" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", cost: "$16", description: "Sweet nighttime aroma" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515588240895-244e85773229", cost: "$9", description: "Herbaceous culinary scent" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4", cost: "$8", description: "Refreshing crisp aroma" },
        { name: "Geranium", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5", cost: "$11", description: "Citrusy scented leaves" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1516233758872-a53904683dae", cost: "$19", description: "Fresh medicinal scent" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207215624-972d96924855", cost: "$17", description: "Thrives in low light" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$10", description: "Succulent with healing gel" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1583366484685-48ae1d5e38a3", cost: "$13", description: "Hardy trailing vine" },
        { name: "Cactus", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9", cost: "$9", description: "Requires very little water" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a", cost: "$14", description: "Symbol of good luck" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1446071103084-c257b5f70672", cost: "$15", description: "Assorted small succulents" }
      ]
    }
  ];

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div>
      <div className="navbar">
        <h2>Paradise Nursery</h2>
        <nav>
          <a href="#home" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Home</a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#cart" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            🛒 Cart ({totalCartCount})
          </a>
        </nav>
      </div>

      <div className="product-listing">
        {plantsArray.map((category, index) => (
          <div key={index} style={{ padding: '20px' }}>
            <h2>{category.category}</h2>
            <div className="product-grid">
              {category.plants.map((plant, pIndex) => (
                <div className="product-card" key={pIndex}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.cost}</p>
                  <p>{plant.description}</p>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                    style={{
                      backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                      color: 'white',
                      padding: '8px 16px',
                      border: 'none',
                      cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
