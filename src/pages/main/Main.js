import React from 'react';
import { Nav, NavItem, NavLink, Input, Row, Col } from 'reactstrap';
import ApexChart from 'react-apexcharts';
import { chartData, liveChart } from './mock';
import classnames from 'classnames';
import JumbotronDowntime from './components/jumbotronDowntime/JumbotronDowntime';
import s from './Main.module.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTabs = this.toggleTabs.bind(this);
    this.state = {
      activeTab: 'This week',
      cd: chartData,
      ld: liveChart,
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
    const { cd } = this.state;
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
        <div className={s.contentInfoWrapper}>
          <Row>
            <Col lg={3}>
              <JumbotronDowntime />
            </Col>
            <Col lg={1} />

            <Col lg={8}>
              <ApexChart
                className="sparkline-chart"
                height={350}
                series={cd.apex.column.series}
                options={cd.apex.column.options}
                type={'bar'}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Main;
