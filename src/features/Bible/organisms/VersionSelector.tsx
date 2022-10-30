import React  from 'react';
import { Link } from 'react-router-dom';
import { BibleVersionStored } from '../../../core/interfaces/Bible.interfaces';
import styles from './SideList.module.scss';

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
  return (<section className={styles.sideList}>
    <strong>Bible Versions</strong>

    <ul className={styles.sideList}>
      {versions.map(version => <li
        className={[
          styles.sideListItem,
          versionId === version.id ? styles.active: null,
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
