import React from 'react';
import './App.scss';
import ProductCard from './components/ProductCard';

const App = ({ moduleData }) => {
  return (
    <div>
      <div>
        <ProductCard moduleData={moduleData} />
      </div>
    </div>
  );
};
export default App;
