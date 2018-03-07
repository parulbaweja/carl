import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {
  VictoryPie,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
  VictoryTooltip,
  VictoryContainer,
  VictoryStack,
  VictoryLegend,
  VictoryVoronoiContainer,
  VictoryLabel,
} from 'victory';
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Cell, PieChart, Pie, ScatterChart, Scatter, LineChart, Line} from 'recharts';
import Typography from 'material-ui/Typography';

const styles = {
  graph: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: 350,
    width: 600,
    padding: 10,
    textAlign: 'center',
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
      for (var i=0; i<body.length; i++) {
        var newDate = new Date(body[i].x);
        var isoDate = newDate.toISOString();
        // var newDate = body[i].x.slice(0,10);
        body[i].x = isoDate.slice(0,10);
      }
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
            // <VictoryAxis
            //   tickValues={this.state.dates.map((date) => {
            //     return date.x;
            //   })}
            //   tickFormat={(x) => x.getUTCDate()}
            // />

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
    console.log(this.state);
    return (
      <div>
        <div style={styles.graph}>
          <Paper style={styles.circle}>
            <Typography variant="subheading">{'Average Days to Status Change'}</Typography>
            <BarChart
              width={600} height={300} data={this.state.averages}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
              style={{margin: 'auto', display: 'inline', float: 'none'}}
            >
              <XAxis
                dataKey="x"
                fontFamily='roboto'/>
              <YAxis fontFamily='roboto'/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip labelStyle={{fontFamily: 'roboto'}} itemStyle={{fontFamily: 'roboto'}}/>
              <Bar dataKey="Days" fill="#82ca9d"/>
            </BarChart>
          </Paper>

          <Paper style={styles.circle}>
            <Typography variant="subheading">{'Applications by Status'}</Typography>
          <PieChart width={600} height={300}>
            <Pie data={this.state.status} dataKey='value' cx={300} cy={150} innerRadius={100} fontFamily='roboto' outerRadius={140} fill="#3388bb">
              {
                data.map((entry, index) => <Cell fill={statusColors[index]}/>)
              }
            </Pie>
              <Tooltip labelStyle={{fontFamily: 'roboto'}} itemStyle={{fontFamily: 'roboto'}}/>
       </PieChart>
        </Paper>
      </div>

      <div style={styles.graph}>
        <Paper style={styles.circle}>
            <Typography variant="subheading">{'Timeline per Company Applied'}</Typography>
          <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer/>}
            domain={{x: [0, 11], y: [0, 5]}}
            style={{marginLeft: '50%', marginTop: '50%'}}
          >
            <VictoryAxis
              fixLabelOverlap={true}
            />
            <VictoryAxis
              dependentAxis={true}
            />
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
          </VictoryChart>
        </Paper>

        <Paper style={styles.circle}>
            <Typography variant="subheading">{'Offer per Company'}</Typography>
            <BarChart
              width={600} height={300} data={this.state.offers}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="x" fontFamily='roboto'/>
              <YAxis fontFamily='roboto'/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip labelStyle={{fontFamily: 'roboto'}} itemStyle={{fontFamily: 'roboto'}}/>
              <Bar dataKey="Offer Amount" fill="#82ca9d"/>
            </BarChart>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Analytics;
