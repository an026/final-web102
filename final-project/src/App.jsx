import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../routes/Layout"; // Adjust the import path as necessary
import HomePage from "./components/Home/HomePage"; // Adjust the import path as necessary
import PostPage from "./components/Post/PostPage"; // Adjust the import path as necessary
import ErrorPage from "./components/ErrorPage"; // Import the ErrorPage component
import EditPostPage from "./components/Post/EditPost";
// ... any other imports

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="post/" element={<PostPage />} />
        <Route path="edit/:id" element={<EditPostPage />} />
        {/* Add other specific routes here */}
        <Route path="*" element={<ErrorPage />} />{" "}
        {/* Catch-all route for undefined paths */}
      </Route>
    </Routes>
  );
};

export default App;
