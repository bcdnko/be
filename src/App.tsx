import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from './store/rootReducer';
import {
  selectVersions,
  fetchBibleVersions,
} from './store/bible/versions';

import BibleIndexPage from './pages/bible/BibleIndexPage';
import Header from './shared-components/Header';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.css';

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
    fetchBibleVersions: () => dispatch(fetchBibleVersions())
  }
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.props.fetchBibleVersions();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/">
              <BibleIndexPage />
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connector(App);

