import { StandardLayout } from "../templates/StandardLayout";
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (<StandardLayout>
    <p>This page does not exist. You can return to the <Link to="/">Home</Link> page.</p>
  </StandardLayout>);
}
