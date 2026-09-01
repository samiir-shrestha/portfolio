export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  category: 'Backend' | 'Full Stack';
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  architectureHighlights: string[];
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  category: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar';
    description?: string;
    icon?: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  university: string;
  period: string;
  location: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Samir Shrestha",
    role: "Backend Developer & Full-Stack Engineer",
    shortBio: "Final-year BSc.CSIT student specializing in backend architecture, REST API design, and SQL database systems. Experienced in building robust, testable server-side applications and full-stack solutions.",
    fullBio: "I am Samir Shrestha, a final-year BSc.CSIT student with hands-on experience building full-stack and backend-focused web applications using Node.js, FastAPI, React, and SQL databases. Passionate about backend architecture, REST API design, and writing clean, testable server-side code. Comfortable working independently and in teams on end-to-end project delivery.",
    location: "Kathmandu, Nepal",
    email: "samirstha9087@gmail.com",
    phone: "9869152627",
    phoneFormatted: "+977 9869152627",
    github: "https://github.com/samiir-shrestha",
    githubUsername: "samiir-shrestha",
    status: "Open to Backend & Full-Stack Opportunities",
    statusType: "available",
    resumeUrl: "/cv.pdf",
    experienceYears: "Final Year Student & Builder",
    languagesSpoken: [
      { language: "Nepali", proficiency: "Native" },
      { language: "English", proficiency: "Fluent / Professional" },
      { language: "Hindi", proficiency: "Conversational" },
    ],
  },
  metrics: [
    { label: "Production & Academic Projects", value: "3+" },
    { label: "Core Backend Frameworks", value: "FastAPI / Node / Express" },
    { label: "Database Engines", value: "PostgreSQL & MySQL" },
    { label: "BSc.CSIT Degree", value: "Final Year" },
  ],
  education: [
    {
      institution: "Madan Bhandari Memorial College",
      degree: "BSc.CSIT",
      field: "Bachelor of Science in Computer Science & Information Technology",
      university: "Tribhuvan University",
      period: "2023 – Present (Final Year)",
      location: "Kathmandu, Nepal",
      highlights: [
        "Core coursework in Data Structures & Algorithms, Database Management Systems (DBMS), and Operating Systems.",
        "Hands-on academic projects emphasizing clean RESTful architecture, MVC patterns, and relational data modeling.",
        "Deep dive into software engineering methodologies, distributed systems fundamentals, and computer networks."
      ]
    }
  ] as EducationItem[],
  projects: [
    {
      id: "smart-fertilizer-recommendation",
      title: "Smart Fertilizer Recommendation System",
      subtitle: "AgriPulse — ML-Powered Agriculture Decision Platform",
      category: "Backend",
      description: "A full-stack precision agriculture web application that analyzes soil and weather parameters to recommend optimal fertilizers using a trained Random Forest machine learning classifier.",
      bullets: [
        "Designed and built a full-stack web app that recommends fertilizers using a trained machine learning model.",
        "Developed the backend with FastAPI and PostgreSQL, deployed on Render, exposing a robust RESTful API layer.",
        "Built the frontend with React, deployed on Vercel, featuring an interactive location picker using OpenStreetMap.",
        "Integrated a Random Forest classifier for high-accuracy fertilizer recommendations.",
        "Implemented JWT-based authentication, rain-delay alerts, and automated PDF report generation."
      ],
      technologies: ["FastAPI", "Python", "PostgreSQL", "React", "Machine Learning", "Random Forest", "JWT", "OpenStreetMap", "Render", "Vercel"],
      githubUrl: "https://github.com/samiir-shrestha/agripulse",
      liveUrl: "https://final-front-sandy.vercel.app/",
      featured: true,
      architectureHighlights: [
        "FastAPI asynchronous endpoints delivering low-latency inference",
        "Trained Scikit-Learn Random Forest model embedded into API pipeline",
        "Automated background PDF report generator with soil metrics",
        "JWT token validation middleware securing user profiles & history"
      ],
      stats: [
        { label: "Backend", value: "FastAPI + PostgreSQL" },
        { label: "Inference", value: "Random Forest Model" },
        { label: "Auth", value: "JWT Middleware" },
        { label: "Deployment", value: "Render + Vercel" }
      ]
    },
    {
      id: "food-finder",
      title: "Food Finder",
      subtitle: "Full-Stack Restaurant Discovery & Wishlist Platform",
      category: "Full Stack",
      description: "A full-stack restaurant discovery and curated wishlist platform built with Next.js and TypeScript, featuring GitHub OAuth and containerized database management.",
      bullets: [
        "Built a full-stack restaurant discovery and wishlist app using Next.js and TypeScript.",
        "Designed a reusable, component-based React UI including dynamic listing, detail, and wishlist pages.",
        "Developed a RESTful API layer in Next.js for browsing restaurants and managing user wishlists.",
        "Implemented GitHub OAuth authentication via NextAuth.js, with session-based route protection for user-specific actions.",
        "Managed relational data in MySQL for restaurant listings and user wishlist records, containerized with Docker for local development."
      ],
      technologies: ["Next.js", "TypeScript", "React", "NextAuth.js", "MySQL", "Docker", "REST API", "Tailwind CSS"],
      githubUrl: "https://github.com/samiir-shrestha/food-finder",
      featured: true,
      architectureHighlights: [
        "Server-Side API routes in Next.js with structured request validation",
        "NextAuth.js OAuth 2.0 GitHub integration with protected session middleware",
        "Docker Compose configuration containerizing MySQL database instance",
        "Relational schema mapping users, restaurant entries, and wishlist associations"
      ],
      stats: [
        { label: "Framework", value: "Next.js + TypeScript" },
        { label: "Auth", value: "GitHub OAuth / NextAuth" },
        { label: "Database", value: "MySQL in Docker" },
        { label: "Architecture", value: "Modular Component UI" }
      ]
    },
    {
      id: "book-rental-system",
      title: "Book Rental System",
      subtitle: "End-to-End Book Inventory & Rental Management",
      category: "Backend",
      description: "A complete book rental web application with full CRUD capabilities, relational inventory control, and secure user authentication.",
      bullets: [
        "Built a complete book rental web app, handling frontend and backend independently.",
        "Developed a dynamic, responsive UI using React.js with reusable component-based architecture.",
        "Built server-side logic with PHP for user authentication and data operations.",
        "Implemented full CRUD functionality: browse, rent, return, and manage books.",
        "Managed relational data with MySQL for book inventory, user records, and rental history."
      ],
      technologies: ["React.js", "PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "CRUD Architecture"],
      githubUrl: "https://github.com/samiir-shrestha/book-rental",
      featured: true,
      architectureHighlights: [
        "Clean separation between React frontend client and PHP server endpoints",
        "Relational integrity constraints tracking active rentals, dues, and returns",
        "Complete CRUD interface with input validation and defensive error handling",
        "Stateful rental tracking matching book availability with user borrows"
      ],
      stats: [
        { label: "Frontend", value: "React.js" },
        { label: "Backend", value: "PHP API Logic" },
        { label: "Database", value: "MySQL Relational" },
        { label: "Core Feature", value: "Full CRUD & Rental Lifecycle" }
      ]
    }
  ] as Project[],
  skillCategories: [
    {
      category: "Backend & API Architecture",
      description: "Server-side runtimes, API frameworks, authentication protocols, and routing systems",
      iconName: "Server",
      skills: [
        { name: "Node.js", level: "Advanced", description: "Event-driven runtime for microservices and asynchronous I/O" },
        { name: "FastAPI", level: "Advanced", description: "High-performance Python web framework with Pydantic validation" },
        { name: "Express.js", level: "Advanced", description: "Minimalist server framework for RESTful API services" },
        { name: "Next.js (API Routes)", level: "Advanced", description: "Full-stack serverless handlers and backend routes" },
        { name: "RESTful API Design", level: "Advanced", description: "Standardized HTTP methods, status codes, and JSON schemas" },
        { name: "JWT & OAuth 2.0", level: "Proficient", description: "Secure token generation, verification, and session guards" },
      ]
    },
    {
      category: "Programming Languages",
      description: "Core languages used for backend logic, algorithmic problem solving, and script automation",
      iconName: "Code2",
      skills: [
        { name: "Python", level: "Advanced", description: "FastAPI, Scikit-learn, script automation, data pipelines" },
        { name: "JavaScript (ES6+)", level: "Advanced", description: "Modern async/await, closures, functional programming" },
        { name: "TypeScript", level: "Proficient", description: "Strict static typing, interfaces, and compile-time safety" },
        { name: "Java", level: "Proficient", description: "OOP principles, collections framework, and clean patterns" },
        { name: "PHP", level: "Proficient", description: "Server-side scripting, authentication, and database queries" },
        { name: "SQL", level: "Advanced", description: "Relational queries, joins, indexes, foreign keys, constraints" },
      ]
    },
    {
      category: "Databases & Storage",
      description: "Relational database engines, indexing, schema design, and query optimization",
      iconName: "Database",
      skills: [
        { name: "PostgreSQL", level: "Advanced", description: "Advanced relational modeling, transactions, foreign keys" },
        { name: "MySQL", level: "Advanced", description: "Schema normalization, indexing, CRUD query performance" },
        { name: "Schema Design", level: "Advanced", description: "Entity-relationship modeling and data integrity" },
      ]
    },
    {
      category: "DevOps, Cloud & Tools",
      description: "Containerization, version control, hosting environments, and API testing",
      iconName: "Terminal",
      skills: [
        { name: "Docker", level: "Proficient", description: "Containerizing services and multi-container Docker Compose setups" },
        { name: "Git & GitHub", level: "Advanced", description: "Version control, branching strategies, PR workflows" },
        { name: "Render", level: "Proficient", description: "Backend web service deployments and cloud databases" },
        { name: "Vercel", level: "Advanced", description: "Frontend and full-stack Next.js/React cloud hosting" },
        { name: "Postman", level: "Advanced", description: "API testing, automated request suites, endpoint inspection" },
        { name: "Linux / Bash", level: "Proficient", description: "Command-line tools, file system, server configuration" },
      ]
    },
    {
      category: "Frontend Development",
      description: "Client-side libraries and styling systems for responsive user interfaces",
      iconName: "Layout",
      skills: [
        { name: "React.js", level: "Advanced", description: "Hooks, component lifecycles, state management" },
        { name: "Tailwind CSS", level: "Advanced", description: "Utility-first styling, responsive layouts, theme switching" },
        { name: "HTML5 & CSS3", level: "Advanced", description: "Semantic markup, modern flexbox/grid, CSS animations" },
      ]
    },
    {
      category: "Software Engineering & Soft Skills",
      description: "Architecture paradigms, project delivery, and interpersonal strengths",
      iconName: "Cpu",
      skills: [
        { name: "MVC Pattern & Clean Architecture", level: "Advanced" },
        { name: "Machine Learning Integration", level: "Proficient" },
        { name: "Problem Solving & Debugging", level: "Advanced" },
        { name: "Teamwork & Collaboration", level: "Advanced" },
        { name: "Effective Technical Communication", level: "Advanced" },
        { name: "Time Management & Project Ownership", level: "Advanced" },
      ]
    }
  ] as SkillCategory[],
  terminalCommands: {
    help: "Available commands: bio, skills, projects, education, contact, stack, clear, sudo, repo",
    bio: "Backend & Full-Stack Developer | BSc.CSIT (Final Year) at Madan Bhandari Memorial College, TU. Passionate about REST APIs, FastAPI, Node.js, and SQL.",
    skills: "Backend: FastAPI, Node.js, Express, Next.js | Languages: Python, JS, TS, Java, PHP, SQL | DB: PostgreSQL, MySQL | Tools: Docker, Git, Linux",
    projects: "1. AgriPulse (FastAPI + React + ML) | 2. Food Finder (Next.js + MySQL + Docker) | 3. Book Rental (React + PHP + MySQL)",
    education: "BSc.CSIT (2023 - Present) - Madan Bhandari Memorial College, Tribhuvan University, Kathmandu, Nepal",
    contact: "Email: samirstha9087@gmail.com | Phone: +977 9869152627 | GitHub: github.com/samiir-shrestha | Location: Kathmandu, Nepal",
    stack: "FastAPI • Node.js • PostgreSQL • Next.js • React • Docker • TypeScript • Python",
    repo: "Opening GitHub: https://github.com/samiir-shrestha",
    sudo: "Permission granted! You are now viewing my superuser backend terminal."
  }
};
