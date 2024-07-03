import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from "./Components/Profile";
import PhotoPost from "./Components/PhotoPost";
import Login from "./Components/Login";
import CreateNewAccount from "./Components/CreateNewAccount";
import ConfirmationCode from "./Components/ConfirmationCode";
import verifyOtp from "./Components/VerifyUser";
import UpdatePassword from "./Components/UpdatePassword";
import CreateaPassword from "./Components/CreateaPassword";
import UpdateProfile from "./Components/UpdateProfile";
import VerifyUser from "./Components/VerifyUser";
import ForgottenPassword from "./Components/ForgottenPassword";
import Search from "./Components/Search";
import Home from "./Components/Home";
import Post from "./Components/Post";
import NewPost from "./Components/NewPost";
import Message from "./Components/Message";
import AddtoStory from "./Components/AddtoStory";
import UserProfile from "./Components/UserProfile";
import InstagramTheme from "./Components/InstagramTheme";
import LikeTheme from "./Components/LikeTheme";
import EditProfile from "./Components/EditProfile";
import Chat from "./Components/Chat";
import MessageConversation from "./Components/MessageConversation";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/editprofile",
    element: <EditProfile />,
  },
  {
    path: "/instagram",
    element: <InstagramTheme />,
  },
  {
    path: "/like",
    element: <LikeTheme />,
  },
  {
    path: "/new-post",
    element: <NewPost />,
  },
  {
    path: "/verifyuser",
    // enter 4 digit confirmation code
    element: <VerifyUser />,
  },
  {
    path: "/forget-password",
    element: <ForgottenPassword />,
  },
  {
    path: "/create-new-account",
    element: <CreateNewAccount />,
  },
  {
    path: "/create-a-password",
    element: <CreateaPassword />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
  {
    path: "/chat",
    element: <Message />,
  },
  {
    path: "/chat/:userName/:loggedInUser/:chatId",
    element: <Chat />,
  },
  {
    path: "/addtostory",
    element: <AddtoStory />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/confirmation-code",
    element: <ConfirmationCode />,
  },
  {
    path: "/update-profile",
    element: <UpdateProfile />,
  },
  {
    path: "/my-profile",
    element: <Profile />,
  },
  {
    path: "/profile/:userName",
    element: <UserProfile />,
  },
  {
    path: "/my-profile/:postId",
    element: <PhotoPost />,
  },
  {
    path: "/newpost",
    element: <NewPost />,
  },
  {
    path: "/messageconversation",
    element: <MessageConversation />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);

root.render(
  <React.StrictMode>
    <div className="App">
      <div style={{ background: "#fff" }}>
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
