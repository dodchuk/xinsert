import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import iconsStyles from './icons.m.scss';

const propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
};

/**
 * @param {Object} props
 * @return {ReactElement}
 */
function Icon(props) {
  let icon = require(`./icons/${ props.type }.inline.svg`);

  return (
    <i
      className={ cn(iconsStyles.i, props.className) }
      dangerouslySetInnerHTML={ { __html: icon } }
    />
  );
}

Icon.propTypes = propTypes;

export default Icon;
