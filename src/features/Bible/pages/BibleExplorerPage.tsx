import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import BibleVersionSelectorComponent from '../components/BibleVersionSelector/BibleVersionSelector';

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

class BibleExplorerPage extends React.Component<PropsFromRedux> {
  render() {
    return (
      <div className="row">
        <aside className="col-12 col-md-3 order-2 order-md-1">
          <BibleVersionSelectorComponent />
        </aside>

        <main
          className="col-12 col-sm-12 col-md-6 order-1 order-md-2 page-bg"
        >
            main
        </main>

        <aside className="col-12 col-md-3 order-3"></aside>
      </div>
    );
  }
}

export default connector(BibleExplorerPage);

