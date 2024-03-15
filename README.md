## IMPORTANTE
Los archivos del front se encuentran en la carpeta src, si te fijas hay un archivo llamado `app.js`, este es de donde sale todo el front, los archivos `login.js` y `register.js` se llaman como si fuesen etiquetas html, es una funcion que entrega react para realizar la pagina en una sola pestaña, los estilos te recomiendo realizarlos en una carpeta aparte dentro de la carpeta src, para que asi se vea mas ordenado, la forma de importarlos a los formularios esta aqui 

https://create-react-app.dev/docs/adding-a-stylesheet/

## Como correr el proyecto
Debes ejecutar el comando 

`npm start`

## Dependencias

Quiza te pida instalar algunas dependencias como `react-dom`:

`npm install react-dom --save`

## Si quieres correr la Api (modo cliente/servidor)
La Api esta hecha en express, si quieres correrla, quiza te pida instalar nodemon:

`npm install nodemon --save`

Luego ejecuta el comando `nodemon .\api.js`

Quizas te pida instalar algunas dependencias para correr la api, tales como:

`npm install express --save`

`npm install body-parser --save`

`npm install cors --save`

`npm install mongoose --save`

Asegurate de tener instalado node.js, lo puedes descargar de aqui 

https://nodejs.org/en/download/current

## Errores

Quiza por alguna razon puedas tener los puertos 3000 y 5000 ocupados, de ser así puedes cambiar el puerto tanto del cliente como del servidor en el mismo codigo, en el `package.json` en caso del cliente y en el `api.js` para el servidor
