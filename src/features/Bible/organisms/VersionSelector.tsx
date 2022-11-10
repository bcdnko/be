import React  from 'react';
import { Link } from 'react-router-dom';
import { IBibleChapterRef, IBibleVersion } from '../../../core/interfaces/Bible.interfaces';
import { VersionSelectorSkeleton } from './VersionSelectorSkeleton';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import styles from './SideList.module.scss';

type Props = {
  chapterRef: IBibleChapterRef | null,
  versions: IBibleVersion[] | null,
}

export const VersionSelector: React.FC<Props> = ({
  versions,
  chapterRef,
}) => {
  const { chapterUrl } = useBibleNavigate({ chapterRef });

  return (<section className={styles.sideList}>
    <strong>Bible Versions</strong>

    {(!versions || !chapterRef) && <VersionSelectorSkeleton />}

    {(versions && chapterRef ) &&
      <ul>
        {versions.map(version => <li
          className={[
            chapterRef.version.id === version.id ? styles.active: null,
          ].join(' ')}
          key={version.id}
        >
          <Link
            to={chapterUrl(version.id, chapterRef.book.id, chapterRef.chapter) + window.location.hash}
          >{version.title}</Link>
        </li>)}
      </ul>
    }
  </section>);
}
