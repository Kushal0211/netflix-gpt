import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className=" absolute w-screen z-10 bg-gradient-to-b from-black px-10 py-4 flex justify-between">
            <img
                className="w-44"
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="logo"
            />

            {user && <div className="w-48 flex justify-evenly">
                <div>
                    <button
                        className="bg-red-500 px-2 py-2 my-3 rounded-md text-white text-sm"
                        onClick={handleSignOut}
                    >Sign Out</button>
                </div>
                <img
                    className="w-12 h-12 rounded-full my-1"
                    alt="user photo"
                    src={user?.photoURL}
                />
            </div>}
        </div>
    );
}

export default Header;