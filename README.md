# Realtime Notes

_Esta aplicaci贸n esta desarrollada con Laravel, Inertia.js, React, Materialize._

![page1](https://user-images.githubusercontent.com/53574794/139932009-2ced8509-ca63-49bb-8d40-b90c39e5c403.PNG)
![pag2](https://user-images.githubusercontent.com/53574794/139932873-bc78e24a-b863-4bd2-8df6-8e49a7c6d7e6.PNG)
![page3](https://user-images.githubusercontent.com/53574794/139935044-12c45b23-e8eb-4615-b650-e09de611ce94.PNG)

## Comenzando 馃殌

_Estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas._

Mira **Despliegue** para conocer como desplegar el proyecto.


### Pre-requisitos 馃搵

_Para poder instalar y probar este proyecto debes tener instalado los siguientes programas:_

* **Composer**. Descargar desde su [pagina oficial](https://getcomposer.org/download/)
* **Interprete de PHP**
* **Sistema Gestor de Base de Datos** (puede ser MySQL, SQL Lite, PostgreSQL o SQL Server)

_Para installar el interprete de PHP y MySQL puede usar [XAMP](https://www.apachefriends.org/es/index.html)_

### Instalaci贸n 馃敡

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

1. _Una vez clonado el proyecto. Abre una terminal o consola, posicionate en la raiz del proyecto y ejecuta el comando:_

```
composer install
```

2. _Crear una base de datos. Entre las bases de datos que soporta Laravel por defecto, encontramos: MySQL, SQL Lite, PostgreSQL y SQL Server._

3. _Crear el archivo .env. Podemos duplicar el archivo .env.example, renombrarlo a .env e incluir los datos de conexi贸n de la base de datos que indicamos en el paso anterior._

![env](https://user-images.githubusercontent.com/53574794/139922781-9b5ca1d9-a47e-4824-96ce-a995750a31cc.PNG)

4. _Generar una clave de aplicaci贸n. Para crear la nueva clave e insertarla autom谩ticamente en el .env, ejecuta:_

```
php artisan key:generate
```

5. _Por 煤ltimo, ejecuta las migraciones para que se generen las tablas mediante el comando:_

```
php artisan migrate
```

## Despliegue 馃摝

_Para realizar un despliegue rapido, ejecuta el comando_

```
php artisan serve
```

_Abre la ruta que devuelve el comando anterior en un navegador_

## Construido con 馃洜锔?

* [Laravel](https://laravel.com/) - El framework PHP
* [Inertia.js](https://inertiajs.com/) - Conecta el backend con el frontend.
* [React](https://es.reactjs.org/) - Una biblioteca de JavaScript para construir interfaces de usuario
* [Materialize](https://materializecss.com/) - Un framework front-end moderno y receptivo basado en Material Design

## Autores 鉁掞笍

* **Mart铆n Monjaraz Almaraz**

## Expresiones de Gratitud 馃巵

* Comenta a otros sobre este proyecto 馃摙
* Invita una cerveza 馃嵑 o un caf茅 鈽? a alguien del equipo. 
