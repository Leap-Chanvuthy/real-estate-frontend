import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { useSelector } from "react-redux";
import "./profilePage.scss";

function ProfilePage() {

  const currentUser = useSelector((state) => state.auth.currentUser);

  const username = currentUser.data.user.name;
  const email = currentUser.data.user.email;
  const joinDate = currentUser.data.user.created_at;

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>{username}</b>
            </span>
            <span>
              E-mail: <b>{email}</b>
            </span>
            <span>
              Join since: <b>{joinDate}</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
