import React, { useEffect } from "react";
// import "./Dropdown.css";
import { HashLink } from "react-router-hash-link";

const MenuItems = [
  {
    title: "Adventure",
    path: "/Categories",
    hash: "#Adventure",
    cName: "dropdown-link",
  },
  {
    title: "Drama",
    path: "/Categories",
    hash: "#Drama",
    cName: "dropdown-link",
  },
  {
    title: "Horror",
    path: "/Categories",
    hash: "#Horror",
    cName: "dropdown-link",
  },
  {
    title: "Self-help",
    path: "/Categories",
    hash: "#self-help",
    cName: "dropdown-link",
  },
  {
    title: "Love",
    path: "/Categories",
    hash: "#Love",
    cName: "dropdown-link",
  },
];
const Dropdown = (props) => {
  return (
    <>
      <ul className="test">
        {MenuItems.map((item, index) => (
          <>
            <li key={index} className="dropdown-link">
              <HashLink
                className="dropdown-link"
                to={item.path + item.hash}
                scroll={(el) =>
                  el.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    duration: 4000,
                  })
                }
              >
                {item.title}
              </HashLink>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};
export default Dropdown;
