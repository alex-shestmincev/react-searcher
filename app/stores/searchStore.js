var Reflux = require('reflux')
var request = require('superagent')

var appConfig = require('./../../config')
var appActions = require('./../actions')


var searchStore = Reflux.createStore({

  init: function() {
    this.listenTo(appActions.searchUpdate, this.handleSearchUpdate)
  },

  handleSearchUpdate: function() {
    var self = this
    var searchString = arguments[0]
    var data = { lat: '49.969814799999995',lon: '36.315144599999996',maxDistance: 10,tags: '' };

    request
      .get(appConfig.LOCAL_API_HOST + '/api/find/' + searchString)
      .end(function(err, res) {
        if(res.body && res.body.results) {
          self.trigger({
            searchString: searchString,
            searchResults: res.body.results
          })
        } else {
          self.trigger({
            searchString: searchString,
            searchResults: []
          })
        }
    })
  }

})

module.exports = searchStore