import { Book, ChatbotConfig, Field, PageContent } from "@/lib/types/book";

// Sample book with per-chapter chatbot + form (5 questions)
export const sampleBook: Book = {
  id: "alice-in-wonderland",
  title: "UJAT 2025: Transformando vidas y sociedad a través de la ciencia",
  author: "Dr. José Ramón Laines Canepa",
  year: 2025,
  chapters: [
    {
      title: "Invitado: Lic. Guillermo Narváez Osorio, Rector de la UJAT",
      pages: [
        {
          "type": "text",
          "content": `<h1><strong>Introducción del capítulo</strong></h1>
          En el umbral del año 2025, la Universidad Juárez Autónoma de Tabasco (UJAT) se consolida como un actor transformador en el escenario científico, social y educativo de México.
          Bajo el liderazgo del rector Guillermo Narváez Osorio, esta casa de estudios ha orientado sus esfuerzos hacia una visión de ciencia con sentido social, donde la formación académica se entrelaza con la solución de problemas reales.
          En esta conversación inspiradora en el programa <strong>"Creando Conciencia"</strong>, se nos revela cómo la UJAT, a través de investigación, innovación y compromiso social, busca no solo formar profesionales, sino forjar agentes de cambio capaces de transformar su entorno.
          Este capítulo es un testimonio de esa misión.`
        } as PageContent,
        {
          "type": "text",
          "content": `<h1><strong>Transcripción editada de la entrevista</strong></h1>
          En una tarde de ciencia y reflexión, los micrófonos de Radio UJAT recibieron al rector Guillermo Narváez Osorio.
          Acompañado por los doctores José Ramón Laines Canepa y José Roberto Hernández Barajas, la conversación fluía con cercanía, claridad y un tono visionario.
          “La universidad es motor de cambio”, fue la premisa que marcó el diálogo.</br>
          
          Narváez inició reconociendo los grandes retos del presente: consolidar la infraestructura científica, reforzar los laboratorios y extender el impacto de la universidad hacia el campo y la industria local.
          Pero el cambio no solo se mide en edificios. Lo esencial es el estudiante.
          Por ello, destacó la importancia de los programas como el verano de la ciencia y “Mujeres en la Ciencia”, acompañados de una estrategia: el ejemplo.</br>
          
          A través del testimonio de jóvenes que ya han vivido experiencias de intercambio, el rector apuesta por inspirar a otros: “Sí se puede. Tenemos el talento”.
          Así lo demuestran proyectos emblemáticos con productores de chile en Balancán y la Asociación de Apicultores, donde la ciencia de la UJAT ya transforma comunidades.</br>
          
          La universidad, insistió, no puede quedarse en sus claustros.
          “Es hora de salir, de devolverle a la sociedad lo que ésta aporta”, afirmó con convicción.
          Desde el desarrollo de secadores solares hasta la cría tropicalizada de abejas reinas, las investigaciones buscan impacto real, inmediato y sustentable.</br>
          
          Los conductores preguntaron entonces por la fuga de talentos.
          Narváez fue claro: no se trata de obligar a nadie a quedarse, sino de fomentar un profundo sentido de pertenencia.
          “No podemos cortar las alas, pero sí motivar a que regresen a impactar positivamente”.</br>
          
          El programa continuó hilando testimonios de estudiantes, ejemplos de éxito internacional —como proyectos reconocidos en Brasil, Harvard y Japón— y reflexiones sobre el papel de los investigadores en la universidad.
          Destacó especialmente el caso del “Mapa Háptico”, una innovación surgida de sinergias internas que alcanzó proyección global.</br>
          
          El rector cerró su intervención con esperanza.
          Desde el cultivo de perlas hasta la creación del Centro Universitario de Biotecnología de Reproducción Bovina, cada proyecto refleja la visión de una UJAT que trasciende aulas y laboratorios.
          “La ciencia con sentido social no es un discurso, es una promesa”, concluyó el Dr. José Ramón Laines  Canepa.`
        } as PageContent,
        {
          type: "chatbot",
          config: {
            persona: "You are a science explainer: clear, engaging, and practical.",
            instruction: `Enfócate en ¿Cómo puede una universidad pública convertirse en un motor de transformación social a través de la ciencia? 
Analiza los casos presentados por el rector de la UJAT y compáralos con experiencias similares en América Latina.
`
          }
        } as PageContent,
        {
          type: "form",
          title: "🧠 Punto de Encuentro",
          fields: [
            { type: "text", id: "q1", label: "¿Cuál es el papel que tú, como estudiante, docente o ciudadano, puedes desempeñar para que la ciencia con sentido social transforme tu comunidad?", multiline: true },
          ]
        } as PageContent,
        {
          type: "audio",
          url: "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
          htmlContent: `<h1><strong>🎙️ Diálogo de podcast</strong></h1>
<strong>Dr. José Ramón Laines Canepa:</strong> Bienvenidos a “Creando Conciencia”. Hoy nos acompaña el rector Guillermo Narváez Osorio. Rector, ¿cómo ve el papel de la UJAT en la transformación social?
<br/><br/>
<strong>Guillermo Narváez Osorio:</strong> Gracias, doctor. La UJAT es motor de cambio. Nuestra misión es formar profesionales comprometidos con la sociedad y la ciencia aplicada.
<br/><br/>
<strong>Dr. José Roberto Hernández Barajas:</strong> ¿Qué proyectos destacan en este esfuerzo?
<br/><br/>
<strong>Guillermo Narváez Osorio:</strong> El verano de la ciencia y “Mujeres en la Ciencia” son clave. Además, colaboramos con productores locales, como los apicultores y agricultores de Balancán.
<br/><br/>
<strong>Dr. José Ramón Laines Canepa:</strong> ¿Cómo motivamos a los jóvenes a regresar y aportar a Tabasco?
<br/><br/>
<strong>Guillermo Narváez Osorio:</strong> No se trata de obligar, sino de inspirar. Queremos que sientan orgullo y pertenencia, que vean el impacto real de su trabajo aquí.
<br/><br/>
<strong>Dr. José Roberto Hernández Barajas:</strong> ¿Algún ejemplo de innovación reciente?
<br/><br/>
<strong>Guillermo Narváez Osorio:</strong> El “Mapa Háptico” y el Centro Universitario de Biotecnología son ejemplos de cómo la UJAT trasciende fronteras y transforma vidas.
<br/><br/>
<strong>Dr. José Ramón Laines Canepa:</strong> Muchas gracias, rector. La ciencia con sentido social es una promesa cumplida en la UJAT.`
        } as PageContent
      ],
    },
    {
      title: "Mujeres en la Ciencia",
      pages: [
        {
          type: "text",
          content: `El programa “Mujeres en la Ciencia” de la UJAT fomenta la participación femenina en áreas STEM. Este capítulo narra historias de éxito y los retos que enfrentan las mujeres científicas en la universidad.`
        } as PageContent,
        {
          type: "chatbot",
          config: {
            persona: "You are an inspiring mentor: supportive, insightful, and empowering.",
            instruction: `Focus on Chapter 3: ¿Por qué es importante la inclusión de mujeres en la ciencia? ¿Qué desafíos y logros se destacan en el programa de la UJAT?`
          }
        } as PageContent,
        {
          type: "form",
          fields: [
            { type: "text", id: "q1", label: "¿Qué historia te inspiró más?", multiline: true },
            { type: "number", id: "q2", label: "¿Cuántas mujeres científicas conoces en tu entorno?", min: 0, max: 100 },
            { type: "text", id: "q3", label: "¿Cómo puede la UJAT apoyar más a las mujeres en STEM?", multiline: true },
          ]
        } as PageContent,
      ],
    },
  ],
};