var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Github Clash: Battle against your coding enemies!</h1>
        <Link className="button" to="/battle">Challenge!</Link>
      </div>
    )
  }
}

module.exports = Home; 