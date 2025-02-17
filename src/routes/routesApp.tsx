/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Main from "../pages/Main";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/thenews" element={<Login />} />
        <Route path="/thenews/dashboard" element={<Main />} />
        <Route path="/thenews/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}