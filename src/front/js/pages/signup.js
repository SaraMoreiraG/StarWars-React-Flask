import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const Signup = () => {
  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  async function createNewUser() {
    const response = await fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  }

  return (
    <div className="container mt-2">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="card bg-dark text-white">
            <div className="card-body p-3 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-4 text-uppercase">Register</h2>

                <div className="form-outline form-white mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    onChange={(e) =>
                      setUser({ ...user, user_name: e.target.value })
                    }
                  />
                </div>

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
