import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  selectedResponse: any = <any>{};
  constructor() {}
}