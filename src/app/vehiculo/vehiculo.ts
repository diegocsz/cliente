import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Servicio } from '../servicio';

interface RespuestaVehiculo {
  vehiculo: {
    placa: string;
    propietario: string;
    modelo: string;
  };
  papeletas: {
    numero: string;
    infraccion: string;
    fecha: string;
    multa: number | string;
  }[];
  total_multas: number | string;
}

@Component({
  selector: 'app-vehiculo',
  imports: [FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './vehiculo.html',
  styleUrl: './vehiculo.css',
})
export class Vehiculo {
  private servicio = inject(Servicio);

  placa = '';
  datos = signal<RespuestaVehiculo | null>(null);
  error = signal('');
  cargando = signal(false);

  buscar() {
    const placa = this.placa.trim();

    if (!placa || this.cargando()) return;

    this.error.set('');
    this.datos.set(null);
    this.cargando.set(true);

    const inicio = performance.now();

    (this.servicio.obtenerCliente(placa) as Observable<RespuestaVehiculo>)
      .subscribe({
        next: (res) => {
          console.log(`Consulta de vehículo: ${(performance.now() - inicio).toFixed(0)} ms`);
          this.datos.set(res);
          this.cargando.set(false);
        },
        error: (err) => {
          console.error('Error al buscar vehículo:', err);
          console.log(`Tiempo hasta el error: ${(performance.now() - inicio).toFixed(0)} ms`);
          this.error.set(err.error?.error ?? 'No se pudo conectar con el servidor');
          this.cargando.set(false);
        },
      });
  }
}