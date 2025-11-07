import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

import "./Profile.scss";

export default function Profile() {
  return (
    <div className="profile">
      <Header />
      <div className="profile__content">
        <SideBar />
        <main></main>
      </div>
    </div>
  );
}
