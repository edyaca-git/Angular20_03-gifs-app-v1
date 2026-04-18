import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

// no sale con ctls + . se escribe  manualmente el import de toSignal, no se autocompleta
import { toSignal } from '@angular/core/rxjs-interop';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list-component";


@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  gitService = inject(GifService);


  //toSignal es una función que convierte un Observable en una señal de Angular, lo que permite que el 
  // componente reaccione a los cambios en los parámetros de la ruta de manera reactiva. 
  // Dentro injectamos el ActivatedRoute para acceder a los parámetros de la ruta y luego usamos 
  // el operador pipe con map para extraer el parámetro 'query' que se espera en la URL. 
  // Finalmente, toSignal convierte este flujo de datos en una señal que puede ser utilizada en la plantilla 
  // del componente para mostrar el valor actual del parámetro 'query'.
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    ));

    gifsByKey = computed(() => {
        return this.gitService.getHistoryGifs(this.query());   
    });

}
