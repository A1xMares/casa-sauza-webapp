import { Injectable} from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Local variables //
  private url = 'http://localhost:3000/api/';
  public currentUserValue = {};
  // Constructor //
  constructor(
      private http: HttpClient
  ) { }
  // Obtain objects from 1 collection //
  getDataObjects( type: string) {
    return this.http.get(this.url + type);
  }
  // Obtain object per id //
  getDataObject( type: string, id: string) {
    // console.log(this.url  + type + id);
    return this.http.get(this.url + '/' + type + '/' + id);
  }
  // Add a new data object //
  addDataObject(model: any, type: string) {
    return this.http.post(this.url  + type, model);
  }
  // Edit object per id //
  editDataObject(id: string, model: any , type: string) {
    return this.http.patch(this.url + type + '/' + id, model);
  }
  // Delete object per id //
  deleteDataObject(type: string, id: string) {
    return this.http.delete(this.url + type + '/' + id);
  }
  // Obtain data to fill table //
  getTableDataObjects(query: string) {
    return this.http.get(this.url + query);
  }
  // Obtain data from external services //
  getGenericDataObjects(query: string) {
    return this.http.get(query);
  }
}
