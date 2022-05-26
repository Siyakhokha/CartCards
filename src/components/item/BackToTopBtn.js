import React from 'react';

const BackToTopBtn = ({ id, position, mobile }) => {
  return (
    <div className={mobile}>
      {((id == 'ikhokha-register' && position == 'top') ||
        ((id == 'ikhokha-register' || id == 'accessories') &&
          position == 'bottom')) && (
        <>
          <a href="#top">
            Back to top <span class="UpArrow"></span>
          </a>
        </>
      )}
    </div>
  );
};

export default BackToTopBtn;
