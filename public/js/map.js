mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 8, // starting zoom
});

// console.log(coordinates, typeof coordinates);
// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates) //Listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML("<p>Exact location provided after booking</p>")
      .setMaxWidth("300px")
      .addTo(map)
  )
  .addTo(map);

// POP up on marker
