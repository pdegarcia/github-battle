var React = require('react');
//var Link = require('react-router-dom').Link;  // Fundamentals to create an anchor tag <a>
var NavLink = require('react-router-dom').NavLink;  // Dynamically change the active link

function Nav () {
  return (
    <ul className="navbar">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/battle">Battle</NavLink></li>
      <li><NavLink activeClassName="active" to="/popular">Popular</NavLink></li>
    </ul>
  )
}

module.exports = Nav;