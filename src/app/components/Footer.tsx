'use client';

import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.linksRedesSociais}>
        <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
        <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
        <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
