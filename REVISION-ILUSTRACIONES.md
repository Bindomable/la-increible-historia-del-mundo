# Revisión final · Prehistoria de Malena


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

## Temario y precisiones

| Referencia escolar | Contenido que se conserva | Precisión académica |
|---|---|---|
| Apartado 5, Documento A y Lámina I | Piedra tallada, fuego, caza, pesca, recolección, movilidad y arte rupestre | Una imagen fija no demuestra nomadismo ni fecha el primer control del fuego. Las preguntas deben distinguir observación e interpretación. |
| Apartado 3 | Evolución y Homo sapiens | La cifra escolar de 35.000 años no corresponde al origen de nuestra especie: Homo sapiens existe desde hace unos 300.000 años, según [Smithsonian](https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens). |
| Apartado 6 | Adaptación a nuevos paisajes, flora y fauna | El Mesolítico es regional. Se propone un ejemplo del norte europeo; los aprovechamientos acuáticos están documentados en [Historiska](https://historiska.se/en/explore-history/historical-periods/stone-age-mesolithic-period/). Las pequeñas piezas de sílex se apoyan en la [colección del Ashmolean](https://britisharchaeology.ashmus.ox.ac.uk/collections/mesolithic.html). |
| Apartado 7, Documento B y Lámina II | Agricultura, ganadería, almacenamiento, cerámica, tejidos y economía productora | No existe un intervalo neolítico universal. Como contraste, la agricultura llega a Dinamarca hacia 3900 a. C., según [Nationalmuseet](https://en.natmus.dk/historical-knowledge/denmark/prehistoric-period-until-1050-ad/the-neolithic-period/). No hay que reunir en la misma escena todas las especies animales enumeradas en el Word. La escena propuesta usará ovejas y cabras. |
| Apartado 8 y Lámina III | Cobre, bronce, hierro, oficios e intercambios | Se representará un taller del Bronce. No se presentarán las tres etapas como simultáneas. El bronce de cobre y estaño es una aleación; véase [UCL](https://www.ucl.ac.uk/museums-static/digitalegypt/metal/metalinegypt.html). Su composición no se identifica solo por el color del dibujo. |
| Apartados 2 y 4 | Escritura como límite convencional | Los registros de Uruk de finales del IV milenio a. C. no fijan el fin de la Prehistoria en todo el planeta. Se representarán pictogramas y signos numéricos sobre arcilla vinculados a cuentas de bienes, según [The Met](https://www.metmuseum.org/es/essays/the-origins-of-writing) y [Getty](https://www.getty.edu/news/where-did-writing-come-from/). |


## Prompts y generación

Se usaron los guiones de las cuatro escenas del documento de preparación, con el Paleolítico como referencia de estilo. Se especificaron actividades separadas, anatomía y perspectiva naturales y ausencia de textos incrustados. La escena de Uruk recibió una edición puntual para eliminar el carro del fondo. Modo: herramienta integrada image_gen. Resolución nativa devuelta: 1672 × 941; entrega 16:9 exacta: 1664 × 936.
