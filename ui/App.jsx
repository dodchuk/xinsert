import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import Home from './modules/Home/Home';

const propTypes = {
  location: PropTypes.object
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!('ontouchstart' in document.documentElement)) {
      document.documentElement.className += ' no-touch';
    }
  }

  render() {
    return (
      <Switch location={ this.props.location }>
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

App.propTypes = propTypes;

export default withRouter(App);
