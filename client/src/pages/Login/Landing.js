import React from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/actions/authActions";

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
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b>{" "}
                {auth.user.name ? auth.user.name.split(" ")[0] : null}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into a full-stack{" "}
                  <span style={{ fontFamily: "monospace" }}>
                    "decide the name of the app"
                  </span>{" "}
                  app 👏
                </p>
              </h4>
              <button
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
              </button>
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
