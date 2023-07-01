import React from 'react';
import { Link } from 'react-router-dom';
import { IBibleVersion } from '../../../core/interfaces/Bible.interfaces';
import { chapterUrl } from '../hooks/useBibleNavigate';
import { Placeholder } from 'react-bootstrap';
import styles from './SideList.module.scss';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';

function skeleton() {
  return (
    <Placeholder animation="glow">
      <ul>
        <li>
          <Placeholder xs={7} />
        </li>
        <li>
          <Placeholder xs={7} />
        </li>
      </ul>
    </Placeholder>
  );
}

type Props = {
  versions?: IBibleVersion[];
};

export function VersionSelector({ versions }: Props) {
  const { chapterContext } = useBibleContext();
  const isLoading = !versions || !chapterContext;

  return (
    <section className={styles.sideList}>
      <strong>Bible Versions</strong>

      {isLoading ? (
        skeleton()
      ) : (
        <ul>
          {versions.map((version) => (
            <li
              className={[
                chapterContext.version.id === version.id
                  ? styles.active
                  : undefined,
              ].join(' ')}
              key={version.id}
            >
              <Link
                to={chapterUrl(
                  {
                    versionId: version.id,
                    bookId: chapterContext.book.id,
                    chapter: chapterContext.chapter,
                  },
                  { preserveHash: true }
                )}
              >
                {version.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
