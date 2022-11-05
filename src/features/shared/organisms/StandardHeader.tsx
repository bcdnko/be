import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBible } from '@fortawesome/free-solid-svg-icons'

import styles from './StandardHeader.module.scss';
import logo from '../../../assets/img/logo.svg';

export function StandardHeader() {
  return (
    <header className={styles.pageHeader}>
      <div className={styles.logo}>
        <Link to="/" className="h3">
          <FontAwesomeIcon icon={faBible} />
          <span className="ms-2">Bible Explorer</span>
        </Link>
      </div>

      <div className={styles.spacer}></div>

      <div className={[styles.bookmark].join(' ')}>
        <img src={logo} alt="Bible Logo" />
      </div>
    </header>
  );
}
