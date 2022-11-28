import { Injectable } from '@angular/core';
import { Location } from './location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: Location[] = [];
  constructor() {}

  setLocations(locations:any[]){
    this.locations=[];
    locations.forEach((location)=>{
      this.locations.push(new Location(location.id,location.name));
    });
  }

  getLocations() {
    return this.locations;
  }

  clearLocations() {
    this.locations = [];
  }
}
