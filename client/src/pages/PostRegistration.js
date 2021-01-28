import React, { useEffect, useRef } from "react";
import { TweenMax, Power2 } from "gsap";

const PostRegister = () => {
  const slider2 = useRef(null);
  useEffect(() => {
    TweenMax.fromTo(
      slider2.current,
      7,
      { top: "70%", left: "20%" },
      { top: "10%", left: "50%" }
    );
  }, []);
  return (
    <div className="post-register-div">
      {/* <div className="slider2"></div> */}
      <div style={{ backgroundColor: "rgb(2, 2, 53)" }}>
        <div>
          <h1>Successful Registration</h1>
        </div>
        <div ref={slider2}>
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_1c8Jqu.json"
            background="transparent"
            speed="0.5"
            style={{ width: "500px" }}
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
};

export default PostRegister;
