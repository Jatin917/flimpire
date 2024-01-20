import React, { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { SignUp, SignIn } from '..';

function Auth() {
  const [isSignPage, setSignPage] = useState(true);
  return (
    <div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        className="p-2 bg-slate-500"
        onClick={
        () => {
          setSignPage((prev) => !prev);
          console.log('button clicked');
        }
        }
      >{isSignPage ? 'Sign IN' : 'SignUp'}
      </button>
      <div>
        {isSignPage ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}

export default Auth;
