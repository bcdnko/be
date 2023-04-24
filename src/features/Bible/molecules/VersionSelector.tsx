import React from 'react';
import { Link } from 'react-router-dom';
import {
  BibleBookId,
  BibleChapterId,
  BibleVersionId,
  IBibleChapterRef,
  IBibleVersion,
} from '../../../core/interfaces/Bible.interfaces';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import { Placeholder } from 'react-bootstrap';
import styles from './SideList.module.scss';

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
  currentVersionId: BibleVersionId;
  currentBookId: BibleBookId;
  currentChapter: BibleChapterId;
  versions?: IBibleVersion[];
  chapterRef?: IBibleChapterRef;
};

export const VersionSelector: React.FC<Props> = ({
  currentVersionId,
  currentBookId,
  currentChapter,
  versions,
  chapterRef,
}) => {
  const { chapterUrl } = useBibleNavigate({ chapterRef });

  const isLoading = !versions;

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
                currentVersionId === version.id ? styles.active : undefined,
              ].join(' ')}
              key={version.id}
            >
              <Link
                to={
                  chapterUrl(version.id, currentBookId, currentChapter) +
                  window.location.hash
                }
              >
                {version.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
