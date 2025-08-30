import React from 'react';
import useStore from '../store';

function Controls(props) {
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div className="controls-container">
      <button className="controls-btn controls-increment" type="button" onClick={increment}>+</button>
      <button className="controls-btn controls-decrement" type="button" onClick={decrement}>-</button>
    </div>
  );
}

export default Controls;