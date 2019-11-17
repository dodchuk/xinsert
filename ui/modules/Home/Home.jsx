import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './../../assets/logo.inline.svg';
import styles from './home.m.scss';

const propTypes = {};

const bodyClassName = 'isHome';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document.body.classList) {
      document.body.classList.add(bodyClassName);
    } else {
      document.body.className = (document.body.className ? ' ' : '') + bodyClassName;
    }
  }

  componentWillUnmount() {
    if (document.body.classList) {
      document.body.classList.remove(bodyClassName);
    } else {
      document.body.className = document.body.className.replace(`/\b${ bodyClassName }\b/g`, '');
    }
  }

  render() {
    return (
      <div className={ styles.static }>
        <div className={ styles.staticContainer }>
          <div className={ styles.logo }>
            <span dangerouslySetInnerHTML={ { __html: logo } } />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
