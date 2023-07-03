import getWorldRouter from "./experience";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const worldPath = "/world";

  return (
    <BrowserRouter>
      <Routes>
        {getWorldRouter({ worldPath })}
        <Route path="/*" element={<Navigate to={worldPath} replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
