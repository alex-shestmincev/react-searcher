/** @jsx React.DOM */
'use strict'

var React = require('react/addons')
var Router = require('react-router-component')
var DocumentTitle = require('react-document-title')

var Search = require('./Search')
var SearchResults = require('./SearchResults')
var Game = require('./Game')
var Home = require('./Home')

var Locations = Router.Locations
var Location = Router.Location
var CaptureClicks = require('react-router-component/lib/CaptureClicks')
var Link = require('react-router-component').Link


var App = React.createClass({

  getInitialState: function() {
    if (typeof window === 'undefined') {
      var entryPath = this.props.path
    } else {
      var entryPath = window.location.pathname
    }
    return {
      entryPath: entryPath
    }    
  },

  searchGames: function(query) {
    this.refs.router.navigate('/find/' + encodeURI(query))
  },

  scrollTop: function() {
    if (typeof window !== 'undefined') {
      if (window.location.href.indexOf("/game/") > -1) {
        window.scrollTo(0,0)
      }
    }
  },

  render: function() {
    return (
      <html>
        <head>
          <title>%react-iso-vgs%</title>
          <meta charSet="UTF-8" />
          <link href="http://fonts.googleapis.com/css?family=Merriweather+Sans:800" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/style.css" />
        </head>
        <body>
        <Search onSearch={this.searchGames} entryPath={this.state.entryPath} />
        <DocumentTitle title="%react-iso-vgs%">
        <CaptureClicks>
          <Locations ref="router" path={this.props.path} onNavigation={this.scrollTop}>
            <Location path="/" handler={Home} />
            <Location path="/game/:game_id/:game_slug" handler={Game} />
            <Location path="/find/:query" handler={SearchResults} />
          </Locations>
        </CaptureClicks>
        </DocumentTitle>
        <script type="text/javascript" src="/js/behavior.min.js"></script>
        </body>
      </html>
    )
  }

})


module.exports = {
  routes: App,
  title: DocumentTitle
}


// Bootstrap client
if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(React.createElement(App), document)
  }
}
