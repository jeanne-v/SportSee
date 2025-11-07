import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Profile from "./pages/Profile/index.jsx";
import Header from "./components/Header/index.jsx";

import "./styles/main.scss";

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Header />
    <Routes>
      <Route path="profile/:id" element={<Profile />} />
    </Routes>
  </Router>
);
