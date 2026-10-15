
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Servicio {

    private url = 'http://localhost:3307';

    constructor(private http: HttpClient) { }

    obtenerCliente(nropla: string) {
        return this.http.get(`${this.url}/vehiculo/${nropla}`);
    }

    obtenerFactura(anio: string) {
        return this.http.get(`${this.url}/multas/${anio}`);
    }

    registrarPapeleta(placa: string, codinf: string, poli: string) {
        return this.http.post(`${this.url}/papeletas`, {
            placa: placa,
            codinf: codinf,
            poli: poli
        });
    }
}
