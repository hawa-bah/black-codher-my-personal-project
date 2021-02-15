import React from "react";
import NavBar from "../components/Navbar";

const About = () => {
  return (
    <div className="About-div">
      <NavBar />

      <div>
        <div>
          <br />
          <br />
        </div>
        <div className="about-text">
          <h4>What's TARI?</h4>
          <div>
            <p>
              TARI is a MERN stack application with the propose to make
              budgeting for trips easier.
            </p>
          </div>
        </div>

        <div className="about-text">
          <h4>How it works?</h4>
          <div>
            <p>
              Once you have created an account and logged in, you will land in
              your dashboard, where you will have various options. If it's your
              first time using the app, click "check your plans".
            </p>

            <p>
              In the plans page you will be able to create a new card by
              clicking the purple button. Decide a name for your trip. Choose
              how much you are planning to spend on each category and set a
              budget. Ready? Click "submit".
            </p>
            <p>
              You will be able to change your budgets or the name of the trip by
              clicking the edit icon.
            </p>
            <p>
              Now, during your trip, you can submit a transaction at the Expense
              Tracker page.
            </p>
            <p>
              On the same page, you will be able to view the stage of your
              budgets and a small summary on top about how well you are doing.
            </p>
            <p>
              And if you want to see the transactions you have submitted you can
              do so in the card below.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
