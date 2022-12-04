import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "./context/userContext";
import { Todo, Signup, Login } from "./components/pages";

const App = () => {
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
