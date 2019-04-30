import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import s from './TopDrive.module.scss';

import Widget from '../../../../core/Widget';
import Checkbox from '../../../../components/Checkbox';
import Gauge from '../../../../components/Gauge';


class TopDrive extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: {}
  };

  render() {
    const {data} = this.props;
    const gauge1 = data.gauges[0];
    const gauge2 = data.gauges[1];
    return (
      <div className={s.root}>
        <Row>
          <Col xs={12} lg={8}>
            <Widget>
              <div className={s.options}>
                {
                  data.options.map((opt, index) => (
                    <section
                      key={index} // eslint-disable-line
                      className={s.option}
                    >
                      <h6>{opt.value}</h6>
                      <p>{opt.name}</p>
                    </section>
                  ))
                }
              </div>
            </Widget>
          </Col>
          <Col lg={2} className="d-md-down-none">
            <Widget>
              <div className="flex-group-column mt-3">
                <Checkbox checked={data.topDriveOn} name="topDriveOn"/>
                <Button className="my-3" color={data.topDriveOn ? "primary" : "secondary"}>Top Drive On</Button>
              </div>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col xs={{size: 6, order: 2}} md={{size: 4, order: 2}} className="d-lg-none">
            <Widget>
              <div className="flex-group-column mt-3">
                <Checkbox checked={data.topDriveOn} name="topDriveOn"/>
                <Button className="my-3" color={data.topDriveOn ? "primary" : "secondary"}>Top Drive On</Button>
              </div>
            </Widget>
          </Col>
          <Col xs={{size: 12, order: 3}} lg={{size: 2, order: 1}}>
            <Widget>
              <Row>
                <Col xs={6} md={4} lg={12}>
                  <div className="flex-group-column mt-3">
                    <Checkbox checked={data.blowerOverrideOn} name="blowerOverrideOn"/>
                    <Button className="my-3" color={data.blowerOverrideOn ? "primary" : "secondary"}>Blower<br/>Override On</Button>
                  </div>
                </Col>
                <Col xs={6} md={4} lg={12}>
                  <div className="flex-group-column mt-3">
                    <Checkbox checked={data.handlingRingLock} name="handlingRingLock"/>
                    <Button className="my-3" color={data.handlingRingLock ? "primary" : "secondary"}>Handling<br/>Ring Lock</Button>
                  </div>
                </Col>
                <Col xs={6} md={4} lg={12}>
                  <div className="flex-group-column mt-3">
                    <Checkbox checked={data.IBOPClose} name="IBOPClose"/>
                    <Button className="my-3" color={data.IBOPClose ? "primary" : "secondary"}>IBOP Close</Button>
                  </div>
                </Col>
                <Col xs={6} md={4} lg={12}>
                  <div className="flex-group-column mt-3">
                    <Checkbox checked={data.grabsOn} name="grabsOn"/>
                    <Button className="my-3" color={data.grabsOn ? "primary" : "secondary"}>Grabs On</Button>
                  </div>
                </Col>
                <Col xs={6} md={4} lg={12}>
                  <div className="flex-group-column mt-3">
                    <Checkbox checked={data.TDGrabsOnDWInterlocked} name="TDGrabsOnDWInterlocked"/>
                    <h6 className="my-3 text-primary-light text-center">TD Grabs On <br/>DW Interlocked</h6>
                  </div>
                </Col>
              </Row>
            </Widget>

          </Col>
          <Col xs={{size: 12, order: 1}} lg={{size: 6, order: 2}}>
            <section className={s.gauges}>
              <Gauge options={gauge1} id={"0"}/>
              <Gauge options={gauge2} id={"1"}/>
            </section>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={8}>
            <Widget title={<h6 className='text-muted'>Top Drive Alarms</h6>} collapse>
            </Widget>
          </Col>
          <Col xs={12} md={6} lg={2}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>TD Drive</h6>
                  <i className="la la-info-circle chartListIcon"/>
                </li>
                <li className="chartListItem">
                  <h6>TD IO</h6>
                  <i className="la la-info-circle chartListIcon"/>
                </li>
              </ul>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(TopDrive);
