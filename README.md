# Pokédex App - React + TypeScript + Vite

Esta aplicación es una Pokédex interactiva que consume la [PokeAPI](https://pokeapi.co/) para mostrar información de los Pokémon de la primera generación. 

---

## Descripción de la solución desarrollada

La aplicación permite navegar por un listado paginado de Pokémon (12 por página) y consultar el detalle individual de cada uno, incluyendo:

- Nombre del Pokémon
- Hasta 4 imágenes en distintas variantes artísticas
- Listado de formas disponibles
- Habilidades
- Movimientos

Se implementó una arquitectura limpia y modular, separando responsabilidades en capas: servicios HTTP, hooks de datos, componentes reutilizables, páginas y rutas. El manejo de datos asíncronos se realiza con **TanStack React Query**, que proporciona caché inteligente, estados de carga y error de forma declarativa.

---

## API consumida

Se utilizó la [PokeAPI](https://pokeapi.co/) en su versión 2, específicamente los siguientes endpoints:

- **Listado de Pokémon**  
  `GET https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}`  
  Retorna una lista paginada con los nombres y las URL de detalle de cada Pokémon.

- **Detalle de Pokémon**  
  `GET https://pokeapi.co/api/v2/pokemon/{id}/`  
  Retorna la información completa de un Pokémon específico, incluyendo sprites, habilidades, movimientos y formas.

---

## Propósito de la aplicación

El propósito de esta aplicación es demostrar lo aprendido sobre react y asi ofrecer una interfaz moderna, rápida e intuitiva.
<br/>Está diseñada para:

1. **Visualizar el catálogo completo** de Pokémon de forma paginada, facilitando la navegación incluso en listados extensos.
2. **Consultar el detalle de cada Pokémon** con información enriquecida (imágenes oficiales y alternativas, habilidades, movimientos y formas).
3. **Demostrar buenas prácticas de desarrollo frontend** con React, TypeScript y herramientas modernas como Vite, React Query y React Router.

La aplicación sirve como caso de estudio para implementar patrones como el **Adapter Pattern** (para el cliente HTTP), **custom hooks** para la lógica de datos, y **componentes reutilizables** con manejo de estados de carga, error y vacío.

---

## Estructura de componentes

La estructura del proyecto sigue una separación clara por capas, cada una con una responsabilidad única:

### 1. Capa de servicios (`src/services/`)
- **`pokemon.service.ts`** — Clase `PokeApiService` que encapsula todas las llamadas a la API. Recibe un adaptador HTTP por inyección de dependencias, lo que permite cambiar la implementación del cliente HTTP sin modificar la lógica de negocio.

### 2. Capa de adaptadores (`src/common/`)
- **`axios.adapter.ts`** — Implementación concreta del adaptador HTTP usando Axios. Define la interfaz `HttpAdapter` que abstrae el método `get<T>()`. Esto sigue el **Adapter Pattern**, facilitando pruebas unitarias y migraciones futuras a otras librerías (fetch, ky, etc.).

### 3. Capa de hooks (`src/hooks/`)
- **`usePokemonList.ts`** — Hook personalizado que utiliza `useQuery` de TanStack React Query para obtener la lista de Pokémon. Se encarga de invocar al servicio, transformar los datos con `pokemonApiToPokemonInfo` y devolver el listado junto con el conteo total. Incluye un `staleTime` de 5 minutos para evitar llamadas innecesarias a la API.
- **`usePokemonDetail.ts`** — Hook similar para obtener el detalle de un Pokémon por su ID. Mantiene la misma estrategia de caché.

Ambos hooks exponen los estados `isLoading`, `isError`, `error` y la función `refetch`, permitiendo a los componentes presentar interfaces de carga, error y reintento de forma uniforme.

### 4. Capa de componentes (`src/components/`)
- **`BasicCard`** — Componente de tarjeta que muestra la imagen y el nombre de un Pokémon. Al hacer clic, navega a la ruta de detalle mediante un `<Link>` de React Router. Es reutilizable para cualquier elemento que necesite una representación compacta con imagen, título y navegación.
- **`LoadingIndicator`** — Componente genérico que muestra un indicador de carga con un mensaje personalizable. Se usa tanto en el listado como en el detalle.
- **`ErrorDisplay`** — Componente que muestra un mensaje de error con un botón de reintento. Recibe un título, mensaje y callback `onRetry`.
- **`Paginator`** — Componente de paginación que recibe `from`, `to`, `total`, y callbacks para avanzar/retroceder página, además de banderas `hasPrevious` y `hasNext`. Está completamente desacoplado de la lógica de datos.

### 5. Capa de páginas (`src/pages/`)
- **`PokemonPage`** — Página principal que orquesta el listado paginado. Gestiona el estado del offset actual y utiliza `usePokemonList`. Renderiza una grilla de `BasicCard` y el `Paginator`. Maneja los estados de carga, error y vacío.
- **`PokemonDetailPage`** — Página de detalle que obtiene el `id` desde los parámetros de la ruta. Utiliza `usePokemonDetail` y renderiza las imágenes, formas, habilidades y movimientos del Pokémon.

### 6. Capa de rutas (`src/routes/`)
- **`app-router.tsx`** — Configuración de React Router con dos rutas: `/` (listado) y `/pokemon/:id` (detalle). Utiliza `createBrowserRouter` y expone el componente `AppRouter`.

### 7. Capa de interfaces (`src/interfaces/`)
- Define los tipos TypeScript `PokemonDetails` y `PokemonList`/`PokemonInfo`, garantizando tipado estricto en toda la aplicación.

### 8. Capa de utilidades (`src/utils/`)
- **`transform.ts`** — Función `pokemonApiToPokemonInfo` que transforma la respuesta cruda de la API (que solo trae nombre y URL) en objetos `PokemonInfo` con ID extraído de la URL.

### Principios aplicados
- **Separación de preocupaciones (SoC)** — Cada capa tiene una responsabilidad única.
- **Inversión de dependencias (DIP)** — El servicio recibe un adaptador HTTP, no depende de una implementación concreta.
- **Composición sobre herencia** — Los componentes se combinan para formar interfaces complejas.
- **Custom hooks como puente** — Los hooks encapsulan la lógica de datos y exponen estados listos para renderizar.
- **Componentes controlados por estado** — Cada componente maneja explícitamente los estados `loading`, `error` y `data`.

---

## Tecnologías utilizadas

| Tecnología | Propósito |
|---|---|
| React 19 | Librería de interfaz de usuario |
| TypeScript | Tipado estático |
| Vite | Bundler y entorno de desarrollo |
| TanStack React Query | Manejo de datos asíncronos y caché |
| React Router (v7) | Enrutamiento del lado del cliente |
| Axios | Cliente HTTP |
| Tailwind CSS (v4) | Estilizado utilitario |

---

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/Rafael-ID24001/Parcial_02_DAW135-ID24001.git

# Acceder a la carpeta del proyecto
cd Parcial_02_DAW135-ID24001

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```
