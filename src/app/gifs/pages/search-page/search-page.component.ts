import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list-component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page.component',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent { 

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    
    // el método searchGifs del servicio se encarga de realizar una búsqueda de gifs en la API de Giphy 
    // utilizando el término de búsqueda proporcionado en el parámetro query.
    this.gifService.searchGifs(query)
    .subscribe(response => {
      console.log(response);
      // una vez que se reciben los resultados de la búsqueda, se actualiza la señal gifs con la respuesta 
      // obtenida, lo que a su vez actualiza automáticamente cualquier componente que esté suscrito a esta 
      // señal para mostrar los nuevos gifs en la interfaz de usuario.
      this.gifs.set(response);
    });
  }   
}
