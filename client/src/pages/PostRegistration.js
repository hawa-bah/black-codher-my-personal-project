import React, { useEffect, useRef } from "react";
import { TweenMax, Power2 } from "gsap";

const PostRegister = () => {
  const slider2 = useRef(null);
  useEffect(() => {
    TweenMax.fromTo(
      slider2.current,
      1,
      { height: "0%" },
      { height: "100vh", ease: Power2.easeInOut }
    );
  }, []);

  setTimeout(() => {
    window.location.href = "./login";
  }, 1500);
  return (
    <div className="post-register-div" ref={slider2}>
      <div style={{ backgroundColor: "rgb(2, 2, 53)" }}>
        <div className="title-registration">
          <h1>You have registred !</h1>
        </div>
        <div className="slider2">
          <div>
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_1c8Jqu.json"
              background="transparent"
              speed="0.5"
              style={{
                // minWidth: "300px",
                position: "absolute",
                left: "10%",
                top: "20%",
                zIndex: 5,
              }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRegister;
