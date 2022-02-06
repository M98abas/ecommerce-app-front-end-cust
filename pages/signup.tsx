import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { ApiRegister } from "../api";
import Link from "next/link";

const register = () => {
  const [email, setEmail]: any = useState("");
  const [fullname, setFullName]: any = useState("");
  const [city, setCity]: any = useState("");
  const [address, setAddress]: any = useState("");
  const [phone, setPhone]: any = useState("");
  const [password, setPassword]: any = useState("");
  const router = useRouter();
  const handleRegister = (e: any) => {
    e.preventDefault();
    ApiRegister(
      { email, fullname, city, address, phone, password },
      (data: any, error: any) => {
        if (error) return alert(error);
        Cookies.set("registerToken", data.token);
        router.push("/login");
      }
    );
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="stripe">
          <h1>CollageStore</h1>
        </div>
        <div className="right-side">
          <form onSubmit={handleRegister}>
            <p className="label">Email</p>
            <input
              required
              placeholder="Example@something.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <p className="label">FullName</p>
            <input
              required
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
            />
            <p className="label">city</p>
            <input
              required
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
            />
            <p className="label">Address</p>
            <input
              required
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
            />
            <p className="label">Phone Number</p>
            <input
              required
              placeholder="00000000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <button type="submit">Sign Up</button>
            <div
              className="links-container"
              style={{ marginTop: 10, alignSelf: "center" }}
            >
              <p>Already have an account?</p>
              <Link href="/login">
                <p className="sign-up-link">Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
