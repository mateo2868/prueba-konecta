# prueba-konecta


pasos para la instalación

1. clona el repositorio con las dos carpetas back y front
2. dirigete a la carpeta back ```cd back ```
3. instala las dependecias de laravel ```composer install```
4. crea las llaves para jwt ``` php artisan key:generate ``` - ``` php artisan jwt:secret ```
5. configura el archivo .env, puedes usar el archivo ``` .env.example ```
6. crea la base de datos y importa el archivo ``` Dump20210519.sql ```

Nota: el proyecto usa migraciones pero el documento sql ya tiene un dato de prueba

7. ejecuta el proyecto php artisan serve
8. abre el archivo front/index.html en el navegador

Nota: Si usaste el archivo con el dato de prueba el usuario es mateovasqueza@gmail.com - prueba
