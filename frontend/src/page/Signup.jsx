import React, { useState } from "react"
import "../css_style/page/sigup.css"
import { LuEye } from "react-icons/lu";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { api } from "../utils/api.js";
import { handleSuccess, handlePromise } from "../utils/toast.js";



function Signup() {
  // useState variable
  const [userData, setUserData] = useState(
    {
      name: "",
      DOB: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  )
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  //  importent variables

  const check_password = {
    length: userData.password.length >= 8,
    uppercasse: /[A-Z]/.test(userData.password),
    lowercasse: /[a-z]/.test(userData.password),
    number: /[0-9]/.test(userData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(userData.password),
  }
  const isStrong = check_password.length && check_password.uppercasse && check_password.lowercasse && check_password.number && check_password.special

  const isMatch = userData.confirmPassword &&
    userData.password === userData.confirmPassword;



  const changHander = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserData({ ...userData, [name]: value })



  }
  // console.log(userData)


  return (
    <div className='signup-container'>




      <div className='signup-container2'>
        <h2>Signup</h2>

        <div className='signup-sub-container'>

          <div className='signup-form-container'>
            <p className='signup-alogin'>Already login <span><Link className='link' to={"/login"}>Login</Link></span></p>
            <form action="">

              <div className='signup-input-container'>
                <label className='signup-label'>Name</label>
                <input
                  type="text"
                  className="signup-input"
                  name="name"
                  onChange={changHander}
                  placeholder='Enter Name'
                />
              </div>
              <div className='signup-input-container'>
                <label className='signup-label'>Date of Birth</label>
                <input
                  type="text"
                  className="signup-input"
                  name="DOB"
                  onChange={changHander}
                  placeholder='Enter Date of Birth 02/01/2004' />
              </div>
              <div className='signup-input-container'>
                <label className='signup-label'>Gender</label>
                <select
                  name="gender"
                  onChange={changHander}
                  className="signup-input"
                >
                  <option className='option-select' value="">Select Gender</option>
                  <option className='option-select' value="Male">Male</option>
                  <option className='option-select' value="Female">Female</option>
                  <option className='option-select' value="Other">Other</option>
                </select>


              </div>
              <div className='signup-input-container'>
                <label className='signup-label'>Email</label>
                <input
                  type="email"
                  className="signup-input"
                  placeholder='Enter Email'
                  name="email"
                  onChange={changHander}
                />
              </div>
              <div className='signup-input-container'>
                <label className='signup-label'>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="signup-input password"
                  placeholder='Enter Password'
                  name="password"
                  onChange={changHander}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEye /> : <RiEyeCloseFill />}
                </span>
                <div className="password-rules">

                  <div className="password-status">
                    <span className="password-strength-text">

                      {isStrong ? (
                        <>
                          <span className="success-icon">&#10003;</span> {" "}
                          Strong
                        </>
                      ) : (
                        <>
                          <span className="error-icon">&#10007;</span> {"  "}
                          Weak
                        </>
                      )}  Password

                    </span>
                  </div>

                  <div className="password-check-list">

                    <div className="password-check-item">

                      <span>
                        {check_password.length ? (<>
                          <span className="success-icon">&#10003;</span> {" "}
                        </>) : (<>
                          <span className="error-icon">&#10007;</span>
                        </>)}  Minimum 8 characters
                      </span>
                    </div>

                    <div className="password-check-item">

                      <span>

                        {check_password.uppercasse ? (<>
                          <span className="success-icon">&#10003;</span>
                        </>) : (<>
                          <span className="error-icon">&#10007;</span>
                        </>)}  Uppercase (A-Z)



                      </span>
                    </div>

                    <div className="password-check-item">

                      <span>
                        {check_password.lowercasse ? (<>
                          <span className="success-icon">&#10003;</span>
                        </>) : (<>
                          <span className="error-icon">&#10007;</span>
                        </>)}  Lowercase (a-z)
                      </span>


                    </div>

                    <div className="password-check-item">

                      <span>
                        {check_password.number ? (<>
                          <span className="success-icon">&#10003;</span>
                        </>) : (<>
                          <span className="error-icon">&#10007;</span>
                        </>)} Numbers (0-9)
                      </span>


                    </div>

                    <div className="password-check-item">

                      <span>
                        {check_password.special ? (<>
                          <span className="success-icon">&#10003;</span> {" "}
                        </>) : (<>
                          <span className="error-icon">&#10007;</span>
                        </>)}  Special symbols

                      </span>
                    </div>

                  </div>

                </div>

              </div>
              <div className='signup-input-container'>
                <label className='signup-label'>Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="signup-input conpassword"
                  placeholder='Enter Confirm Password'
                  name="confirmPassword"
                  onChange={changHander}
                />
                <span
                  className="eye-icon"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <LuEye />
                  ) : (

                    <RiEyeCloseFill />
                  )}
                </span>
                <div className="password-status">

  <span className="password-strength-text">

    {isMatch ? (
      <>
        <span className="success-icon">&#10003;</span> {"  "}
        Passwords Match
      </>
    ) : (
      <>
        <span className="error-icon">&#10007;</span> {"  "}
        Passwords Don't Match
      </>
    )}

  </span>

</div>
              </div>
              <button type='submit' className='signup-btm' >Signup</button>
            </form>
          </div>



        </div>


      </div>
    </div>
  )
}

export default Signup
