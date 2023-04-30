import * as React from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/scene/Profile";
import { Link, Route, Routes } from "react-router-dom";
import NotFound from "./components/scene/NotFound";
import AuthLayout from "./components/layout/AuthLayout";
import ContentForm from "./components/ContentForm";
import EditContentForm from "./components/EditContentForm";
import Logout from "./components/Logout";
import Paperbase from "./components/Paperbase";
import Home from "./components/Home";
import Hosting from "./components/Hosting";
import Pricing from "./components/Pricing";
import Settings from "./components/Settings";
import About from "./components/About";
import GeneratePodcast from "./components/scene/GeneratePodcast";
import VideosToPodcast from "./components/scene/VideosToPodcast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Paperbase />}>
          <Route path="" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="edit/:episodeId" element={<EditContentForm />} />
            <Route path="add" element={<ContentForm />} />
            <Route path="generatePodcast" element={<GeneratePodcast />} />
            <Route path="vidoesToPodcast" element={<VideosToPodcast />} />
            <Route path="hosting" element={<Hosting />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="app" element={<Dashboard />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
