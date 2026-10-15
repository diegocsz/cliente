import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Servicio } from '../servicio';

interface RespuestaPapeleta {
  mensaje: string;
}

@Component({
  selector: 'app-papeletas',
  imports: [FormsModule],
  templateUrl: './papeletas.html',
  styleUrl: './papeletas.css',
})
export class Papeletas {
  private servicio = inject(Servicio);

  placa = '';
  codinf = '';
  poli = '';

  mensaje = signal('');
  error = signal('');
  cargando = signal(false);

  registrar() {
    const placa = this.placa.trim();
    const codinf = this.codinf.trim();
    const poli = this.poli.trim();

    if (!placa || !codinf || !poli) {
      this.error.set('Complete todos los campos');
      return;
    }

    if (this.cargando()) return;

    this.error.set('');
    this.mensaje.set('');
    this.cargando.set(true);

    const inicio = performance.now();

    (this.servicio.registrarPapeleta(placa, codinf, poli) as Observable<RespuestaPapeleta>)
      .subscribe({
        next: (res) => {
          console.log(`Registro de papeleta: ${(performance.now() - inicio).toFixed(0)} ms`);
          this.mensaje.set(res.mensaje);
          this.cargando.set(false);
        },
        error: (err) => {
          console.error('Error al registrar papeleta:', err);
          console.log(`Tiempo hasta el error: ${(performance.now() - inicio).toFixed(0)} ms`);
          this.error.set(err.error?.error ?? 'No se pudo registrar la papeleta');
          this.cargando.set(false);
        },
      });
  }
}