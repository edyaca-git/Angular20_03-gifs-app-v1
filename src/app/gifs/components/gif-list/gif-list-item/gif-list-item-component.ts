import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item-component.html',
})
export class GifListItemComponent {
  // Propiedad señal nieta que va a recibir de gif-list la url de la imagen a mostrar
  imageUrl = input.required<string>();
 }
