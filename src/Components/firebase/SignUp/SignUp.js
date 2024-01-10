/* eslint-disable import/order */
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { app } from '../../../firebase';
import './SignUp.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPswd } from '../../../features/AuthSlice';
import { makingDataBase } from '../../../firestore';

const auth = getAuth(app);
function SignUp() {
  const { email, password } = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();

  function signUpUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {
        toast.success(`Created account with ${value.user.email}`);
        makingDataBase();
      })
      .catch((err) => {
        toast.error(` ${err.message}`);
      });
  }

  return (
    <div className="signUp">
      <div className="my-4">
        <h1 className="text-2xl text-rose-900 uppercase">Create An Account Here</h1>
      </div>

      <div className="boxSignUp uppercase">
        <lable>email</lable>
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
        <lable>password</lable>
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
          signUpUser();
        }}
      >create user
      </button>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
