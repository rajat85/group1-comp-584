import React from 'react'
import TheContent from './the-content.component';
import TheHeader from './top-header.component';
import TheFooter from './the-footer.component';

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
}

export default TheLayout
