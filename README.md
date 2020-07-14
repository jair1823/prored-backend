# Proyecto ProRed API - Manual 

## Prerrequisitos para ejecución del API

### Sistema Operativo

El API se encuentra desarrollada en Express con una base de datos PostgreSQL. El API se desarrollo y probó en Linux, por lo que se debe de utilizar este sistema operativo.

### Tecnologías
#### Node JS

Node Js es un entorno de ejecución para JavaScript el cual nos permitirá ejecutar el API y también instalar las dependencias necesarias. El API fue desarrollado con la versión 13.11.0 de node, por lo que esta es la necesaria para ejecutar los comandos del API. Para instalar Node se debe de ejecutar los siguientes comandos en la terminal:

``` $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash```

Cerramos la terminal como nos indica.

``` $ nvm install 13.11.0```

Una vez ejecutado este comando ya tendremos Node instalado en nuestro sistema listo para ejecutarse.

### PostgreSQL

El motor de base de datos utilizado para el sistema de la ProRed es el de PostgreSQL en su versión 12, por lo que para poder hacer uso del sistema es necesario instalar el motor y además tener creada la base de datos que se usará. A continuación se detallan los pasos a seguir para su instalación.

Primero debemos de agregar el repositorio donde se encuentran almacenados los datos del motor de base de datos. Para esto corremos los siguientes comandos:

``` wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -```

Luego

``` echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee /etc/apt/sources.list.d/pgdg.list```

Por último actualizamos los repositorios de nuestro sistema para que aparezcan los que acabamos de añadir.

``` sudo apt update```

Una vez realizado esto ya tenemos el repositorio agragado ahora basta con correr el siguiente comando para la instalación:

``` sudo apt -y install postgresql-12 postgresql-client-12```

Una vez que termine el proceso ya tendremos instalado PostgreSQL en nuestro sistema por lo que procedemos a crear la base de datos que alojará los datos del sistema. Para realizar esto ingresamos por medio de la terminal o por medio de un IDE a nuestro motor de base de datos y ejecutamos el siguiente comando:

```` CREATE DATABASE prored ````

Con esto ya tendremos creada la base de datos que será necesaria para ejecutar el sistema.

## Descarga del repositorio

El código fuente junto con los datos necesarios para inicializar la base de datos se encuentran almacenados dentro de un repositorio de GitHub. El link a este repositorio es el siguiente:

