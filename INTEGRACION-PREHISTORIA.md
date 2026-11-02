# Prehistoria de Malena · Revisión de ilustraciones

Propuesta preparada el 2 de noviembre de 2026. No desplegar ni fusionar en main sin la aprobación de Manuel.

Se conservan los nueve capítulos, 22 preguntas y bloque original de JavaScript de la aplicación. La clave de progreso sigue siendo `historia-mundo-v1`. El explorador funciona de forma independiente: cambiar de etapa conserva sus respuestas durante la visita; recargar inicia una nueva práctica. Se conserva el módulo local previo de primeros homininos.

Las cinco escenas solicitadas están activas con cuatro puntos y cuatro preguntas por escena: Paleolítico aprobado, Mesolítico, Neolítico, un taller del Bronce y primeros registros de Uruk. Las fichas tienen opciones, corrección, explicación y contador. Las preguntas de contexto distinguen lo observado de lo que necesita una explicación.

## Archivos

- `assets/prehistoria/escenas.json` y `escenas.js`: contenido y coordenadas relativas a cada imagen completa.
- `assets/prehistoria/explorador.js` y `explorador.css`: navegación, imágenes responsive e interacción.
- `assets/prehistoria/originales/`: PNG originales conservados, sin modificación.
- `assets/prehistoria/web/`: WebP y JPEG en anchuras de 640, 960, 1440 y 1664 para las cinco escenas. Se conserva el juego previo de homininos.

La herramienta integrada generó cuatro escenas independientes usando el Paleolítico como referencia visual. La escritura tuvo una segunda pasada para eliminar un carro del fondo con una rueda dudosa. Los originales tienen 1672 × 941 píxeles. Las versiones web se recortan mínimamente al centro a 1664 × 936, formato 16:9 exacto, sin ampliación artificial. No son archivos 4K.

## Criterio histórico

Se utiliza el Word original `1o_PREHISTORIA.docx`, Colegio Dulce Nombre de María, por apartados y láminas. Cada escena ofrece el temario y las precisiones académicas con fuentes enlazadas. No se atribuyen números de página sin renderizado.

El Mesolítico representa un ejemplo regional del norte europeo; el Neolítico una recreación de Anatolia con hoz de sílex, ovejas/cabras y cerámica manual; Metales un taller del Bronce, sin presentar cobre, bronce e hierro como simultáneos; Uruk una actividad administrativa sobre arcilla, sin zigurat tardío ni cuneiforme desarrollado. Los signos son esquemas didácticos, no la transcripción de un documento auténtico.

Las ilustraciones son reconstrucciones artísticas revisadas visualmente para uso educativo. No equivalen a pruebas arqueológicas ni a una validación pericial de cada gesto, prenda o técnica. La escena aprobada del Paleolítico se conserva como aportada.

## Comprobación

Se probaron las veinte preguntas nuevas, apertura desde los puntos, acierto/error, bloqueo de respuestas repetidas, reinicio y cambio de etapa. Se comprobó la carga de imágenes y el diseño con tamaños simulados de móvil y tableta. El bloque original de JavaScript se compara literalmente con la base. Esto no sustituye una prueba en un iPad físico.

Base: index.html con blob `d91019446b35d7cd52f8ca4f1cad7acc80c6a527`. GitHub Pages usa main; la rama de revisión no debe fusionarse hasta la aprobación final.
