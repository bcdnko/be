import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBible } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <div>
      <header>
        <div className="row">
          <div className="col-12 col-md-3 logo">
            <h1>
              <a href="'/'">
                <FontAwesomeIcon icon={faBible} />
                <span>Bible Explorer</span>
              </a>
            </h1>
          </div>
          <div className="col-md-5 d-none d-md-block"></div>
          <div className="col-md-1 d-none d-md-block bookmark">
            <img src="img/logo.svg" />
          </div>
          <div className="col-md-3 d-none d-md-block"></div>
        </div>
      </header>
    </div>
  );
}
