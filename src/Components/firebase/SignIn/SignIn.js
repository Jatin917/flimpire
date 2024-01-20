/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../../firebase';
import './SignIn.css';

// eslint-disable-next-line import/order
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function signUpUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        toast.success(`signed in as ${value.user.email}`);
        console.log('value of value', value);
        const uid = value?.user?.uid;
        console.log('uid is ', uid);
        localStorage.setItem('uid', uid);
        navigate(`/profile/${uid}`);
        // uploadingData(email,password);
        // setLogged(!logged);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(`${error}`);
        console.log(error);
      });
  }

  // sign out function
  function signout() {
    signOut(auth).then(() => {
      toast.success('Sign Out Successfully');
      console.log('sign out successfully');
      // Sign-out successful.
    }).catch((err) => {
      // An error happened.
      console.log('problem in signing you out successfully');
      toast.error(`Somethign went wrong ${err}`);
    });
  }

  return (
    <div className="signUp">

      <div className="my-4">
        <h1 className="text-2xl text-rose-900">Log In Here</h1>
      </div>

      <div className="boxSignUp uppercase">
        <lable>email</lable>
        <input
          autoComplete="off"
          required
          className="rounded text-black border-solid border-2 border-black"
          value={email}
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="boxSignUp uppercase">
        <lable>password</lable>
        <input
          autoComplete="off"
          required
          className="rounded text-black border-solid border-2 border-black"
          value={password}
          id="pass"
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button
        className="bg-stone-800 px-3 py-1 rounded uppercase m-6 singUpbtn text-white"
        onClick={signUpUser}
      >Sign In user
      </button>
      <button
        className="bg-stone-800 px-3 py-1 rounded uppercase m-6 singUpbtn text-white"
        onClick={signout}
      >Sign Out
      </button>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
