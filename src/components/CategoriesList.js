import React from 'react';
import { useQuery, gql } from '@apollo/client';

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



function CategoriesList() {
  const { loading, data, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {data.collections.edges.map(category => (
          <li key={category.node.id}>{category.node.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;