import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './ControlButton.module.scss';


class ControlButton extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <button className={cx(s.controlButton, s.root, 'btn btn-secondary')}>{children}</button>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(ControlButton);
