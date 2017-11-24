var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Navbar');
var Home = require('./Home');
var Battle = require('./Battle');

class App extends React.Component { //ES6 syntax
    render () {     //returns the specific UI of the element.
        return (    // parece HTML, mas é JSX que depois é transpiled para JS
            <Router>
                <div className="container">
                    <Nav />
                    <Switch> 
                        <Route exact path="/" component={Home} />
                        <Route exact path="/battle" component={Battle} />
                        <Route exact path="/popular" component={Popular} />
                        <Route render={function () {
                            return <p>Not Found</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

// Exporting the app component so we can require it later!
module.exports = App;