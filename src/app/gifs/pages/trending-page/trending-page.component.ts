import {  Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list-component';
import { GifService } from '../../services/gifs.service';


// const imageUrls: string[] = [
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'app-trending-page.component',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent { 
  // Esta señal es el Padre que contiene las URLs de los gifs en tendencia y los envío 
  // al componente gif-list a través de la propiedad gifs, que es la que recibe el componente 
  // gif-list para mostrar las imágenes.
  
  // trendingGifs = signal(imageUrls); // se comenta por que ahora la data de los gifs en tendencia se carga 
                                       // desde el servicio GifService y se asigna a la señal trendingGifs, 
                                       // entonces ya no es necesario tener esta señal con las URLs de los gifs 
                                       // en tendencia hardcodeadas.


  // inyecto el servicio para cargar los gifs en tendencia desde la API de Giphy
  // si tiene una instancia con la data cargada, la devuelve, si no, hace la petición HTTP a la API de Giphy 
  // para cargar los gifs en tendencia y luego devuelve la data cargada.
  gifService = inject(GifService);

  // constructor() {
  //   this.gifService.loadTrendingGifs();
  //  }

}
