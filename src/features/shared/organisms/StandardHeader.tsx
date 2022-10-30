import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBible } from '@fortawesome/free-solid-svg-icons'

import styles from './StandardHeader.module.scss';
import logo from '../../../assets/img/logo.svg';

export function StandardHeader() {
  return (
    <header className={styles.pageHeader}>
      <div className="row">
        <div className={['col-12', 'col-md-3', styles.logo].join(' ')}>
          <Link to="/" className="h3">
            <FontAwesomeIcon icon={faBible} />
            <span className="ms-2">Bible Explorer</span>
          </Link>
        </div>

        <div className="col-md-5 d-none d-md-block"></div>
        <div className={['col-md-1', 'd-none', 'd-md-block', styles.bookmark].join(' ')}>
          <img src={logo} alt="Bible Logo" />
        </div>

        <div className="col-md-3 d-none d-md-block"></div>
      </div>
    </header>
  );
}
