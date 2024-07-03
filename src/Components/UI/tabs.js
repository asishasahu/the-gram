import React from "react";
import "./style.css";

const Tabs = (props) => {
  return (
    <div className={`tabs`}>
      <ul className={`tabs__nav`}>
        {props.tabs.map((item) => (
          <li key={item.id} className={`tabs__item`}>
            <button
              className={`tabs__button ${
                props.selectedTab === item.id ? "active" : ""
              }`}
              onClick={() => props.onTabChange(item.id)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
