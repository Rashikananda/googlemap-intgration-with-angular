import { Component, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import GoogleMapsLoader from 'google-maps';
declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentLat;
  currentLong;
  cityCircle;
    constructor() {
    GoogleMapsLoader.KEY = 'AIzaSyBAyMH-A99yD5fHQPz7uzqk8glNJYGEqus';
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private clickListener: google.maps.MapsEventListener;

  initMap() {

    GoogleMapsLoader.load(g => {
      this.map = new google.maps.Map(this.mapDiv.nativeElement, {
        center: { lat: 20.2961, lng: 85.8245 },
        zoom: 12,
        disableDefaultUI: true
      });

    this.cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            center: { lat: 20.2961, lng: 85.8245 },
            radius: 500,
            editable: true
          });
    console.log(this.cityCircle,this.map)

     const bounds = {
          north: 20.3261,
          south: 20.2561,
          east: 85.8545,
          west: 85.7745
        };

        // Define a rectangle and set its editable property to true.
        var rectangle = new google.maps.Rectangle({
          bounds: bounds,
          editable: true
        });
        rectangle.setMap(this.map);
    this.clickListener = this.map.addListener('click', (event) => {
      this.addMarker(event.latLng);
    });
    });
  }



  private addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
    
  }


  ngOnInit() {
    this.initMap();
  }
}

