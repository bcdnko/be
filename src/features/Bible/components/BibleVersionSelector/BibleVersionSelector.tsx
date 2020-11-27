import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from "react-router-dom";

import { RootState } from 'store/rootReducer';
import { selectVersions } from 'store/bible/versionsSlice';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => {
  return {
    bibleVersions: selectVersions(state),
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
  }
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

class BibleVersionSelectorComponent extends React.Component<PropsFromRedux> {
  render() {
    return (
      <div>
        <strong>Bible Versions</strong>

        <ul className="side-list">
          {this.props.bibleVersions.map((version) => {
            return <li className={['side-list-item'].join(' ')}
              /*[ngClass]="{ active: state && state.version.id === version.id }"*/
            >
              <Link to={version.url}>
                {version.titleShort}
              </Link>
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default connector(BibleVersionSelectorComponent);

