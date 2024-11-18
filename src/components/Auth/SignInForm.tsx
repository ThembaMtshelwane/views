import { FormEvent } from "react";
import { useUser } from "../../api/users";
import GoogleAuthButton from "./AuthButtons/GoogleAuthButton";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../definitions";

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { authUser } = useUser();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginData = Object.fromEntries(formData.entries()) as unknown as Auth;

    console.log("log ", loginData);

    const res = await authUser(loginData);
    if (res?.success) {
      navigate("/index");
    } else {
      console.error("Cannot authenticate account:");
    }
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
      <form onSubmit={handleLogin} className="flex flex-col space-y-8 ">
        <input type="email" name="email" required placeholder="Email Address" />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
        />

        <button className="bg-accent text-primary">Login</button>
      </form>
    </section>
  );
};

export default SignInForm;
