import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private http: HttpClient) {}

  getPositions(): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/positions/`);
  }

  getCities(): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/cities/`);
  }

  getCityById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/cities/${id}/`);
  }

  createCity(description: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8000/api/cities/add/`,
      description
    );
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8000/api/cities/delete/${id}/`
    );
  }

  updateCity(id: number, description: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8000/api/cities/update/${id}/`,
      description
    );
  }

  getDivisions(): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/divisions/`);
  }

  getDivisionById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/divisions/${id}/`);
  }

  createDivision(description: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8000/api/divisions/add/`,
      description
    );
  }

  deleteDivision(id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8000/api/divisions/delete/${id}/`
    );
  }

  updateDivision(id: number, description: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8000/api/divisions/update/${id}/`,
      description
    );
  }

  getTeams(): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/teams/`);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/teams/${id}/`);
  }

  createTeam(body: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/teams/add/`, body);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8000/api/teams/delete/${id}/`
    );
  }

  updateTeams(id: number, body: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8000/api/teams/update/${id}/`,
      body
    );
  }

  getMatches(): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/matches/`);
  }

  createMatch(body: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/matches/add/`, body);
  }

  getPlayers(): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/players/`);
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/players/${id}/`);
  }

  createPlayer(body: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/players/add/`, body);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8000/api/players/delete/${id}/`
    );
  }

  updatePlayer(id: number, body: string): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8000/api/players/update/${id}/`,
      body
    );
  }
}
