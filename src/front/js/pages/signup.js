import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  async function createNewUser() {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationError("Registration failed. Please try again.");
    }
  }

  function validateForm() {
    let isValid = true;

    // Reset error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setRegistrationError("");

    // Validate name field
    if (user.user_name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }

    // Validate email field
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      setEmailError("Email is invalid");
      isValid = false;
    }

    // Validate password field
    if (user.password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      isValid = false;
    }

    return isValid;
  }

  return (
    <div className="container mt-2">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-body p-3 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-4 text-uppercase">Register</h2>

                <div className="form-outline form-white mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    onChange={(e) => {
                      setUser({ ...user, user_name: e.target.value });
                      setNameError("");
                    }}
                  />
                  {nameError && <div className="text-danger">{nameError}</div>}
                </div>

                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="E-mail"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                      setEmailError("");
                    }}
                  />
                  {emailError && (
                    <div className="text-danger">{emailError}</div>
                  )}
                </div>

                <div className="form-outline form-white mb-4">
                  <input
                    type="password"
                    id="typeEmailX"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                      setPasswordError("");
                    }}
                  />
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}
                </div>
                {registrationError && (
                  <div className="text-danger">{registrationError}</div>
                )}
                <Button
                  variant="outline-warning"
                  className="mt-2"
                  onClick={() => createNewUser()}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
