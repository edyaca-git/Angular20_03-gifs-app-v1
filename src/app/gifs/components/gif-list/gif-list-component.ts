import { Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item-component';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list-component.html',
})
export class GifListComponent {
  // gifs es la propiedad y señal hija que va a recibir de e trending-page.component un array de urls 
  // de las imágenes a mostrar, y es la que recibe el componente gif-list para mostrar las imágenes.
    gifs = input.required<Gif[]>();
 }