[https://github.com/jair1823/prored-backend](https://github.com/jair1823/prored-backend)

Para obtener el sistema podemos descargar el repositorio como un zip o correr el siguiente comando en nuestro sistema:

``` git clone https://github.com/jair1823/prored-backend.git```

Teniendo el repositorio descargado, procedemos a preparar nuestro sistema para ejecución.

## Preparación para ejecución

Una vez con el código fuente descargado, procedemos a realizar las labores de preparación necesarias para su ejecución. 

### Variable de entorno
Lo primero que debemos hacer es crea un archivo llamado <strong> .env </strong> en la base de la carpeta del API. Este archivo contendrá los datos de la base de datos y nuestro motor para el uso del API. Este archivo debe de tener la siguiente estructura:

``` 
# .env
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE= 
```
Los datos que deben ir en este archivo son los siguientes:
<ul>  
<li>DB_USER : Nombre de usuario de nuestro motor de base de datos. Este debe de  ser el que tenga permisos de creación sobre la base de datos <strong>prored</strong></li>  
<li>DB_PASSWORD : Esta es la contraseña para el usuario del punto anterior</li>  
<li>DB_HOST : Host donde esta corriendo el motor de base de datos. Si es un ambiente local este debe ser <strong> localhost</strong>, si está corriendo en un sistema remoto este debe de ser la dirección IP del servidor.</li>  
<li>DB_PORT : El puerto donde corre nuestro motor de base de datos. Por defecto PostgreSQL corre en el puerto <strong> 5432</strong></li>  
<li>DB_DATABASE : Este es el nombre de nuestra base de datos. Como indicamos en la creación, esta es llamada <strong>prored</strong></li>
</ul>

### Instalación de dependencias

Para poder ejecutar nuestro sistema debemos de instalar todas las dependencias que este tiene. Esto se puede realizar con un simple comando que se encarga de descargarlos todos. Este comando debe de ser ejecutado en la base de la carpeta que contiene el código fuente:

``` npm install ```

### Levantamiento de la base de datos

Para poder comenzar a utilizar el sistema debemos de tener todas las tablas y funciones creadas en nuestro sistema. Para hacer esto debemos de correr el siguiente comando en la base de la carpeta que contiene el código fuente:

``` npm run migrate ```

Al terminar de ejecutarse, todas las tablas y funciones se encontraran creadas en nuestro sistema. En estos momentos todas las tablas se encuentran vacías, por lo que para inicializar con algunos datos las tablas se debe de correr el siguiente comando:

``` npm run seeds ```

Una vez realizados todos los pasos anteriores se tendrá listo el API para su entrada en funcionamiento.

## Ejecución del API

### Ejecución en modo de desarrollo

Para ejecutar el API  y poder comenzar a utilizarla en modo de desarrollo se debe de ejecutar el siguiente comando en la base de la carpeta que contiene el código fuente:

``` npm start ```

Esto iniciara la compilación automática y el levantamiento del API.

### Ejecución en modo de producción

Para ejecutar el API  y poder comenzar a utilizarla en modo de producción, primero debemos de compilar a mano el sistema. Para hacer esto debemos de ejecutar el siguiente comando en la base de la carpeta que contiene el código fuente:

```npm run build ```

Una vez compilado, basta con correr el siguiente comando en la base de la carpeta que contiene el código fuente para levantar el servicio del API:

``` node dist/index.js ```

Con esto ya tendremos el API ejecutandose con la compilación de producción.

## Estructura del código fuente

La estructura del código funte dentro de la carpeta del APi se divide de la siguiente manera:
*	<strong>node_modules</strong>
Esta carpeta contiene todas las dependencias del proyecto, sin estas el proyecto no puede ser ejecutado
*	<strong>dist</strong>
Esta carpeta contiene los archivos compilados y listos para ejecución.
*	<strong>public</strong>
Esta carpeta puede no aparecer apenas se descargue el repositorio. Esto es porque esta carpeta contiene todos los archivos que los usuarios del sistema ingresen. Esta carpeta se creara automáticamente apenas un archivo sea subido al sistema. Dentro de esta carpeta se tienen distinstas carpetas que contienen cada tipo de archivo que se guarda en el sistema.  En caso de querer respaldar los archivos que se han subido se debe de copiar toda esta carpeta para así englobar todos los archivos que se han subido.
*	<strong>src</strong>
Esta carpeta contiene todo el código fuente de la aplicación. Aquí se detallan todos los contenidos de las subcarpetas internas:
	*	<strong>controllers</strong>
En esta carpeta se encuentran los controladores que manejan las peticiones hechas por el frontend. Para cada funcionalidad del sistema exite un controlador.
	*	<strong>database</strong>
En esta carpeta se encuentras todos lo que tiene que ver con la base de datos. Esto incluye los scripts de creación y borrado de la base de datos, así como todos los scripts de creación y borrado para las funciones que trabajan sobre la base de datos. En esta carpeta también se encuentra una carpeta que contiene las semillas que se utilizan para inicializar la base de datos con algunos registros.
	*	<strong>lib</strong>
En esta carpeta se encuentran archivos que realizan operaciones genéricas y reutilizables como por ejemplo el guardado de archivos en el servidor.
	*	<strong>migrations</strong>
En esta carpeta se encuentran los métodos que realizan la migración de la base de datos, en ellos se ejecutan los scripts de borrado y creado de toda la base de datos.
	*	<strong>routes</strong>
En esta carpeta se encuentran todos los archivos que contienen las rutas con las que se acceden a los métodos de los controladores. Existe un archivo por cada funcionalidad de la aplicación.
	*	<strong>seeds</strong>
En esta carpeta se encuentran los métodos que realizan las semillas de la base de datos, en ellos se ejecutan los scripts que insertan las filas a las tablas de la base de datos.

## Explicación de rutas de la API

En las siguientes tablas se describirán las funcionalidades la la API a través de sus rutas, cada una de las tablas contiene:

- Nombre del método
- Ruta específica  
- HTTP request asociado
- Descripción de la funcionalidad

### Estudiante

Cada una de las rutas para los estudiantes, se encuentran asociadas al controlador student.controller.

| Método                                         | Ruta                              | HTTP Request | Descripción                                                                                                  |
|------------------------------------------------|-----------------------------------|--------------|--------------------------------------------------------------------------------------------------------------|
| student.controller@getStudents                 | /student                          | GET          | Función encargada de  obtener los estudiantes activos                                                        |
| student.controller@getStudentByDni             | /student/:dni                     | GET          | Función encargada de  obtener un estudiante activo por su  identificación                                    |
| student.controller@getStudentsAll              | /student_all                      | GET          | Función encargada de  obtener los estudiantes sin  importar estado de activación                             |
| student.controller@getStudentByDniAll          | /student_all/:dni                 | GET          | Función encargada de  obtener un estudiante activo  por su identificación  sin importar estado de activación |
| student.controller@getStudentsBasic          | /student_basic/                | GET          | Función encargada de  obtener información básica del estudiante |
| student.controller@createStudent               | /student                          | POST         | Función encargada de crear un estudiante                                                                     |
| student.controller@updateStudent               | /student/:dni                     | PUT          | Función encargada de actualizar un estudiante                                                                |
| student.controller@disableStudent              | /student/:dni/disable             | PUT          | Función encargada de deshabilitar un estudiante                                                              |
| student.controller@enableStudent               | /student/:dni/enable              | PUT          | Función encargada de habilitar un estudiante                                                                 |
| student.controller@insertCV                    | /studentcv/                       | POST         | Función encargada de agregar un CV a un estudiante                                                           |
| student.controller@updateCV                    | /studentcv/                       | PUT          | Función encargada de actualizar un CV a un estudiante                                                        |
| student.controller@removeCV                    | /studentcv/:dni                   | DELETE       | Función encargada de eliminar un CV a un estudiante                                                          |
| student.controller@getStudentCV                | /studentcv/:dni                   | GET          | Función encargada de obtener el CV de un estudiante                                                          |
| student.controller@updateCareersForStudent     | /student/:dni/careers             | PUT          | Función encargada de actualizar las carreras de un estudiante                                                |
| student.controller@updateLanguagesForStudent   | /student/:dni/languages           | PUT          | Función encargada de actualizar los lenguages de un estudiante                                               |
| student.controller@updateNetworksForStudent    | /student/:dni/networks            | PUT          | Función encargada de actualizar las redes de un estudiante                                                   |
| student.controller@updateAssoCareersForStudent | /student/:dni/associated_careers  | PUT          | Función encargada de actualizar las carreras asociadas de un estudiante                                      |
| student.controller@getstudentbyprofile         | /student/profile/:profile         | GET          | Función encargada de obtener estudiante por perfil                                                           |
| student.controller@getStudentStatus            | /student/:dni/status              | GET          | Función encargada de obtener el status/estado de un estudiante                                               |

### Red

Cada una de las rutas para las redes, se encuentran asociadas al controlador network_controller.

| Método                               | Ruta                 | HTTP  Request | Descripción                                                  |
|--------------------------------------|----------------------|---------------|--------------------------------------------------------------|
| network.controller@getNetworks       | /network             | GET           | Función encargada de obtener todas las redes                 |
| network.controller@getNetworksEnable | /network/enabled/    | GET           | Función encargada de obtener todas las redes activas         |
| network.controller@getNetworkbyId    | /network/:id         | GET           | Función encargada de obtener una red por su  identificación  |
| network.controller@createNetwork     | /network/            | POST          | Función encargada de crear una red                           |
| network.controller@updateNetwork     | /network/:id         | PUT           | Función encargada de actualizar una red                      |
| network.controller@deleteNetwork     | /network/:id         | DELETE        | Función encargada de eliminar una red                        |
| network.controller@disableNetwork    | /network/:id/disable | PUT           | Función encargada de deshabilitar una red                    |
| network.controller@enableNetwork     | /network/:id/enable  | PUT           | Función encargada de habilitar una red                       |

### Lenguaje

Cada una de las rutas para los lenguajes, se encuentran asociadas al controlador language.controller.

| Método                               | Ruta                 | HTTP  Request | Descripción                                                  |
|--------------------------------------|----------------------|---------------|--------------------------------------------------------------|
| language.controller@getLanguages       | /language/             | GET           | Función encargada de obtener todos los lenguages                 |

### Direcciones

Cada una de las rutas para las direcciones, se encuentran asociadas al controlador direction.controller.
| Método                                  | Ruta                 | HTTP  Request | Descripción                                                                         |
|-----------------------------------------|----------------------|---------------|-------------------------------------------------------------------------------------|
| direction.controller@getProvinces       | /province            | GET           | Función encargada de obtener todas las provincias                                   |
| direction.controller@getCantones        | /province/:id/canton | GET           | Función encargada de obtener todas los cantones según  la provincia                 |
| direction.controller@getDistrics        | /canton/:id/district | GET           | Función encargada de obtener todos los distritos según el cantón                    |
| direction.controller@getDirectionsByDni | /direction/:dni      | GET           | Función encargada de obtener las direcciones de los vinculados según identificación |

### Campus

Cada una de las rutas para los campus, se encuentran asociadas al controlador campus.controller.

| Método                              | Ruta               | HTTP  Request | Descripción                                            |
|-------------------------------------|--------------------|---------------|--------------------------------------------------------|
| campus.controller@getCampuses       | /campus/           | GET           | Función encargada de obtener todos los campus          |
| campus.controller@getCampusesEnable | /campus/enabled/   | GET           | Función encargada de obtener los campus activos        |
| campus.controller@getCampusbyId     | /campus/:id        | GET           | Función encargada de obtener campus por identificación |
| campus.controller@createCampus      | /campus/           | POST          | Función encargada de crear un campus                   |
| campus.controller@updateCampus      | /campus/:id        | PUT           | Función encargada de actualizar un campus              |
| campus.controller@deleteCampus      | /campus/:id        | DELETE        | Función encargada de eliminar un campus                |
| campus.controller@disableCampus     | /campus/:id/disable    | PUT           | Función encargada de deshabilitar un campus            |
| campus.controller@enableCampus      | /campus/:id/enable     | PUT           | Función encargada de habilitar un campus               |
| campus.controller@checkCampusExists | /campus/exists/:id | GET           | Función encargada de informar si existe un campus      |

### Carrera

Cada una de las rutas para las carreras, se encuentran asociadas al controlador career.controller.
| Método                              | Ruta               | HTTP  Request | Descripción                                                  |
|-------------------------------------|--------------------|---------------|--------------------------------------------------------------|
| career.controller@getCareer         | /career/           | GET           | Función encargada de obtener todos las carreras              |
| career.controller@getCareerEnable   | /career/enabled/   | GET           | Función encargada de obtener las carreras activas            |
| career.controller@getCareerbyId     | /career/:id        | GET           | Función encargada de obtener las carreras por identificación |
| career.controller@createCareer      | /career/           | POST          | Función encargada de crear una carrera                       |
| career.controller@updateCareer      | /career/:id        | PUT           | Función encargada de actualizar una carrera                  |
| career.controller@deleteCareer      | /career/:id        | DELETE        | Función encargada de eliminar una carrera                    |
| career.controller@disableCareer     | /career/:id/disable    | PUT           | Función encargada de deshabilitar una carrera                |
| career.controller@enableCareer      | /career/:id/enable     | PUT           | Función encargada de habilitar una carrera                   |
| career.controller@checkCareerExists | /career/exists/:id | GET           | Función encargada de informar si existe una carrera          |

.

### Centro

Cada una de las rutas para los centros, se encuentran asociadas al controlador center.controller.

| Método                            | Ruta             | HTTP  Request | Descripción                                                 |
|-----------------------------------|------------------|---------------|-------------------------------------------------------------|
| center.controller@getCenter       | /center/         | GET           | Función encargada de obtener todos los centros              |
| center.controller@getCenterEnable | /center/enabled/ | GET           | Función encargada de obtener los centros activas            |
| center.controller@getCenterbyId   | /center/:id      | GET           | Función encargada de obtener los centros por identificación |
| center.controller@createCenter    | /center/         | POST          | Función encargada de crear un centro                        |
| center.controller@updateCenter    | /center/:id      | PUT           | Función encargada de actualizar un centro                   |
| center.controller@deleteCenter    | /center/:id      | DELETE        | Función encargada de eliminar un centro                     |
| center.controller@disableCenter   | /center/:id/disable  | PUT           | Función encargada de deshabilitar un centro                 |
| center.controller@enableCenter    | /center/:id/enable   | PUT           | Función encargada de habilitar un centro                    |

### Carrera asociada

Cada una de las rutas para las carreras asociadas, se encuentran asociadas al controlador associatedCareer.controller.

| Método                                         | Ruta                                       | HTTP  Request | Descripción                                                        |
|------------------------------------------------|--------------------------------------------|---------------|--------------------------------------------------------------------|
| center.controller@getAsoCareerFromCenter       | /associated_career_from_center/:id         | GET           | Función encargada de obtener carreras asociadas por centro         |
| center.controller@getAsoCareerFromCenterEnable | /associated_career_from_center/enabled/:id | GET           | Función encargada de obtener carreras asociadas activas por centro |
| center.controller@getAssoCareerbyId            | /associated_career/:id                     | GET           | Función encargada de obtener carreras asociadas por identificación |
| center.controller@getAssoCareer                | /associated_career/                        | GET           | Función encargada de obtener carreras asociadas                    |
| center.controller@createAssoCareer             | /associated_career/                        | POST          | Función encargada de crear una carrera asociada                    |
| center.controller@updateAssoCareer             | /associated_career/:id                     | PUT           | Función encargada de actualizar una carrera asociada               |
| center.controller@deleteAssoCareer             | /associated_career/:id                     | DELETE        | Función encargada de eliminar una  carrera asociada                |
| center.controller@getAssoCareerWithCenter      | /associated_career_center/                 | GET           | Función encargada de obtener una  carrera asociada con el centro   |
| center.controller@disableAssociatedCareer      | /associated_career/:id/disable/            | PUT           | Función encargada de deshabilitar una carrera asociada             |
| center.controller@enableAssociatedCareer       | /associated_career/:id/enable/             | PUT           | Función encargada de habilitar una carrera asociada                |

### Unidad de Investigación

Cada una de las rutas para las consultas, se encuentran asociadas al controlador investigation_unit.controller.

| Método                                                  | Ruta                              | HTTP Request | Descripción                                                             |
|---------------------------------------------------------|-----------------------------------|--------------|-------------------------------------------------------------------------|
| investigation_unit.controller@getInvestigation_Units    | /investigation_unit/              | GET          | Función encargada de  obtener las unidades de investigación             |
| investigation_unit.controller@getInvestigation_UnitbyId | /investigation_unit/:id           | GET          | Función encargada de  obtener una unidad de investigación específica    |
| investigation_unit.controller@createInvestigation_Unit  | /investigation_unit/              | POST         | Función encargada de  crear una unidad de investigación                 |
| investigation_unit.controller@updateInvestigation_Unit  | /investigation_unit/:id           | PUT          | Función encargada de  actualizar  una unidad de investigación           |

### Investigador

Cada una de las rutas para los investigadores, se encuentran asociadas al controlador researcher.controller.

| Método                                         | Ruta                              | HTTP Request | Descripción                                                             |
|------------------------------------------------|-----------------------------------|--------------|-------------------------------------------------------------------------|
| researcher.controller@getResearchers           | /researcher/                      | GET          | Función encargada de  obtener los investigadores activos                |
| researcher.controller@getResearchersAll        | /researcher_all/                  | GET          | Función encargada de  obtener una unidad de investigación específica    |
| researcher.controller@getResearchersBasic        | /researcher_basic/                  | GET          | Función encargada de  información básica de un investigador    |
| researcher.controller@createResearcher         | /researcher/                      | POST         | Función encargada de  crear una unidad de investigación                 |
| researcher.controller@updateResearcher         | /researcher/:dni                  | PUT          | Función encargada de  actualizar  una unidad de investigación           |
| researcher.controller@getResearcherByDni       | /researcher/:dni                  | GET          | Función encargada de obtener un investigador por la identificación      |

### Consultas Específicas

Cada una de las rutas para las consultas, se encuentran asociadas al controlador consultas.controller.

| Método                                  | Ruta                 | HTTP  Request | Descripción                                                                         |
|-----------------------------------------|----------------------|---------------|-------------------------------------------------------------------------------------|
| consultas.controller@checkPersonExists  | /person/exists/:id       | GET          | Función encargada de informar si un vinculado existe en el sistema                  |


### Proyecto 
Cada una de las rutas para el proyecto, se encuentran asociadas al controlador project.controller.


| Método                                 | Ruta                 | HTTP Request | Descripción                                               |
|----------------------------------------|----------------------|--------------|-----------------------------------------------------------|
| project.controller@createProject       | /project/            | POST         | Función encargada de  crear projecto                      |
| project.controller@updateProject       | /project/:id         | PUT          | Función encargada de actualizar un proyecto               |
| project.controller@getProjects         | /project/            | GET          | Función encargada de  obtener los proyectos               |
| project.controller@getProjectbyId      | /project/:id         | GET          | Función encargada de obtener un proyecto específico       |
| project.controller@assignPersonProject | /project/assign/     | POST         | Función encargada de  asignar personas al proyecto        |
| project.controller@getPersonsProject   | /project_persons/:id | GET          | Función encargada de obtener los vinculados a un proyecto |
| project.controller@getPersonsNotInProject   | /project_persons_not_in/:id | GET          | Función encargada de obtener los vinculados que no están en el proyecto seleccionado |
| project.controller@getStudentsProject   | /project/students/:id | GET          | Función encargada de obtener los estudiantes de un proyecto seleccionado |






### Actividad
Cada una de las rutas para las actividades, se encuentran asociadas al controlador activity.controller.

| Método                                    | Ruta                  | HTTP Request | Descripción                                             |
|-------------------------------------------|-----------------------|--------------|---------------------------------------------------------|
| project.controller@createActivity         | /activity/            | POST         | Función encargada de  crear actividad                   |
| project.controller@updateActivity         | /activity/:id         | PUT          | Función encargada de actualizar una actividad           |
| project.controller@assignPersonActivity   | /activity/assign      | POST         | Función encargada de asignar actividades                |
| project.controller@getActivities          | /activity/            | GET          | Función encargada de  obtener actividades               |
| project.controller@getActivitybyProjectId | /activity/project/:id | GET          | Función encargada de obtener actividades por proyecto   |
| project.controller@getActivitiesNoProject | /activity/alone       | GET          | Función encargada de obtener actividades independientes |
| project.controller@assignPersonsActivity  | /activity/project/:id | GET          | Función encargada de obtener personas por actividad     |
| project.controller@getActivitybyId        | /activity/:id         | GET          | Función encargada de obtener actividad específica       |
| project.controller@createActivityType        | /type         | POST          | Función encargada de crear un tipo de actividad específica       |
| project.controller@updateActivityType        | /type/:id         | PUT          | Función encargada de actualizar el tipo de actividad específica       |
| project.controller@getActivityType        | /type       | GET          | Función encargada de obtener el tipo de actividad específica       |





### Gantt
Cada una de las rutas para el Gantt, se encuentran asociadas al controlador gantt.controller.

| Método                            | Ruta            | HTTP Request | Descripción                                           |
|-----------------------------------|-----------------|--------------|-------------------------------------------------------|
| gantt.controller@createPeriod     | /period/        | POST         | Función encargada de  crear periodo                   |
| gantt.controller@updatePeriod     | /period/:id     | PUT          | Función encargada de actualizar periodo               |
| gantt.controller@getPeriods       | /period/        | GET          | Función encargada de ver los periodos                 |
| gantt.controller@createGantt      | /gantt/         | POST         | Función encargada de  crear el gantt                  |
| gantt.controller@getGantts        | /gantt/:id      | GET          | Función encargada de obtener el gantt por proyecto    |
| gantt.controller@createGantt_Task | /gantt_task/    | POST         | Función encargada de crear tareas del gantt           |
| gantt.controller@updateGantt_Task | /gantt_task/:id | PUT          | Función encargada de actualizar las tareas del gantt  |
| gantt.controller@getGantt_Tasks   | /gantt_task/:id | GET          | Función encargada de obtener tareas de un gantt       |
| gantt.controller@checkPeriodExists | /period/exists    | POST         | Función encargada de verificar si un periodo existe    |
| gantt.controller@checkGanttExists | /gantt_exists/    | POST         | Función encargada de verificar si un Gantt exite           |



### Documento

Cada una de las rutas para los documentos, se encuentran asociadas al controlador activity.controller.

| Método                                     | Ruta                     | HTTP Request | Descripción                                                    |
|--------------------------------------------|--------------------------|--------------|----------------------------------------------------------------|
| documents.controller@insertProjectForm     | /project_form/           | POST         | Función encargada de insertar un form de proyecto              |
| document.controller@deleteProjectForm      | /project_form/:id        | DELETE       | Función encargada de eliminar form de proyecto                 |
| document.controller@getProjectForm         | /project_form/:id        | GET          | Función encargada de obtener form de proyecto                  |
| document.controller@insertEndorsement      | /endorsement/            | POST         | Función encargada de insertar endorsement                      |
| document.controller@deleteEndorsement      | /endorsement/:id         | DELETE       | Función encargada de eliminar endorsement                      |
| document.controller@getEndorsement         | /endorsement/:id         | GET          | Función encargada de  obtener endorsement                      |
| document.controller@getEndorsementsProject | /endorsement/project/:id | GET          | Función encargada de obtener endorsements por proyecto         |
| document.controller@insertArticle          | /article/                | POST         | Función encargada de insertar artículo                         |
| document.controller@insertArticleNoFile    | /article/nofile          | POST         | Función encargada de insertar artículo sin archivo             |
| document.controller@updateArticle          | /article/:id             | PUT          | Función encargada de actualizar artículo                       |
| document.controller@deleteArticle          | /article/:id             | DELETE       | Función encargada de eliminar artículo                         |
| document.controller@deleteArticleFile      | /article/file/:id        | DELETE       | Función encargada de eliminar file del artículo                |
| document.controller@insertArticleFile      | /article/file/:id        | POST         | Función encargada de insertar file del artículo                |
| document.controller@getArticle             | /article/:id             | GET          | Función encargada de obtener artículo                          |
| document.controller@getArticleProject      | /article/project/:id     | GET          | Función encargada de obtener artículo por proyecto             |
| document.controller@insertPaper            | /paper/                  | POST         | Función encargada de insertar paper                            |
| document.controller@insertPaperNoFile      | /paper/nofile            | POST         | Función encargada de insertar paper sin archivo                |
| document.controller@updatePaper            | /paper/:id               | PUT          | Función encargada de actualizar paper                          |
| document.controller@deletePaper            | /paper/:id               | DELETE       | Función encargada de eliminar paper                            |
| document.controller@deletePaperFile        | /paper/file/:id          | DELETE       | Función encargada de eliminar file del paper                   |
| document.controller@insertPaperFile        | /paper/file/:id          | POST         | Función encargada de insertar file del paper                   |
| document.controller@getPaper               | /paper/:id               | GET          | Función encargada de obtener paper                             |
| document.controller@getPaperProject        | /paper/project/:id       | GET          | Función encargada de obtener paper por proyecto                |
| document.controller@insertList             | /list/                   | POST         | Función encargada de insertar lista de asistencia              |
| document.controller@getList                | /list/:id                | GET          | Función encargada de obtener lista de asistencia               |
| document.controller@deleteList             | /list/:id                | DELETE       | Función encargada de eliminar lista de asistencia              |
| document.controller@getListActivity        | /list/ativity/:id        | GET          | Función encargada de obtener lista de asistencia por actividad |
| document.controller@insertFinantialDocument             | /finantial_document                   | POST         | Función encargada de insertar un item financiero              |
| document.controller@deleteFinancialDocument                | /finantial_document/:id                | DELETE          | Función encargada de eliminar el documento financiero               |
| document.controller@getFinancialDocument             | /finantial_document/:id                | GET       | Función encargada de obtener un documento financiero   | 
| document.controller@getFinancialDocumentItem        |    /finantial_document/item/:id     | GET          | Función encargada de obtener un documento financiero específico |

### Documento Múltiple 

Cada una de las rutas para los documentos múltiples, se encuentran asociadas a Photos_Controller.controller.


| Método                                                  | Ruta                              | HTTP Request | Descripción                                                             |
|---------------------------------------------------------|-----------------------------------|--------------|-------------------------------------------------------------------------|
| photos.controller@insertPhotos    | /photo   | POST          | Función encargada de  insertar fotos     |
| photos.controller@deletePhoto | /photo/:id       | DELETE          | Función encargada de eliminar foto específica |
| photos.controller@getPhoto  | /photo/:id   | GET         | Función encargada de  obtener foto                 |
| photos.controller@getPhotosActivity  | /photo/activity/:id | GET          | Función encargada de  obtener fotos de Actividades        |




### Filtros

Cada una de las rutas para los filtros, se encuentran asociadas al controlador Filter.controller.

| Método                                                  | Ruta                              | HTTP Request | Descripción                                                             |
|---------------------------------------------------------|-----------------------------------|--------------|-------------------------------------------------------------------------|
| filter.controller@getProjectsFilter    | /filter/project/              | POST          | Función encargada de  obtener consultas de Proyecto             |
| filter.controller@getStudentFilter | /filter/student/        | POST          | Función encargada de  obtener consultas de Estudiante    |
| filter.controller@getResearcherFilter  | /filter/researcher/              | POST         | Función encargada de  crear una unidad de investigación                 |
| filter.controller@getActivityNoProjectFilter  | /filter/activity/no_project/         | POST          | Función encargada de  obtener consultas de Actividades no anexas a proyectos         |
| filter.controller@getActivityFilter  | /filter/activity/project       | POST          | Función encargada de  obtener consultar de actividades en anexas a Proyectos        |


### Partidas y subpartidas
Cada una de las rutas para las partidas, se encuentran asociadas al controlador budget_unit.controller.

| Método                                           | Ruta                        | HTTP Request | Descripción                                                      |
|--------------------------------------------------|-----------------------------|--------------|------------------------------------------------------------------|
| budget_unit.controller@getBudgetUnit             | /budget_unit/               | GET          | Función encargada de crear partida presupuestaria                |
| budget_unit.controller@getBudgetUnitEnable       | /budget_unit/enabled        | GET          | Función encargada de obtener partida presupuestaria activadas    |
| budget_unit.controller@getBudgetUnitbyId         | /budget_unit/:id            | GET          | Función encargada de obtener una partida específica              |
| budget_unit.controller@createBudgetUnit          | /budget_unit/               | POST         | Función encargada de crear una partida presupuestaria            |
| budget_unit.controller@updateBudgetUnit          | /budget_unit/:id            | PUT          | Función encargada de editar una partida específica               |
| budget_unit.controller@disableBudgetUnit         | /budget_unit/:id/disable    | PUT          | Función encargada de desahabilitar una partida                   |
| budget_unit.controller@enableBudgetUnit          | /budget_unit/:id/enable     | PUT          | Función encargada de habilitar una partida                       |
| budget_subunit.controller@getBudgetSubUnit       | /budget_subunit/            | GET          | Función encargada de obtener una subpartida                      |
| budget_subunit.controller@getBudgetSubUnitEnable | /budget_subunit/enabled     | GET          | Función encargada de obtener subpartidas activas                 |
| budget_subunit.controller@getBudgetSubUnitbyId   | /budget_subunit/:id         | GET          | Función encargada de obtener una subpartida                      |
| budget_subunit.controller@createBudgetSubUnit    | /budget_subunit/            | POST         | Función encargada de crear una subpartida presupuestaria         |
| budget_subunit.controller@updateBudgetSubUnit    | /budget_subunit/:id         | PUT          | Función encargada de actualizar una subpartida presupuestaria    |
| budget_subunit.controller@disableBudgetSubUnit   | /budget_subunit/:id/disable | PUT          | Función encargada de deshabilitar una subpartida presupuestaria  |
| budget_subunit.controller@enableBudgetSubUnit    | /budget_subunit/:id/enable  | PUT          | Función encargada de habilitar una subpartida presupuestaria     |


### Item Financiero

Cada una de las rutas para los items financieros, se encuentran asociadas al controlador budget_unit.controller.

| Método                                            | Ruta                        | HTTP Request | Descripción                                                                    |
|---------------------------------------------------|-----------------------------|--------------|--------------------------------------------------------------------------------|
| financialItem.controller@getFinancialItem         | /financial_item/            | GET          | Función encargada de obtener item financiero                                   |
| financialItem.controller@getFinancialItemSpecific | /financial_item/specific/   | GET          | Función encargada de obtener item financiero por id de actividad y de proyecto |
| financialItem.controller@getFinancialItembyId     | /financial_item/:id         | GET          | Función encargada de obtener un item financiero específico                     |
| financialItem.controller@createFinancialItem      | /financial_item/            | POST         | Función encargada de crear un item financiero                                  |
| financialItem.controller@updateFinancialItem      | /financial_item/:id         | PUT          | Función encargada de editar un item financiero                                 |


### Usuarios 

Cada una de las rutas para los usuarios, se encuentran asociadas al controlador user.controller.

| Método                                | Ruta                   | HTTP Request | Descripción                                                   |
|---------------------------------------|------------------------|--------------|---------------------------------------------------------------|
| user.controller@createUser            | /user                  | POST         | Función encargada de crear un usuario                         |
| user.controller@checkUserEmailExists  | /user/email/exists     | POST         | Función encargada de verificar si un correo existe            |
| user.controller@authenticateUser      | /user/authenticate     | POST         | Función encargada de autenticar el inicio de sesión           |
| user.controller@getUsers              | /user                  | GET          | Función encargada de obtener usuarios                         |
| user.controller@forgotPassword        | /forgotPassword        | POST         | Función encargada de ejecutar proceso de recuperar contraseña |
| user.controller@validatePasswordToken | /validatePasswordToken | POST         | Función encargada de validar la contraseña                    |
| user.controller@resetPassword         | /resetPassword         | POST         | Función encargada de reiniciar la contraseña                  |
| user.controller@updatePassword        | /updatePassword        | PUT          | Función encargada de actualizar la contraseña                 |
| user.controller@validateToken         | /validateToken         | GET          | Función encargada de validar el token                         |











