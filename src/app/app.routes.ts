import { Routes } from '@angular/router';
import { Vehiculo } from './vehiculo/vehiculo';
import { Multas } from './multas/multas';
import { Papeletas } from './papeletas/papeletas';

export const routes: Routes = [
  {
    path: 'vehiculo',
    component: Vehiculo
  },
  {
    path: 'multas',
    component: Multas
  },
  {
    path: 'papeletas',
    component: Papeletas
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  }
];
