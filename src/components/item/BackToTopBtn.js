import React from 'react';

const BackToTopBtn = ({ id, position, mobile }) => {
  return (
    <div className={mobile}>
      {((id == 'ikhokha-register-old' && position == 'top') ||
        ((id == 'ikhokha-register-old' || id == 'accessories-old') &&
          position == 'bottom')) && (
        <>
          <a href="#top">
            <span>Back to Top</span>
            <span class="UpArrow"></span>
          </a>
        </>
      )}
    </div>
  );
};

export default BackToTopBtn;
