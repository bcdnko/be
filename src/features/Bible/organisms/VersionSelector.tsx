import React  from 'react';
import { Link } from 'react-router-dom';
import { BibleVersionStored } from '../../../core/interfaces/Bible.interfaces';
import './VersionSelector.scss';

type Props = {
  versions: BibleVersionStored[],
  versionId: string,
  bookId: number,
  chapter: number,
}

export const VersionSelector: React.FC<Props> = ({
  versions,
  versionId,
  bookId,
  chapter,
}) => {
  return (<section className='nonDecoratedLinks'>
    <strong>Bible Versions</strong>

    <ul className="sideList">
      {versions.map(version => <li
        className={[
          'sideListItem',
          versionId === version.id ? 'active': null,
        ].join(' ')}
        key={version.id}
      >
        <Link
          to={`/bible/${version.id}/${bookId}/${chapter}`}
        >{version.title}</Link>
      </li>)}
    </ul>
  </section>);
}
