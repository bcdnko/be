import { Placeholder } from 'react-bootstrap';
import { PageHeader } from '../../shared/atoms/PageHeader';
import { PageSubHeader } from '../../shared/atoms/PageSubHeader';
import { VersesSkeleton } from '../molecules/VersesSkeleton';

export function ChapterSkeleton() {
  return (
    <>
      <Placeholder animation="glow" as={PageHeader}>
        <Placeholder xs={6} />
      </Placeholder>

      <Placeholder animation="glow" as={PageSubHeader}>
        <Placeholder xs={4} />
      </Placeholder>

      <VersesSkeleton />
    </>
  );
}
