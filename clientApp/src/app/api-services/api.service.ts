import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collections, GithubRepo, GroupExperience, HistoryProfile } from '../entities/collection';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private header: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getCollection(id: number): Observable<Collections[]> {
    return this.http.get<Collections[]>(`api/profile/${id}`, { headers: this.header });
  }

  likeToCollection(id: number): Observable<any> {
    return this.http.post<any>('api/profile', JSON.stringify({ id: id }), { headers: this.header });
  }

  getGithubRepos(): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>('api/profile/getGithubRepos', { headers: this.header });
  }

  getExperience(): Observable<GroupExperience[]> {
    return this.http.get<GroupExperience[]>('api/profile/getExperience', { headers: this.header });
  }

  getHistory(): Observable<HistoryProfile[]> {
    return this.http.get<HistoryProfile[]>('api/profile/getHistory', { headers: this.header });
  }

  sendComments(data: any): Observable<any> {
    return this.http.post<any>('api/profile/sendComments', JSON.stringify(data), { headers: this.header });
  }
}
