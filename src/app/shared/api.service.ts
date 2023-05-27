import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getEmployeeData (): Observable<any> {
    return this.http.get('https://alanwireapi.codefilabsapi.com/api/v1/users/me');
  }

  validateAdmin() {
    return this.http.get(`${environment.apiRoute}users/get_all`);
  }

}
