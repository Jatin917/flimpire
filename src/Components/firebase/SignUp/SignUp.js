/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { app } from '../../../firebase';
import './SignUp.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPswd } from '../../../features/AuthSlice';
import { useMakingDatabase } from '../../../firestore';

const auth = getAuth(app);
function SignUp() {
  const { email, password, fvrtList, wishList } = useSelector((store) => store.userSlice);
  console.log(email, password, fvrtList, wishList);
  const dispatch = useDispatch();

  function signUpUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        toast.success(`Created account with ${value.user.email}`);
        console.log('function executed start');
        const { uid } = value.user;
        localStorage.setItem('uid', uid);
        useMakingDatabase(email, password, wishList, fvrtList);
        console.log('function execution completed');
      })
      .catch((err) => {
        console.log(err);
        toast.error(` ${err.message}`);
      });
  }

  return (
    <div className="signUp">
      <div className="my-4">
        <h1 className="text-2xl text-rose-900 uppercase">Create An Account Here</h1>
      </div>

      <div className="boxSignUp uppercase">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>email</label>
        <input
          autoComplete="off"
          required
          className="border-solid border-2 border-black text-black"
          value={email}
          type="email"
          name="email"
          onChange={(event) => dispatch(setEmail(event.target.value))}
        />
      </div>

      <div className="boxSignUp uppercase">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>password</label>
        <input
          autoComplete="off"
          required
          className="border-solid border-2 border-black text-black"
          value={password}
          id="pass"
          type="password"
          name="password"
          onChange={(event) => dispatch(setPswd(event.target.value))}
        />
      </div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        className="bg-stone-800 px-3 py-1 rounded uppercase m-6 singUpbtn text-white"
        onClick={() => {
          console.log('calling the sign up function');
          signUpUser();
        }}
      >create user
      </button>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
