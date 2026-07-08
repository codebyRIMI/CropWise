import "../scss/Footer.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>🌱 {t("cropwise")}</h2>

        <p>{t("footer_description")}</p>

        <div className="other-links">
          <p>{t("privacy_policy")}</p>
          <p>{t("terms_of_service")}</p>
          <p>{t("contact_us")}</p>
        </div>

        {/* <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;