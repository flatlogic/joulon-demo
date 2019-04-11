import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import Widget from '../../../../core/Widget/Widget';
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
          <Col xs={3}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <Checkbox checked={data.DWEnable} name="DWEnable"/>
                  <Button color={data.DWEnable ? "primary" : "secondary"}>DW Enable</Button>
                </li>
                <li className="chartListItem">
                  <h6>DW Selected</h6>
                  <JoulonInput type={"text"} value={data.DWSelected}/>
                </li>
              </ul>
            </Widget>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>Low Stop point (R)</h6>
                  <JoulonInput type={"number"} value={data.lowStopPoint}/>
                </li>
                <li className="chartListItem">
                  <h6>High Stop point (R)</h6>
                  <JoulonInput type={"number"} value={data.highStopPoint}/>
                </li>
              </ul>
            </Widget>
          </Col>
          <Col xs={3}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <h6>Block Position (f)</h6>
                  <JoulonInput type={"number"} value={data.blockPosition}/>
                </li>
                <li className="chartListItem">
                  <h6>Hookload (kLbs)</h6>
                  <JoulonInput type={"number"} value={data.hookload}/>
                </li>
                <li className="chartListItem">
                  <h6>Drum RPM</h6>
                  <JoulonInput type={"number"} value={data.drumRPM}/>
                </li>
                <li className="chartListItem">
                  <h6>Auto Driller</h6>
                  <JoulonInput type={"text"} value={data.autoDriller}/>
                </li>
                <li className="chartListItem">
                  <h6>Auto Driller Mode</h6>
                  <JoulonInput type={"text"} value={data.autoDrillerMode}/>
                </li>
                <li className="chartListItem">
                  <h6>WOB (kLbs)</h6>
                  <JoulonInput type={"number"} value={data.WOB}/>
                </li>
                <li className="chartListItem">
                  <h6>ROP (kLbs)</h6>
                  <JoulonInput type={"number"} value={data.ROP}/>
                </li>
                <li className="chartListItem">
                  <h6>Autopark countdown timer (sec)</h6>
                  <JoulonInput type={"number"} value={data.autoparkCountdownTimer}/>
                </li>
              </ul>
            </Widget>
          </Col>
          <Col xs={3}>
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
                  <JoulonInput type={"number"} value={data.creepSpeedSetpoint}/>
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
          <Col xs={7}>
            <Widget title={<h6 className='text-muted'>Drawworks Alarms</h6>} collapse>
            </Widget>
          </Col>
          <Col xs={2}>
            <Widget>
              <ul className="chartList">
                <li className="chartListItem">
                  <p>DW Drives</p>
                  <i className="la la-info-circle chartListIcon"/>
                </li>
                <li className="chartListItem">
                  <p>DW IO</p>
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
