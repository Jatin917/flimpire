import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';

function Modal({ open, videos, setOpen }) {
  return (
    <div className={`fixed top-0 left-0 w-full h-full items-center justify-center z-50 ${open ? 'flex' : 'hidden'}`}>
      <div className="bg-black bg-opacity-50 fixed w-[50%] h-[50%] flex items-center justify-center z-10">
        <div className="bg-white p-4 flex items-center justify-center rounded-lg max-w-lg">
          {/* <!-- Video Player --> */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="Trailer"
              className="absolute top-0 left-0 w-full h-full"
              src={open ? `https://www.youtube.com/embed/${videos?.results[0]?.key}?autoplay=1` : ''}
            />
          </div>

          {/* <!-- Close Button --> */}
          {/* eslint-disable-next-line react/button-has-type, jsx-a11y/control-has-associated-label */}
          <button className="text-black absolute top-0 right-0 -mr-4" onClick={() => setOpen(false)}>
            <IoCloseCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div onClick={() => setOpen(false)} className="bg-black bg-opacity-50 pointer fixed w-full h-full opacity-50 z-9" />
    </div>

  );
}

export default Modal;
