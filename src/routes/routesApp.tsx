/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Main from "../pages/Main";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/thenewsonline" element={<Login />} />
        <Route path="/thenewsonline/dashboard" element={<Main />} />
        <Route path="/thenewsonline/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}