import { Injectable } from '@angular/core';
import { Location } from './location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: Location[] = [];
  constructor() {}

  setLocations(locations: any[]) {
    this.clearLocations();
    locations.forEach((location) => {
      this.locations.push(
        new Location(location.locationId, location.locationName)
      );
    });
  }

  getLocations() {
    return this.locations;
  }

  clearLocations() {
    this.locations = [];
  }
}
