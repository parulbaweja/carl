import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryLine,
  VictoryToolTip,
} from 'victory';

const styles = {
  circle: {
    height: 300,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
  },
};

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      dates: [],
    };

    var self = this;
    apiRequest('analytics/status', function(body) {
      self.setState({
        status: body,
      });
    });

    apiRequest('analytics/date_applied', function(body) {
      self.setState({
        dates: body.map(date => {
          const marker = new Date(date.x);
          const count = date.y;
          const company = date.label;

          return (
            {x: marker, y: count, label: company}
          );
        }),
      });
    });
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    console.log(this.state);
    if (this.state.dates === undefined) {
      return null;
    }
    return (
      <div>
      <div style={styles.circle}>
      <VictoryPie
        padAngle={3}
        innerRadius={100}
        data={this.state.status}
        labels={(d) => `${d.x}: ${d.y}`}
        theme={VictoryTheme.material}
      />
    </div>

    <div style={styles.circle}>
          <VictoryChart
            width={600} height={350} scale={{x: 'time'}}
            domain={{y: [0, 3]}}
            containerComponent={
              <VictoryZoomContainer
                responsive={false}
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryScatter
              style={{
                data: {stroke: 'tomato'},
              }}
              data={this.state.dates}

            />

          </VictoryChart>

          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={600} height={90} scale={{x: 'time'}}
            containerComponent={
              <VictoryBrushContainer
                responsive={false}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickValues={[
                new Date(2017, 1, 1),
                new Date(2018, 1, 1),
              ]}
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: {stroke: 'tomato'},
              }}
              data={this.state.dates}
            />
          </VictoryChart>
        </div>

        <div style={styles.circle}>
          <VictoryChart
            theme={VictoryTheme.material}
            domain={{y: [0, 7]}}
            scale={{x: 'time'}}
          >
            <VictoryScatter
              style={{data: {fill: '#c43a31'}}}
              size={7}
              data={this.state.dates}
            />
          </VictoryChart>
        </div>

    </div>
    );
  }
}

export default Analytics;
