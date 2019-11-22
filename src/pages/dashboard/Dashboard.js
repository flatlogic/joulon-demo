import React from 'react';
import { Row, Col, Progress, Table, Label, Input } from 'reactstrap';

import Widget from '../../components/Widget';

import Calendar from './components/calendar/Calendar';
import Map from './components/am4chartMap/am4chartMap';
import Rickshaw from './components/rickshaw/Rickshaw';
import JumbotronDowntime from './components/jumbotronDowntime/JumbotronDowntime';

import AnimateNumber from 'react-animated-number';

import s from './Dashboard.module.scss';

import peopleA1 from '../../images/people/a1.jpg';
import peopleA2 from '../../images/people/a2.jpg';
import peopleA5 from '../../images/people/a5.jpg';
import peopleA4 from '../../images/people/a4.jpg';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Downtime Performance Statistics:&nbsp;
          <span>This month</span>
        </h1>

        <Row>
          <Col lg={7}>
            <JumbotronDowntime />
          </Col>
          <Col lg={1} />

          <Col lg={4}></Col>
        </Row>

        <Row>
          <Col lg={4} xs={12}></Col>
          <Col lg={4} xs={12}></Col>
          <Col lg={4} xs={12}></Col>
        </Row>

        <Row>
          <Col lg={4} xs={12}></Col>

          <Col lg={4} xs={12}></Col>

          <Col lg={4} xs={12}></Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
