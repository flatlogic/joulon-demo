import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fabric } from "fabric";

import { DashboardThemes } from '../../reducers/layout';

class Gauge extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    options: PropTypes.shape({
      radius: PropTypes.number.isRequired,
      labels: PropTypes.arrayOf(PropTypes.number).isRequired,
      minorTicksNumber: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      units: PropTypes.string.isRequired,
      zones: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired
      }))
    }).isRequired,
    id: PropTypes.string.isRequired,
    dashboardTheme: PropTypes.string,
    fontsDownloaded: PropTypes.bool
  };

  static defaultProps = {
    options: {
      radius: 80,
      labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      minorTicksNumber: 4,
      value: 0,
      units: "RPM",
      title: "Top Drive Speed",
      zones: []
    },
    id: "",
    dashboardTheme: DashboardThemes.SOLID,
    fontsDownloaded: false
  };

  constructor(prop) {
    super(prop);
    this.state = {
      drillingControl: 'drillingControl',
      canvas: null,
      maxAngle: 270,
      primaryColor: '0, 169, 180',
      ticksColor: '#00cd9b',
      labelsColor: '#787c80',
      fontFamily: 'Assistant',
      theming: {
        [DashboardThemes.SOLID]: {
          ticksColor: '#00cd9b',
          chartBorderColor: 'rgba(0, 169, 179, 0.3)',
          chartBgColor: '#ffffff',
          labelsColor: '#9b9b9b',
          valueCircleBgColor: 'rgba(57, 187, 196, 0.73)',
          valueCircleBorderColor: '#09d2df',
          valueArrowColor: '#09d2df',
          valueDisplayColor: '#ffffff',
          chartTitleColor: '#12b3bf'
        },
        [DashboardThemes.TRANSPARENT]: {
          ticksColor: '#00cd9b',
          chartBorderColor: '#313a44',
          chartBgColor: 'rgba(48, 59, 71, 0.74)',
          labelsColor: '#9b9b9b',
          valueCircleBgColor: 'rgba(0, 0, 0, 0.5)',
          valueCircleBorderColor: '#09d2df',
          valueArrowColor: '#09d2df',
          valueDisplayColor: '#09d2df',
          chartTitleColor: '#12b3bf'
        }
      },
      elements: {
        chartBorder: null,
        ticksGroup: null,
        labelsGroup: null,
        valueCircle: null,
        valueArrow: null,
        valueDisplay: null,
        chartTitle: null
      }
    };
  }

  updateFont(elements, canvas) {
    if (canvas) {
      let {labelsGroup, valueDisplay, chartTitle} = elements;
      let labels = labelsGroup.getObjects();
      let valueDisplayTexts = valueDisplay.getObjects();
      [chartTitle, ...labels, ...valueDisplayTexts].forEach(el => {
        el.set('fontFamily', this.state.fontFamily)
      });
      canvas.renderAll();
    }
  }

  componentDidMount() {
    this.initDrillingChart(this.props.options);
  }

  componentDidUpdate(prevProps) {
    let {dashboardTheme, fontsDownloaded} = this.props;
    if (dashboardTheme !== prevProps.dashboardTheme) {
      let {elements, canvas} = this.state;
      this.updateDrillingChart(elements, canvas);
    }
    if (fontsDownloaded && fontsDownloaded !== prevProps.fontsDownloaded) {
      let {elements, canvas} = this.state;
      this.updateFont(elements, canvas);
    }
  }

  updateDrillingChart(elements, canvas) {
    let {chartBorder, labelsGroup, valueCircle, valueArrow, valueDisplay, chartTitle} = elements;
    let theme = this.state.theming[this.props.dashboardTheme];

    let labels = labelsGroup.getObjects();
    let valueDisplayTexts = valueDisplay.getObjects();
    chartBorder.set('stroke', theme.chartBorderColor);
    valueCircle.set('stroke', theme.valueCircleBorderColor);
    chartBorder.set('fill', theme.chartBgColor);
    valueCircle.set('fill', theme.valueCircleBgColor);
    valueArrow.set('fill', theme.valueArrowColor);
    chartTitle.set('fill', theme.chartTitleColor);
    labels.forEach(l => l.set('fill', theme.labelsColor));
    valueDisplayTexts.forEach(t => t.set('fill', theme.valueDisplayColor));
    canvas.renderAll();
  }

  getCommonOptions(position) {
    return {
      selectable: false,
      originX: 'center',
      originY: 'center',
      top: position.y,
      left: position.x
    }
  }

  getTextOptions(position, fontSize, fontWeight = null) {
    return {
      ...this.getCommonOptions(position),
      fontFamily: this.state.fontFamily,
      fontSize,
      fontWeight,
    }
  }

  getCircleOptions(position, radius, strokeWidth) {
    return {
      ...this.getCommonOptions(position),
      radius,
      strokeWidth
    }
  }

  getTriangleOptions(position, width, height) {
    return {
      ...this.getCommonOptions(position),
      width,
      height
    }
  }

  createValueDisplay(value, units, position) {
    let number = new fabric.Text(value.toString(), this.getTextOptions({x:0,y:0}, 35, 600));
    let unit = new fabric.Text(units.toString(), this.getTextOptions({x: 0, y: 25}, 10, 200));
    return new fabric.Group([number, unit], this.getCommonOptions(position))
  }

  createChartTitle(title, position) {
    return new fabric.Text(title.toString(), {
      ...this.getTextOptions(position, 14, 200),
      textAlign: 'center',
    });
  }

  createLabelText(labelPosition, text) {
    return new fabric.Text(text.toString(), {
      ...this.getTextOptions(labelPosition, 11, 200),
      angle: -this.state.maxAngle / 2,
    })
  }

  createMajorTick(linePosition, angle, color) {
    return new fabric.Line([linePosition.x, linePosition.y, linePosition.x, linePosition.y + 15], {
      stroke: color,
      strokeWidth: 1,
      angle: angle + 90
    })
  }

  createValueCircle(position, radius) {
    return new fabric.Circle(this.getCircleOptions(position, radius, 0.6));
  }

  createValuePoint(position, angle) {
    return new fabric.Triangle({
      ...this.getTriangleOptions(position, 10, 9),
      angle
    });
  }

  createChartBorder(position, radius) {
    return new fabric.Circle(this.getCircleOptions(position, radius, 10));
  }

  createTicksGroup(children, position) {
    return new fabric.Group([...children], {
      ...this.getCommonOptions(position),
      angle: this.state.maxAngle / 2,
    })
  }

  createLabelsGroup(children, position) {
    return new fabric.Group([...children], {
      ...this.getCommonOptions(position),
      angle: this.state.maxAngle / 2,
    })
  }

  createMinorTicks(angle, step, ticksNumber, radius, color) {
    if (!angle) {
      return []
    }
    let ticks = [];
    let prevAngle = angle - step;
    let minorStep = (angle - prevAngle) / (ticksNumber + 1);
    for (let i = 1; i <= ticksNumber; i++) {
      let minorAngle = prevAngle + (minorStep * i);
      let minorAngleRad = minorAngle * (Math.PI / 180);
      let linePosition = this.getPosition(radius - 3, minorAngleRad);
      ticks.push(new fabric.Line([linePosition.x, linePosition.y, linePosition.x, linePosition.y + 7], {
        stroke: color,
        strokeWidth: 1,
        angle: minorAngle + 90
      }));
    }

    return ticks;
  }

  getTickColor(tick, zones) {
    const theme = this.state.theming[this.props.dashboardTheme];
    let tickColor = theme.ticksColor;
    if (zones && zones.length) {
      let zone = zones.find(z => {
        return z.start <= tick && z.end > tick;
      });
      if (zone) {
        tickColor = zone.color;
      }
    }
    return tickColor;
  }

  initDrillingChart(options) {
    const {radius, labels, minorTicksNumber, value, units, title, zones} = options;

    const lineRadius = radius;
    const labelRadius = lineRadius + 10;

    const step = this.state.maxAngle / (labels.length - 1);

    const center = {x: radius * 1.5, y: radius * 1.5};
    const dimensions = {width: center.x * 2, height: center.y * 2};

    const maxValue = labels[labels.length - 1];
    const minValue = labels[0];

    const canvas = new fabric.Canvas(this.state.drillingControl + this.props.id, {
      width: dimensions.width,
      height: dimensions.height
    });

    canvas.hoverCursor = 'default';

    let majorTicks = [];
    let labelsText = [];
    let minorTicks = [];

    labels.forEach((tick, index) => {
      let angle = step * index;
      let angleRad = angle * (Math.PI / 180);
      let linePosition = this.getPosition(lineRadius, angleRad);
      let labelPosition = this.getPosition(labelRadius, angleRad);

      labelsText.push(this.createLabelText(labelPosition, tick));
      labelsText[index].width = 10;
      labelsText[index].height = 10;


      let majorTickColor;
      if (zones && zones.length && index === labels.length - 1 && tick === zones[zones.length - 1].end) {
        majorTickColor = zones[zones.length - 1].color;
      } else {
        majorTickColor = this.getTickColor(tick, zones);
      }
      let minorTickColor = this.getTickColor(labels[index - 1], zones);

      majorTicks.push(this.createMajorTick(linePosition, angle, majorTickColor));
      minorTicks.push(...this.createMinorTicks(angle, step, minorTicksNumber, lineRadius, minorTickColor));
    });

    let ticksGroup = this.createTicksGroup([...majorTicks, ...minorTicks], center);
    let labelsGroup = this.createLabelsGroup([...labelsText], center);

    let valueCircleRadius = radius - 25;
    let valueCircle = this.createValueCircle(center, valueCircleRadius);
    valueCircle.setShadow("0px 0px 5px #00a9b4");

    let pointValueAngle = this.state.maxAngle / (maxValue - minValue) * value + this.state.maxAngle / 2;
    let pointValueAngleRad = pointValueAngle * (Math.PI / 180);
    let valueArrowPosition = this.getPosition(valueCircleRadius + 4, pointValueAngleRad);
    let valueArrow = this.createValuePoint({x: center.x + valueArrowPosition.x, y: center.y + valueArrowPosition.y}, pointValueAngle + 90);
    let valueDisplay = this.createValueDisplay(value, units, center);
    let chartTitle = this.createChartTitle(title, {x:center.x, y:center.y + radius});
    let chartBorder = this.createChartBorder(center, radius + 35);

    canvas.add(chartBorder, ticksGroup, labelsGroup, valueCircle, valueArrow, valueDisplay, chartTitle);
    canvas.bringToFront(valueCircle);
    canvas.bringToFront(valueDisplay);
    let elements = {chartBorder, ticksGroup, labelsGroup, valueCircle, valueArrow, valueDisplay, chartTitle};
    this.setState({canvas, elements});
    this.updateDrillingChart(elements, canvas);
  }

  getPosition(radius, angleRad) {
    return {
      x: radius * Math.cos(angleRad),
      y: radius * Math.sin(angleRad)
    }
  }

  render() {
    return (
      <canvas id={this.state.drillingControl + this.props.id}/>
    );
  }

}

function mapStateToProps(store) {
  return {
    dashboardTheme: store.layout.dashboardTheme,
    fontsDownloaded: store.layout.fontsDownloaded,
  };
}

export default connect(mapStateToProps)(Gauge);
