import React, { useEffect, useRef } from "react";
import { TweenMax, Power2 } from "gsap";

const Home = () => {
  const homeImg = useRef(null);
  const slider = useRef(null);
  const text = useRef(null);
  const text2 = useRef(null);
  useEffect(() => {
    TweenMax.fromTo(
      homeImg.current,
      2,
      { height: "0%" },
      { height: "100vh", ease: Power2.easeInOut }
    );
    TweenMax.fromTo(homeImg.current, 3.2, { width: "100%" }, { width: "80%" });
    TweenMax.fromTo(slider.current, 1.2, { width: "100%" }, { width: "80%" });
    TweenMax.fromTo(
      text.current,
      1.2,
      { top: "100%", left: "5%" },
      { top: "60%", left: "5%" }
    );
    TweenMax.fromTo(
      text2.current,
      1.2,
      { top: "10%", left: "90%" },
      { top: "15%", left: "70%" }
    );
  }, []);
  return (
    <>
      <div className="top-home">
        <div className="home-img-box" ref={homeImg}>
          <img
            className="home-img"
            src="/images/save-money.jpg"
            alt="home-img"
          />
          <div className="home-text links-div" ref={text2}>
            <div className="links-box">
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_frdtxW.json"
                background="transparent"
                speed="0.5"
                style={{
                  width: "300px",
                  height: "300px",
                  position: "absolute",
                  left: "-70%",
                  top: "-60%",
                  zIndex: -1,
                }}
                loop
                autoplay
              ></lottie-player>
              <a
                style={{ color: " black", textDecoration: "none", zIndex: 4 }}
                className="links"
                href="/login"
              >
                Log in
              </a>
            </div>
            <div>
              <a
                style={{ color: " black", textDecoration: "none", zIndex: 4 }}
                className="links"
                href="/register"
              >
                Create an account
              </a>
            </div>
          </div>
          <div className="home-text" ref={text}>
            <h1>TARI</h1>
            <div>
              <h1>Budget ahead</h1>
              <h4>Travel more</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="slider" ref={slider}></div>
    </>
  );
};

export default Home;
