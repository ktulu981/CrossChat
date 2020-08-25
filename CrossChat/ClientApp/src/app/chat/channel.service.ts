import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';




@Injectable({
    providedIn: 'root'
  })
  export class ChannelService {
    constructor(private httpClient: HttpClient) { }

   

    getChannels(): Observable<any[]> {

        return this.httpClient.get<any[]>(`${environment.apiUrl}/channel`);
    }


    getChannel(id: string): Observable<any> {

        return this.httpClient.get<any>(`${environment.apiUrl}/channel/${id}`);
    }

   

    addChannel(channel: any): Observable<any>{
        return this.httpClient.post<any>(`${environment.apiUrl}/channel`, channel);
    }

    editChannel(id: string, channel: any): Observable<any>{
        return this.httpClient.put<any>(`${environment.apiUrl}/channel/${id}`, channel);
    }


    deleteChannel(id: string): Observable<any>{
        return this.httpClient.delete<any>(`${environment.apiUrl}/channel/${id}`);
    }
  }
