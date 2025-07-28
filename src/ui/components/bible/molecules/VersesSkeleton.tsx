import { Placeholder } from 'react-bootstrap';

export function VersesSkeleton() {
  return (
    <Placeholder animation="glow">
      {Array(8)
        .fill(1)
        .map((_, i) => (
          <p key={i}>
            <Placeholder xs={12} /> <Placeholder xs={12} />{' '}
            <Placeholder xs={12} />{' '}
          </p>
        ))}
    </Placeholder>
  );
}
