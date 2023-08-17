# Leaflet Challenge

Develope a way to visualize earthquake data (taken from [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)) to better educate the public and other government  
organizations on issues facing our planet. Using `leaflet` create two maps to look at earthquakes around the world  
from the past 7 days. 

---

## About 

This assignment is split up into two sections. **Part 1** and **Part 2** *(optional)*. For the first part,  
use leaflet and pluggins, and create a map showcasing earthqaukes from the past 7 days. Grab the data from the  
[json](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) and read it in using the d3 library.   
The markers for the map should have two parameters. The **size** should reflect the **magnitude** and the **color**  
should reflect the **depth** of each earthquake.  

    * The higher the magnitude, the bigger the marker size.  
    * The deeper the depth, the darker the marker color. 

Along with marker parameters, include a popup for each earthquake with additional information. Lastly, create a legend  
that will provide the appropriate context for the color markings on the map. 







https://earthquake.usgs.gov/data/comcat/index.php#tz : meaning of abbreviations

https://stackoverflow.com/questions/43613560/changing-marker-colour-based-on-property-in-leaflet : awesome marker

https://www.w3.org/wiki/CSS/Properties/color/keywords : marker colors

https://veroviz.org/docs/leaflet_style.html#:~:text=Leaflet%20supports%20the%20following%20colors,'%2C%20and%20'red'. : colors

https://leafletjs.com/examples/choropleth/ : legend

https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=3 : color brewer

