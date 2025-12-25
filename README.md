# PruebaTecnicaAngular

Este proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.1.

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecute:



```bash
npm install
ng serve
```

Una vez que el servidor esté en ejecución, abra su navegador y navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifique cualquier archivo fuente.

## Ejecución de pruebas unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), use el siguiente comando:

```bash
ng test
```

## Ejecución de pruebas de extremo a extremo

Para pruebas de extremo a extremo (e2e), ejecute:

```bash
ng e2e
```

Angular CLI no incluye un framework de pruebas de extremo a extremo por defecto. Puede elegir uno que se adapte a sus necesidades.

## Recursos adicionales

Para obtener más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visite la página [Información general y referencia de comandos de Angular CLI](https://angular.dev/tools/cli).

En el archivo enviroment que está dentro de la carpeta enviroments esta para configurar la key que necesita la aplicación para consultar los servicios de themoviedb.org.
Allí se puede configurar esta key y así poder ver como la aplicación trae las peliculas.