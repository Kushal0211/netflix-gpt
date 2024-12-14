import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef();
    const email = useRef();
    const password = useRef();  
    const navigate = useNavigate();  
    const dispatch = useDispatch();

    const handleButtonLogic = () => {
        const message = checkValidData(email.current.value, password.current.value);
        console.log(message);
        setErrorMessage(message);

        if (message) return;

        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/140691320?s=400&u=94f2bdf4a5167147ed16637d52e3f357d95ba33e&v=4"
                      }).then(() => {
                        // Profile updated! updating the user one more time in the store
                        const {uid, email, displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({uid : uid, 
                          email : email, 
                          displayName : displayName,
                          photoURL : photoURL
                      }));
                      }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.code + " " + error.message);
                      });
                    console.log(user);
                    navigate("/browse");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage);
                    alert("Something went wrong");
                    // ..
                });

        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage);
                    alert("Login Credentials did not match");
                });

        }
    };
    const handleSignInLogic = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div>
            <Header />
            <div className=" absolute h-screen w-screen">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4690cab8-243a-4552-baef-1fb415632f74/web/IN-en-20241118-TRIFECTA-perspective_0b813abc-8365-4a43-a9d8-14c06e84c9f3_large.jpg"
                    alt="backgroundimage"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className=" absolute bg-black w-3/12 px-10 py-10 mx-auto right-0 left-0 my-28 text-white bg-opacity-60"
                onSubmit={(e) => e.preventDefault()}
            >

                <h1 className="text-3xl py-3 font-bold">{isSignIn ? "Sign In" : "Sign Up"}</h1>

                {!isSignIn && (<input type="text"
                    ref={name}
                    placeholder="Enter Your Full Name"
                    className="w-full px-6 py-4 my-4 rounded-md bg-slate-500 opacity-70 placeholder-white border border-white" />)
                }

                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 my-4 rounded-md bg-slate-500 opacity-70 placeholder-white border border-white" />

                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="w-full px-6 py-4 my-4 rounded-md  bg-slate-500 opacity-70 placeholder-white border border-white" />

                <p className="text-red-500 font-bold">{errorMessage}</p>

                <button className="bg-red-700 w-full px-6 py-3 my-4 rounded-md opacity-100 transition-all"
                    onClick={handleButtonLogic}
                >
                    {isSignIn ? "Sign In" : "Sign Up"}</button>

                <p className="my-3 px-3 font-bold cursor-pointer" onClick={handleSignInLogic}>
                    {isSignIn ? "New to Netflix? Sign Up now." : "Already a User? Sign In now."}</p>

            </div>
        </div>
    );
};

export default Login;