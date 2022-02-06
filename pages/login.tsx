import Cookies from "js-cookie";
import { useState } from "react";
import { ApiLogin } from "../api";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, message } from "antd";

const Login = () => {
  const Router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: any) => {
    setLoading(true);
    e.preventDefault();
    ApiLogin({ email, password }, (data: any, error: any) => {
      setLoading(false);
      if (error) return message.error("Invalid credentials");
      Cookies.set("token", data.token);
      Cookies.set("client", JSON.stringify(data.user));
      Router.push("/");
    });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="stripe">
          <h1>CollageStore</h1>
        </div>
        <div className="right-side">
          <form onSubmit={handleLogin}>
            <p className="label">Email</p>
            <input
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <p className="label">Password</p>
            <input
              required
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            {/* <button type="submit">Login</button> */}
            <Button
              size="large"
              className="submit-btn"
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
            <div className="links-container">
              <p>Don't have an account?</p>
              <Link href="/signup">
                <p className="sign-up-link">Sign Up</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
