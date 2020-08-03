import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center w-56 bg-gray-900 text-white">
      <div className="flex justify-center items-center h-20 w-full">
       Blog
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="p-5 w-full text-center hover:bg-gray-800">
          <Link to="/">Home</Link>
        </div>
        <div className="p-5 w-full text-center hover:bg-gray-800">
          <Link to="/blogs">Blogs</Link>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
