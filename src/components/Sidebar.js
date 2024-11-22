import React from "react";
import {
  FaHome,
  FaGlobe,
  FaBriefcase,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li className="active">
          <FaHome className="icon" /> Home
        </li>
        <li>
          <FaGlobe className="icon" /> Public
        </li>
        <li className="shift-right">Questions</li>
        <li className="shift-right">Tags</li>
        <li className="shift-right">Users</li>
        <li>
          <FaBriefcase className="icon" /> Collectives
        </li>
        <li className="shift-right">Explore Jobs</li>
        <li>
          <FaBuilding className="icon" /> FIND JOBS
        </li>
        <li className="shift-right">Jobs</li>
        <li className="shift-right">Companies</li>
        <li>
          <FaUsers className="icon" /> Teams
        </li>
        <li className="shift-right">+ Create a Team</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
