import { Component } from '@angular/core';
import { environment } from '@environments/environment';

// TODO: Investigar como usar el environment en un componente, sin necesidad de importarlo directamente, 
// TODO: para evitar acoplar el componente a un entorno específico.
// import { environment } from '../../../../environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {

  envs = environment
 }
