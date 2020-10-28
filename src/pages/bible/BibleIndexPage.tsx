import React, { Component } from 'react';

export default class BibleIndexPage extends Component {
  public render() {
    return (
      <div>
        Index
        <button onClick={() => {console.log(this.props)}}>Store</button>
      </div>
    );
  }
}

