import React  from 'react';
import { Link } from 'react-router-dom';
import { BibleVersionStored } from '../../../core/interfaces/Bible.interfaces';
import { VersionSelectorSkeleton } from './VersionSelectorSkeleton';
import styles from './SideList.module.scss';

type Props = {
  versions?: BibleVersionStored[],
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

    {!versions && <VersionSelectorSkeleton />}

    {versions &&
      <ul>
        {versions.map(version => <li
          className={[
            versionId === version.id ? styles.active: null,
          ].join(' ')}
          key={version.id}
        >
          <Link
            to={`/bible/${version.id}/${bookId}/${chapter}`}
          >{version.title}</Link>
        </li>)}
      </ul>
    }
  </section>);
}
