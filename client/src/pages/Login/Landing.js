import React from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/actions/authActions";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import accountImg from "./account-logo.png";

const Landing = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log("USER", auth);
  console.log(auth.user.id);
  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    if (!auth.user.name) {
      window.location.href = "./about";
    }
  };
  return (
    <div className="Landing-div">
      <div>
        <div className="valign-wrapper">
          <div className="landing-container ">
            <div className="landing-content">
              <div className="action">
                <Button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  onClick={(e) => clickLogout(e)}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </Button>
              </div>
              <img
                src="/images/account-logo.png"
                alt="user-icon"
                className="img-account"
              ></img>
              <div className="landing-text">
                <h4>
                  <b>Hey there,</b>{" "}
                  {auth.user.name ? auth.user.name.split(" ")[0] : null}
                  <p>
                    Welcome to{" "}
                    <span style={{ fontFamily: "monospace" }}>
                      "decide the name of the app"
                    </span>{" "}
                    👏
                  </p>
                </h4>
              </div>
              <div className="landing-options">
                <div>
                  <Link to="/budgetInfo" className="landing-link">
                    Check your plans
                  </Link>
                </div>
                <div>
                  <Link to="/expenseTracker" className="landing-link">
                    Track your expenses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Landing);
