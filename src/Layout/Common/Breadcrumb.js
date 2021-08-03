import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ navArray }) {
  const breadcrumbLinks = navArray.map((link, index) => {
    // if it's the last item in the array it doesn't have a link to set
    if (index === navArray.length - 1) {
      return (
        <li key={index} className="breadcrumb-item active" aria-current="page">
          {link.name}
        </li>
      );
    } else {
      return (
        <li key={index} className="breadcrumb-item">
          <Link to={`${link.url}`}>{link.name}</Link>
        </li>
      );
    }
  });

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {breadcrumbLinks}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
