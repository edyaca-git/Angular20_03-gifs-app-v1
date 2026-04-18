import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'dashboard',
        // eesta es otra forma de cargar un componente de forma lazy
        loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPage),
        children: [
            {
                path: 'trending',
                // sta es la forma recomendada de cargar un componente de forma lazy, esnecesario exportar 
                // el componente como default
                loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')

            },
            {
                path: 'search',
                loadComponent: () => import('./gifs/pages/search-page/search-page.component')
            },
            {
                // esta ruta permite mandar argumentos dinamicos y va a mostrar el historial de búsquedas, el argumento dinámico 
                // es el término de búsqueda que se manda comoparámetro en la URL, y el componente GifHistoryComponent 
                // va a mostrar los resultados asociados a ese término de búsqueda, accediendo al historial de búsquedas guardado en 
                // el servicio de gifs.
                path: 'history/:query',
                loadComponent: () => import('./gifs/pages/gif-history/gif-history.component')
            },
            {
                path: '**',
                redirectTo: 'trending'
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    },
];
// Regla de oro
// "Si no estás seguro, usa loadComponent"

// En aplicaciones modernas de Angular, el lazy loading es la práctica recomendada 
// por defecto. Solo usa component cuando tengas una razón clara (el componente es 
//     muy pequeño o se usa inmediatamente).