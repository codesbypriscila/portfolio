/** Every piece of text on the site, in English. `es.ts` mirrors this shape. */
export const en = {
  meta: {
    htmlLang: "en",
  },
  nav: {
    main: "Main",
    language: "Language",
    contact: "Contact",
    links: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
    },
  },
  portfolio: {
    label: "What's on my portfolio",
    script: "Here's",
    title: "What's on My Portfolio",
    hint: "Click to open",
    open: "Open portfolio",
    close: "Close portfolio",
    sections: "Portfolio sections",
    items: {
      about: "About me",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      cv: "Download CV",
      socials: "Socials",
      contact: "Contact me",
    },
  },
  about: {
    label: "About me",
    script: "Here's",
    title: "Things About Me",
    cover: "Cover",
    openBook: "Open the book",
    closeBook: "Close the book",
    previous: "Previous pages",
    next: "Next pages",
    bookRole: "book",
    bookLabel: "About me book. Drag a page, click either side or use the arrow keys to turn it.",
    intro: {
      photoAlt: "Priscila Pérez",
      caption: "that's me",
      hello: "Hi, I'm",
      age: "21 years old",
      bio: "I love creating things, from little drawings in my sketchbook to the websites I build. Most days you'll find me drawing, reading a good book or hanging out with my friends. At work I build web apps, and my favorite part is the details: warm colors, smooth animations and things that feel made by hand.",
    },
    inspiration: {
      script: "Where I find",
      title: "my ideas",
      videos:
        "For both sides of my work, frontend and backend, my first stop is always videos. Watching how other developers think through a problem helps me find my own way to build it, and that's where most of my ideas begin.",
      intro: "When I design an interface, these are the places I go looking for ideas:",
      sources: [
        { name: "Pinterest", description: "Moodboards, colors and layouts that catch my eye." },
        { name: "Canva", description: "Playing with type, palettes and quick mockups." },
        { name: "HeroUI", description: "Clean components and little details to learn from." },
      ],
      note: "save it, pin it,\nbuild it",
    },
    baking: {
      script: "Something",
      title: "sweet",
      first:
        "Away from the screen, you'll probably find me in the kitchen. I love to cook, and desserts are my favorite thing to make.",
      second:
        "Baking is one of the things I enjoy most in my free time. It's my favorite way to slow down and make something with my hands.",
    },
    anime: {
      script: "And of course,",
      title: "anime",
      text: "When I want to take a break, I put on some anime, and Naruto will always be my favorite. I love its characters, its story and its art style, which also inspires a lot of my own drawings.",
      thanks: "thanks for reading :)",
      teamAlt: "Naruto, Kakashi and Sakura running through the forest",
    },
  },
  projects: {
    label: "Featured projects",
    script: "Here's",
    title: "My Featured Projects",
    carousel: "Projects",
    carouselRole: "carousel",
    previous: "Previous project",
    next: "Next project",
    repository: "View repository",
    demo: "Live demo",
    descriptions: {
      izumi:
        "Premium landing page for a fictional omakase restaurant: an interactive menu book with a custom 3D page flip, cinematic animations and a bilingual EN/ES site. Its pages can be turned by dragging, clicking or using the keyboard.",
      sadvoapp:
        "Electronic voting web app that manages the full election cycle, from setting up an election to showing the results. Administrators, party leaders and voters each have their own area, and voters confirm their identity by scanning their ID card with OCR.",
      investatlas:
        "Web app that ranks countries as investment destinations based on their macroeconomic indicators and estimates an expected rate of return for each one. It includes a simulator to try different weights without touching the real data.",
      "survey-manager":
        "Full stack survey platform where administrators create surveys and users answer them. It includes role-based JWT authentication, results in charts and PDF or Excel reports, with a React frontend and a .NET REST API.",
      bankapp:
        "Console banking app connected to a SQL Server database. Users can sign up, log in, open a bank account and deposit or withdraw money, with the solution split into data, business and presentation layers.",
      "devops-labs":
        "Hands-on labs covering containers, provisioning, monitoring and pipelines: Docker images, Nginx deployed with Ansible, Prometheus and Grafana dashboards, and a full CI/CD pipeline that tests, publishes and deploys on every push.",
    },
  },
  experience: {
    label: "Experience",
    script: "Here's",
    title: "My Experience",
    eyebrow: "Where I work",
    meta: ["Full-time  ·  Hybrid", "Dominican Republic"],
    since: "Sep 2025 — Present",
    sinceLabel: "at the company",
    logoAlt: "UTreee IT Advanced Solutions logo",
    current: "Current",
    skills: "Skills",
    roles: [
      {
        title: "Software Engineer",
        dates: "Dec 2025 — Present",
        place: "UTreee IT Advanced Solutions  ·  Dominican Republic",
        highlights: [
          "Build and maintain full-stack applications: backend services, frontend features, database design and API integrations.",
          "Designed CI/CD pipelines and Docker setups that make deployments faster and smoother.",
          "Improved performance with caching and optimized SQL Server queries and databases.",
          "Apply DevOps practices and Agile methodologies from development to deployment.",
        ],
        tags: ["Backend", "Frontend", "SQL Server", "Docker", "CI/CD"],
      },
      {
        title: "IT Intern",
        dates: "Sep 2025 — Dec 2025",
        place: "UTreee IT Advanced Solutions  ·  Distrito Nacional",
        highlights: [
          "Contributed to IMPERIAL, a digital invoicing solution with inventory and billing modules.",
          "Integrated the DGII API to support electronic invoicing in the Dominican Republic.",
          "Turned business requirements into features using design patterns, and took part in architecture decisions.",
        ],
        tags: ["Invoicing", "DGII API", "Design patterns"],
      },
    ],
  },
  education: {
    label: "Education",
    script: "Here's",
    title: "My Education",
    studies: [
      {
        fullName: "Instituto Tecnológico de Las Américas",
        title: "Software Development Technician",
        dates: "Jan 2024 — May 2026",
        description:
          "Software development studies focused on programming, databases and application architecture, along with teamwork and problem solving.",
        badges: ["Magna Cum Laude", "GPA 3.7"],
      },
      {
        fullName: "Online course",
        title: "Introduction to Programming with C#",
        dates: "May 2025 — Jun 2025",
        description:
          "Programming logic, variables, control structures, arrays and the essentials of object-oriented programming with C#.",
        badges: ["Course"],
      },
      {
        fullName: "Pontificia Universidad Católica Madre y Maestra",
        title: "Software Engineering",
        dates: "Sep 2026 — Present",
        description:
          "Strengthening my engineering and problem-solving skills: algorithmic thinking, software architecture and code optimization.",
        badges: ["In progress"],
      },
    ],
  },
  contact: {
    label: "Contact",
    script: "Here's",
    title: "How to Reach Me",
    hint: "Click to open",
    open: "Open the envelope",
    close: "Close the envelope",
    letterScript: "Let's",
    letterTitle: "talk",
    intro: "Want to work together or just say hi? Pick your favorite way to reach me.",
    emailSubject: "Hi Priscila!",
    names: {
      linkedin: "LinkedIn",
      mail: "Email",
      instagram: "Instagram",
    },
  },
};

export type Dictionary = typeof en;
