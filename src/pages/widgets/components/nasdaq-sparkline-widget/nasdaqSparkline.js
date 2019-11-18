import React from 'react';
import Sparklines from '../../../../components/Sparklines';

class NasdaqSparkline extends React.Component {

  state = {
    data: [{
      data: [4, 6, 5, 7, 5],
    }],
    width: '100%',
    height: 70,
    options: {
      stroke: {
        width: 1
      },
      markers: {
        size: 4,
        colors: '#57B955',
        shape: "circle",
        strokeWidth: 0,
        hover: {
          size: 5,
          colors: '#000',
        }
      },
      colors: [
        '#4E85BD'
      ],
      grid: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      }
    }
  };

  render() {
    const { data, height, width, options } = this.state;
    return (
      <Sparklines 
        data={data} 
        height={height}
        width={width}
        type={"line"}
        options={options} 
      />
    );
  }
}

export default NasdaqSparkline;
