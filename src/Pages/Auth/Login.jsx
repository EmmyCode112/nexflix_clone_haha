import React, { useState } from "react";
import "./Login.css"; // Assuming this CSS file exists
import logo from "@/assets/logo.png"; // Adjust path as per your project structure
import { Button } from "../../components/Button"; // Adjust path as per your project structure
import loader from "@/assets/netflix_spinner.gif"; // Adjust path as per your project structure
import { signIn, signUp } from "../../firebase"; // Adjust path as per your project structure

const Login = () => {
  const [userState, setUserState] = useState("sign in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setLoading(true); // <--- Set loading to true AT THE BEGINNING of the async operation

    if (userState === "sign in") {
      try {
        await signIn(email, password);
        // If you have any post-sign-in logic here that needs to happen while loading, keep it.
        // Otherwise, the `setLoading(false)` in finally is sufficient.
      } catch (error) {
        console.error("Error signing in:", error);
        setErrorMessage(
          error.message || "Failed to sign in. Please check your credentials."
        );
      } finally {
        setLoading(false); // <--- Set loading to false when the async operation is DONE (success or failure)
      }
    } else {
      // Sign Up state
      try {
        await signUp(name, email, password);
        // Similar to sign-in, any post-sign-up logic.
      } catch (error) {
        console.error("Error signing up:", error);
        setErrorMessage(
          error.message || "Failed to sign up. Please try again."
        );
      } finally {
        setLoading(false); // <--- Set loading to false when the async operation is DONE (success or failure)
      }
    }
  };

  React.useEffect(() => {
    // Reset form fields when switching between sign in and sign up
    setEmail("");
    setPassword("");

    if (userState === "sign up") {
      setName(""); // Reset name field for sign up

      setErrorMessage(""); // Clear error message when switching states
    }
  }, [userState]);

  return loading ? (
    <div className="loading-container w-full h-[100vh] flex items-center justify-center bg-black z-10">
      <img src={loader} alt="Loading..." className="loading-spinner w-[60px]" />
    </div>
  ) : (
    <div className="h-screen flex flex-col items-center justify-center bg-cover bg-center login">
      <img
        src={logo}
        alt="Netflix Logo"
        className="w-[150px] absolute top-5 left-5"
      />
      <div className="flex items-center justify-center h-full w-full ">
        <div className="w-[100%] max-w-[450px] bg-black/75 rounded">
          <h1 className="text-[32px] font-medium">
            {userState === "sign in" ? "Sign In" : "Sign Up"}
          </h1>
          <form className="">
            {userState === "sign in" ? (
              ""
            ) : (
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[45px] bg-[#333] text-white placeholder:text-[15px]"
              />
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Johndoe@gmail.com"
              className="w-full h-[45px] bg-[#333] text-white placeholder:text-[15px]"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-[45px] bg-[#333] text-white placeholder:text-[15px]"
            />

            <Button
              onClick={handleSubmit}
              className="w-full border-0 outline-0 bg-[#e50914] login-btn justify-center rounded-[4px]"
              label={userState === "sign in" ? "Sign In" : "Sign Up"}
            />
            <div className="flex items-end justify-between text-[#b3b3b3] text-[13px]">
              <div className="flex items-end gap-2 ">
                <input
                  type="checkbox"
                  className="w-[18px] h-[18px]"
                  id="remember"
                />
                <label htmlFor="remember" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>

          {userState === "sign in" ? (
            <p className="text-[#737373] flex gap-1.5 switch">
              New to NetFlix?{" "}
              <span
                className="cursor-pointer text-white font-medium hover:underline"
                onClick={() => setUserState("sign up")}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p className="text-[#737373] flex gap-1.5 switch">
              Already have account?{" "}
              <span
                className="cursor-pointer text-white font-medium hover:underline"
                onClick={() => setUserState("sign in")}
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
