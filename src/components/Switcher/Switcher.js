import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import s from './Switcher.module.scss';

import Switch from "react-switch";
import { DashboardThemes } from '../../reducers/layout';

class Switcher extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onLabel: PropTypes.string,
    offLabel: PropTypes.string,
    width: PropTypes.number,
    dashboardTheme: PropTypes.string
  };

  static defaultProps = {
    checked: false,
    onLabel: "on",
    offLabel: "off",
    width: 30,
    dashboardTheme: DashboardThemes.SOLID
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    }
  }

  setCheck(state) {
    this.setState({
      checked: state
    })
  }

  render() {
    const {
      offLabel,
      onLabel,
      width,
      dashboardTheme
    } = this.props;

    return (
      <div className={s.root}>
        <Switch
          onChange={() => {this.setCheck(!this.state.checked)}}
          checked={this.state.checked}
          uncheckedIcon={<span>{offLabel}</span>}
          checkedIcon={<span>{onLabel}</span>}
          onColor={dashboardTheme === DashboardThemes.SOLID ? "#00C6D1" : "#27313c"}
          offColor={dashboardTheme === DashboardThemes.SOLID ? "#fff" : "#27313c"}
          offHandleColor={dashboardTheme === DashboardThemes.SOLID ? "#00C6D1" : "#798892"}
          onHandleColor={dashboardTheme === DashboardThemes.SOLID ? "#fff" : "#00C6D1"}
          height={30}
          width={width}
          handleDiameter={18}
        />
      </div>
    );
  }

}

function mapStateToProps(store) {
  return {
    dashboardTheme: store.layout.dashboardTheme
  };
}

export default withRouter(connect(mapStateToProps)(Switcher));
