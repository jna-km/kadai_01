

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 border-t">
      &copy; {new Date().getFullYear()} 予約くん All rights reserved.
    </footer>
  );
};

export default Footer;
