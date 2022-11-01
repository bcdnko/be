import { faBug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ReportIssueButton() {
  return (
    <a
      className="btn btn-secondary mx-1"
      href="https://github.com/bcdnko/be/issues/new"
    >
      <FontAwesomeIcon icon={faBug} /> Report an issue
    </a>
  );
}
