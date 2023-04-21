import * as React from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/scene/Profile";
import { Link, Route, Routes } from "react-router-dom";
import NotFound from "./components/scene/NotFound";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/RequireAuth";
import ContentForm from "./components/ContentForm";
import EditContentForm from "./components/EditContentForm";
import Logout from "./components/Logout";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">singin</Link>
          </li>
          <li>
            <Link to="/signup">singup</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/add">add episode</Link>
          </li>
          <li>
            <Link to="/notfound">notfound</Link>
          </li>
          <li>
            <Link to="/logout">logout</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="logout" element={<Logout />} />
          <Route element={<RequireAuth />}>
            <Route path="edit/:episodeId" element={<EditContentForm />} />
            <Route path="add" element={<ContentForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
