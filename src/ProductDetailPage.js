
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
const PRODUCT_DETAIL_QUERY = gql`
  query ProductDetail($id: ID!) {
    product(id: $id) {
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
      images(first: 5) {
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
`;

function ProductDetailPage() {
    const { productId } = useParams();
    const fullProductId = `gid://shopify/Product/${productId}`;
    const { loading, error, data } = useQuery(PRODUCT_DETAIL_QUERY, {
      variables: { id: fullProductId },
    });
  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const product = data.product;
    const images = product.images.nodes;
  
    if(images.length === 0) {
      return (
        <div className='detail-image'>
          <div className='image50'>
            <div className='no-images'>No images available for this product.</div>
          </div>
          <div className='detail50'>
          <h2>{product.title}</h2>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Available for Sale:</strong> {product.availableForSale ? 'Yes' : 'No'}</p>
          <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <p><strong>Handle:</strong> {product.handle}</p>
          <p><strong>Is Gift Card:</strong> {product.isGiftCard ? 'Yes' : 'No'}</p>
          {product.onlineStoreUrl && <p><strong>Online Store URL:</strong> <a href={product.onlineStoreUrl} target="_blank" rel="noopener noreferrer">{product.onlineStoreUrl}</a></p>}
          <p><strong>Product Type:</strong> {product.productType}</p>
          <p><strong>Published At:</strong> {new Date(product.publishedAt).toLocaleString()}</p>
          <p><strong>Requires Selling Plan:</strong> {product.requiresSellingPlan ? 'Yes' : 'No'}</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          <p><strong>Total Inventory:</strong> {product.totalInventory}</p>
          <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
          <p><strong>Vendor:</strong> {product.vendor}</p>
          </div>
        </div>
      );
    }
  
    const goToNextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const goToPreviousImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className='detail-image'>
        <div className='image50' style={{ position: 'relative' }}>
          {images.length > 1 && (
            <>
              <button onClick={goToPreviousImage} className='image-navigation-button' style={{ left: 0 }}>
                &lt;
              </button>
              <button onClick={goToNextImage} className='image-navigation-button' style={{ right: 0 }}>
                &gt;
              </button>
            </>
          )}
          <img
            className='image100'
            src={images[currentImageIndex].originalSrc}
            alt={images[currentImageIndex].altText || product.title}
            width="100%"
            height="100%"
          />
        </div>
        <div className='detail50'>
      <h2>{product.title}</h2>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Available for Sale:</strong> {product.availableForSale ? 'Yes' : 'No'}</p>
          <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <p><strong>Handle:</strong> {product.handle}</p>
          <p><strong>Is Gift Card:</strong> {product.isGiftCard ? 'Yes' : 'No'}</p>
          {product.onlineStoreUrl && <p><strong>Online Store URL:</strong> <a href={product.onlineStoreUrl} target="_blank" rel="noopener noreferrer">{product.onlineStoreUrl}</a></p>}
          <p><strong>Product Type:</strong> {product.productType}</p>
          <p><strong>Published At:</strong> {new Date(product.publishedAt).toLocaleString()}</p>
          <p><strong>Requires Selling Plan:</strong> {product.requiresSellingPlan ? 'Yes' : 'No'}</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          <p><strong>Total Inventory:</strong> {product.totalInventory}</p>
          <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
          <p><strong>Vendor:</strong> {product.vendor}</p>
      </div>
    </div>
  );
}

export default ProductDetailPage;
