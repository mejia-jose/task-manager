# Angular v17 + Boostrap
  
# Descripción de la app

  1. Nombre: TaskManager

  2. Descripción: 
  TaskManager es una aplicación web desarrollada en Angular v17 que permite organizar y gestionar tareas diarias de manera sencilla. Su objetivo es facilitar el seguimiento de pendientes con una interfaz clara, rápida y fácil de mantener.

# Funcionalidades

    1. Gestión de tareas
        Crear, listar, editar y eliminar tareas con persistencia de datos.

    2. Control de estado
        Posibilidad de marcar tareas como completadas, bloqueando automáticamente su edición al finalizar.

    3. Dashboard
        Visualización clara de las tareas mediante badges de estado y fechas formateadas para una mejor lectura.

    4. Autenticación de usuarios
        Inicio de sesión, registro de usuarios y cierre de sesión.
        Manejo de identidad mediante headers personalizados (x-user-email y x-user-id).

    5. Interfaz responsiva
        Diseño adaptado a dispositivos móviles y escritorio utilizando Bootstrap 5.

# Arquitectura del Proyecto
    - El proyecto se estructuró utilizando una arquitectura basada en Features (funcionalidades), donde cada módulo agrupa de forma cohesionada todos los elementos relacionados a una funcionalidad específica de la aplicación.

    - Esta arquitectura organiza el código por dominios funcionales en lugar de hacerlo por tipo de archivo.

    - Estructura de directorios: 
        src/app/
        ├── core/              # Servicios globales, guards, interfaces(contratos), entre otros.
        ├── features/  	       # Funcionalidades principales del sistema (Auth, Tareas, etc.).
        ├── ├── Auth	       # Registro e inicio de sesión de usuarios
        │   ├── shared/        # Componentes reutilizables dentro de las features (Header).
        │   └── tasks/         # Lógica específica para la gestión de tareas.
        └── environments/      # Configuración globales.

    - ¿Por qué se decidió usar esta arquitectura?
        - Escalabilidad
            Permite agregar nuevas funcionalidades sin afectar módulos existentes, facilitando el crecimiento del proyecto.

        - Mantenibilidad
            Al estar el código relacionado en un mismo lugar, es más fácil de entender, modificar y depurar.

        - Separación de responsabilidades
            Cada feature es responsable de su propio dominio, reduciendo el acoplamiento entre distintas partes de la aplicación.

        - Mejor experiencia para el desarrollador
            - Facilita la compresión y entendimiento del proyecto de forma más rapida para los desarrolladores.
        
        - Facilidad de testear
            - Facilita mejor la forma de hacer pruebas y debug

# Decisiones Técnicas y Por Qué

    - Formularios Reactivos (FormBuilder & Validators)
        Se eligieron para tener mayor control sobre validaciones y manejo del estado del formulario antes de enviar datos al servidor.

    - Angular Signals
        Se usan para el manejo de estado, permitiendo una detección de cambios más eficiente y mejor rendimiento.

    - Standalone Components
        Se optó por componentes independientes para reducir la complejidad y facilitar la reutilización sin depender de NgModules.

    - Notificaciones con SweetAlert2
        Se utiliza para mostrar alertas claras y visuales en acciones como crear, actualizar o eliminar tareas.

    - Lazy Loading de componentes
        Se implementó para cargar funcionalidades solo cuando se necesitan, mejorando el tiempo de carga inicial.

    - Enrutamiento con Angular Router
        Permite una navegación clara entre vistas, integración con Lazy Loading y una estructura escalable.

# Stack Tecnológico

    - Angular 17+: Uso de Standalone API y Signals.

    - Reactive Forms: Manejo avanzado de formularios con FormGroup y FormControl.

    - Bootstrap 5+: Estilizado responsivo y moderno.

    - RxJS: Utilizado exclusivamente para la capa de servicios (peticiones HTTP) y flujo de datos asíncronos.

    - Angular Router 17+: Utilizado para el enrutamiento de la aplicación

    - Sweet Alert2  11+: Utilizado para mostrar toast y alertas de confirmación y mensajes de exito o de error

# Configuración del Proyecto
    - Clonar el repositorio
        ```bash
        git clone https://github.com/mejia-jose/task-manager.git

    - Instalar dependencias
        npm install

    - Ejecutar la aplicación
        ng serve

# Repositorio:

- Url:(https://github.com/mejia-jose/task-manager)

# Aplicación Desplegada

    - La aplicación fue desplegada en **Vercel** debido a su integración sencilla con proyectos frontend y despliegues automáticos a partir del repositorio.

    - Url:([https://github.com/mejia-jose/task-manager](https://task-manager-lyart-psi.vercel.app))
