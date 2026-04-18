# 03-gifs-app version 1.0
Este ejercicio es la version 1 

## Descarga el codigo y ejecuta 
### npm install  

***src/environments/environment.ts*** 

**src/environments/environment.development.ts**
```
export const environment = {
    production: true,
    companyName: 'Gifts',
    companyName2: 'App',
    companySlogan: 'Maneja tus Gifts',


    // ApiKeys

    giphyApiKey: "iEozN3460Nowi4H36sv3SYOYlDJOlp8q",
    giphyApiUrl: "https://api.giphy.com/v1",


    // Urls

};

mas abajo vemos como crearlo
```
## Temas puntuales

Esta sección es muy importante porque nos dará las bases de lo que es trabajar en Angular diariamente.

**Puntualmente veremos:**

```
LazyLoad
Separación de rutas
Rutas hijas
Variables de entorno de Angular
Angular CLI
inputs
Comunicación entre componentes
RouterOutlets anidados
Señales
Propiedades de componentes
Tailwind
Y más


La idea es ir creando un pequeño dashboard administrativo para mostrar Gifs que traeremos desde un API, aunque eso es tema de la siguiente sección, aquí empezaremos a dejar las bases y la estructura del mismo.

CREACION DEL PROYECTO DE ANGULAR ‘03-gifs-app’ 
1-. cd Me pongo en la carpeta donde se va a crear el proyecto
2.- prompt $g
3.- (npx → Es una herramienta de npm que ejecuta paquetes sin necesidad de instalarlos globalmente. 
     @angular/cli@20 → Especifica la versión 20.x de Angular CLI 
     new Bases → Crea proyecto

>npx @angular/cli@20 new 03-gifs-app
√ Which stylesheet format would you like to use? CSS             [ https://developer.mozilla.org/docs/Web/CSS
          ]
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? (y/N)N
nota: Regla práctica:
Si tu app es pública y necesita SEO → SSR
Si tu app es privada (requiere login) → CSR
Si estás aprendiendo Angular por primera vez → empezar con CSR (sin SSR)

? Do you want to create a 'zoneless' application without zone.js? (y/N) Y

? Which AI tools do you want to configure with Angular best practices? https://angular.dev/ai/develop-with-ai
>(*) None
 ( ) Claude         [ https://docs.anthropic.com/en/docs/claude-code/memory            ]
 ( ) Cursor         [ https://docs.cursor.com/en/context/rules                         ]
 ( ) Gemini         [ https://ai.google.dev/gemini-api/docs                            ]
 ( ) GitHub Copilot [ https://code.visualstudio.com/docs/copilot/copilot-customization ]

↑↓ navigate • space select • a all • i invert • ⏎ submit
Nota: para este ejercicio puse NONE

3.- >Por el bug que se crea cuando creo un proyecto demanera local, los
 archivos no ponen el modificador component  asi que lo hare manual

```

***<aqui hay una imagen que podemos ven el el powerpoint 
38 U 00 Angular: De cero a experto Signals, componentes, servicios, zoneless,
slice 19>***


```
4.- corregir los archivos tsconfig.app.json y tsconfig.spec.json 
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "rootDir": "./src",   AGREGA ESTA LINEA EN AMBOS
    "types": []
  },
5.-> npx ng serve -o
6.- Instalar Talwindcss
      a.- https://tailwindcss.com/
      b.- Get started despues  Framework Guides buscar Angular
      c.- npm install tailwindcss @tailwindcss/postcss postcss --force 


      d.- Crear  .postcssrc.json  en el ROOT del proyecto. con este contenido
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
      e.- Importar Tailwind CSS agrega una importacion  @import a ./src/styles.css that imports Tailwind CSS.
      f.- Lo probamos en el app.component.html y agregamos 
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
      g.- Detenemos la ejecucion y volvemos a compilar
		npx ng serve 
6.- Creative Tim es una plataforma que vende plantillas y componentes de interfaz de usuario (UI) para
     desarrolladores.
     https://www.creative-tim.com/twcomponents/component/dashboard-navigation
     es un "Dashboard Navigation" (Navegación para Panel de Control), 
      a.- ISelecciona  -Show Code- copio lo que  esta  entre los div’s   y lo pego en el app.component.html    
7.- Instalamos los Iconos desde https://cdnjs.com/libraries/font-awesome
     a.- damos clicl en </> Copy Link Tag        
     b.- copiamos el tac en index.html 
     nota: aqui podemos buscar los iconos y ver como lucen y su codigo  https://fontawesome.com/icons   
8.- Crear -environments-
     >npx ng g environments


9.- Crear alias para  -environments-  modificar tsconfig.json   y agregar     
  "compilerOptions": {
    "paths": {
      "@environments/*": ["./src/environments/*"]
    },
    "strict": true,
10.- Usamos la galeria Default gallery de esta libreria https://flowbite.com/docs/components/gallery/
       copiamos el html y lo pegamos en el template de trending-page  
11.- Usamos el listado de imagenes de https://gist.github.com/Klerith/62b9c267499571fa26dabb17f3bb245f
       y temporalmente la metemos en trending-page.component.ts ya que esto debe consumerse de un servicio
Nota:   El acto de pasar datos —como URLs o información para llenar componentes de imágenes— a través de múltiples niveles de componentes anidados (del padre al hijo, luego al nieto, etc.) en Angular, se conoce comúnmente como Prop Drilling o, más específicamente en el contexto de Angular, Input Drilling.
      
Temas puntuales
Esta sección es muy interesante porque aprenderemos:
Manejo de rutas dinámicas
Manejo de LocalStorage
Observables a Señales
Reutilización de componentes
Peticiones HTTP
Manejo de caché
Mapeo de información
Y más
Esta sección nos encaminará a prepararnos fuertemente en el manejo de estado de nuestra aplicación.


12.- Usaremos las gifs de la API https://developers.giphy.com/con mi usuario edy_aca@hotmail.com y el pas primario
    a.-  ahi veremos unas que cree en ejercicios pasados vamos a crear una para este ejercicip y seleccionas API
```

***<aqui hay una imagen que podemos ven el el powerpoint 
38 U 00 Angular: De cero a experto Signals, componentes, servicios, zoneless,
slice 23>***


```
    b.- lo agregas a las variables de entorno de Produccion y Desarrollo [environment.ts]         
          // ApiKeys
           giphyApiKey: "OhlNmHZ9NsoeIfGBjTiuV79k2zXNKR0o",
    c.- Abre PSTMAN y copia el api y ejecutalo, copia el resultado
       c.1.- Ve a VsCode y CTRL + SHIFT + P y escribe paste JSON as code y escribo el nivel superior     
                GiphyResponse y enter
13.- creaomos el archivo  service/gifs.service.ts y escribimos
       aserve y tab para que salga el codigo gracias a la previa instalacion de Angular Snippets




```

![This is an alt text.](https://sitechecker.pro/wp-content/uploads/2023/05/URL-meaning.jpg "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).
