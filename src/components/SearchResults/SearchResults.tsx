import React, { Component } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';

const data = [
  { id: 1, country: 'Norway' },
  { id: 2, country: 'Sweden' },
  { id: 3, country: 'Denmark' },
  { id: 4, country: 'Finland' },
];

const fuse = new Fuse(data, {
  keys: ['country'],
});

const query = 'sw';

const results = fuse.search(query);
console.log(results);

export const SearchResults: React.FC = () => {
  return (
    <>
      <ul>
        {results.map((result, i) => {
          return <li key={result.item.id}>{result.item.country}</li>;
        })}
      </ul>
    </>
  );
};
