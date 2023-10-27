import React, { useState } from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from './apolloClient';
import './App.css';
import ProductsList from './components/ProductsList';
import CustomDropdown from './components/CustomDropdown';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';

const CATEGORIES_QUERY = gql`
{
  collections(first: 10) {
    edges {
      node {
        id
        title
      }
    }
  }
}
`;




function CategorySelector({ onCategoryChange }) {
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);
  const navigate = useNavigate();

  const handleChange = (categoryId) => {
    onCategoryChange(categoryId);
    navigate('/'); // Navigate to the home page when a category is selected
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <CustomDropdown 
      categories={data.collections.edges.map(edge => edge.node)}
      onCategoryChange={handleChange}
    />
  );
}

function App() {
  const [currentCategory, setCurrentCategory] = useState(null);

  function handleCategoryChange(categoryId) {
    setCurrentCategory(categoryId);
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}> 
              <h1>Magexo Shopify Products</h1>
            </Link>
            <CategorySelector onCategoryChange={handleCategoryChange} />
          </header>
          <Routes>
            <Route path="/" element={<ProductsList categoryId={currentCategory} />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
