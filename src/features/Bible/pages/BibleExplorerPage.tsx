import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';

import { RootState } from 'store/rootReducer';
import { selectHashedVersions } from 'store/bible/versionsSlice';
import {
  changeChapter,
  selectBibleState,
} from 'store/bible/bibleStateSlice';

import {
  BibleVersionId,
  BibleBookId
} from 'core/interfaces/Bible.interfaces';
import BibleVersionSelectorComponent from '../components/BibleVersionSelector/BibleVersionSelector';

interface RouteProps {
  versionId?: string;
  bookId?: string;
  chapter?: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    bibleVersions: selectHashedVersions(state),
    bibleState: selectBibleState(state),
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    //TODO
    changeChapter: (payload: any) => dispatch(changeChapter(payload)),
  }
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = RouteComponentProps<RouteProps> & PropsFromRedux;

class BibleExplorerPage extends React.Component<ComponentProps> {
  private _handleRouteChanges(prevProps: ComponentProps) {
    const { versionId, bookId } = this.props.match.params;
    const chapter = parseInt(String(this.props.match.params.chapter));
    const bibleState = this.props.bibleState;
    const stateVersionId = bibleState.version && bibleState.version.id;

    const isVersionChanged = versionId !== stateVersionId;
    //const isBookChanged = bookId !== bibleState.book;
    const isBookChanged = false;
    const isChapterChanged = chapter !== bibleState.chapter;

    if (isVersionChanged || isBookChanged || isChapterChanged) {
      this.props.changeChapter({
        versionId: this.props.bibleVersions[versionId!],
        bookId: bookId,
        chapter: chapter,
      });
    }
  }

  componentDidUpdate(prevProps: ComponentProps) {
    this._handleRouteChanges(prevProps);
  }

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

