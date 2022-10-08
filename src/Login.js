import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";
import UserContext from "./usercontext";

function Login() {
  let contextData = useContext(UserContext);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      role: "",
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const user = await axios.post(`${config.api}`, values);
        localStorage.setItem("react_app_token", user.data.token);
        alert(user.data.message);
        contextData.setUserName(values.username);
        if (user.data.message === `Successfully Logged In!!`) {
          console.log(values.role);
          if (values.role === "Admin") {
            navigate("/admin-dashboard");
          } else if (values.role === "User") {
            navigate("/dashboard");
          } else {
            alert("Please try Admin/User (Case Sensitive)");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container">
      <h1 className="text-danger">Book My Show</h1>
      <div className="col">
        <div className="row">
          <form onSubmit={formik.handleSubmit}>
            <div class="mb-3">
              <label for="username" class="form-label">
                Enter Role (Admin/User)
              </label>
              <input
                type="text"
                class="form-control text-capitalize"
                id="role"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              />
            </div>

            <div class="mb-3">
              <label for="username" class="form-label">
                UserName
              </label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p className="form-label">
                <Link to="/resetpassword"> Forget Password?</Link>
              </p>
            </div>

            <button type="submit" class="btn btn-danger">
              Submit
            </button>

            <div class="mb-3">
              <p class="form-label">
                Don't have account,<Link to="/register">Click here</Link> to
                SignUP
              </p>
            </div>
          </form>
        </div>
                <div>
                  For Testing:<br/>
                  Role: User<br/>
                  username:kumar<br/>
                  password: abcd12345<br/>
                    Role: Admin<br/>
                  username: navii<br/>
                  password: 12345abcd<br/>
                  </div>
      </div>
    </div>
  );
}

export default Login;