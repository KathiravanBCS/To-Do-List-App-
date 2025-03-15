import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import todo from components
import { Todo_List } from "./Component/Todo_List";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* render todo list */}
    <Todo_List/>
  </StrictMode>
);
