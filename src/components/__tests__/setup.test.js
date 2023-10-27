import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import App from './App'; // Adjust the import according to your file structure
import { gql } from '@apollo/client';

// Define your GraphQL mocks
const mocks = [
  {
    request: {
      query: gql`
        query GetCategories {
          collections(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `,
    },
    result: {
      data: {
        collections: {
          edges: [
            { node: { id: '1', title: 'Category 1' } },
            { node: { id: '2', title: 'Category 2' } },
          ],
        },
      },
    },
  },
];

test('renders app with category selector and product list', async () => {
  

  // Check if the header is rendered
  const headerElement = screen.getByText(/Magexo Shopify Products/i);
  expect(headerElement).toBeInTheDocument();

  // Wait for the category selector to load and check if it's rendered
  await waitFor(() => {
    const categorySelector = screen.getByText(/Category 1/i);
    expect(categorySelector).toBeInTheDocument();
  });

  // Check if the product list is rendered
  // Note: You might need to adjust this depending on how your product list is set up
  const productList = screen.getByTestId('product-list');
  expect(productList).toBeInTheDocument();
});
