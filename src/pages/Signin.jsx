import { Link } from "react-router-dom";

export const Signin = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1>Signin</h1>
        <form>
          <label htmlFor="">Email:</label>
          <input type="email" name="" id="" />
          <label htmlFor="">Password</label>
          <input type="password" name="" id="" />
        </form>
        <Link to={"/signup"}>Create new account?</Link>
      </div>
    </div>
  );
};
