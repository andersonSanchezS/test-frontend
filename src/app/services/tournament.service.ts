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
}
