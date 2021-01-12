import React from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Start using
              <span style={{ fontFamily: "monospace" }}>"app name"</span> and ..
              maybe add a fancy slogan later:)
            </h4>
            <p className="flow-text grey-text text-darken-1">
              "and some sentences here and there"
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  minWidth: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn  btn-large waves-effect waves-light hoverable violet accent-3 white-text"
              >
                Create an account
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
