import { createRoot } from "react-dom/client";
import Profile from "./pages/Profile/index.jsx";

import "./styles/main.scss";

const root = createRoot(document.getElementById("root"));
root.render(<Profile />);
