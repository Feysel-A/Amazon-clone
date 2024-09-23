import React, { useContext, useState } from "react";
import logo from "../../assets/images/newLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./SignIn.module.css";
import { auth } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const navigate = useNavigate();
  const NavStateData = useLocation();
  // console.log(NavStateData);
  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name == "signin") {
      // firebase Auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(NavStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.log(err);
          setLoading({ ...loading, signIn: false });
          setError(err.message);
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(NavStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.log(err);
          setLoading({ ...loading, signUp: false });
          setError(err.message);
        });
    }
  };
  // console.log(user);
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {NavStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {NavStateData.state.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to AMAZON FAKE CLONE conditions of use and
          sale.Please see our privacy Notice,our cookies Notice and our
          Interst-based Ads Notice.
        </p>
        {/* creare account button */}
        <button
          type="submit"
          onClick={authHandler}
          name="signUp"
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
