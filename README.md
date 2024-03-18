# Proyecto Capsan1

## Tabla de contenidos
* [Importante](#importante)
* [Como correr el proyecto](#como-correr-el-proyecto)
* [Dependencias](#dependencias)
* [Api](#correr-la-api)
* [Errores](#errores)
* [Base de datos mysql](#base-de-datos-mysql)
* [Base de datos MongoDB](#base-de-datos-mongodb)
* [Session-Express](#session-express)

## IMPORTANTE
Los archivos del front se encuentran en la carpeta src, si te fijas hay un archivo llamado `app.js`, este es de donde sale todo el front, los archivos `login.js` y `register.js` se llaman como si fuesen etiquetas html, es una funcion que entrega react para realizar la pagina en una sola pestaña, los estilos te recomiendo realizarlos en una carpeta aparte dentro de la carpeta src, para que asi se vea mas ordenado, la forma de importarlos a los formularios esta aqui 

https://create-react-app.dev/docs/adding-a-stylesheet/

## Como correr el proyecto
Debes ejecutar el comando 

    npm start

* Si es la primera vez que ejecutas el archivo en el equipo, debes ejecutar el comando 

        npm install --save

## Dependencias

Quiza te pida instalar algunas dependencias como `react-dom`:

    npm install react-dom --save

Lista de dependencias a instalar en el cliente:

    npm install sweetalert2

    npm install universal-cookie

## Correr la Api 
La Api esta hecha en express, si quieres correrla, quiza te pida instalar nodemon:

    npm install nodemon --save

Luego ejecuta el comando `nodemon .\api.js`

Quizas te pida instalar algunas dependencias para correr la api, tales como:

    npm install express --save

    npm install body-parser --save

    npm install cors --save

    npm install mongoose --save

    npm install mongodb --save

    npm install cookie-parser --save

    npm install dotenv --save

    npm install express-session --save

    npm install knex --save

    npm install mysql --save

    npm install react-dom --save

    npm install universal-cookie --save

Asegurate de tener instalado node.js, lo puedes descargar de aqui 

https://nodejs.org/en/download/current

## Errores

Quiza por alguna razon puedas tener los puertos 3000 y 5000 ocupados, de ser así puedes cambiar el puerto tanto del cliente como del servidor en el mismo codigo, en el `package.json` en caso del cliente y en el `api.js` para el servidor

## Base de datos mysql

La conexion con mysql se hace en la API, en el archivo `DbService.js`, en la carpeta Services, las credenciales se manejan con variables de entorno, debe crear u ocupar un archivo `.env` con los siguientes nombres de variables:

    DB= NOMBRE_BASE_DE_DATOS
    DB_HOST= NOMBRE_DE_HOST
    DB_USER= NOMBRE_DE_USUARIO_BASE_DE_DATOS
    DB_PASS= CONTRASEÑA_BASE_DE_DATOS

Asegurese de agregar este archivo `.env` al archivo `.gitignore`

## Base de datos MongoDB

Para conectar a MongoDB utilizar el archivo `databaseServiceMongo.js`, utilizar:

mongoose.connect("`LINK_DE_BASE_DE_DATOS+CONTRASEÑA_DE_USUARIO*`", { useNewUrlParser: true, useUnifiedTopology: true });

* CONTRASEÑA_DE_USUARIO ES RECOMENDABLE GUARDARLA COMO VARIABLE DE ENTORNO, AL IGUAL QUE LOS QUE MANEJAN LAS CREDENCIALES PARA CONECTARSE A MYSQL
* LINK_DE_BASE_DE_DATOS: GENERALMENTE MONGO ENTREGA ESTE LINK AL GENERAR UNA CONEXION A UNA APLICACION

## Session-Express

Para controlar la sesion de un usuario se utiliza session express, el cual utiliza un secret (se puede encontrar en el archivo `api.js` en el servidor) el secret esta encriptado en AES y guardado en una variable de entorno (en el `.env`) de la siguiente forma:

    app.use(session({
      secret: process.env.SESSION_SECRET, 
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } 
    }));

Por favor, dentro del `.env` se debe definir la variable `SESSION_SECRET`
