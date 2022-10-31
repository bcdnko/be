import {Placeholder} from "react-bootstrap";

export function PagetopChapterSelectorSkeleton() {
  return (
    <div className="chapterList">
      <Placeholder animation="glow">
        <Placeholder xs={2} />
        {' '}
        {Array(7).fill(1).map((_, i) => (
          <span key={i}>
            <Placeholder xs={1} />
            {' '}
          </span>
        ))}
      </Placeholder>
    </div>
  );
}
