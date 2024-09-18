import React from "react";
import { useNavigate } from 'react-router-dom';
import "./AdminHeader.scss";
import logoImage from "../../../user/assets/images/logo.svg";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="adminHeaderMain">
        <div className="adminHeaderContainer">
          <div className="logo">
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;


