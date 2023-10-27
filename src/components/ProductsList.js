import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';  // Adjust the path if your directory structure is different
import './styles/ProductList.css';

const ALL_PRODUCTS_QUERY = gql`
  query AllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          availableForSale
          createdAt
          description
          descriptionHtml
          handle
          isGiftCard
          onlineStoreUrl
          productType
          publishedAt
          requiresSellingPlan
          tags
          totalInventory
          updatedAt
          vendor
          images(first: 5) {  # Adjust the number inside first as per your requirement
            nodes {
              altText
              height
              id
              originalSrc
              src
              transformedSrc
              url
              width
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query ProductsByCategory($categoryId: ID!, $first: Int!, $after: String) {
    collection(id: $categoryId) {
      products(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            title
            availableForSale
            createdAt
            description
            descriptionHtml
            handle
            isGiftCard
            onlineStoreUrl
            productType
            publishedAt
            requiresSellingPlan
            tags
            totalInventory
            updatedAt
            vendor
            images(first: 5) {  # Adjust the number inside first as per your requirement
              nodes {
                altText
                height
                id
                originalSrc
                src
                transformedSrc
                url
                width
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

function ProductsList({ categoryId }) {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [afterCursor, setAfterCursor] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('');

  const variables = categoryId
    ? { categoryId, first: ITEMS_PER_PAGE, after: afterCursor }
    : { first: ITEMS_PER_PAGE, after: afterCursor };

  const query = categoryId ? PRODUCTS_BY_CATEGORY_QUERY : ALL_PRODUCTS_QUERY;
  const { data, loading, error } = useQuery(query, { variables });

  const edges = categoryId ? data?.collection?.products?.edges : data?.products?.edges;
  const pageInfo = categoryId ? data?.collection?.products?.pageInfo : data?.products?.pageInfo;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    const newCursor = newPage > currentPage
      ? edges[edges.length - 1].cursor
      : null;

    setAfterCursor(newCursor);
  };

  const filterProducts = (products) => {
    return products.filter(product => {
      const tagsMatch = !selectedTag || product.node.tags.includes(selectedTag);
      const availabilityMatch = availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && product.node.availableForSale) ||
        (availabilityFilter === 'unavailable' && !product.node.availableForSale);
      const stockMatch = stockFilter === '' || product.node.totalInventory <= parseInt(stockFilter);
      return tagsMatch && availabilityMatch && stockMatch;
    });
  };

  const filteredProducts = filterProducts(edges || []);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="products-template">
      <div className="filters">
        <h3>Filter products:</h3>
        <select value={selectedTag || ""} onChange={(e) => setSelectedTag(e.target.value || null)}>
          <option value="">All Tags</option>
          {[...new Set((edges || []).flatMap(({ node }) => node.tags))].map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <select className="filter-buttons" value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} >
          <option value="all">Availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
          <option value="">Inventory</option>
          <option value="10">Less than 10</option>
          <option value="20">Less than 20</option>
          <option value="50">Less than 50</option>
          <option value="100">Less than 100</option>
          <option value="1000">100+</option>

        </select>
      </div>
      <div className="products-grid">
        {filteredProducts.map(({ node }) => {
          const productId = node.id.split('/').pop();
          return (
            <div key={node.id} className="product-item">
              <div className="image-container">
                    {node.images.nodes.length > 0 ? (
                      <img
                        className="product-image"
                        src={node.images.nodes[0].originalSrc}
                        alt={node.images.nodes[0].altText || node.title}
                      />
                    ) : (
                      <img
                        className="product-image"
                        src="https://via.placeholder.com/150"
                        alt="Placeholder"
                      />
                    )}
                  </div>
                  <h3 className="product-name"><Link to={`/product/${productId}`} className="more-details-link2">{node.title}</Link></h3>
                  <div>
                  <button className='btn'>
                    <Link to={`/product/${productId}`} className="more-details-link">
                      More&nbsp;details&nbsp;→
                    </Link>
                    </button>
                    </div>
                </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
      />
    </div>
  );
}

export default ProductsList;


