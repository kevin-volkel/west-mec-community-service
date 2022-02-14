import { useState } from "react";
import axios from 'axios'

const login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  };

  const {password, email, username} = user;

  const loginUser = async (e) => {
    e.preventDefault();
    try{
      const user = await axios.post('/api/v1/auth/login', {username: username, password: password})
      console.log(user)
      setUser({email: "", username: "", password: ""})
    } catch (err) {
      console.error(err)
    }
  }

  const registerUser = async (e) => {
    e.preventDefault();
    try{
      const user = await axios.post('/api/v1/auth/register', {username: username, password: password, email: email})
      console.log(user)
      setUser({email: "", username: "", password: ""})
    } catch (err) {
      console.error(err)
    }
  }

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
            onClick={isLogin ? loginUser : registerUser}
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <button
            id="swap-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Need to Register?" : "Already Have an Account?"}{" "}
          </button>
        </div>
      </form>
    </>
  );
};

export default login;
