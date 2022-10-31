import { Placeholder } from 'react-bootstrap';
import styles from './SideList.module.scss';

export function BookSelectorSkeleton() {
  return (<Placeholder animation="glow">
    <section className={styles.sideList}>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <strong>Old Testament</strong>
          {Array(39).fill(1).map((_, i) => (
            <div key={i}><Placeholder xs={9} /></div>
          ))}
        </div>

        <div className="col-md-12 col-lg-6">
          <strong>New Testament</strong>
          {Array(27).fill(1).map((_, i) => (
            <div key={i}><Placeholder xs={9} /></div>
          ))}
        </div>
      </div>
    </section>
  </Placeholder>);
}
