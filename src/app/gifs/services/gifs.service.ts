import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
// cuando son interfaces se agrega  type para 
// diferenciarlas de las clases, pero esto es 
// opcional
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


// la función loadFromLocalStorage se encarga de cargar el historial de búsquedas de gifs desde el localStorage del navegador, 
// devolviendo un objeto que mapea términos de búsqueda a arrays de gifs. Si no hay datos en el localStorage, devuelve un objeto vacío.
// Record<string, Gif[]> es un tipo de TypeScript que representa un objeto cuyas claves son strings y cuyos valores son arrays de objetos Gif. y
// se utiliza para definir el tipo de datos que se espera en el historial de búsquedas, donde cada término de búsqueda (clave) está asociado 
// con un array de resultados de gifs (valor).
const loadFromLocalStorage = (): Record<string, Gif[]> => {
    const historyString = localStorage.getItem('gifsLocalStorage');
    return historyString ? JSON.parse(historyString) : {};
}

@Injectable({ providedIn: 'root' })
export class GifService {
    // inyecto el HttpClient desde app.config para hacer peticiones 
    // HTTP a la API de Giphy
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);


    // antes de agregar el efecto saveGifsToLocalStorage, el historial de búsquedas se almacenaba únicamente en la memoria de la 
    // aplicación, searchHistory = signal<Record<string, Gif[]>>({}); lo que significaba que se perdía cada vez que se recargaba la 
    // página o se cerraba el navegador. Con la adición de este efecto, cada vez que se actualiza el historial de búsquedas 
    // (es decir, cada vez que se realiza una nueva búsqueda y se actualiza la señal searchHistory), el estado actual del historial 
    // se guarda automáticamente en el localStorage del navegador. Esto permite que el historial de búsquedas persista incluso después 
    // de recargar la página o cerrar el navegador, mejorando así la experiencia del usuario al mantener un registro de sus búsquedas anteriores.
    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

    // la señal searchHistory almacena un historial de búsquedas de gifs, donde cada término de búsqueda (clave) está asociado 
    // con un array de resultados de gifs (valor).
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor() {

        // el sevicio se crea y se llama al método para cargar los gifs de tendencia, queda las instancia y si cambiamos de pagina y 
        // regresamos a la pagina de tendencia, no se vuelve a cargar los gifs, porque ya estan cargados en el servicio y se mantienen 
        // en la señal trendingGifs, entonces no se hace una nueva petición HTTP a la API de Giphy, 
        // lo que mejora el rendimiento y la experiencia del usuario.
        this.loadTrendingGifs();

        console.log('Servicio creado')
    }

    // el efecto saveGifsToLocalStorage se encarga de guardar automáticamente en el localStorage del navegador
    // el estado actual de la señal searchHistory cada vez que esta señal cambia, lo que permite que el historial 
    // de búsquedas se mantenga persistente incluso después de recargar la página o cerrar el navegador.
    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem('gifsLocalStorage', historyString);    
    });

    loadTrendingGifs() {

        this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20'
            },
        })
            .subscribe(response => {
                const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
                console.log(gifs);
                this.trendingGifs.set(gifs);
                this.trendingGifsLoading.set(false);
            });
    }

    searchGifs(query: string): Observable<Gif[]> {
        return this.http
            .get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
                params: {
                    api_key: environment.giphyApiKey,
                    q: query,
                    limit: '20'
                },
            })
            .pipe(
                map(({ data }) => data),
                map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

                //Historial
                tap(items => {
                    // actualizo el historial de la señal búsqueda, guardando los resultados de la búsqueda actual bajo la clave del término de búsqueda en minúsculas, esto me permite tener un historial de búsquedas con sus resultados asociados, y puedo acceder a ellos fácilmente usando el término de búsqueda como clave.
                    this.searchHistory.update(history => ({
                        ...history,
                        [query.toLowerCase()]: items,
                    }));
                })

            );
    }

   // el método getHistoryGifs se encarga de recuperar los gifs asociados a un término de búsqueda 
   // específico desde la señal searchHistory, utilizando el término de búsqueda en minúsculas como 
   // clave para acceder a los resultados almacenados. Si no hay resultados para ese término, devuelve un 
   // array vacío.
    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query.toLowerCase()] ?? [];
    }

}
