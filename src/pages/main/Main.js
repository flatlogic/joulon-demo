import React from 'react';
import { Nav, NavItem, NavLink, Input } from 'reactstrap';
import classnames from 'classnames';
import s from './Main.module.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTabs = this.toggleTabs.bind(this);
    this.state = {
      activeTab: 'This week',
    };
  }
  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Downtime Performance Statistics:&nbsp;
          <span>{this.state.activeTab}</span>
        </h1>
        <div className={s.tabs}>
          <span className={s.tabsLabel}>Analitics for:</span>
          <Nav tabs className={s.nav}>
            <NavItem>
              <NavLink
                className={classnames({
                  [s.navLink]: true,
                  active: this.state.activeTab === 'This week',
                })}
                onClick={() => {
                  this.toggleTabs('This week');
                }}
              >
                <span>This week</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  [s.navLink]: true,
                  active: this.state.activeTab === 'This month',
                })}
                onClick={() => {
                  this.toggleTabs('This month');
                }}
              >
                <span>This month</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  [s.navLink]: true,
                  active: this.state.activeTab === 'This year',
                })}
                onClick={() => {
                  this.toggleTabs('This year');
                }}
              >
                <span>This year</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  [s.navLink]: true,
                  active: this.state.activeTab === 'Custom',
                })}
                onClick={() => {
                  this.toggleTabs('Custom');
                }}
              >
                <span>Custom</span>
              </NavLink>
            </NavItem>
          </Nav>
          <div className={s.inputContainer}>
            <Input
              type="text"
              id="normal-field"
              placeholder="30.09.19-06.10.19"
              className={s.input}
            />
            <i className="fa fa-calendar-o" />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
