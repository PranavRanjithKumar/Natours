/*eslint-disable  */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoicHJhbmF2MjEwNSIsImEiOiJja3I1YWQzajQxYzl2MnVyeDlta3djNWozIn0.JZNl8coMiqEk4l0fhmtbdg';
var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/pranav2105/ckr5aydb119bw17l2tghkl6l5', // style URL
  scrollZoom: false
  //center: [-118.113491, 34.111745],  starting position [lng, lat]
  //zoom: 9, // starting zoom
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  //Add markers
  const el = document.createElement('div');
  el.className = 'marker';
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add popup
  new mapboxgl.Popup({
    offset: 30,
    closeOnClick: false
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p> Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  //Extend mapbounds to include current locations
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
