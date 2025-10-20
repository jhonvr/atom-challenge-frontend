# AtomChallengeFrontend

El proyecto se generó con angular versión 17.3.17 y angular-material 17.3.10

## Install

- Validar si se tiene angular-cli a nivel global con comand en cmd
`ng version`
- Si no se tiene angular-cli instalar globalmente con la version 17
`npm i -g @angular-cli@17`

- Validar si se tiene instalado nodejs
`node -v` recomendado 22
- Si no, se tiene que instalar desde la web oficial de nodejs
`https://nodejs.org/en/download`

## Inicio Firebase: Realizar los pasos si aun no lo hemos hecho en backend
- Validar si se tiene firebase instalado globalmente
`firebase --version`

- Si no se tiene firebase, instalar globalmente 
`npm install -g firebase-tools`

- Realizar login de firebase, para conectarse y visualizar los proyectos existentes
`firebase login`

- Crear proyecto en consola firebase:
`https://console.firebase.google.com` -> `Add Project` -> `Crear proyecto`

## Fin Firebase

## Elegir proyecto firebase
- Luego usar el proyecto creo o existente
`firebase init functions`

- Luego vamos a la ruta del frontend e instalemos las dependencias 
`npm i`

## Deployment

## Generar si aun no lo hemos hecho en el front
Activar Blaze
`https://console.firebase.google.com/project/banckend-tasks/usage/details`

Y en google Cloud console
`Google Cloud Console → IAM & Admin → Service Accounts → Create. `

Agregar roles:
`Firebase Hosting Admin`
`Service Account User`

Otro rol: Buscar <PROJECT_NUMBER>-compute@developer.gserviceaccount.com
`PROJECT_NUMBER: se busca en detalle del proyecto consola de firebase`
Luego:
`Cloud Datastore User (Firestore usa Datastore API en IAM):`
`Abre Google Cloud Console → IAM → IAM.`
`Busca esa cuenta (-compute@developer.gserviceaccount.com).`
`Editar → Agregar otro rol → Cloud Datastore User → Guardar.`

Descarga la KEY y agregarlo en el secrets en github
`Settings → Secrets and variables → Actions → New repository secret`
`FIREBASE_SERVICE_ACCOUNT_BANCKEND_TASKS`

Para generar el despliegue a firebase realizar push a la rama develop

## Architecture

Arquitectura modular basada en features (feature-based architecture). Cada módulo contiene su propia capa de componentes, modelos y servicios, garantizando separación de responsabilidades, escalabilidad y mantenibilidad

Se envia por interceptor un `code` como cabecera el id del usuario logeado
