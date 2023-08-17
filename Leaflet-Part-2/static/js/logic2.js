// Create the layered map objects
let tectonicPlates = L.layerGroup();
let earthquakeData = L.layerGroup();

// Create the createMap function
function createMap() {

    // Create the tilelayers
    // Satelite
    let satelite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    // Grayscale
    let grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    // Outdoors
    let outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    });

    // Create the baseMaps object
    let baseMaps = {
        "Satelite": satelite,
        "Grayscale": grayscale,
        "Outdoors": outdoor
    };

    // Create the overlayMaps object
    let overlayMaps = {
        "Earthquakes": earthquakeData,
        "Tectonic Plates": tectonicPlates
    };

    // Create a map object and set the default layers
    let myMap = L.map("map", {
        center: [35.037868,-46.596228],
        zoom: 3,
        layers: [satelite, earthquakeData]
    });

    // Create the layer control for the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // Add legend to the map
    legend.addTo(myMap);
    // x.addTo(myMap);

}

// Set both URLS to a variable
let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
let tectonicURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";


// EARTHQUAKE DATA //

// Grab the earthquakw data with d3 and read it into createFeatures function
d3.json(earthquakeURL).then((data) => {
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
    return mag * 70000
}

// Create the createFeatures function
function createFeatures(earthquakesData) {

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
    let earthquakes = L.geoJSON(earthquakesData, {

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
    
    // Add to layerGroup
    }).addTo(earthquakeData);

    // Add earthquakes object to createMap function
    createMap(earthquakes);
}


// TECTONIC PLATE DATA //

// Grab tectonic data with d3
d3.json(tectonicURL).then((response) => {
    
    // Use geojson (raw has properties and geometry)
    let tectonic = L.geoJSON(response, {

        // Choose color and size of lines
        color: "orange",
        weight: 2
    
    // Add to layerGroup
    }).addTo(tectonicPlates);

    // Add to createMap function
    createMap(tectonic);

});



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




