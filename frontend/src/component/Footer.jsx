import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterest, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-white text-3xl font-bold">
            book<span className="text-red-500">my</span>show
          </h2>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 text-2xl mb-4">
          <a href="#" className="hover:text-white transition duration-300">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <FaYoutube />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <FaPinterest />
          </a>
          <a href="#" className="hover:text-white transition duration-300">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-4" />

        {/* Copyright Text */}
        <p className="text-sm">
          Copyright © 2025 Bigtree Entertainment Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
