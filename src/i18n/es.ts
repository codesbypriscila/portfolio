import type { Dictionary } from "./en";

/** Every piece of text on the site, in Spanish. Same shape as `en.ts`. */
export const es: Dictionary = {
  meta: {
    htmlLang: "es",
  },
  nav: {
    main: "Principal",
    language: "Idioma",
    contact: "Contacto",
    links: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      experience: "Experiencia",
      education: "Educación",
    },
  },
  portfolio: {
    label: "Lo que hay en mi portafolio",
    script: "Esto es",
    title: "Mi Portafolio",
    hint: "Haz clic para abrir",
    open: "Abrir el portafolio",
    close: "Cerrar el portafolio",
    sections: "Secciones del portafolio",
    items: {
      about: "Sobre mí",
      projects: "Proyectos",
      experience: "Experiencia",
      education: "Educación",
      cv: "Descargar CV",
      socials: "Redes",
      contact: "Contáctame",
    },
    cv: {
      script: "Descarga",
      title: "mi CV",
      question: "¿En qué idioma lo quieres? Las dos versiones tienen el mismo contenido.",
      format: "PDF · 1 página",
      close: "Cerrar",
      languages: { es: "Español", en: "Inglés" },
    },
  },
  about: {
    label: "Sobre mí",
    script: "Aquí van",
    title: "Cosas Sobre Mí",
    cover: "Portada",
    openBook: "Abrir el libro",
    closeBook: "Cerrar el libro",
    previous: "Páginas anteriores",
    next: "Páginas siguientes",
    bookRole: "libro",
    bookLabel: "Libro sobre mí. Arrastra una página, haz clic a un lado o usa las flechas del teclado para pasarla.",
    intro: {
      photoAlt: "Priscila Pérez",
      caption: "esa soy yo",
      hello: "Hola, soy",
      age: "21 años",
      bio: "Me encanta crear cosas, desde dibujitos en mi cuaderno hasta los sitios web que construyo. Casi siempre me vas a encontrar dibujando, leyendo un buen libro o pasando tiempo con mis amigos. En el trabajo creo aplicaciones web, y lo que más disfruto son los detalles: colores cálidos, animaciones suaves y cosas que se sienten hechas a mano.",
    },
    inspiration: {
      script: "Dónde encuentro",
      title: "mis ideas",
      videos:
        "Tanto para el frontend como para el backend, lo primero que hago es buscar videos. Ver cómo otros desarrolladores piensan un problema me ayuda a encontrar mi propia forma de resolverlo, y ahí nacen la mayoría de mis ideas.",
      intro: "Cuando diseño una interfaz, estos son los lugares donde busco inspiración:",
      sources: [
        { name: "Pinterest", description: "Moodboards, colores y diseños que me llaman la atención." },
        { name: "Canva", description: "Para jugar con tipografías, paletas y mockups rápidos." },
        { name: "HeroUI", description: "Componentes limpios y pequeños detalles de los que aprender." },
      ],
      note: "guarda, pinea,\ncrea",
    },
    anime: {
      script: "Y por supuesto,",
      title: "el anime",
      text: "Cuando quiero tomarme un descanso, pongo algo de anime, y Naruto siempre será mi favorito. Me encantan sus personajes, su historia y su estilo de dibujo, que también inspira muchos de mis dibujos.",
      thanks: "gracias por leer :)",
      teamAlt: "Naruto, Kakashi y Sakura corriendo por el bosque",
    },
  },
  projects: {
    label: "Proyectos destacados",
    script: "Estos son",
    title: "Mis Proyectos",
    carousel: "Proyectos",
    carouselRole: "carrusel",
    previous: "Proyecto anterior",
    next: "Proyecto siguiente",
    autoplay: "Giro automático · 5 s",
    pause: "Pausar el giro automático",
    play: "Reanudar el giro automático",
    repository: "Ver repositorio",
    demo: "Ver demo",
    descriptions: {
      izumi:
        "Landing page premium para un restaurante omakase ficticio: un libro de menú interactivo con un efecto 3D de pasar página hecho a medida, animaciones cinematográficas y un sitio bilingüe EN/ES. Sus páginas se pasan arrastrando, haciendo clic o con el teclado.",
      sadvoapp:
        "Aplicación web de votación electrónica que maneja todo el ciclo electoral, desde configurar una elección hasta mostrar los resultados. Administradores, dirigentes de partido y votantes tienen su propia área, y los votantes confirman su identidad escaneando su cédula con OCR.",
      investatlas:
        "Aplicación web que clasifica países como destinos de inversión según sus indicadores macroeconómicos y estima una tasa de rendimiento esperada para cada uno. Incluye un simulador para probar distintos pesos sin tocar los datos reales.",
      "survey-manager":
        "Plataforma de encuestas full stack donde los administradores crean encuestas y los usuarios las responden. Incluye autenticación JWT por roles, resultados en gráficos y reportes en PDF o Excel, con un frontend en React y una API REST en .NET.",
      bankapp:
        "Aplicación bancaria de consola conectada a una base de datos SQL Server. Los usuarios pueden registrarse, iniciar sesión, abrir una cuenta y depositar o retirar dinero, con la solución dividida en capas de datos, negocio y presentación.",
      "devops-labs":
        "Laboratorios prácticos de contenedores, aprovisionamiento, monitoreo y pipelines: imágenes de Docker, Nginx desplegado con Ansible, dashboards con Prometheus y Grafana, y un pipeline CI/CD completo que prueba, publica y despliega en cada push.",
    },
  },
  experience: {
    label: "Experiencia",
    script: "Esta es",
    title: "Mi Experiencia",
    eyebrow: "Dónde trabajo",
    meta: ["Tiempo completo  ·  Híbrido", "República Dominicana"],
    since: "Sep 2025 — Actualidad",
    sinceLabel: "en la empresa",
    logoAlt: "Logo de UTreee IT Advanced Solutions",
    current: "Actual",
    skills: "Habilidades",
    roles: [
      {
        title: "Ingeniera de Software",
        dates: "Dic 2025 — Actualidad",
        place: "UTreee IT Advanced Solutions  ·  República Dominicana",
        highlights: [
          "Desarrollo y mantengo aplicaciones full stack: servicios de backend, funcionalidades de frontend, diseño de bases de datos e integraciones con APIs.",
          "Diseñé pipelines de CI/CD y configuraciones de Docker que hacen los despliegues más rápidos y fluidos.",
          "Mejoré el rendimiento con caché y optimizando consultas y bases de datos en SQL Server.",
          "Aplico prácticas DevOps y metodologías ágiles desde el desarrollo hasta el despliegue.",
        ],
        tags: ["Backend", "Frontend", "SQL Server", "Docker", "CI/CD"],
      },
      {
        title: "Pasante de TI",
        dates: "Sep 2025 — Dic 2025",
        place: "UTreee IT Advanced Solutions  ·  Distrito Nacional",
        highlights: [
          "Contribuí a IMPERIAL, una solución de facturación digital con módulos de inventario y facturación.",
          "Integré la API de la DGII para la facturación electrónica en República Dominicana.",
          "Convertí requerimientos de negocio en funcionalidades usando patrones de diseño y participé en decisiones de arquitectura.",
        ],
        tags: ["Facturación", "API de la DGII", "Patrones de diseño"],
      },
    ],
  },
  education: {
    label: "Educación",
    script: "Esta es",
    title: "Mi Educación",
    studies: [
      {
        fullName: "Instituto Tecnológico de Las Américas",
        title: "Técnico en Desarrollo de Software",
        dates: "Ene 2024 — May 2026",
        description:
          "Estudios de desarrollo de software enfocados en programación, bases de datos y arquitectura de aplicaciones, junto con trabajo en equipo y resolución de problemas.",
        badges: ["Magna Cum Laude", "Índice 3.7"],
      },
      {
        fullName: "Curso en línea",
        title: "Introducción a la Programación con C#",
        dates: "May 2025 — Jun 2025",
        description:
          "Lógica de programación, variables, estructuras de control, arreglos y lo esencial de la programación orientada a objetos con C#.",
        badges: ["Curso"],
      },
      {
        fullName: "Pontificia Universidad Católica Madre y Maestra",
        title: "Ingeniería de Software",
        dates: "Sep 2026 — Actualidad",
        description:
          "Fortaleciendo mis habilidades de ingeniería y resolución de problemas: pensamiento algorítmico, arquitectura de software y optimización de código.",
        badges: ["En curso"],
      },
    ],
  },
  contact: {
    label: "Contacto",
    script: "Aquí está",
    title: "Cómo Contactarme",
    hint: "Haz clic para abrir",
    open: "Abrir el sobre",
    close: "Cerrar el sobre",
    letterScript: "Escríbeme y",
    letterTitle: "hablemos",
    intro: "¿Quieres que trabajemos juntos o solo saludar? Elige tu forma favorita de contactarme.",
    emailSubject: "¡Hola, Priscila!",
    names: {
      linkedin: "LinkedIn",
      mail: "Correo",
      instagram: "Instagram",
    },
  },
};
