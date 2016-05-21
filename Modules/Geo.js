var redis = require('redis'),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

var geoRedis = require('georedis').initialize(client);

var Geo = function(coord) {
  this.coord = coord;

  return {
    add: function() {
        geo.addLocation('Toronto', {latitude: latLon[], longitude: -79.4167}, function(err, reply){
          if(err) console.error(err)
          else console.log('added location:', reply)
        })
    }
    search: function(coord) {

    }
  }
}
