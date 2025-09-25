interface LogoConfig {
    image: string | null;
    dark?: string | null;
    alt: string;
}

interface LogoRegistry {
    [slug: string]: LogoConfig;
}

const availableImages = import.meta.glob('../assets/technology-icons/*.{png,jpg,jpeg,gif,svg}', {
    eager: true,
    query: '?url',
    import: 'default'
});

const getImagePath = (imageName: string) => {
    const imagePath = `../assets/technology-icons/${imageName}`;

    if (imagePath in availableImages) {
        return availableImages[imagePath] as string;
    }
    return null;
};

export const LOGO_REGISTRY: LogoRegistry = {
  // Frontend Frameworks
  react: {
    image: getImagePath("react.svg"),
    alt: "React Logo",
  },
  vuejs: {
    image: getImagePath("vue.svg"),
    alt: "Vue Logo",
  },
  angular: {
    image: getImagePath("angular.svg"),
    alt: "Angular Logo",
  },
  svelte: {
    image: getImagePath("svelte.svg"),
    alt: "Svelte Logo",
  },

  // Backend Frameworks
  "spring-boot": {
    image: getImagePath("spring-boot.svg"),
    alt: "Spring Boot Logo",
  },
  expressjs: {
    image: getImagePath("expressjs.svg"),
    dark: getImagePath("expressjs-dark.svg"),
    alt: "Express.js Logo",
  },
  django: {
    image: getImagePath("django.svg"),
    dark: getImagePath("django-dark.svg"),
    alt: "Django Logo",
  },
  rails: {
    image: getImagePath("rails.svg"),
    alt: "Ruby on Rails Logo",
  },
  "aspnet-core": {
    image: getImagePath("aspnet-core.svg"),
    alt: "ASP.NET Core Logo",
  },

  // Databases
  postgresql: {
    image: getImagePath("postgresql.svg"),
    alt: "PostgreSQL Logo",
  },
  mongodb: {
    image: getImagePath("mongodb.svg"),
    alt: "MongoDB Logo",
  },
  mysql: {
    image: getImagePath("mysql.svg"),
    alt: "MySQL Logo",
  },
  redis: {
    image: getImagePath("redis.svg"),
    alt: "Redis Logo",
  },

  // Cloud Platforms
  aws: {
    image: getImagePath("aws.svg"),
    dark: getImagePath("aws-dark.svg"),
    alt: "Amazon Web Services Logo",
  },
  gcp: {
    image: getImagePath("gcp.svg"),
    alt: "Google Cloud Platform Logo",
  },
  azure: {
    image: getImagePath("azure.svg"),
    alt: "Microsoft Azure Logo",
  },

  // DevOps Tools
  docker: {
    image: getImagePath("docker.svg"),
    alt: "Docker Logo",
  },
  kubernetes: {
    image: getImagePath("kubernetes.svg"),
    alt: "Kubernetes Logo",
  },
  jenkins: {
    image: getImagePath("jenkins.svg"),
    alt: "Jenkins Logo",
  },

  // Mobile Development
  "react-native": {
    image: getImagePath("react-native.svg"),
    alt: "React Native Logo",
  },
  flutter: {
    image: getImagePath("flutter.svg"),
    alt: "Flutter Logo",
  },

  // Programming Languages
  javascript: {
    image: getImagePath("javascript.svg"),
    alt: "JavaScript Logo",
  },
  python: {
    image: getImagePath("python.svg"),
    alt: "Python Logo",
  },
  java: {
    image: getImagePath("java.svg"),
    alt: "Java Logo",
  },
  typescript: {
    image: getImagePath("typescript.svg"),
    alt: "TypeScript Logo",
  },

  // Version Control
  git: {
    image: getImagePath("git.svg"),
    alt: "Git Logo",
  },

  // Authentication
  auth0: {
    image: getImagePath("auth0.svg"),
    alt: "Auth0 Logo",
  },

  // Search Engines
  elasticsearch: {
    image: getImagePath("elasticsearch.svg"),
    alt: "Elasticsearch Logo",
  },
};