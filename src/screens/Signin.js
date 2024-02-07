import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Button({ value, signIn }) {
  console.log(value);
  return (
    <button
      onClick={signIn}
      className="mt-6 transition transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
    >
      {value}
    </button>
  );
}

function Input({
  type,
  id,
  name,
  label,
  placeholder,
  autofocus,
  value,
  onChange,
}) {
  return (
    <label className="text-gray-500 block mt-3">
      {label}
      <input
        autoFocus={autofocus}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => e.target.value}
        placeholder={placeholder}
        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
      />
    </label>
  );
}

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      console.log(email, password, "hello");
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        console.error(error);
      }
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        if (window.location.pathname !== "/home") {
          navigate("/");
        }
      } else {
        navigate("/Signin");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>
        <label className="text-gray-500 block mt-3">
          Email Address
          <input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="me@example.com"
            autoFocus={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </label>
        <label className="text-gray-500 block mt-3">
          Password
          <input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
          />
        </label>
        <Button value="Submit" signIn={signIn} />
        <Button value="Sign in with Google" signIn={signInWithGoogle} />
      </div>
    </div>
  );
}

export default Signin;
