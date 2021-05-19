import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default React.memo(Loading);