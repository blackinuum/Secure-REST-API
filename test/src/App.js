import "./App.css";
import images from "./constantes/images";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import * as Yup from "yup";
import Login from './pages/login';
import SignIn from "./pages/signIn";
import Posts from "./pages/posts";
import NewPost from "./pages/newPost";
import MyPostsPage from "./pages/MyPostsPage";
import PrivateRoute from "./PrivateRoute/privateRoute";
import Logged from "./PrivateRoute/logged";
import NotFound from "./pages/NotFound";
import WaitingPage from "./pages/waitingPage";
function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
           <Logged>
            <Login/>
           </Logged>
          } />
          <Route path="/signIn" element={
           <Logged>
            <SignIn/>
           </Logged>
          } />/>
          <Route path="/Home" element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
          } />
          <Route path="/New Post" element={
              <PrivateRoute>
                <NewPost />
              </PrivateRoute>
          } />
          <Route path="/My Posts" element={
              <PrivateRoute>
                <MyPostsPage />
              </PrivateRoute>
          } />
          <Route path="/Account" element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
          } />
          <Route path="*" element={
              <PrivateRoute>
                <NotFound />
              </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
