import React from 'react';
import { connect } from 'react-redux';
import s from './Divider.module.scss';


class Divider extends React.Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.divider}/>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Divider);
