import { StandardLayout } from "../templates/StandardLayout";
import { Link } from 'react-router-dom';
import { PageHeader } from "../atoms/PageHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBible, faBug } from '@fortawesome/free-solid-svg-icons'

export function NotFoundPage() {
  return (<StandardLayout>
    {{
      main: (
        <>
          <div style={{ textAlign: 'center' }}>
            <PageHeader>Page Not Found</PageHeader>
            <p>We couldn't find the page you requested, but we can still help you to find <strong>GOD</strong>!</p>
            <div>
              <Link className="btn btn-primary mx-1" to="/">
                <FontAwesomeIcon icon={faBible} /> Take me Home
              </Link>

              <a className="btn btn-secondary mx-1" href="https://github.com/bcdnko/be/issues/new">
                <FontAwesomeIcon icon={faBug} /> Report an issue
              </a>
            </div>
          </div>
        </>
      ),
    }}
  </StandardLayout>);
}
