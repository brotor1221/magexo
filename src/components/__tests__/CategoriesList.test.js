import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery, gql } from '@apollo/client';
import CategoriesList from '../CategoriesList';
import '@testing-library/jest-dom';


// Mock the GraphQL query and its response
jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    useQuery: jest.fn(),
  };
});

describe('CategoriesList', () => {
  it('renders without error', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: {
        collections: {
          edges: [
            { node: { id: '1', title: 'Category 1' } },
            { node: { id: '2', title: 'Category 2' } },
          ],
        },
      },
    });

    render(<CategoriesList />);

    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    useQuery.mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });

    render(<CategoriesList />);
    expect(screen.getByText('Loading categories...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: { message: 'An error occurred' },
      data: null,
    });

    render(<CategoriesList />);
    expect(screen.getByText('Error loading categories: An error occurred')).toBeInTheDocument();
  });
});
