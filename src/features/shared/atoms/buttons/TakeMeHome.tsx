import { faBible } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export function TakeMeHomeButton() {
  return (
    <Link className="btn btn-primary mx-1" to="/">
      <FontAwesomeIcon icon={faBible} /> Take me Home
    </Link>
  );
}
