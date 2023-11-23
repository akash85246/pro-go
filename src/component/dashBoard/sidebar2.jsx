import React, { useState } from "react";
import "./sidebar.css"; // Import your existing styles
import boardImg from "../../assets/boardImg.svg";
import member from "../../assets/member.svg";
import setting from "../../assets/setting.svg";
import table from "../../assets/table.svg";
import calender from "../../assets/calender.svg";
import logo from "../../assets/logo.svg";
import home from "../../assets/homeIcon.svg";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar2(props) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(props.selected);

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
    navigate(`/${item}`);
    console.log(selectedItem);
  };

  const isItemSelected = (item) => selectedItem === item;

  return (
    <>
      <div className="sidebar2Container">
        <ul>
          <li onClick={() => handleItemClick("home")}>
            <img src={logo} alt="Logo Icon" />
          </li>
          <li
            className={isItemSelected("home") ? "selected" : ""}
            onClick={() => handleItemClick("dashboard")}
          >
            <img src={home} alt="Home Icon" />
          </li>
          <li
            className={isItemSelected("board") ? "selected" : ""}
            onClick={() => handleItemClick("board")}
          >
            <img src={boardImg} alt="Board Icon" />
          </li>
          <li
            className={isItemSelected("member") ? "selected" : ""}
            onClick={() => handleItemClick("member")}
          >
            <img src={member} alt="Member Icon" />
          </li>
          <li
            className={isItemSelected("setting") ? "selected" : ""}
            onClick={() => handleItemClick("setting")}
          >
            <img src={setting} alt="Setting Icon" />
          </li>
          <li
            className={isItemSelected("table") ? "selected" : ""}
            onClick={() => handleItemClick("workspace")}
          >
            <img src={table} alt="Table Icon" />
          </li>
          <li
            className={isItemSelected("calender") ? "selected" : ""}
            onClick={() => handleItemClick("calender")}
          >
            <img src={calender} alt="Calendar Icon" />
          </li>
        </ul>
      </div>
    </>
  );
}
