import logo from "../../assets/logo.png";

import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <a href="#">
        <img className="header__logo" src={logo} alt="SportSee" />
      </a>
      <nav className="header__nav" aria-label="Navigation principale">
        <a className="header__link" href="#">
          Accueil
        </a>
        <a className="header__link" href="#">
          Profil
        </a>
        <a className="header__link" href="#">
          Réglage
        </a>
        <a className="header__link" href="#">
          Communauté
        </a>
      </nav>
    </header>
  );
}
