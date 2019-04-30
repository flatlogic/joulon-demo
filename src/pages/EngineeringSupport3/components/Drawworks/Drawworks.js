import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import Widget from '../../../../core/Widget';
import s from './Drawworks.module.scss';
import Checkbox from '../../../../components/Checkbox';
import JoulonInput from '../../../../components/Input';


class Drawworks extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  static defaultProps = {
    data: {}
  };

  render() {
    const data = this.props.data;
    return (
      <div className={s.root}>
        <h5>Drawworks</h5>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <Checkbox checked={data.DWEnable} name="DWEnable"/>
                  <Button color={data.DWEnable ? "primary" : "secondary"}>DW Enable</Button>
                </li>
                <li className="chartListItem">
                  <h6>DW Selected</h6>
                  <p>{data.DWSelected}</p>
                </li>
              </ul>
            </Widget>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>Low Stop point (R)</h6>
                  <p>{data.lowStopPoint}</p>
                </li>
                <li className="chartListItem">
                  <h6>High Stop point (R)</h6>
                  <p>{data.highStopPoint}</p>
                </li>
              </ul>
            </Widget>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>Block Position (f)</h6>
                  <p>{data.blockPosition}</p>
                </li>
                <li className="chartListItem">
                  <h6>Hookload (kLbs)</h6>
                  <p>{data.hookload}</p>
                </li>
                <li className="chartListItem">
                  <h6>Drum RPM</h6>
                  <p>{data.drumRPM}</p>
                </li>
                <li className="chartListItem">
                  <h6>Auto Driller</h6>
                  <p>{data.autoDriller}</p>
                </li>
                <li className="chartListItem">
                  <h6>Auto Driller Mode</h6>
                  <p>{data.autoDrillerMode}</p>
                </li>
                <li className="chartListItem">
                  <h6>WOB (kLbs)</h6>
                  <p>{data.WOB}</p>
                </li>
                <li className="chartListItem">
                  <h6>ROP (kLbs)</h6>
                  <p>{data.ROP}</p>
                </li>
                <li className="chartListItem">
                  <h6>Autopark countdown timer (sec)</h6>
                  <p>{data.autoparkCountdownTimer}</p>
                </li>
              </ul>
            </Widget>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <Checkbox checked={data.enableSlipAndCutMode} name="enableSlipAndCutMode"/>
                  <Button color={data.enableSlipAndCutMode ? "primary" : "secondary"}>Enable Slip & Cut Mode</Button>
                </li>
              </ul>
            </Widget>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <Checkbox checked={data.enableCreepSpeedMode} name="enableCreepSpeedMode"/>
                  <Button color={data.enableCreepSpeedMode ? "primary" : "secondary"}>Enable Creep Speed Mode</Button>
                </li>
                <li className="chartListItem">
                  <h6>Creep Speed &nbsp; Setpoint (%)</h6>
                  <p>{data.creepSpeedSetpoint}</p>
                </li>
              </ul>
            </Widget>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <Checkbox checked={data.DWRangeOverrideActivated} name="DWRangeOverrideActivated"/>
                  <p>DW range override activated</p>
                </li>
                <li className="chartListItem">
                  <Checkbox checked={data.zeroWOBSelected} name="zeroWOBSelected"/>
                  <p>Zero WOB Selected</p>
                </li>
                <li className="chartListItem">
                  <Checkbox checked={data.torqueProving} name="torqueProving"/>
                  <p>Torque Proving</p>
                </li>
                <li className="chartListItem">
                  <Checkbox checked={data.encodersOK} name="encodersOK"/>
                  <p>Encoders OK</p>
                </li>
              </ul>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8} lg={7}>
            <Widget title={<h6 className='text-muted'>Drawworks Alarms</h6>} collapse>
            </Widget>
          </Col>
          <Col xs={12} md={4} lg={2}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>DW Drives</h6>
                  <i className="la la-info-circle chartListIcon"/>
                </li>
                <li className="chartListItem">
                  <h6>DW IO</h6>
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

export default connect(mapStateToProps)(Drawworks);
