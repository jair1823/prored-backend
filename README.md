# Proyecto ProRed Api

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
| researcher.controller@createResearcher         | /researcher/                      | POST         | Función encargada de  crear una unidad de investigación                 |
| researcher.controller@updateResearcher         | /researcher/:dni                  | PUT          | Función encargada de  actualizar  una unidad de investigación           |
| researcher.controller@getResearcherByDni       | /researcher/:dni                  | GET          | Función encargada de obtener un investigador por la identificación      |

### Consultas Específicas

Cada una de las rutas para las consultas, se encuentran asociadas al controlador consultas.controller.

| Método                                  | Ruta                 | HTTP  Request | Descripción                                                                         |
|-----------------------------------------|----------------------|---------------|-------------------------------------------------------------------------------------|
| consultas.controller@checkPersonExists  | /person/exists/:id       | GET          | Función encargada de informar si un vinculado existe en el sistema                  |
