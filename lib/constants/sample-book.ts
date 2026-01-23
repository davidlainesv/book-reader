import { Book, PageContent } from "@/lib/types/book";

// Sample book with per-chapter chatbot + form (5 questions)
export const sampleBook: Book = {
  id: "creando-conciencia-ujat-2025",
  title: "UJAT 2025: Transformando vidas y sociedad a través de la ciencia",
  author: "Dr. José Ramón Laines Canepa",
  year: 2025,
  cover: {
    type: "cover",
    title: "UJAT 2025: Transformando vidas y sociedad a través de la ciencia",
    isBookCover: true,
  },
  authors: {
    type: "authors",
    title: "Autores y Coautores",
    authors: [
      {
        name: "Dr. José Ramón Laines Canepa",
        role: "Editor y Autor Principal",
        affiliation: "Universidad Juárez Autónoma de Tabasco",
        bio: `<p>Doctor en Ciencias en Ecología y Manejo de Sistemas Tropicales con más de 20 años de experiencia en investigación y docencia. Coordinador del programa "Creando Conciencia" en Radio UJAT, dedica su trabajo a la divulgación científica y la vinculación universidad-sociedad.</p>`,
      },
      {
        name: "Dr. José Roberto Hernández Barajas",
        role: "Coautor y Conductor",
        affiliation: "Universidad Juárez Autónoma de Tabasco",
        bio: `<p>Investigador y divulgador científico comprometido con la comunicación efectiva de la ciencia. Co-conductor del programa "Creando Conciencia", especializado en hacer accesible el conocimiento científico a la comunidad.</p>`,
      },
      {
        name: "Kenia Leticia Utrera Cabrera",
        role: "Colaboradora",
        affiliation: "Universidad Juárez Autónoma de Tabasco",
        bio: `<p>Comunicadora y productora de contenidos científicos. Contribuye con cápsulas informativas que enriquecen el diálogo entre la ciencia y la sociedad en Radio UJAT.</p>`,
      },
    ],
  },
  acknowledgments: {
    type: "acknowledgments",
    title: "Agradecimientos",
    content: `
      <p>Este libro es el resultado de un esfuerzo colectivo que refleja el compromiso de la Universidad Juárez Autónoma de Tabasco con la ciencia, la educación y el desarrollo social.</p>
      <br>
      <p>Agradecemos profundamente al <strong>Lic. Guillermo Narváez Osorio</strong>, Rector de la UJAT, por su visión transformadora y su apertura para compartir con nuestra audiencia los proyectos que están cambiando vidas en Tabasco.</p>
      <br>
      <p>A la <strong>Dirección General de Comunicación Social de la UJAT</strong> y a todo el equipo de <strong>Radio UJAT 96.1 FM</strong>, por facilitar el espacio para que "Creando Conciencia" sea una realidad cada miércoles.</p>
      <br>
      <p>A los <strong>investigadores, docentes y estudiantes</strong> de la UJAT que con su trabajo diario demuestran que la ciencia con sentido social no es un discurso, sino una práctica constante.</p>
      <br>
      <p>A las <strong>comunidades de Tabasco</strong> —productores, apicultores, emprendedores— que confían en la universidad como aliada para resolver sus desafíos.</p>
      <br>
      <p>Y especialmente a <strong>ti, lector</strong>, por tu interés en conocer cómo la ciencia puede transformar vidas y sociedad. Este libro es también tuyo.</p>
      <br>
      <br>
      <p className="mt-8 italic">— El equipo de "Creando Conciencia"</p>
    `,
  },
  index: {
    type: "index",
    title: "Índice",
  },
  chapters: [
    {
      title: "Invitado: Lic. Guillermo Narváez Osorio, Rector de la UJAT",
      pages: [
        {
          type: "cover",
          title: "Invitado: Lic. Guillermo Narváez Osorio, Rector de la UJAT",
        } as PageContent,
        {
          type: "biography",
          authorName: "Lic. Guillermo Narváez Osorio",
          image: "/lic_guillermo_narvaez.jpeg",
          content: `
            <p>El Lic. Guillermo Narvaez Osorio fue electo para un segundo período como rector de la Universidad Juárez Autónoma de Tabasco el 22 de enero de 2024, para ejercer el cargo hasta enero del año 2028; tras una primera gestión que comprendió desde enero del año 2020 hasta enero del 2024.</p>
            <br>
            <p>Cursó sus estudios profesionales en la UJAT, titulándose el 30 de enero de 1979. Posteriormente, completó cursos de capacitación, actualización y diplomados en materias como: derecho notarial y derecho administrativo.</p>
            <br>
            <p>Cuenta con una vasta experiencia laboral a lo largo de casi cuatro décadas de ejercicio profesional. Ha sido profesor investigador de tiempo completo de la Escuela de Derecho en nuestra Alma Máter y director de la División Académica de Ciencias Sociales y Humanidades.</p>
            <br>
            <p>Como parte de su trayectoria en el servicio público, se ha desempeñado como procurador de la Juventud del CREA-Tabasco; asesor jurídico de la Secretaría de Comunicaciones Asentamientos y Obras Públicas (SCAOP); director de Administración del Instituto de Vivienda de Tabasco.</p>
            <br>
            <p>De igual manera, ostentó el cargo de presidente municipal en su natal Tacotalpa; fue diputado local en LIV Legislatura del Congreso del Estado de Tabasco y fue notario público número 28 de 1995 a 2018.</p>
            <br>
            <p>Asimismo, destaca su paso como magistrado presidente de Tribunal Superior de Justicia del Estado de Tabasco, en el periodo 2000 - 2006 y Secretario de Educación de Tabasco en el año 2019.</p>
          `,
        } as PageContent,
        {
          type: "text",
          content: `<h1><strong>Introducción del Capítulo</strong></h1>
          En el umbral del año 2025, la Universidad Juárez Autónoma de Tabasco (UJAT) se consolida como un actor transformador en el escenario científico, social y educativo de México.
          Bajo el liderazgo del rector Guillermo Narváez Osorio, esta casa de estudios ha orientado sus esfuerzos hacia una visión de ciencia con sentido social, donde la formación académica se entrelaza con la solución de problemas reales.
          En esta conversación inspiradora en el programa <strong>"Creando Conciencia"</strong>, se nos revela cómo la UJAT, a través de investigación, innovación y compromiso social, busca no solo formar profesionales, sino forjar agentes de cambio capaces de transformar su entorno.
          Este capítulo es un testimonio de esa misión.`,
        } as PageContent,
        {
          type: "text",
          content: `<h1><strong>Transcripción Editada de la Entrevista</strong></h1>
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
          “La ciencia con sentido social no es un discurso, es una promesa”, concluyó el Dr. José Ramón Laines  Canepa.`,
        } as PageContent,
        {
          type: "chatbot",
          title: "Reflexiona con Nosotros",
          config: {
            persona:
              "You are a science explainer: clear, engaging, and practical.",
            instruction: `Enfócate en ¿Cómo puede una universidad pública convertirse en un motor de transformación social a través de la ciencia? 
Analiza los casos presentados por el rector de la UJAT y compáralos con experiencias similares en América Latina.
`,
          },
        } as PageContent,
        {
          type: "form",
          title: "Punto de Encuentro",
          fields: [
            {
              type: "text",
              id: "q1",
              label:
                "¿Cuál es el papel que tú, como estudiante, docente o ciudadano, puedes desempeñar para que la ciencia, creada en la UJAT, con sentido social transforme tu entorno?",
              multiline: true,
            },
          ],
        } as PageContent,
        {
          type: "audio",
          url: "/entrevista-1.mp3",
          htmlContent: `
  <p><strong>LOCUTOR:</strong> Bienvenidos, donde cada descubrimiento abre una puerta, cada idea
  inspira un cambio. Aquí, la ciencia no duerme. Se transforma. Creando conciencia, la
  ciencia que transforma</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Muy buenas tardes. Tengan todos ustedes.
  Estamos en el 96.1 de FM por Radio UJAT, la voz universitaria. Bienvenidos a "Creando
  Conciencia", el programa que te conecta con el fascinante mundo de la ciencia, la
  tecnología y el medio ambiente para construir un futuro más sustentable. Soy el doctor
  JOSÉ RAMÓN LAINES CANEPA y me acompaña en cabina.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Roberto Hernandez Barajas, buenas tardes,
  Ramón, muy buenas tardes a toda la audiencia de Radio UJAT.</p></br>

  <p><strong>JRLC:</strong> Gracias por estar con nosotros para que juntos
  conozcamos lo más relevante de la ciencia, pensar de manera crítica y actuar de forma
  consciente en el cuidado de nuestro planeta. Así que prepárate, recuerda puedes
  interactuar con nosotros a través de nuestras redes sociales y ser parte activa de esta
  comunidad de curiosos y apasionados por la ciencia.</p></br>

  <p>Iniciamos en "Creando Conciencia". El día de hoy, nuestro tema es “UJAT 2025:
  Transformando vidas y sociedad a través de la ciencia”. ¿Y qué creen? Tenemos invitado
  de lujo, súper lujo. Tenemos a la máxima autoridad de la Universidad Juárez Autónoma
  de Tabasco. Al licenciado Guillermo Narváez Osorio, quien es rector. Bienvenido,
  rector, buenas tardes, gracias por estar con nosotros.</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Buenas tardes, buenas tardes a ambos. Es un
  honor estar aquí con ustedes compartiendo.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Bien, vamos a empezar, le voy a comentar una
  breve reseña de nuestro invitado. Nos costó mucho trabajo hacerla, tiene un amplio
  currículum. El licenciado Guillermo Narváez Osorio fue electo para un segundo
  periodo como rector de la Universidad Juárez Autónoma de Tabasco el 22 de enero de
  2024, para ejercer el cargo hasta enero del año 2028, tras una primera gestión que
  comprendió desde enero de 2020 hasta enero de 2024. Cursó sus estudios
  profesionales en la UJAT y se tituló el 30 de enero de 1979. Posteriormente, completó
  cursos de capacitación, actualización y diplomados en materias como derecho
  notarial y derecho administrativo.</p></br>

  <p>Cuenta con una vasta experiencia laboral a lo largo de 4 décadas de ejercicio
  profesional. También ha sido profesor e investigador de tiempo completo en la escuela
  de derecho en nuestra alma máter y director de la División Académica de Ciencias
  Sociales y Humanidades. Como parte de su trayectoria y del servicio público, se ha
  desempeñado como procurador de la juventud. En CREA Tabasco, fue asesor jurídico
  de la Secretaría de Comunicaciones, Asentamientos y Obras Públicas y también
  director de administración del Instituto de Vivienda y Tabasco. De igual manera,
  ostentó el cargo de presidente municipal en su natal Comalcalco. Fue diputado local
  en la 54 Legislatura del Congreso del Estado de Tabasco y fue notario público número
  28 de 1995 a 2018. Asimismo, destaca su paso como magistrado presidente del
  Tribunal Superior de Justicia del Estado de Tabasco en el periodo 2002-2006 y fue
  secretario de educación en el estado de Tabasco en el año 2019.</p></br>

  <p>Le recuerdo el título del tema, “UJAT 2025: Transformando vidas y sociedad a través de
  la ciencia”. Rector, nuevamente, bienvenido, calentamos motores, vamos a empezar
  con este primer bloque y nos gustaría saber, rector, sabemos que la Universidad Juárez
  es la universidad más importante, una de las más importantes del sureste mexicano.
  ¿Cuáles son de sus principales retos que enfrenta la UJAT en este 2025 que estamos
  iniciando y que estamos muy agradecidos que esté con nosotros en este programa?
  ¿Qué retos enfrentamos para seguir siendo líder en investigación científica en la
  región?</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Bueno, yo creo que lo primero es consolidar
  parte de lo que se ha venido haciendo en los últimos años y a partir de esa
  consolidación, empujar este año y los años que quedan en la de los proyectos que
  tengan que ver con las áreas de producción, con las áreas que tengan que ver con el
  apoyo hacia el campo y la industria tabasqueña. Y fundamentalmente, todo a partir de
  la reactivación de nuestros principales laboratorios de investigación.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Bien, rector, en la universidad la razón de ser son
  los estudiantes. Eso se dice en todos los eventos, en muchos lados y usted ha
  considerado qué estrategias para que más estudiantes participen en programas, por
  ejemplo, en el verano de investigación científica. Ahora, y tenemos programas de
  mujeres, mujeres en la ciencia. ¿Qué estrategia está usted implementando?</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong>  Mira, yo creo que la difusión es muy importante
  de todos estos eventos que tú correctamente señalas, eh, para que los jóvenes vayan
  adquiriendo mayor experiencia y vayan conociendo otras visiones de otras
  universidades. No solamente del sureste o del país, sino a nivel Latinoamérica y a nivel
  mundial. Y eso la única manera que lo podrán lograr es a través de las estancias
  académicas, los intercambios, veranos, todo lo que buscamos es que ellos, difundir
  esto para que ellos puedan tener acceso a esta posibilidad de conocer nuevos campus
  y nuevas formas de investigar. Entonces, ese sería fundamentalmente el reto, que es el
  de difundir y la difusión, fundamentalmente, la estamos haciendo, eh, con el ejemplo.
  No hay mejor manera de poder enseñar, se puede enseñar con libros, textos, pero la
  mejor manera de enseñar es el ejemplo. Y para ello, pues estamos utilizando a todos
  aquellos jóvenes que han vivido esta experiencia y los estamos invitando a que
  compartan con sus propios compañeros todas las bondades de este tipo de
  experiencia y entonces los jóvenes digan, bueno, sí se puede, sí podemos hacerlo, sí
  tenemos el talento, sí tenemos la capacidad, sí tenemos los instrumentos para poder
  realizar este tipo de actividades.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Qué interesante entrevista estamos teniendo con
  nuestra máxima autoridad, el licenciado Guillermo Narváez Osorio. Pero tenemos que
  ir a un corte promocional y enseguida regresamos en "Creando Conciencia, la ciencia
  que transforma".</p></br>

  <p><strong>LOCUTOR:</strong> "Creando Conciencia". Un momento, regresamos. Continuamos con "La
  ciencia que transforma".</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Regresamos a "Creando Conciencia, la ciencia
  que transforma". A continuación, vamos a presentar una cápsula informativa que fue
  preparada por Kenia Leticia Utrera Cabrera.</p></br>

  <p><strong>KENIA LETICIA UTRERA CABRERA:</strong> ¿Cómo se transforma una universidad en un motor
  de cambio para la sociedad? Hoy en día, la Universidad Juárez Autónoma de Tabasco,
  UJAT, es un referente de excelencia académica, científica y social. Con la visión de su
  rector, el licenciado Guillermo Narváez Osorio, la UJAT continúa posicionándose como
  un líder en investigación científica, fomentando la ciencia y la educación para seguir
  transformando positivamente vidas y comunidades.</p></br>

  <p>La UJAT enfrenta grandes retos este año 2025, desde aumentar la participación en
  proyectos con impacto global hasta fomentar la equidad de género en programas
  como “Mujeres en la Ciencia”. De acuerdo con el rector, involucrar a los estudiantes en
  la investigación no solo enriquece su formación, sino que también crea soluciones
  reales para problemas locales y globales. Esto se refleja en los más de 200 alumnos
  que participaron en programas de intercambio en 2024, quienes regresaron con
  nuevas perspectivas y herramientas para contribuir al desarrollo de su comunidad. El
  compromiso de la UJAT no se limita a la formación académica, también busca generar
  investigaciones con sentido social. Ejemplo de ello son proyectos que abordan temas
  como el cambio climático, la salud pública y la economía circular, cuyos resultados ya
  han sido reconocidos internacionalmente en países como Japón, Brasil y Estados
  Unidos.</p></br>

  <p>Además, con el 60% de los investigadores del Sistema Estatal de Investigadores
  perteneciendo a la UJAT, la universidad reafirma su liderazgo en la región, demostrando
  que la ciencia no solo responde preguntas, sino que mejora la calidad de vida de las
  personas. La retención de talento es otro objetivo prioritario. Ofrecer oportunidades
  dentro de la UJAT, desde proyectos innovadores hasta infraestructura de vanguardia,
  es clave para evitar la fuga de cerebros y consolidar a la universidad como un espacio
  donde los jóvenes no solo estudian, sino que sueñan, crean y transforman.</p></br>

  <p>La UJAT no es solo un espacio de aprendizaje, es un motor de cambio para Tabasco y la
  región. Con cada estudiante que decide quedarse y construir un futuro mejor, con cada
  proyecto que trasciende fronteras, reafirmamos que la educación y la ciencia son
  pilares de transformación social. Sigamos creyendo en nuestra capacidad de cambiar
  el mundo desde nuestra universidad. Soy Kenia Utrera, le mando un saludo al rector y
  nos escuchamos en la próxima emisión.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Regresamos a "Creando Conciencia, la ciencia
  que transforma". Licenciado Narváez, es un tema muy importante para la sociedad el
  impacto social que tiene la ciencia que se desarrolla en la universidad. Al respecto, nos
  gustaría saber qué significa para usted y para la universidad generar investigaciones
  con sentido social y cómo esto beneficia a la comunidad.</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Claro, mira, eh, si partimos del hecho de que
  somos la máxima Casa de Estudios, si partimos del hecho de que somos generadores
  de conocimiento y partimos también del hecho de que, eh, traemos una serie de
  rezagos históricos en cuanto a la ciencia, en cuanto a la difusión de las ciencias, en
  cuanto a las tecnologías, pues es necesario que la universidad pueda salir de ese de
  ese claustro en el que ha estado durante muchos años.</p></br>

  <p>No digo, si bien o mal, eso ya es una evaluación que le corresponde a otras personas
  hacerla, no a nosotros, pero sí salir de estos claustros y poder aterrizar. Imagínate
  cuántos campesinos hay que podrían ver solucionados los problemas agropecuarios
  que enfrentan si nuestros investigadores pudieran poner su conocimiento al servicio
  de ellos. Imagínate cuántos pequeños emprendedores podrían, eh, ampliar sus
  campos de trabajo si nuestros investigadores ponen a disposición parte de lo que se
  hace. Y te doy 2 o 3 ejemplos sencillos. Eh, estamos trabajando con productores de
  chile tabaquero en la parte de Balancán. Eh, son productores de zonas agrícolas
  pobres en las que, y se resuelven sus problemas con sus propias armas, como dice el
  dicho popular, se rascan con sus propias uñas. Entonces, hay problemas de
  productividad.</p></br>

  <p>Hay problemas de fungosis o hay problemas de contaminación. Ellos acudieron con
  nosotros. Nosotros generamos un grupo de investigación. Se empezó a apoyarlos, se
  empezó desde la selección de la semilla y se logró que, en un año, el año pasado, su
  producción de chile pasara de 1 t/a a 2 t/ha. Pero si a eso le anexas que ellos tenían
  problemas porque es un producto perecedero y que el coyote lo que juega con esto
  para poder bajar los precios, porque dice, bueno, o me lo vendes o se echa a perder.
  Entonces, ¿qué hacen ellos? Ellos secan el chile, lo secan en secaderos rústicos. Hay
  una contaminación, ya es un producto que no puede competir en un mercado que
  tiene una serie de barreras de este carácter. Y bueno, pues ahí nosotros, lo que hicimos
  fue apoyarlos con el diseño, eh, por parte de ingeniería y arquitectura, con el diseño de
  secadores eléctricos y además si no hay electricidad en alguna zona, pues se
  diseñaron secadores con paneles solares.</p></br>

  <p>El otro que es el que tiene que ver ahora con lo que estamos haciendo con el
  laboratorio de producción de abeja reina. También lo atendimos, una demanda de la
  Asociación de Apicultores, quienes ellos nos señalaban de que tienen serios
  problemas para, eh, conseguir la abeja reina, porque no se aclimata, porque se muere,
  por muchas cosas. Vamos, empezamos a trabajar, independientemente de que no sé,
  ya no contamos con el laboratorio, ahora lo estamos construyendo. Pero se empezó a
  trabajar con la finalidad de encontrar una, un prototipo de abeja que fuera una línea
  que queríamos llamar UJAT con la finalidad de crear una abeja ya adaptada,
  tropicalizada y que sea de utilidad para los apicultores.</p></br>

  <p>Pues lo que nosotros hemos dicho desde un inicio es que la universidad tiene que
  recuperar su compromiso social. Qué significa el compromiso social, que somos una
  universidad pública que los recursos con los que se pagan los salarios de los maestros,
  con los que se pagan los salarios de los trabajadores de intendencia, administrativos,
  hasta el rector, provienen del erario estatal y federal. Y que, por lo tanto, tenemos el
  compromiso de devolverle a la sociedad eso que aporta vía impuestos, devolvérselos
  en conocimientos para que ellos puedan, eh, tener mejores posibilidades de
  desarrollo.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Y justo respecto, licenciado Narváez, ¿cómo
  podemos motivar que tanto estudiantes como profesores precisamente participen en
  el desarrollo de este tipo de proyectos encaminados a resolver problemas locales y
  globales?</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong>  Sí, ahí hay que, ahí, se tiene que trabajar mucho
  con crear sentidos de pertenencia, con crear, trabajar mucho en lo que se llama
  conciencia social, eh, que los, eh, los maestros entiendan exactamente cuál es el
  papel que les toca jugar, que si hoy somos profesionistas es porque existió una
  universidad, en muchos de los casos, en el 90% de los casos, una universidad pública
  que nos ayudó a formar, que nos ayudó a tener hoy las herramientas con que nos han
  permitido construir un nombre o un patrimonio, este, o una estabilidad laboral y que lo
  mínimo que podemos hacer es ser agradecidos y tratar de apoyar a estas, eh,
  universidades para que puedan realizar esa labor de carácter social.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Le agradecemos mucho sus respuestas,
  licenciado Narváez, por cuestiones de tiempo, bueno, tenemos que ir a un corte
  promocional y enseguida regresamos a "Creando Conciencia".</p></br>

  <p><strong>LOCUTOR 1:</strong> "Creando Conciencia". Un momento, regresamos. Continuamos con "La
  ciencia que transforma".</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Regresamos a "Creando Conciencia, la ciencia
  que transforma" y bien, ¿qué plática tan interesante estamos teniendo con el rector de
  la universidad Juárez Autónoma de Tabasco? Hemos observado que usted ha, se ha
  comprometido inclusive públicamente a fomentar el talento joven y en el 2024, pues
  hubo cerca de 200 alumnos que participaron en programas de intercambio académico.
  Rector, ¿qué impacto tiene esto en la vida de los estudiantes y en la universidad?
  ¿Podría platicarnos al respecto?</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Sí, claro. Imagínate jóvenes que están llenos de
  emociones, de sentimientos, llenos de esperanzas y que de pronto tienen la
  oportunidad de poder conocer otros ambientes, de poder estar en universidades muy
  importantes, con un prestigio internacional, pues eso les cambia la visión que tienen
  respecto de la ciencia y respecto de lo que ellos son dentro de la universidad. Y yo estoy
  convencido de que todos estos jóvenes que han tenido la oportunidad, ya sea por
  intercambio o porque se lo han ganado, y que tienen la oportunidad de acudir a otras
  universidades, pues entonces que regresen y regresan con esa visión distinta, nueva,
  fresca, en la que dejan de ser simples actores de reparto y se convierten en actores
  principales de su de su universidad, se convierten en verdaderos agentes de cambio.
  Entonces eso es lo que buscamos realmente, que nuestros jóvenes, eh, puedan tener
  una participación y una formación más solidaria y comprometida.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Qué interesante, eh, rector, de estos actores
  importantes que están interactuando en el devenir de la universidad, pues, eh, van a
  terminar sus carreras, van a terminar su licenciatura, su maestría, su doctorado. Y,
  pues hay necesidades de detener esos talentos y ofrecer oportunidades para que sigan
  creciendo en la universidad. ¿Ha considerado esto, rector, y nos podría platicar si ha
  pensado en algunas acciones para evitar lo que siempre se dice, la fuga de talento? El
  talento se va cuando usted ha dicho aquí en las preguntas anteriores. Necesitamos
  que la sociedad de Tabasco sienta eso que se está formando ahí en UJAT y lo que le
  está devolviendo al estado, lo que el estado nos ha dado.</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Sí, mira. Uno de los graves problemas de los
  países subdesarrollados es la fuga de talento. ¿Por qué los talentos se van? Porque los
  países desarrollados les ofrecen mejores expectativas de desarrollo profesional,
  mejores posibilidades de construir un patrimonio o de poder ir ascendiendo en la
  cadena o en la escalera de laboral y entonces ellos deciden, este, marcharse de sus
  países. Y también no podíamos nosotros ser egoístas de decirle a los jóvenes, "te
  tienes que quedar a la fuerza, tienes que devolver", no. Porque no le podemos cortar
  las alas a los pájaros, hay que dejarlos que vuelen. Lo que hay que hacer es irles
  creando un sentido de pertenencia, un sentido de conciencia social para que ellos
  digan, "bueno, yo creo que tengo que devolver un poco de lo mucho que he recibido y
  me quedo un tiempo, no para toda la vida, pero me quedo un tiempo con la finalidad
  de poder impactar en la vida de otros jóvenes". Pero sí, es muy difícil, no es un
  problema, no es un problema que sea propio de la de la Universidad Juárez Autónoma
  de Tabasco. Es un problema que impacta a la sociedad tabasqueña en todo su mundo.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Qué interesante entrevista estamos llevando.
  Pero tenemos que ir a un corte promocional y enseguida regresamos a "Creando
  Conciencia, la ciencia que transforma".</p></br>

  <p><strong>LOCUTOR:</strong> "Creando Conciencia". Un momento, regresamos. Continuamos con "La
  ciencia que transforma".</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Regresamos a "Creando Conciencia, la ciencia
  que transforma" y bien, qué plática tan interesante estamos teniendo, conociendo, eh,
  de viva voz del rector, cómo ve la investigación, cómo ve el crecimiento de la ciencia en
  la universidad y bueno, también sabemos la Universidad Juárez Autónoma de Tabasco
  es líder en investigación y tiene muchos profesores en el Sistema Nacional de
  Investigadores. Por ejemplo, tenemos el más de 60% de los miembros del Sistema
  Estatal de Investigadores pertenece a la UJAT. ¿Cómo es que se mantiene esta
  excelencia científica en la universidad?</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Yo creo que ese es un mérito de los maestros.
  Es un mérito de todos y cada uno de ellos, quienes se preocupan por su formación, por
  su preparación para estar dentro de este, eh, padrón estatal de investigadores. Y
  nosotros lo que hacemos simplemente es tratar de acercarles las herramientas que
  ellos necesiten para que puedan traducirse eso en investigaciones, en artículos
  científicos, elementos que les permitan a ellos poder no solamente pertenecer al
  sistema, sino lo más importante, mantenerse ya dentro de él. Entonces, yo creo que es
  un mérito que les corresponde a todos y cada uno de los maestros de esta Universidad
  Juárez Autónoma de Tabasco.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Y justamente, eh, licenciado Narváez, en lo
  pasado nos comentaba que hay 2 proyectos como ejemplo, 2 proyectos. Uno que tiene
  que ver con productores de chile y otro proyecto relacionado con la Asociación de
  Apicultores, que son los que están resolviendo problemas locales. Pero debe haber
  más proyectos que en la actualidad se estén desarrollando en la universidad y que
  tienen ese potencial de obtener un reconocimiento no solamente local, sino también
  internacional, como el caso de Brasil, Harvard, Japón.</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Sí, claro. Bueno, tenemos jóvenes que son
  estandartes de la de la universidad. Durante el año pasado, en el caso de Brasil, es
  este, el profesor Beto, junto con una de sus estudiantes, que obtuvo, ganó el pase
  nacional al evento latinoamericano que se hizo en Recife en Brasil con un proyecto de
  investigación denominado “Mapa háptico”, en el cual al momento de obtener su pase,
  pues él sabía que tenía que enfrentarse con otras investigaciones de alto nivel y logró
  hacer una sinergia con investigadores de ingeniería y arquitectura, quienes lo
  apoyaron, lo asesoraron y entonces él pudo estar en este evento de Recife con un
  mayor bagaje y obtuvo allí no solamente el primer lugar, sino el reconocimiento al
  proyecto con mayor impacto social que le permitió obtener el pase a un evento a nivel
  mundial ahora a celebrarse en los meses, creo que de marzo o de abril en España.</p></br>

  <p>Pero también, bueno, pues está el caso, si bien no es de Harvard, los alumnos aquí del
  maestro y que lograron obtener también en el en el concurso de Enactus México,
  obtener su pase y obtener un reconocimiento que les permitía tener una pequeña
  estancia, al maestro Canepa y a sus 4 alumnas en la Universidad de Harvard y en la de
  MIT, entonces, bueno, pues ahí también es importante, porque tuvieron ellos la
  oportunidad de conocer estas, que son de las 2:00 universidades más prestigiosas a
  nivel mundial en lo que es la formación de emprendedores. Entonces, este, bueno, eso
  fue un hecho muy importante, el que ellos hayan logrado obtener su pase a través del
  proyecto que están trabajando, que bueno, pues el maestro Canepa, lo podría describir
  mejor que yo, que es que tiene que ver con la producción de tablas plásticas a partir
  de, eh, de plástico del reciclado, no. Entonces, bueno, ese es un proyecto que incluso
  nosotros, y él sabe, estamos este año, empujando para que se deje de ser un proyecto
  de un grupo de estudiantes y maestros, y convertirlo ya en un proyecto productivo en
  donde se pueda trabajar ya en la elaboración de tablas y otros productos a partir del
  plástico reciclado.</p></br>

  <p>Y el otro tiene que ver con un evento convocado por las NUIES, eh, en el que se
  convocaron a todas las universidades, las que quisieran participar, participaron, creo
  que 30, 30 y tantas universidades, más de 60 alumnos con pequeños proyectos, de ahí
  se escogieron 25, que fueron concentrados en Valle de Bravo y de ahí salieron 20
  jóvenes, que estuvieron en una estancia de 3 meses por una empresa japonesa de
  tecnología, Mira, eh, en precisamente en Japón. En ese evento, en la primera fase de
  preselección, diríamos, en donde participaron todos, más de 60 y se quedaron 25.
  Pues la UJAT fue la única universidad que obtuvo 2 proyectos, 2 proyectos aceptados y
  de esos 2 proyectos, uno que se aceptó es un joven de la División Académica de
  Tecnología de la Información y eh, hizo la estancia en Japón y no solamente hizo la
  estancia, sino que al final en la evaluación de productos, él obtuvo el reconocimiento
  al premio o al proyecto con mayor impacto social. Nosotros hemos platicado con él,
  con su director y vamos a tratar de poder llevarlo al campo de los hechos, pues,
  convertirlo ya en un proyecto productivo.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Es muy interesante ver que la investigación que
  se realiza en la universidad no solamente es reconocida con premios internacionales,
  sino que ahora, como él ha comentado, se van a convertir en ya no proyectos de
  investigación, ya no proyectos escolares, sino que llegarán a ser, eh, proyectos
  productivos.</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Sí, esa es la finalidad, pues, porque también no
  queremos quedarnos en la simple teoría, sino que lo que los muchachos hacen
  puedan ellos verlo concretado en proyectos productivos.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Le agradezco mucho la respuesta, señor
  rector, vamos a un corte promocional y enseguida regresamos a "Creando Conciencia".</p></br>

  <p><strong>LOCUTOR:</strong> "Creando Conciencia". Un momento, regresamos. Continuamos con "La
  ciencia que transforma".</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Regresamos a "Creando Conciencia, la ciencia
  que transforma". A continuación, vamos a escuchar "Vox Populi", la voz del pueblo,
  preparada por el doctor José Aurelio Sosa Olivia.</p></br>

  <p><strong>JOSÉ AURELIO SOSA OLIVIA:</strong> En más de 66 años de antigüedad, ha sido un motor de
  desarrollo de la sociedad tabasqueña, tanto por su oferta educativa a nivel de
  licenciaturas y posgrados, en servicios educativos profesionales como cursos de
  idiomas, deportivos, culturales, odontológicos, entre otros. El nivel de los
  investigadores e investigaciones ha permeado en ser orientadores en el estudio de
  diversas problemáticas ambientales, agronómicas, sociales, económicas y de salud
  en la región. El impacto que han tenido algunos estudiantes y egresados en el
  desarrollo de investigaciones básicas y aplicadas, tanto en instituciones de gran
  prestigio a nivel internacional como nacional, al igual de la inserción laboral en
  diversos sectores económicos de la región por parte de nuestros egresados. ¿Algún
  familiar o conocido tuyo ha estudiado en la UJAT? De ser así, ¿cuál es tu percepción
  sobre la universidad?</p></br>

  <p><strong>ENTREVISTADO 1:</strong> Sí, tengo conocidos y ha dado sus referencias, que es una buena
  universidad. Se cuenta con buenas instalaciones, buena educación. Sí, ha sido muy
  diferente a otras.</p></br>

  <p><strong>ENTREVISTADO 2:</strong> Tengo muchos conocidos y familiares, los cuales han formado parte
  de esta Casa de Estudios. Sin embargo, los más importantes e influyentes para mí son
  mis padres, ya que no solamente fueron influyentes en el proceso de convertirse en
  profesionales, sino que durante su trayectoria académica conocieron personas que
  fueron muy importantes en su vida.</p></br>

  <p><strong>ENTREVISTADO 3:</strong> Sí, conozco personas que han estudiado allá en la universidad. Es
  una buena universidad, las personas que he conocido, pues, no todas, pero tienen.</p></br>

  <p><strong>JOSÉ AURELIO SOSA OLIVIA:</strong> Abajo, ¿conoces a alguien o has participado en alguna
  de las actividades académicas o profesionales que ofrece la UJAT?</p></br>

  <p><strong>ENTREVISTADO 2:</strong> Gracias a las oportunidades que ofrece la Universidad Juárez
  Autónoma de Tabasco, pude estudiar 4 años el libro en inglés. Pude certificarme de
  manera profesional con un curso que es avalado de manera internacional, así como
  pude estudiar algunos otros idiomas y yo me siento muy contento por haber podido
  tener esa oportunidad.</p></br>

  <p><strong>ENTREVISTADO 3:</strong> Sí, de hecho, tengo un sobrino que estudia inglés y va muy bien. Él
  va nada más una vez a la semana y pues le ha ido bien en inglés, ha avanzado y pues
  son buenos maestros, sí.</p></br>

  <p><strong>ENTREVISTADO 4:</strong> De hecho, yo estudié un tiempo los sábados en escuelas de
  dirigidos por la Universidad de.</p></br>

  <p><strong>JOSÉ AURELIO SOSA OLIVIA:</strong> ¿Qué importancia consideras que tiene la UJAT en el
  desarrollo de Tabasco?</p></br>

  <p><strong>ENTREVISTADO 1:</strong> Ok, en base a varias impresiones que hacen y ha ayudado mucho
  en todo el estado. Por ejemplo, cuando son temas de los cocodrilos que son a nivel de
  todo el estado, son muy.</p></br>

  <p><strong>ENTREVISTADO 3:</strong> Pues es muy importante, porque pues luego hay gente que se va
  afuera a trabajar y pues dicen dónde estudiaron. Y pues que son de Tabasco. He visto
  en la tele que luego hay tabasqueños trabajando, haciendo cosas importantes en otros
  estados y dicen que estudiaron ahí en.</p></br>

  <p><strong>ENTREVISTADO 2:</strong> Yo considero que la universidad Juárez Autónoma de Tabasco tiene
  un impacto muy importante a nivel social, ya que no solamente crea profesionales,
  sino crea los líderes que forman parte de este entorno social, cultural e incluso a nivel
  político, que tiene el estado de Tabasco.</p></br>

  <p><strong>ENTREVISTADO 4:</strong> Promover un mejor futuro para las demás generaciones.</p></br>

  <p><strong>JOSÉ AURELIO SOSA OLIVIA:</strong> ¿Conoces el lema de la UJAT?</p></br>

  <p><strong>ENTREVISTADO 2:</strong> “En la duda, acciona, en la fe”.</p></br>

  <p><strong>ENTREVISTADO 3:</strong> Así como no, es ese de “Estudio en la duda, acción en la fe”.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> Regresamos a "Creando Conciencia, la ciencia
  que transforma". Señor rector, eh, es muy importante, eh, saber que usted puede emitir
  como mensaje para los estudiantes, los profesores e investigadores, eh, que permita
  inspirarlos o motivarlos a construir dentro de la universidad, investigación de alta
  calidad para este nuevo año 2025 y para el futuro.</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Sí, gracias. Mira, yo soy un convencido de que
  tenemos talento y muy buen talento. No solamente el sector académico con nuestros
  investigadores, con docentes que han obtenido reconocimientos nacionales e
  internacionales. Te podría decir, por ejemplo, el que lo obtuvo, eh, el maestro Bernal,
  que es de la División de Ciencias Básicas en donde en Honduras, participó con un
  proyecto con uno de sus asesorados, en donde compitió, pues casi nada, con puros
  premios. Este, Nobel de física y él obtuvo allí un reconocimiento. El maestro Arroyo es
  una gente muy comprometida, muy identificada, tiene alumnos que hoy están en la
  NASA trabajando, entonces digo, hay el talento. Hay el talento de nuestros maestros,
  hay también el talento de los jóvenes. Lo que tenemos que hacer es lograr esa empatía,
  esa simbiosis y nosotros como, eh, autoridades administrativas de la universidad, eh,
  poder contar con espacios en donde se pueda hacer la investigación. Y muchas veces
  está el talento del joven, está el talento del maestro, pero no hay espacios, los
  laboratorios no funcionan, el equipo no funciona, eh, no hay medios de transporte. En
  fin, hay una serie de obstáculos en los que muchas veces puede quedar a un lado un
  gran proyecto y no concretarse, porque alguien no hizo bien la parte de la chamba que
  le correspondía. Y en este caso, a nosotros, que es la de evaluar los proyectos y
  aquellos proyectos que tienen un impacto, pues poderlos llevar ya al campo y aterrizar
  al campo de los hechos. Porque esto es muy importante y de nada sirve que estemos
  incentivando a los jóvenes para que creen proyectos, proyectos de investigación, si al
  final de la jornada esto va a quedar solamente en un bonito proyecto que, a lo mejor
  compitió en algún lado y que tiene un gran potencial y que nosotros no fuimos capaces
  de hacer un esfuerzo por materializar ese proyecto. Ahora lo que yo quiero en estos
  años que nos quedan es que todos aquellos jóvenes y maestros que tengan un
  proyecto, que tengan algo que consideren que aporta a la sociedad tabasqueña, que
  vayan, que vengan aquí a la rectoría y platiquemos con ellos. Evaluemos sus proyectos
  y que, si sus proyectos son viables, los vamos a empujar, que no tengan temor de decir,
  "es que mi proyecto es pequeñito, tiene un nombre muy sencillo y entonces no me van
  a apoyar". No, preséntenlos, los evaluaremos con el mismo rigor que evaluamos a un
  gran proyecto. Evaluaremos estos pequeños proyectos con la misma visión, con la
  misma intención y vamos a tratar de, eh, apoyarlos para convertirlos en una realidad
  concreta y estos 3 años son los años en los que queremos consolidar todos nuestros
  proyectos.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong>  Bien, qué interesante. Ya estamos terminando,
  eh, pero tenemos que ir a un corte promocional y enseguida regresamos con "Creando
  Conciencia, la ciencia que transforma".</p></br>

  <p><strong>LOCUTOR:</strong> "Creando Conciencia". Un momento, regresamos. Continuamos con "La
  ciencia que transforma".</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Regresamos al cierre de "Creando Conciencia, la
  ciencia que transforma" y qué interesante plática, qué motivadora, plática, qué
  esperanzadora entrevista para todos los que están haciendo investigación en la
  Universidad Juárez Autónoma de Tabasco. Cuando digo todos me refiero a profesores,
  investigadores, estudiantes, directivos, todos, porque lo que nos está diciendo el
  rector es que hay oportunidad para todos. Bien, rector, ya, eh, vamos a cerrar. Nos
  gustaría escuchar un último comentario, y ya nos habló usted sobre crear conciencia,
  ¿verdad?, en la comunidad universitaria. Ahora, qué mensaje, sabemos que usted va a
  rendir su informe pronto, qué mensaje usted le envía a la sociedad sobre la importancia
  de utilizar la ciencia para transformar vidas y transformar al mundo.</p></br>

  <p><strong>RECTOR LIC. NARVAEZ:</strong> Mira, nada más un pequeño dato adicional de
  un proyecto interesante. Yo alguna, hace mucho, hace algún tiempo, fui a al municipio
  de Balancán, específicamente, al río San Pedro, porque firmamos el Balancán. Porque
  firmamos ahí un convenio sobre los manglares del del proyecto que está haciendo el
  maestro Burelo con una empresa petrolera que nos aportó recursos. Y estando en el
  río San Pedro, alguien, alguno de los maestros me dijo, "oiga, aquí hay un criadero o no
  sé cómo le llamen de perlas en telas cultivadas en aguas semi saladas o dulces". Me
  llamó la atención, incluso uno de los de los guías se tiró, buceó y sacó una ostra con
  una perla ya cultivada, muy grande, bonita y me dijeron que ese proyecto lo habían
  dejado ahí abandonado. Tenía como un año, por la inseguridad, porque mucha gente
  pensó que ese era un gran negocio y amenazaron a los maestros. Pero quiero decirte
  que lo platicamos con el doctor Wilfrido, el secretario de Investigación y Posgrado y él
  me daba una noticia muy, muy alentadora, hace como una semana o 10 días, de que
  creo que ENI, la empresa ENI, si mal no recuerdo, ENI o CREAN, no sé, una de las
  empresas con las que trabajamos, le gustó el proyecto y va a aportar, no sé cuántos
  dólares, pero sí es casi 2 millones de pesos para poder llevar a cabo, eh, de manera
  integral, este proyecto de cultivo de perlas y que puedan trabajar las señoras, las
  mujeres de esta zona, de esta zona, este, de Balancán.</p></br>

  <p>Eh, así como estos hay muchos proyectos. Entonces, yo creo que tenemos que
  despertar en la sociedad, o transmitirle a la sociedad de que cuenta con una
  universidad y con investigadores que les pueden ayudar a resolver sus problemas y que
  están realmente todos los días, haciendo ciencia para poder contribuir a que ellos
  puedan desarrollarse como emprendedores. Esa es una gran satisfacción que
  nosotros tenemos y efectivamente el próximo jueves, 23 de enero, a las 6:00 de la
  tarde, estaremos rindiendo el primer informe de este segundo periodo, técnicamente
  es el quinto informe, no, porque si le hicimos 4 anteriores, es el primero de estos
  últimos 4 años, eh, en donde informaremos el Consejo Universitario y a toda la
  comunidad universitaria, lo que hemos hecho a lo largo de enero del 2024 a enero del
  2025. Están todos los invitados y ahí puedan poder escuchar con un poquito de mayor
  detenimiento y especificación algunos de los proyectos de los que aquí hemos estado
  hablando. Incluso hay un gran proyecto que iniciamos ahora y que en 4 meses tenemos
  que inaugurar, es el Centro Universitario de Biotecnología de Reproducción Bovina, el
  famoso CUBRE, un gran centro que estamos seguros de que en muy poco tiempo podrá
  aportar a el cambio de pie genético de en la calidad del ganado tabasqueño. Y también
  vamos, estábamos trabajando ya en 4 meses, debemos de aperturar en el Centro, en
  la Casa Universitaria del Agua, en donde vamos a generar también una conciencia de
  lo que es el agua, de lo que es el cambio climático y de la importancia de preservar este
  bien que, si no lo hacemos, nos vamos a arrepentir. Quizás ya no nosotros, pero las
  generaciones que nos van a suceder, les vamos a dejar un terrible dilema, que es en la
  importancia del agua.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Qué interesante. Quisiéramos seguir platicando,
  pero sabemos que el rector, su tiempo está bastante. Que es corto, no para nosotros
  dimos comentarios muy rápido porque nos estamos yendo.</p></br>

  <p><strong>DR. ROBERTO HERNANDEZ BARAJAS:</strong> No, pues me ha interesado mucho el mensaje
  del señor rector, referente a que la apertura que tiene su administración para apoyar a
  profesores y estudiantes que sus proyectos no se queden ahí en el olvido, sino que se
  conviertan en proyectos productivos.</p></br>

  <p><strong>DR. JOSÉ RAMÓN LAINES CANEPA:</strong> Bien, como todos los miércoles, hoy reafirmamos
  que la Universidad Juárez Autónoma de Tabasco no solo forma profesionales, sino
  también agentes de cambio que transforman vidas y comunidades. Con cada
  proyecto, con cada joven que decide quedarse y construir aquí su futuro, estamos
  forjando una universidad que inspira y una sociedad que progresa. La ciencia con
  sentido social no es solo un objetivo, es nuestra promesa para un mañana mejor.
  Sigamos creyendo, creando y transformando juntos, el futuro de la UJAT es el futuro de
  todos. Se despide de ustedes JOSÉ RAMÓN LAINES CANEPA, Roberto Barajas. Guillermo
  Narváez, agradeciendo a la Dirección General de Comunicación Social, a la
  Universidad Juárez Autónoma de Tabasco, a nuestra productora, al licenciado Jayara y
  a todos los que nos escuchan cada miércoles. Muchas gracias por estar con nosotros
  en "Creando Conciencia", hasta la próxima.</p></br>

  <p><strong>LOCUTOR:</strong> "Creando Conciencia, la ciencia que transforma". Es una producción de
  Radio UJAT, la voz universitaria. “Legado UJAT, estudio en la duda, acción en la fe”.</p></br>`,
        } as PageContent,
        {
          type: "text",
          content: `<h1><strong>Mirada desde la Ciencia</strong></h1>
          <h3>Por el o los entrevistados (síntesis ensayística de los puntos clave del programa)</h3>
          El episodio “UJAT 2025: Transformando vidas y sociedad a través de la ciencia” plantea una tesis central: la ciencia universitaria adquiere su máximo sentido cuando deja de ser un ejercicio encerrado en laboratorios y se convierte en un bien público orientado a resolver problemas concretos del territorio. Desde esta perspectiva, la Universidad Juárez Autónoma de Tabasco es presentada como una institución con doble responsabilidad: generar conocimiento y devolver a la sociedad, de manera tangible, lo que recibe del erario.
Un primer eje del diálogo es la consolidación. El Rector subraya que 2025 no debe ser un año de improvisación, sino de continuidad estratégica: consolidar lo avanzado, reactivar laboratorios y priorizar proyectos vinculados con producción, campo e industria tabasqueña. Esta idea es relevante porque reconoce que la ciencia no solo depende del talento académico, sino también de condiciones habilitantes: infraestructura operativa, equipamiento funcional, logística y evaluación institucional que permita pasar de resultados a impacto.
Un segundo eje es la formación científica temprana y la movilidad como detonadores de cambio. Se argumenta que programas como veranos científicos, intercambios y estancias transforman la identidad del estudiante: dejan de “ser actores de reparto” para asumir un rol protagónico como agentes de cambio. La estrategia clave para ampliar la participación no se reduce a convocatorias, sino a la difusión con el ejemplo: que quienes ya vivieron la experiencia inspiren a otros mostrando que “sí se puede”. Se propone, en suma, una pedagogía de la aspiración sustentada en evidencia vivida.
El tercer eje, quizá el más estructurante, es la noción de investigación con sentido social. El Rector sostiene que la universidad debe salir del “claustro” y aterrizar el conocimiento en los sectores que más lo necesitan. Los ejemplos ofrecidos son ilustrativos de una ciencia aplicada con enfoque de cadena de valor: en el caso de productores de chile, la intervención universitaria no solo mejora productividad, también atiende el problema de poscosecha mediante diseño de secadores eléctricos y solares, reduciendo pérdidas y riesgos de contaminación. De manera paralela, el proyecto de producción de abeja reina busca resolver la dependencia tecnológica y la falta de adaptación al entorno tropical. Ambos casos muestran un patrón: diagnóstico del problema, diseño de solución interdisciplinaria y acompañamiento para crear capacidades locales.
Un cuarto eje es la motivación y el sentido de pertenencia como política institucional. Se reconoce que no basta con exhortar a participar; se requiere construir conciencia social en estudiantes y profesores, recordando que la universidad pública habilita trayectorias profesionales y, por tanto, implica una ética de reciprocidad. En esta misma línea, la “fuga de talento” es tratada con madurez: no se puede forzar la permanencia, pero sí se puede generar pertenencia y proyectos de vida que vinculen el desarrollo individual con la transformación del entorno.
El quinto eje es el reconocimiento y la escalabilidad. Se mencionan logros internacionales (eventos en Brasil, estancias, reconocimientos a impacto social) no como trofeos, sino como evidencia de que la calidad científica puede traducirse en reputación y redes. Sin embargo, la reflexión más importante no es el premio, sino el paso siguiente: convertir proyectos “escolares” o “de concurso” en proyectos productivos. Aquí aparece una exigencia institucional: la administración debe crear mecanismos para evaluar viabilidad, asignar apoyos y acompañar la implementación, evitando que buenas ideas se queden en el papel por falta de “espacios, laboratorios, equipos o transporte”.
Finalmente, el episodio cierra con un horizonte de futuro que integra ciencia, territorio y sostenibilidad: proyectos como el cultivo de perlas con enfoque comunitario, el Centro Universitario de Biotecnología de Reproducción Bovina (CUBRE) y la Casa Universitaria del Agua se presentan como apuestas por infraestructura estratégica y, sobre todo, por una cultura científica que entiende el cambio climático y la gestión del agua como prioridades intergeneracionales. La idea final es contundente: la ciencia universitaria debe ser una herramienta para transformar vidas, no solo para producir documentos; y esa transformación ocurre cuando se enlazan talento, infraestructura, ética pública y compromiso social.
En conjunto, este capítulo radiofónico sostiene que “crear conciencia” no es una frase retórica: es un programa de acción que demanda universidades abiertas, ciencia con pertinencia local y una comunidad académica capaz de convertir conocimiento en bienestar social.`,
        } as PageContent,
      ],
    },
    // {
    //   title: "Mujeres en la Ciencia",
    //   pages: [
    //     {
    //       type: "cover",
    //       title: "Mujeres en la Ciencia"
    //     } as PageContent,
    //     {
    //       type: "biography",
    //       authorName: "Mujeres Científicas de la UJAT",
    //       content: `
    //         <p>El programa <strong>"Mujeres en la Ciencia"</strong> de la Universidad Juárez Autónoma de Tabasco representa un esfuerzo institucional por visibilizar, impulsar y celebrar la participación femenina en las áreas STEM (Ciencia, Tecnología, Ingeniería y Matemáticas). A través de este programa, la UJAT reconoce las contribuciones de investigadoras, docentes y estudiantes que día a día rompen estereotipos y abren caminos en campos tradicionalmente masculinizados.</p>

    //         <p>Las mujeres científicas de la UJAT provienen de diversas disciplinas: desde la biotecnología hasta la ingeniería ambiental, pasando por las ciencias sociales y la innovación tecnológica. Muchas de ellas compaginan la investigación de alto nivel con la docencia, la divulgación científica y el compromiso social, siendo modelos a seguir para las nuevas generaciones.</p>

    //         <p>Este capítulo está dedicado a ellas: a su perseverancia, a su talento, a su capacidad de transformar la ciencia en acción concreta para el bienestar de la sociedad. Son mujeres que investigan sobre cambio climático, conservación de ecosistemas, desarrollo de tecnologías sostenibles, educación inclusiva y salud pública. Son líderes que inspiran y forman a las futuras científicas de México.</p>

    //         <p>El programa no solo busca aumentar la representación femenina en la ciencia, sino también crear redes de apoyo, mentoría y colaboración que permitan a las mujeres desarrollar todo su potencial. A través de conferencias, talleres, estancias de investigación y reconocimientos, la UJAT reafirma su compromiso con la equidad de género en el ámbito científico.</p>

    //         <p>Estas mujeres son la prueba viva de que la ciencia no tiene género, solo pasión, rigor y creatividad. Su legado es la inspiración para que más niñas y jóvenes se atrevan a soñar con carreras científicas y a construir un futuro donde la igualdad sea una realidad tangible.</p>
    //       `
    //     } as PageContent,
    //     {
    //       type: "text",
    //       content: `El programa "Mujeres en la Ciencia" de la UJAT fomenta la participación femenina en áreas STEM. Este capítulo narra historias de éxito y los retos que enfrentan las mujeres científicas en la universidad.`
    //     } as PageContent,
    //     {
    //       type: "chatbot",
    //       config: {
    //         persona: "You are an inspiring mentor: supportive, insightful, and empowering.",
    //         instruction: `Focus on Chapter 3: ¿Por qué es importante la inclusión de mujeres en la ciencia? ¿Qué desafíos y logros se destacan en el programa de la UJAT?`
    //       }
    //     } as PageContent,
    //     {
    //       type: "form",
    //       fields: [
    //         { type: "text", id: "q1", label: "¿Qué historia te inspiró más?", multiline: true },
    //         { type: "number", id: "q2", label: "¿Cuántas mujeres científicas conoces en tu entorno?", min: 0, max: 100 },
    //         { type: "text", id: "q3", label: "¿Cómo puede la UJAT apoyar más a las mujeres en STEM?", multiline: true },
    //       ]
    //     } as PageContent,
    //   ],
    // },
  ],
};
