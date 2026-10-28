import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Pokemon {
    private http = inject(HttpClient);
    private apiURL = 'http://localhost:5000/api/pokemon';

    pokemonGymLeader = signal<any[]>([]);

    fetchGymLeader(){
        this.http.get<any[]>(this.apiURL).subscribe(data => this.pokemonGymLeader.set(data));
    }
    saveGymLeader(data: any){
        return this.http.post(this.apiURL, data);
    }
    deleteGymLeader(id: string) {
        return this.http.delete<void>(`${this.apiURL}/${id}`);
    }   
    updateGymLeader(id: string, data: any){
        return this.http.put(`${this.apiURL}/${id}`, data);
    }

}
