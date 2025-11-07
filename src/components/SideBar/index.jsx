import "./SideBar.scss";

import yogaIcon from "../../assets/yoga-icon.png";
import swimmingIcon from "../../assets/swimming-icon.png";
import cyclingIcon from "../../assets/cycling-icon.png";
import liftingIcon from "../../assets/lifting-icon.png";

export default function SideBar() {
  return (
    <div className="sidebar">
      <nav className="sidebar__nav" aria-label="Navigation secondaire">
        <a href="#" className="sidebar__link">
          <img className="sidebar__link-img" src={yogaIcon} alt="" />
        </a>
        <a href="#" className="sidebar__link">
          <img className="sidebar__link-img" src={swimmingIcon} alt="" />
        </a>
        <a href="#" className="sidebar__link">
          <img className="sidebar__link-img" src={cyclingIcon} alt="" />
        </a>
        <a href="#" className="sidebar__link">
          <img className="sidebar__link-img" src={liftingIcon} alt="" />
        </a>
      </nav>
      <p className="sidebar__legal">Copyright, SportSee 2020</p>
    </div>
  );
}
