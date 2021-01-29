import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.auth);
  const { component: Component, path, ...rest } = props;
  return (
    <div>
      <div>
        <Route
          {...rest}
          render={() =>
            auth.isAuthenticated === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="./" />
            )
          }
        />
      </div>
    </div>
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateProps)(PrivateRoute);
