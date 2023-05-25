import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { Context } from "../store/appContext";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  async function loginUser() {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem("token", token);

        // Call getUser and wait for it to complete
        await actions.getUser();

        navigate("/private");
      } else if (response.status === 403) {
        setLoginError("Invalid email or password");
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Login failed. Please try again.");
    }
  }

  return (
    <div className="container mt-2">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-body p-3 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-4 text-uppercase">LogIn</h2>

                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="E-mail"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-outline form-white mb-4">
                  <input
                    type="password"
                    id="typeEmailX"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>

                {loginError && <div className="text-danger">{loginError}</div>}

                <Button
                  variant="outline-warning"
                  className="mt-2"
                  onClick={() => loginUser()}
                >
                  LogIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
