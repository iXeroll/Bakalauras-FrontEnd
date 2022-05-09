import React, { useState, useContext } from "react";

const UserContext = React.createContext();
const UpdateUserNameContext = React.createContext();

export const useUserName = () => {
  return useContext(UserContext);
};

export const useUpdateUserName = () => {
  return useContext(UpdateUserNameContext);
};

export const UserProvider = ({ value, children }) => {
  const [user, setUser] = useState(value);
  return (
    <UserContext.Provider value={localStorage.getItem("user_name")}>
      <UpdateUserNameContext.Provider value={setUser}>
        {children}
      </UpdateUserNameContext.Provider>
    </UserContext.Provider>
  );
};
