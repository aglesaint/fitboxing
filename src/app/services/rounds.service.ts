import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Round, RoundsData } from '../models/round.model';

@Injectable({
    providedIn: 'root'
})
export class RoundsService {
    private readonly roundsJsonPath = 'assets/rounds.json';

    constructor(private http: HttpClient) { }

    getAllRoundsData(): Observable<RoundsData> {
        // Timestamp en query param → contourne le cache SW et le cache HTTP
        const cacheBuster = `?v=${Date.now()}`;
    
        const headers = new HttpHeaders({
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
    
        return this.http.get<RoundsData>(`${this.roundsJsonPath}${cacheBuster}`, { headers });
    }

    getRounds(): Observable<Round[]> {
        return this.http.get<RoundsData>(this.roundsJsonPath).pipe(
            map((data: RoundsData) => data.rounds)
        );
    }

    getRoundByNumber(number: number): Observable<Round | undefined> {
        return this.http.get<RoundsData>(this.roundsJsonPath).pipe(
            map((data: RoundsData) => data.rounds.find(r => r.number === number))
        );
    }
}

