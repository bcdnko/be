import React  from 'react';
import { Link } from 'react-router-dom';
import { BibleVersionStored } from '../../../core/interfaces/Bible.interfaces';
import { VersionSelectorSkeleton } from './VersionSelectorSkeleton';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
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
  const { chapterUrl } = useBibleNavigate({});

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
            to={chapterUrl(version.id, bookId, chapter) + window.location.hash}
          >{version.title}</Link>
        </li>)}
      </ul>
    }
  </section>);
}
