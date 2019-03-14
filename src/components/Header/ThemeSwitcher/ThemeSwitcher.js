import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DashboardThemes } from '../../../reducers/dashboard';
import Switch from "react-switch";
import s from './ThemeSwitcher.module.scss';
import { changeTheme } from '../../../actions/dashboard';

class ThemeSwitcher extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dashboardTheme: PropTypes.string
  };

  static defaultProps = {
    dashboardTheme: DashboardThemes.LIGHT
  };

  constructor(props) {
    super(props);

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme = (state) => {
    this.props.dispatch(changeTheme(state ? DashboardThemes.LIGHT : DashboardThemes.DARK));
  };

  render() {
    return (
      <section className={[s.themeSwitcher, this.props.className].join(' ')}>
        <i
          className="la la-paint-brush mr-1"/>
        <Switch
          onChange={this.changeTheme}
          checked={this.props.dashboardTheme === DashboardThemes.LIGHT}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={"#ffc247"}
          height={20}
          width={40}
        />
      </section>
    )
  }
}

function mapStateToProps(store) {
  return {
    dashboardTheme: store.dashboard.dashboardTheme,
  };
}

export default connect(mapStateToProps)(ThemeSwitcher);