import React from "react";
import CategoryList from "./_components/CategoryList";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-4">
      <div>
        <CategoryList />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default Layout;
