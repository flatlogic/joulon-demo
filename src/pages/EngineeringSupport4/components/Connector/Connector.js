import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import s from './Connector.module.scss';


class Connector extends React.Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired
  };

  static defaultProps = {
    connected: false
  };

  render() {
    const {connected} = this.props;
    return (
      <div className={cx(s.connector, connected ? s.connected : "")}>
        <div className={s.connectorPart}/>
        <div className={s.connectorPart}/>
        <div className={s.connectorPart}/>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Connector);
