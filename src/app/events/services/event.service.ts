import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { differenceInMinutes } from 'date-fns';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../models/event.model';
const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) {}
  public getEvents(fromDate = new Date(+0).toUTCString()): Observable<any> {
    return this._http.get(`${API_URL}/events`, { params: { fromDate}});
  }

  public addEvent(data: FormData): Observable<any> {
    return this._http.post(`${API_URL}/events`, data);
  }

  public getEvent(eventId: number): Observable<any> {
    return this._http.get(`${API_URL}/events/${eventId}`);
  }

  public editEvent(eventId: number, data: FormData): Observable<any> {
    return this._http.put(`${API_URL}/events/${eventId}`, data);
  }

  public deleteEvent(eventId: number): Observable<any> {
    return this._http.delete(`${API_URL}/events/${eventId}`);
  }

  public inviteUser(eventId: number, userId: number): Observable<any> {
    return this._http.put(`${API_URL}/events/${eventId}`, { userId});
  }

  public registerToEvent(eventId: number): Observable<any> {
    return this._http.put(`${API_URL}/events/${eventId}/register`, {});
  }

  public unregisterFromEvent(eventId: number): Observable<any> {
    return this._http.put(`${API_URL}/events/${eventId}/unregister`, { });
  }

  public startEvent(eventId: number): Observable<any> {
    return this._http.post(`${API_URL}/events/${eventId}/start`, {});
  }

  public closeEvent(eventId: number): Observable<any> {
    return this._http.post(`${API_URL}/events/${eventId}/close`, {});
  }

  public joinToEvent(eventId: number): Observable<any> {
    return this._http.get(`${API_URL}/events/${eventId}/join`);
  }

  public startOpenviduSession(eventId: number): Observable<any> {
    return this._http.post(`${API_URL}/events/${eventId}/start-openvidu-session`, {});
  }

  public stopOpenviduSession(eventId: number): Observable<any> {
    return this._http.post(`${API_URL}/events/${eventId}/stop-openvidu-session`, {});
  }

  public startOpenviduRecording(eventId: number, recordingId: string): Observable<any> {
    return this._http.post(`${API_URL}/events/${eventId}/${recordingId}/start-openvidu-recording`, {});
  }

  public stopOpenviduRecording(eventId: number, recordingId: string): Observable<any> {
    return this._http.post(`${API_URL}/events/${eventId}/${recordingId}/stop-openvidu-recording`, {});
  }

  public isPastEvent(event: IEvent): boolean {
    const endTimeDiff = differenceInMinutes(
      new Date(event.endDate),
      new Date()
    );
    return endTimeDiff <= 0;
  }

  public isEventActive(event: IEvent): boolean {
    const timeDiff = differenceInMinutes(
      new Date(event.startDate),
      new Date()
    );
    const startEndTimeDiff = differenceInMinutes(
      new Date(event.startDate),
      new Date(event.endDate)
    );

    return timeDiff <= 30 && timeDiff >= startEndTimeDiff;
  }
}
