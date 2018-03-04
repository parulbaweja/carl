import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';

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
      return (<CircularProgress size={80} thickness={5}/>);
    }

    if (this.state.articles == false) {
      return(
        <div>
          {'No recent news - check back again!'}
        </div>
      );
    }

    return (
      <div>
      <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      {this.state.articles.map((article, i) => (
        <a key={i} href={article.url}>
        <GridTile
          key={i}
          title={article.title}
          subtitle={<span key={i}>{'by'} <b key={i}>{article.author}</b></span>}
        >
          <img key={i} src={article.urlToImage}/>
        </GridTile>
      </a>
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
