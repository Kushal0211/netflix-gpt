import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () =>{

    const [isSignIn, setIsSignIn] = useState(true);

    const email = useRef();
    const password = useRef();

    const handleButtonLogic = () => {
        console.log(email.current.value);
        console.log(password);
    };
    const handleSignInLogic = () => {
        setIsSignIn(!isSignIn);
    };

    return (
    <div>
        <Header/>
        <div className=" absolute h-screen w-screen">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4690cab8-243a-4552-baef-1fb415632f74/web/IN-en-20241118-TRIFECTA-perspective_0b813abc-8365-4a43-a9d8-14c06e84c9f3_large.jpg"
        alt="backgroundimage"
        className="w-full h-full object-cover"
        />
        </div>

        <form className=" absolute bg-black w-3/12 px-10 py-10 mx-auto right-0 left-0 my-28 text-white bg-opacity-60"
        onSubmit={(e) => e.preventDefault()} 
        >
            
            <h1 className="text-3xl py-3 font-bold">{isSignIn ? "Sign In" : "Sign Up"}</h1>
            
            {!isSignIn && (<input type="text" 
            placeholder="Enter Your Full Name" 
            className="w-full px-6 py-4 my-4 rounded-md bg-slate-500 opacity-70 placeholder-white border border-white"/>)
            }

            <input 
            ref={email}
            type="email" 
            placeholder="Email Address" 
            className="w-full px-6 py-4 my-4 rounded-md bg-slate-500 opacity-70 placeholder-white border border-white"/>
            
            <input 
            ref={password}
            type="password" 
            placeholder="Password" 
            className="w-full px-6 py-4 my-4 rounded-md  bg-slate-500 opacity-70 placeholder-white border border-white"/>

            <button className="bg-red-700 w-full px-6 py-3 my-4 rounded-md opacity-100 transition-all"
            onClick={handleButtonLogic}
            >
                {isSignIn ? "Sign In" : "Sign Up"}</button>

            <p className="my-3 px-3 font-bold cursor-pointer" onClick={handleSignInLogic}>
                {isSignIn ?  "New to Netflix? Sign Up now." : "Already a User? Sign In now." }</p>

        </form>
    </div>
    );
};

export default Login;