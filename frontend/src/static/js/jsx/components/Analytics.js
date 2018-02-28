import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
  VictoryTooltip,
  VictoryContainer,
  VictoryStack,
  VictoryLegend,
  VictoryVoronoiContainer,
} from 'victory';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const styles = {
  graph: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: 300,
    width: 500,
  },
};

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      dates: [],
      averages: undefined,
      offers: undefined,
    };

    var self = this;
    apiRequest('analytics/status', function(body) {
      self.setState({
        status: body,
      });
    });

    apiRequest('analytics/date_applied', function(body) {
      self.setState({
        dates: body,
      });
    });

    apiRequest('analytics/time_stats', function(body) {
      self.setState({
        averages: body,
      });
    });

    apiRequest('analytics/offer_amounts', function(body) {
      self.setState({
        offers: body,
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

    const statuses = ['Interested', 'Applied', 'Phone Call', 'Interview', 'Offer', 'Accepted', 'Withdrawn', 'Not a fit'];
    const statusColors = ['#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00695C', '#004D40'];
    const data = [
      {name: 'Hackbright', uv: 4000, amt: 2400},
    ];

    if (this.state.dates === undefined) {
      return null;
    }
    return (
      <div>
        <div className={'row1'} style={styles.graph}>
          <div style={styles.circle}>
            <h3 style={{position: 'relative'}}>{'Averages'}</h3>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{y: 50}}
            >
              <VictoryBar
                horizontal={true}
                style={{data: {fill: '#c43a31'}}}
                data={this.state.averages}
                padding={200}
                labelComponent={<VictoryTooltip/>}
                events={[{
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({style: {fill: 'gold', width: 30}}),
                        }, {
                          target: 'labels',
                          mutation: () => ({active: true}),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => {},
                        }, {
                          target: 'labels',
                          mutation: () => ({active: false}),
                        },
                      ];
                    },
                  },
                }]}
              />
            </VictoryChart>
          </div>

        <div style={styles.circle}>
          <h3>{'Applications by Status'}</h3>
          <VictoryPie
            padAngle={3}
            innerRadius={100}
            data={this.state.status}
            labels={(d) => `${d.x}`}
            theme={VictoryTheme.material}
            labelComponent={<VictoryTooltip/>}
            events={[{
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: 'data',
                      mutation: () => ({style: {fill: 'gold', width: 30}}),
                    }, {
                      target: 'labels',
                      mutation: () => ({active: true}),
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: 'data',
                      mutation: () => {},
                    }, {
                      target: 'labels',
                      mutation: () => ({active: false}),
                    },
                  ];
                },
              },
            }]}
          />
        </div>
      </div>

      <div className={'row2'} style={styles.graph}>

        <div style={styles.circle}>
          <VictoryChart
            theme={VictoryTheme.material}
            domain={{x: [0, 5], y: [0, 7]}}
            containerComponent={<VictoryVoronoiContainer/>}
          >
            {statuses.map((status, i) => {
              return(
                <VictoryScatter
                  key={i}
                  style={{data: {fill: statusColors[i]}}}
                  size={7}
                  data={this.state.dates.filter(date => date.label == status)}
                  labelComponent={<VictoryTooltip/>}
                  labels={(d) => d.label}
                />
              );
            })
            }
            <VictoryLegend
              x={-125}
              y={75}
              gutter={20}
              colorScale={statusColors}
              data={[
                {name: 'Interested'},
                {name: 'Applied'},
                {name: 'Phone Call'},
                {name: 'Interview'},
                {name: 'Offer'},
                {name: 'Accepted'},
                {name: 'Withdrawn'},
                {name: 'Not a fit'},
              ]}
            />
          </VictoryChart>

        </div>

        <div  style={styles.circle}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={50}
            >
              <VictoryBar
                style={{data: {fill: '#c43a31'}}}
                data={this.state.offers}
                barRatio={.5}
                labelComponent={<VictoryTooltip/>}
                events={[{
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({style: {fill: 'gold', width: 30}}),
                        }, {
                          target: 'labels',
                          mutation: () => ({active: true}),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => {},
                        }, {
                          target: 'labels',
                          mutation: () => ({active: false}),
                        },
                      ];
                    },
                  },
                }]}
              />
            </VictoryChart>
          </div>

      </div>
    </div>
    );
  }
}

export default Analytics;
