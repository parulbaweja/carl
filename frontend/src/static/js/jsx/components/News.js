import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import {CircularProgress} from 'material-ui/Progress';
import Subheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    overflowY: 'auto',
  },
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: undefined,
    };
  }

  getNews() {
    var self = this;
    console.log('in component mounting');
    apiRequest(`news/${this.props.appId}`, function(body) {
      console.log(body);
      self.setState({
        articles: body.articles,
      });
    });
  }

  componentDidMount() {
    this.getNews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
      this.getNews();
    }
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    if (this.state.articles == undefined) {
      return (<CircularProgress variant="determinate" size={50}/>);
    }

    if (this.state.articles == false) {
      return(
        <div style={{marginLeft: '25%'}}>
          <br/>
        <Typography>
          {'No recent news - check back again!'}
        </Typography>
      </div>
      );
    }

    return (
      <div>
      <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
      cols={2}
    >
      <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
          <Subheader component="div">{'Recent News'}</Subheader>
        </GridListTile>
      {this.state.articles.map((article, i) => (
          <GridListTile key={i}>
            <img key={i} src={article.urlToImage}/>
            <a href={article.url}>
            <GridListTileBar
              title={article.title}
              subtitle={<span key={i}>{'by'} {article.author}</span>}
            />
          </a>
        </GridListTile>
      ))}
    </GridList>
  </div>
      </div>

    );
  }
}

News.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default News;
