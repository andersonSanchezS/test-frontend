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

  createCity(description: string): Observable<any> {
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
}
