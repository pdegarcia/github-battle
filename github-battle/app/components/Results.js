var React = require('react');
var queryString = require('query-string');
var API = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

function Player (props) {
  return (
    <div>
      <h1 className="header">{props.label}</h1>
      <h3>Score: {props.score}</h3>
    </div>
  )
}

Player.PropTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount () {
    let players = queryString.parse(this.props.location.search);

    API.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (results) {
      if(results === null) {
        return this.setState(function () {
          return {
            error: 'Error! Be sure you provided valid Github Users.',
            loading: false
          }
        })
      }

      this.setState(function () {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    }.bind(this))
  }

  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.setState.loading;

    if (loading === true) {
      return <p>Loading</p>
    }

    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset Battle</Link>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="column">
          {/* {JSON.stringify(this.state, null, 2)} */}
          <Player score={winner.score} profile={winner.profile} label="Winning Player"/>
        </div>
        <div className="column">
          {/* <Player score={loser.score} profile={loser.profile} label="Loosing Player"/> */}
        </div>
      </div>
    )
  }
}

module.exports = Results;