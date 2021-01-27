import React, { useEffect, useRef } from "react";
import { TweenMax, Power2 } from "gsap";

const Home = () => {
  const homeImg = useRef(null);
  const slider = useRef(null);
  const text = useRef(null);
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
          <div className="home-text" ref={text}>
            <h1>TIRA</h1>
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
