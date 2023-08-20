# Leaflet Challenge  

Develope a way to visualize earthquake data (taken from [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)) to better educate the public and other government organizations on issues facing our planet. Using `leaflet` create two maps to  
look at earthquakes around the world from the past 7 days. 

---

## About 

This assignment is split up into two sections. **Part 1** and **Part 2** *(optional)*. For the first part,    
use leaflet and pluggins, and create a map showcasing earthqaukes from the past 7 days. Grab the data from the     
`json` and read it in using the d3 library. The markers for the map should have two parameters. The **size** should  
reflect the **magnitude** and the **color** should reflect the **depth** of each earthquake.  

    * The higher the magnitude, the bigger the marker size.    
    * The deeper the depth, the darker the marker color. 

Along with marker parameters, include a popup for each earthquake with additional information. Lastly, create a  
legend that will provide the appropriate context for the color markings on the map.  

*Optional* For the second part, create a second map showcasing **tectonic** plates alongside the earthquake points.  
Peform the following tasks:  
   * Plot the [tectonic plates dataset](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)
   * Plot the earthquake dataset
   * Add other base maps to choose from
   * Put each dataset into separate overlays that can be turned on and off
   * Add layer controls and a legend to your map  


** [`json`](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) **  

---

## Getting Started

1. Create a new repository called `leaflet-challenge`
2. Clone the new repo to your computer
3. Use the [Starter_Code.zip](https://github.com/Kaileycar/leaflet-challenge/files/12388523/Starter_Code.zip) to get started  
4. Inside your repository, create a directory for the challenge. The folder names should correspond to the challenges:
   **Leaflet-Part-1** and **Leaflet-Part-2**
5. Push the changes to GitHub

---

## Usage

### Part 1: Create the Earthquake Visualization  

   * Use Leaflet to create a map showcasing earthquakes from the past 7 days  
   * Use the URL from `USGS` json to grab the data  
   * Create the map with circle markers and a legend
   * The map should look like this:
    ![Screenshot 2023-08-17 at 6 02 11 PM](https://github.com/Kaileycar/leaflet-challenge/assets/130424499/3e2c29b6-c086-4c3e-8330-089576dda6c9)


### Part 2: Gather and Plot More Data  

   * Use Leaflet to create a map showcasing earthquakes from the past 7 days alongside the tectonic plates
   * Use the URL from the `tectonic plates dataset` to grab the data
   * Create the map with overlays and multiple base maps along with a legend
   * The map should look like this:
     ![Screenshot 2023-08-17 at 6 02 00 PM](https://github.com/Kaileycar/leaflet-challenge/assets/130424499/a86e9ce2-8cbc-4824-9fdc-2152509e7a9b)

---

## Links

   * [Earthquake Abbreviations](https://earthquake.usgs.gov/data/comcat/index.php#tz)  
   * [legend](https://leafletjs.com/examples/choropleth/)  
   * [Color Brewer](https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=3)  

