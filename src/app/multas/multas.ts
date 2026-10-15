import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Servicio } from '../servicio';

interface RespuestaMultas {
  anio: string | number;
  vehiculos: {
    placa: string;
    propietario: string;
    cantidad_papeletas: number | string;
    monto: number | string;
  }[];
}

@Component({
  selector: 'app-multas',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './multas.html',
  styleUrl: './multas.css',
})
export class Multas {
  private servicio = inject(Servicio);

  anio = '';
  datos = signal<RespuestaMultas | null>(null);
  error = signal('');
  cargando = signal(false);

  buscar() {
    const anio = this.anio.trim();

    if (!/^\d{4}$/.test(anio) || this.cargando()) {
      this.error.set('Ingrese un año válido de cuatro dígitos');
      return;
    }

    this.error.set('');
    this.datos.set(null);
    this.cargando.set(true);

    const inicio = performance.now();

    (this.servicio.obtenerFactura(anio) as Observable<RespuestaMultas>)
      .subscribe({
        next: (res) => {
          console.log(`Consulta anual: ${(performance.now() - inicio).toFixed(0)} ms`);
          this.datos.set(res);
          this.cargando.set(false);
        },
        error: (err) => {
          console.error('Error al consultar multas:', err);
          console.log(`Tiempo hasta el error: ${(performance.now() - inicio).toFixed(0)} ms`);
          this.error.set(err.error?.error ?? 'No se pudo conectar con el servidor');
          this.cargando.set(false);
        },
      });
  }
}