import GoogleAuthButton from "./AuthButtons/GoogleAuthButton";
import { useNavigate } from "react-router-dom";

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/index");
  };
  return (
    <section className="flex flex-col sm:w-[80%] mx-auto">
      <h1 className="text-4xl mb-5 font-semibold">Sign in to X</h1>
      <GoogleAuthButton />
      <span className="grid grid-cols-[45%_10%_45%] items-center justify-center my-3">
        <span className="border"></span>
        <p className="text-center">or</p>
        <span className="border"></span>
      </span>
      <form action="" className="flex flex-col space-y-8 ">
        <input
          type="email"
          name="password"
          required
          placeholder="Email Address"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
        />

        <button className="bg-accent text-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </section>
  );
};

export default SignInForm;
