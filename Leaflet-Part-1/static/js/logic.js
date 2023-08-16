// Create the createMap function
function createMap(earthquakeData) {

    // Add the tile layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // add in the baseMap object
    let baseMap = {
        "Street": street
    };

    // Add in the overlayMap object
    let overlayMap = {
        "Earthquake": earthquakeData
    };

    // Create the map object
    let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquakeData]
    });

    // Create the control for the base and overlap map objects
    L.control.layers(baseMap, overlayMap, {
        collapsed: true
    }).addTo(myMap);

    // Add the legend to the map
    legend.addTo(myMap);
}

// Store the API to a variable
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the data with D3 and add to the createFeatures function
d3.json(url).then((data) => {
    createFeatures(data.features);
});

// Create a createColor function using depth as the argument
// the higher the depth, the darker the color
function createColor(depth) {
    return depth > 90 ? '#bd0026' :
           depth <= 90 && depth > 70 ? '#f03b20' :
           depth <= 70 && depth > 50 ? '#fd8d3c' :
           depth <= 50 && depth > 30 ? '#feb24c' :
           depth <= 30 && depth > 10 ? '#fed976' :
                                       '#ffffb2';
}
// Create function to calculate the markersize
// The higher the magnitude, the bigger the marker
function markerSize(mag) {
    return mag * 20000
}

// Create the createFeatures function
function createFeatures(earthquakeData) {

    // Create the onEachFeature function within the previous function
    // Add a popup to each marker with the place, time, and sig 
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Place: ${feature.properties.place}</h3><hr>
         <p><b>Time: </b>${new Date(feature.properties.time)}</p>
         <p><b>Significance: </b>${feature.properties.sig}</p>
         <p><b>Magnitude: </b>${feature.properties.mag}</p>
         <p><b>Depth: </b>${feature.geometry.coordinates[2]}</p>`);
    }

    // create an earthquakes object that will hold the geoJSON data
    // Add the properties: onEachFeature and pointToLayer
    let earthquakes = L.geoJSON(earthquakeData, {

        // Attatch the function from before onto onEachLayer
        onEachFeature: onEachFeature,

        // PointToLayer allows circle markers
        pointToLayer: function(feature, latlng) {

            // Color is depth and radius is mag
            let markers = {
                color: "white",
                fillColor: createColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.8,
                weight: 0.3,
                radius: markerSize(feature.properties.mag)
            }
            // Return the marker as  L.circle with latlng as a param
            return L.circle(latlng, markers);
        }
    });

    // Add earthquakes object to createMap function
    createMap(earthquakes);
}

// Create the legend
let legend = L.control({position: 'bottomright'});
legend.onAdd = function() {

    // Create div for HTML and 'grades' to equal each category box
    let div = L.DomUtil.create('div', 'info legend'),
        grades = [ -10, 10, 30, 50, 70, 90 ];
    
    // Loop through each object in 'grades'
    for (let i = 0; i < grades.length; i++) {

        // Add the colors based on each grade vaule and return 'div'
        div.innerHTML +=
            '<i style="background:' + createColor(grades[i] + 1) + '"></i>' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    
    }
       
    return div;
};




