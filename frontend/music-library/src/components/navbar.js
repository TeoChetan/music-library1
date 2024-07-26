import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Contact us", path: "/contactUs" },
  
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const listItems = pages.map((page, index) => (
    <li key={index} className="px-3 py-2 cursor-pointer rounded hover:bg-sky-300">
      <Link to={page.path} className="text-white hover:text-black">
        {page.name}
      </Link>
    </li>
  ));

  return (
    <div className="container relative m-auto p-5 flex justify-between items-center bg-black">
      <div className="flex">
        <h1 className="text-xl font-bold text-gray-100 font-montserrat m-3">GrooveGallery</h1>
      </div>
      <div className="flex items-center mr-10">
        <nav className={isOpen ? "flex" : "hidden md:flex"}>
          <ul className="flex bg-black flex-col md:flex-row w-full md:w-auto shadow md:shadow-none text-center md:text-right mr-10">
            {listItems}
          </ul>
        </nav>
        <div className="flex items-center">
          
          
        </div>

      </div>
    </div>
  );
};

export default Navbar;
