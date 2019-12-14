import React from 'react';

const ErrorsList = ({errors, id}) => {
  return (
    <ul style={{ "color": "red" }}>
      {errors.map((error, idx) => <li key={`error-${idx}_${id}`}>{error}</li>)}
    </ul>
  );
};

export default ErrorsList;
