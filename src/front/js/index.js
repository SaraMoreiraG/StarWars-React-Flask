import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";

import Layout from "./layout";

const root = createRoot(document.getElementById("app"));

root.render(<Layout />);
