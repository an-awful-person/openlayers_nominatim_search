import { Box, Button, List, ListItem, ListItemButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { type NominatimJsonModel } from './models/nominatim.model';
import { ApiService } from './services/api.service';
import { MapService } from './services/map.service';
import { NominatimService } from './services/nominatim.service';
import { PopupService } from './services/popup.service';
import { ProgressService } from './services/progress.service';
import { applyTransform } from 'ol/extent';
import { getTransform } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import type { Coordinate } from 'ol/coordinate';

  const mapService = new MapService('map');
  const progressService = new ProgressService();
  const popupService = new PopupService();
  const apiService = new ApiService(progressService, popupService);
  const nominatimService = new NominatimService(apiService);

function App() {

  const polygon_layer_name = "polygon_layer";

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchResults, setSearchResults] = useState<NominatimJsonModel[]>([]);

  useEffect(() => {
    mapService.init();

    mapService.addLayer(polygon_layer_name, new VectorLayer())

    return () => {
      mapService.exit();
    }
  }, [])

  function searchNominatim(){
    nominatimService.searchCall(searchTerm).then(response => {
      setSearchResults(response);
      console.log('response',response);
    })
  }

  function focusOnMapView(searchResult: NominatimJsonModel){
    const bb = searchResult.boundingbox;
    const geojson = searchResult.geojson;
    const layer = mapService.findLayer(polygon_layer_name);
    if(bb){
      //min_lat, max_lat, min_lon, max_lon
      const extent = applyTransform([parseFloat(bb[2]),parseFloat(bb[0]),parseFloat(bb[3]),parseFloat(bb[1])], getTransform('EPSG:4326', 'EPSG:3857'))
      mapService.olMap?.getView().fit(extent);
      if(geojson && layer){
        mapService.createPolygons((geojson.type == "Polygon" ? [geojson.coordinates] : geojson.coordinates) as Coordinate[][][] ,layer as VectorLayer)
      }
      
    }
    
  }

  return (
    <>
      <div id={'map'} style={{
        position: 'absolute',
        inset: '0'
      }}></div>
      <Box sx={{ 
          position: 'absolute', 
          bottom: '1em', 
          zIndex: 3, 
          left: '1em', 
          background: 'white', 
          borderRadius: '1em', 
          width: '30em',
          display: 'flex',
          alignItems: 'center'
        }}>
        <TextField sx={{ margin: '0.5em', width:'100%' }} onChange={(e) => {setSearchTerm(e.target.value)}}/>
        <Button variant={'contained'} sx={{margin:'0.5em'}} onClick={() => {searchNominatim()}}>Search</Button>
        {searchResults.length == 0 ? null : 
        <List sx={{position:'absolute', zIndex:3, left:'0.5em', bottom:'5em', background:'white', color:'black'}}>
          {searchResults.map((result, index) => {
            return (
            <ListItem key={index}>
              <ListItemButton onClick={() => {focusOnMapView(result)}}>
                {result.display_name}  
              </ListItemButton>
              
            </ListItem>
            )
          })}
          </List>}
      </Box>
    </>
  )
}

export default App
