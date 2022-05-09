import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import { useUpdateUserName } from "../../UserContext";

export default function SignOut() {
  const navigate = useNavigate();
  const updateUserName = useUpdateUserName();

  useEffect(() => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("id");
    localStorage.removeItem("user_name");
    axiosInstance.defaults.headers["Authorization"] = null;
    updateUserName(null);
    navigate("/");
  });
  return <div>Logout</div>;
}
