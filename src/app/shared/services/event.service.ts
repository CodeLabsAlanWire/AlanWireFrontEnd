import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Event {
  name: string;
  day: number;
  month: number;
  year: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private BASE_URL: string = environment.apiRoute + 'events';
  private http = inject(HttpClient);

  createEvent(event: Event) {
    let params = {
      name: event.name,
      day: event.day,
      month: event.month,
      year: event.year
    }
    return this.http.post<any>(this.BASE_URL + '/create', params);
  }

  deleteEvent(id: number) {
    return this.http.delete<any>(this.BASE_URL + '/delete', {
      params: { id: id },
    });
  }

  viewMonth(month: number, year: number) {
    return this.http.get<any>(this.BASE_URL + '/view_month', {
      params: { month: month, year: year },
    });
  }
}
