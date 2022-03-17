import { useState } from "react";
import axios from "axios";
import { setToken } from "./util/auth";

const login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { password, email, username, name } = user;

  const loginUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await axios.post("/api/v1/auth/login", {
        username: username,
        password: password,
      });
      setToken(res.data);
    } catch (err) {
      console.error(err);
    }
    setFormLoading(false);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", user);
      setToken(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="logo-container">
        <img className="logo" src="./img/west-mec.png" alt="west-mec" />
      </div>
      <form id="main-form">
        <div className="form-inputs">
          {isLogin ? (
            <>
              <div className="input-container">
                <div className="form-row">
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={username}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="input-container">
                <div className="form-row">
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Name (First Last)"
                    name="name"
                    onChange={handleChange}
                    value={name}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={username}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div className="form-row">
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                  />
                </div>
              </div>
            </>
          )}

          <button
            id={isLogin ? "login-submit-button" : "reg-submit-button"}
            type="submit"
            className="submit-button"
            style={{ cursor: "pointer" }}
            onClick={isLogin ? loginUser : registerUser}
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <button
            type="submit"
            id="swap-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
            style={{ cursor: "pointer" }}
          >
            {isLogin ? "Need to Register?" : "Already Have an Account?"}{" "}
          </button>
        </div>
      </form>
    </>
  );
};

export default login;
