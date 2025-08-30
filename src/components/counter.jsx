import React from 'react';
import useStore from '../store';

function Counter(props) {

    // This means that this component will be rerendered when the store state.count state is updated,
    // but it will ignore any other data that wasn’t specified in this selector function.

  const count = useStore((state) => state.count);
  return (
    <div className="counter-container">
      <span className="counter-label">Current Count:</span> <span className="counter-value">{count}</span>
    </div>
  );
}

export default Counter;