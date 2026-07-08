import "../scss/Navbar.scss";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>🌱 {t("cropwise")}</h1>
          <p>{t("smart_agriculture")}</p>
        </div>

        <ul className="navbar-menu">
          <li>
            <a href="/#features">{t("features")}</a>
          </li>

          <li>
            <a href="/#testimonials">{t("testimonials")}</a>
          </li>

          <li>
            <a href="/#contact">{t("get_started")}</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;