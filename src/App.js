import React, { useState } from 'react';
import './App.scss';
import ProductCard from './components/ProductCard';
import Loading from './utils/Loading/Loading';

const App = ({ moduleData }) => {
  const [load, setload] = useState(false);
  return (
    <div>
      {!load && (
        <div>
          <ProductCard moduleData={moduleData} setload={setload} load={load} />
        </div>
      )}
      <div className="">{load && <Loading />}</div>
    </div>
  );
};
export default App;
