/**
 * Question bank for different roles and seniority levels
 */

export type Role =
  | 'Frontend'
  | 'Backend'
  | 'Full-Stack'
  | 'Data Engineer'
  | 'Product Manager'
  | 'UX';

export type Seniority = 'Junior' | 'Mid' | 'Senior';

export interface Question {
  text: string;
  keywords: string[];
}

const QUESTIONS: Record<Role, Record<Seniority, Question[]>> = {
  Frontend: {
    Junior: [
      {
        text: 'What is the difference between let, const, and var in JavaScript?',
        keywords: [
          'scope',
          'hoisting',
          'block',
          'reassignment',
          'temporal dead zone',
        ],
      },
      {
        text: 'Can you explain what the virtual DOM is and why React uses it?',
        keywords: ['virtual dom', 'reconciliation', 'performance', 'diffing'],
      },
      {
        text: 'What are React hooks and why were they introduced?',
        keywords: [
          'hooks',
          'state',
          'lifecycle',
          'functional components',
          'reusability',
        ],
      },
      {
        text: 'How do you handle responsive design in CSS?',
        keywords: [
          'media queries',
          'flexbox',
          'grid',
          'mobile-first',
          'breakpoints',
        ],
      },
      {
        text: 'What is the box model in CSS?',
        keywords: ['margin', 'border', 'padding', 'content', 'box-sizing'],
      },
      {
        text: 'Explain the concept of event bubbling and event capturing.',
        keywords: ['bubbling', 'capturing', 'propagation', 'stopPropagation'],
      },
      {
        text: 'What is the purpose of useEffect in React?',
        keywords: ['side effects', 'lifecycle', 'cleanup', 'dependencies'],
      },
      {
        text: 'How would you optimize the performance of a React application?',
        keywords: [
          'memoization',
          'lazy loading',
          'code splitting',
          'useMemo',
          'useCallback',
        ],
      },
      {
        text: 'What is the difference between == and === in JavaScript?',
        keywords: [
          'equality',
          'strict',
          'type coercion',
          'comparison',
          'triple equals',
        ],
      },
      {
        text: 'Can you explain what closures are in JavaScript?',
        keywords: [
          'closure',
          'scope',
          'lexical',
          'encapsulation',
          'private variables',
        ],
      },
    ],
    Mid: [
      {
        text: 'How would you implement state management in a large React application?',
        keywords: [
          'context',
          'redux',
          'zustand',
          'state management',
          'global state',
        ],
      },
      {
        text: 'Explain the concept of server-side rendering and its benefits.',
        keywords: ['ssr', 'seo', 'performance', 'hydration', 'next.js'],
      },
      {
        text: 'What are Web Vitals and why are they important?',
        keywords: ['lcp', 'fid', 'cls', 'performance', 'user experience'],
      },
      {
        text: 'How do you ensure accessibility in your frontend applications?',
        keywords: [
          'aria',
          'semantic html',
          'keyboard navigation',
          'screen readers',
          'wcag',
        ],
      },
      {
        text: 'Describe your approach to testing React components.',
        keywords: [
          'unit tests',
          'integration tests',
          'testing library',
          'jest',
          'coverage',
        ],
      },
      {
        text: 'What is the difference between controlled and uncontrolled components?',
        keywords: ['controlled', 'uncontrolled', 'state', 'refs', 'forms'],
      },
      {
        text: 'How would you handle authentication in a single-page application?',
        keywords: ['jwt', 'tokens', 'session', 'oauth', 'security'],
      },
      {
        text: 'Explain the concept of code splitting and lazy loading.',
        keywords: [
          'code splitting',
          'lazy',
          'dynamic import',
          'performance',
          'bundle size',
        ],
      },
      {
        text: 'What are the differences between CSS Grid and Flexbox?',
        keywords: [
          'grid',
          'flexbox',
          'two-dimensional',
          'one-dimensional',
          'layout',
        ],
      },
      {
        text: 'How do you handle errors in React applications?',
        keywords: [
          'error boundaries',
          'try catch',
          'error handling',
          'fallback ui',
        ],
      },
    ],
    Senior: [
      {
        text: 'How would you architect a micro-frontend system?',
        keywords: [
          'micro-frontends',
          'module federation',
          'architecture',
          'isolation',
          'deployment',
        ],
      },
      {
        text: 'Describe your approach to building a design system from scratch.',
        keywords: [
          'design system',
          'components',
          'tokens',
          'documentation',
          'consistency',
        ],
      },
      {
        text: 'What strategies do you use for optimizing bundle size in production?',
        keywords: [
          'tree shaking',
          'minification',
          'compression',
          'code splitting',
          'analysis',
        ],
      },
      {
        text: 'How do you approach performance monitoring in production applications?',
        keywords: [
          'monitoring',
          'metrics',
          'real user monitoring',
          'analytics',
          'alerts',
        ],
      },
      {
        text: 'Explain your strategy for managing technical debt in frontend projects.',
        keywords: [
          'refactoring',
          'documentation',
          'prioritization',
          'migration',
          'incremental',
        ],
      },
      {
        text: 'How would you implement a progressive web app with offline capabilities?',
        keywords: [
          'pwa',
          'service workers',
          'cache',
          'offline',
          'manifest',
        ],
      },
      {
        text: 'What is your approach to cross-browser compatibility?',
        keywords: [
          'polyfills',
          'feature detection',
          'graceful degradation',
          'progressive enhancement',
        ],
      },
      {
        text: 'How do you ensure type safety across a large TypeScript codebase?',
        keywords: [
          'typescript',
          'strict mode',
          'generics',
          'type guards',
          'inference',
        ],
      },
      {
        text: 'Describe your experience with build tools and bundlers.',
        keywords: ['webpack', 'vite', 'rollup', 'esbuild', 'optimization'],
      },
      {
        text: 'How would you lead a frontend team through a major framework migration?',
        keywords: [
          'migration',
          'planning',
          'incremental',
          'training',
          'risk management',
        ],
      },
    ],
  },
  Backend: {
    Junior: [
      {
        text: 'What is the difference between SQL and NoSQL databases?',
        keywords: [
          'relational',
          'document',
          'schema',
          'scalability',
          'acid',
          'base',
        ],
      },
      {
        text: 'Can you explain what RESTful APIs are?',
        keywords: ['rest', 'http', 'resources', 'stateless', 'crud'],
      },
      {
        text: 'What is the purpose of middleware in web frameworks?',
        keywords: [
          'middleware',
          'request',
          'response',
          'pipeline',
          'authentication',
        ],
      },
      {
        text: 'How do you handle errors in backend applications?',
        keywords: [
          'error handling',
          'try catch',
          'logging',
          'status codes',
          'exceptions',
        ],
      },
      {
        text: 'What is the difference between synchronous and asynchronous code?',
        keywords: [
          'async',
          'sync',
          'blocking',
          'non-blocking',
          'promises',
          'callbacks',
        ],
      },
      {
        text: 'Explain what environment variables are and why they are important.',
        keywords: [
          'environment',
          'configuration',
          'secrets',
          'deployment',
          'security',
        ],
      },
      {
        text: 'What is authentication and how does it differ from authorization?',
        keywords: [
          'authentication',
          'authorization',
          'identity',
          'permissions',
          'access control',
        ],
      },
      {
        text: 'How would you design a simple user registration system?',
        keywords: [
          'registration',
          'validation',
          'password hashing',
          'database',
          'email',
        ],
      },
      {
        text: 'What are HTTP status codes and when would you use them?',
        keywords: ['status codes', '200', '404', '500', 'client', 'server'],
      },
      {
        text: 'Can you explain what an API endpoint is?',
        keywords: ['endpoint', 'route', 'url', 'handler', 'controller'],
      },
    ],
    Mid: [
      {
        text: 'How would you design a scalable API architecture?',
        keywords: [
          'scalability',
          'load balancing',
          'caching',
          'microservices',
          'stateless',
        ],
      },
      {
        text: 'Explain the concept of database indexing and its impact on performance.',
        keywords: ['indexing', 'performance', 'query optimization', 'b-tree'],
      },
      {
        text: 'What strategies do you use for API versioning?',
        keywords: [
          'versioning',
          'backward compatibility',
          'deprecation',
          'url',
          'header',
        ],
      },
      {
        text: 'How do you implement rate limiting in an API?',
        keywords: [
          'rate limiting',
          'throttling',
          'token bucket',
          'redis',
          'security',
        ],
      },
      {
        text: 'Describe your approach to database migrations.',
        keywords: [
          'migrations',
          'schema changes',
          'rollback',
          'versioning',
          'zero-downtime',
        ],
      },
      {
        text: 'What is the N+1 query problem and how do you solve it?',
        keywords: ['n+1', 'eager loading', 'lazy loading', 'joins', 'orm'],
      },
      {
        text: 'How would you implement caching in a backend system?',
        keywords: [
          'caching',
          'redis',
          'memcached',
          'cache invalidation',
          'ttl',
        ],
      },
      {
        text: 'Explain the concept of database transactions and ACID properties.',
        keywords: [
          'transactions',
          'acid',
          'atomicity',
          'consistency',
          'isolation',
          'durability',
        ],
      },
      {
        text: 'What are webhooks and when would you use them?',
        keywords: [
          'webhooks',
          'callbacks',
          'event-driven',
          'real-time',
          'integration',
        ],
      },
      {
        text: 'How do you ensure data validation and sanitization?',
        keywords: [
          'validation',
          'sanitization',
          'input',
          'security',
          'sql injection',
        ],
      },
    ],
    Senior: [
      {
        text: 'How would you design a distributed system with high availability?',
        keywords: [
          'distributed',
          'high availability',
          'fault tolerance',
          'replication',
          'consensus',
        ],
      },
      {
        text: 'Explain your approach to database sharding and partitioning.',
        keywords: [
          'sharding',
          'partitioning',
          'horizontal scaling',
          'data distribution',
        ],
      },
      {
        text: 'What strategies do you use for handling eventual consistency?',
        keywords: [
          'eventual consistency',
          'cap theorem',
          'distributed systems',
          'conflict resolution',
        ],
      },
      {
        text: 'How do you implement observability in microservices?',
        keywords: [
          'observability',
          'logging',
          'metrics',
          'tracing',
          'distributed tracing',
        ],
      },
      {
        text: 'Describe your experience with message queues and event-driven architectures.',
        keywords: [
          'message queue',
          'event-driven',
          'kafka',
          'rabbitmq',
          'pub-sub',
        ],
      },
      {
        text: 'How would you optimize database queries for large-scale applications?',
        keywords: [
          'query optimization',
          'explain plan',
          'indexing',
          'denormalization',
          'partitioning',
        ],
      },
      {
        text: 'What is your approach to API security and threat mitigation?',
        keywords: [
          'security',
          'oauth',
          'jwt',
          'encryption',
          'ddos',
          'rate limiting',
        ],
      },
      {
        text: 'How do you handle database schema evolution in production systems?',
        keywords: [
          'schema evolution',
          'backward compatibility',
          'blue-green deployment',
          'migrations',
        ],
      },
      {
        text: 'Explain your strategy for disaster recovery and backup systems.',
        keywords: [
          'disaster recovery',
          'backup',
          'replication',
          'rpo',
          'rto',
          'failover',
        ],
      },
      {
        text: 'How would you architect a system to handle millions of concurrent users?',
        keywords: [
          'scalability',
          'load balancing',
          'caching',
          'cdn',
          'horizontal scaling',
        ],
      },
    ],
  },
  'Full-Stack': {
    Junior: [
      {
        text: 'What is the difference between frontend and backend development?',
        keywords: [
          'frontend',
          'backend',
          'client',
          'server',
          'separation of concerns',
        ],
      },
      {
        text: 'How do you connect a React frontend to a backend API?',
        keywords: ['fetch', 'axios', 'api', 'http', 'rest'],
      },
      {
        text: 'What is CORS and why is it important?',
        keywords: [
          'cors',
          'cross-origin',
          'security',
          'same-origin policy',
          'headers',
        ],
      },
      {
        text: 'Explain the concept of client-side and server-side rendering.',
        keywords: ['csr', 'ssr', 'rendering', 'hydration', 'performance'],
      },
      {
        text: 'What is the purpose of a web framework?',
        keywords: [
          'framework',
          'structure',
          'routing',
          'middleware',
          'abstraction',
        ],
      },
      {
        text: 'How do you manage user sessions in a web application?',
        keywords: ['sessions', 'cookies', 'tokens', 'authentication', 'state'],
      },
      {
        text: 'What is the difference between cookies and local storage?',
        keywords: [
          'cookies',
          'local storage',
          'storage',
          'expiration',
          'security',
        ],
      },
      {
        text: 'How would you implement form validation on both client and server?',
        keywords: [
          'validation',
          'client-side',
          'server-side',
          'security',
          'user experience',
        ],
      },
      {
        text: 'What is an ORM and why would you use one?',
        keywords: [
          'orm',
          'object-relational mapping',
          'database',
          'abstraction',
          'models',
        ],
      },
      {
        text: 'Explain the concept of MVC architecture.',
        keywords: [
          'mvc',
          'model',
          'view',
          'controller',
          'separation of concerns',
        ],
      },
    ],
    Mid: [
      {
        text: 'How would you design a full-stack application from scratch?',
        keywords: [
          'architecture',
          'planning',
          'database design',
          'api design',
          'frontend structure',
        ],
      },
      {
        text: 'Explain your approach to API design and documentation.',
        keywords: [
          'api design',
          'rest',
          'graphql',
          'documentation',
          'openapi',
          'swagger',
        ],
      },
      {
        text: 'How do you handle file uploads in a web application?',
        keywords: [
          'file upload',
          'multipart',
          'storage',
          'validation',
          'security',
        ],
      },
      {
        text: 'What strategies do you use for optimizing full-stack application performance?',
        keywords: [
          'performance',
          'caching',
          'lazy loading',
          'database optimization',
          'cdn',
        ],
      },
      {
        text: 'How would you implement real-time features in a web application?',
        keywords: [
          'real-time',
          'websockets',
          'server-sent events',
          'polling',
          'push notifications',
        ],
      },
      {
        text: 'Describe your approach to testing full-stack applications.',
        keywords: [
          'testing',
          'unit tests',
          'integration tests',
          'e2e tests',
          'api tests',
        ],
      },
      {
        text: 'How do you manage environment-specific configurations?',
        keywords: [
          'configuration',
          'environment variables',
          'deployment',
          'secrets',
          'ci/cd',
        ],
      },
      {
        text: 'What is your approach to database design for a new project?',
        keywords: [
          'database design',
          'normalization',
          'relationships',
          'schema',
          'indexing',
        ],
      },
      {
        text: 'How would you implement authentication and authorization across the stack?',
        keywords: [
          'authentication',
          'authorization',
          'jwt',
          'session',
          'rbac',
          'security',
        ],
      },
      {
        text: 'Explain the concept of serverless architecture and its trade-offs.',
        keywords: [
          'serverless',
          'lambda',
          'functions',
          'cold start',
          'scalability',
        ],
      },
    ],
    Senior: [
      {
        text: 'How would you architect a multi-tenant SaaS application?',
        keywords: [
          'multi-tenant',
          'saas',
          'isolation',
          'data separation',
          'scalability',
        ],
      },
      {
        text: 'Describe your approach to building a CI/CD pipeline for full-stack applications.',
        keywords: [
          'ci/cd',
          'automation',
          'testing',
          'deployment',
          'docker',
          'kubernetes',
        ],
      },
      {
        text: 'How do you ensure security across the entire application stack?',
        keywords: [
          'security',
          'authentication',
          'encryption',
          'owasp',
          'penetration testing',
        ],
      },
      {
        text: 'What strategies do you use for monitoring and debugging production issues?',
        keywords: [
          'monitoring',
          'logging',
          'error tracking',
          'apm',
          'debugging',
          'alerts',
        ],
      },
      {
        text: 'How would you migrate a monolithic application to microservices?',
        keywords: [
          'migration',
          'microservices',
          'monolith',
          'strangler pattern',
          'incremental',
        ],
      },
      {
        text: 'Explain your approach to handling technical debt in full-stack projects.',
        keywords: [
          'technical debt',
          'refactoring',
          'prioritization',
          'documentation',
          'balance',
        ],
      },
      {
        text: 'How do you design APIs for mobile and web clients simultaneously?',
        keywords: [
          'api design',
          'versioning',
          'graphql',
          'bff',
          'mobile-first',
        ],
      },
      {
        text: 'What is your strategy for database scaling and optimization?',
        keywords: [
          'scaling',
          'optimization',
          'sharding',
          'replication',
          'caching',
          'read replicas',
        ],
      },
      {
        text: 'How would you implement a comprehensive logging and monitoring strategy?',
        keywords: [
          'logging',
          'monitoring',
          'elk stack',
          'prometheus',
          'grafana',
          'distributed tracing',
        ],
      },
      {
        text: 'Describe your experience with cloud infrastructure and deployment strategies.',
        keywords: [
          'cloud',
          'aws',
          'azure',
          'gcp',
          'infrastructure as code',
          'terraform',
        ],
      },
    ],
  },
  'Data Engineer': {
    Junior: [
      {
        text: 'What is the difference between a data warehouse and a database?',
        keywords: [
          'data warehouse',
          'database',
          'olap',
          'oltp',
          'analytics',
          'transactions',
        ],
      },
      {
        text: 'Can you explain what ETL stands for and its purpose?',
        keywords: ['etl', 'extract', 'transform', 'load', 'data pipeline'],
      },
      {
        text: 'What is the difference between structured and unstructured data?',
        keywords: [
          'structured',
          'unstructured',
          'schema',
          'relational',
          'nosql',
        ],
      },
      {
        text: 'How would you handle missing data in a dataset?',
        keywords: [
          'missing data',
          'imputation',
          'null values',
          'data cleaning',
          'strategy',
        ],
      },
      {
        text: 'What is data normalization and why is it important?',
        keywords: [
          'normalization',
          'redundancy',
          'normal forms',
          'database design',
        ],
      },
      {
        text: 'Explain the concept of a primary key and foreign key.',
        keywords: [
          'primary key',
          'foreign key',
          'relationships',
          'referential integrity',
        ],
      },
      {
        text: 'What is the purpose of data validation?',
        keywords: [
          'validation',
          'data quality',
          'constraints',
          'integrity',
          'accuracy',
        ],
      },
      {
        text: 'How do you write a basic SQL query to join two tables?',
        keywords: ['sql', 'join', 'inner join', 'left join', 'tables'],
      },
      {
        text: 'What is the difference between batch and stream processing?',
        keywords: [
          'batch',
          'stream',
          'real-time',
          'processing',
          'latency',
          'throughput',
        ],
      },
      {
        text: 'Can you explain what a data pipeline is?',
        keywords: [
          'data pipeline',
          'workflow',
          'automation',
          'orchestration',
          'etl',
        ],
      },
    ],
    Mid: [
      {
        text: 'How would you design a scalable data pipeline?',
        keywords: [
          'scalability',
          'pipeline',
          'distributed',
          'fault tolerance',
          'monitoring',
        ],
      },
      {
        text: 'Explain the concept of data partitioning and its benefits.',
        keywords: [
          'partitioning',
          'performance',
          'query optimization',
          'data distribution',
        ],
      },
      {
        text: 'What strategies do you use for data quality monitoring?',
        keywords: [
          'data quality',
          'monitoring',
          'validation',
          'metrics',
          'alerts',
        ],
      },
      {
        text: 'How do you handle schema evolution in data pipelines?',
        keywords: [
          'schema evolution',
          'backward compatibility',
          'versioning',
          'migration',
        ],
      },
      {
        text: 'Describe your experience with data warehousing solutions.',
        keywords: [
          'data warehouse',
          'redshift',
          'bigquery',
          'snowflake',
          'dimensional modeling',
        ],
      },
      {
        text: 'What is the difference between star and snowflake schema?',
        keywords: [
          'star schema',
          'snowflake schema',
          'fact table',
          'dimension table',
          'normalization',
        ],
      },
      {
        text: 'How would you optimize a slow-running SQL query?',
        keywords: [
          'optimization',
          'indexing',
          'explain plan',
          'query rewriting',
          'partitioning',
        ],
      },
      {
        text: 'Explain the concept of data lake and its use cases.',
        keywords: [
          'data lake',
          'raw data',
          'schema-on-read',
          'storage',
          'analytics',
        ],
      },
      {
        text: 'What tools do you use for data orchestration?',
        keywords: [
          'orchestration',
          'airflow',
          'dagster',
          'workflow',
          'scheduling',
        ],
      },
      {
        text: 'How do you ensure data security and compliance?',
        keywords: [
          'security',
          'compliance',
          'encryption',
          'gdpr',
          'access control',
        ],
      },
    ],
    Senior: [
      {
        text: 'How would you architect a real-time data processing system?',
        keywords: [
          'real-time',
          'stream processing',
          'kafka',
          'flink',
          'architecture',
        ],
      },
      {
        text: 'Describe your approach to building a data platform from scratch.',
        keywords: [
          'data platform',
          'architecture',
          'governance',
          'scalability',
          'tooling',
        ],
      },
      {
        text: 'What strategies do you use for managing data lineage?',
        keywords: [
          'data lineage',
          'metadata',
          'tracking',
          'governance',
          'compliance',
        ],
      },
      {
        text: 'How do you handle data governance in a large organization?',
        keywords: [
          'data governance',
          'policies',
          'quality',
          'ownership',
          'catalog',
        ],
      },
      {
        text: 'Explain your experience with distributed data processing frameworks.',
        keywords: ['spark', 'hadoop', 'distributed', 'mapreduce', 'processing'],
      },
      {
        text: 'How would you optimize data storage costs while maintaining performance?',
        keywords: [
          'cost optimization',
          'storage',
          'compression',
          'partitioning',
          'tiering',
        ],
      },
      {
        text: 'What is your approach to disaster recovery for data systems?',
        keywords: [
          'disaster recovery',
          'backup',
          'replication',
          'failover',
          'rpo',
          'rto',
        ],
      },
      {
        text: 'How do you implement data versioning and time travel queries?',
        keywords: [
          'versioning',
          'time travel',
          'delta lake',
          'iceberg',
          'snapshots',
        ],
      },
      {
        text: 'Describe your strategy for migrating legacy data systems to modern platforms.',
        keywords: [
          'migration',
          'legacy',
          'planning',
          'incremental',
          'risk management',
        ],
      },
      {
        text: 'How would you build a self-service analytics platform?',
        keywords: [
          'self-service',
          'analytics',
          'democratization',
          'tools',
          'governance',
        ],
      },
    ],
  },
  'Product Manager': {
    Junior: [
      {
        text: 'What is the role of a product manager?',
        keywords: [
          'product manager',
          'stakeholders',
          'vision',
          'roadmap',
          'prioritization',
        ],
      },
      {
        text: 'How do you prioritize features in a product backlog?',
        keywords: [
          'prioritization',
          'backlog',
          'value',
          'impact',
          'effort',
          'framework',
        ],
      },
      {
        text: 'What is the difference between a feature and a user story?',
        keywords: [
          'feature',
          'user story',
          'requirements',
          'acceptance criteria',
        ],
      },
      {
        text: 'How would you gather user feedback?',
        keywords: [
          'user feedback',
          'surveys',
          'interviews',
          'analytics',
          'usability testing',
        ],
      },
      {
        text: 'What is an MVP and why is it important?',
        keywords: [
          'mvp',
          'minimum viable product',
          'validation',
          'iteration',
          'learning',
        ],
      },
      {
        text: 'Explain the concept of product-market fit.',
        keywords: [
          'product-market fit',
          'validation',
          'customer satisfaction',
          'retention',
        ],
      },
      {
        text: 'How do you define success metrics for a product?',
        keywords: [
          'success metrics',
          'kpis',
          'objectives',
          'measurement',
          'goals',
        ],
      },
      {
        text: 'What is the difference between qualitative and quantitative data?',
        keywords: [
          'qualitative',
          'quantitative',
          'data',
          'metrics',
          'insights',
        ],
      },
      {
        text: 'How would you communicate a product vision to stakeholders?',
        keywords: [
          'product vision',
          'communication',
          'stakeholders',
          'storytelling',
          'alignment',
        ],
      },
      {
        text: 'What is a product roadmap and what should it include?',
        keywords: [
          'roadmap',
          'timeline',
          'features',
          'milestones',
          'strategy',
        ],
      },
    ],
    Mid: [
      {
        text: 'How do you conduct competitive analysis?',
        keywords: [
          'competitive analysis',
          'market research',
          'differentiation',
          'positioning',
        ],
      },
      {
        text: 'Describe your approach to user research and validation.',
        keywords: [
          'user research',
          'validation',
          'interviews',
          'testing',
          'insights',
        ],
      },
      {
        text: 'How would you handle conflicting stakeholder priorities?',
        keywords: [
          'stakeholder management',
          'conflict resolution',
          'negotiation',
          'alignment',
        ],
      },
      {
        text: 'What frameworks do you use for product prioritization?',
        keywords: [
          'prioritization',
          'rice',
          'kano',
          'value vs effort',
          'framework',
        ],
      },
      {
        text: 'How do you measure product success post-launch?',
        keywords: [
          'success metrics',
          'analytics',
          'retention',
          'engagement',
          'iteration',
        ],
      },
      {
        text: 'Explain your process for creating a product requirements document.',
        keywords: ['prd', 'requirements', 'specifications', 'documentation'],
      },
      {
        text: 'How would you approach launching a new product in a competitive market?',
        keywords: [
          'product launch',
          'go-to-market',
          'positioning',
          'marketing',
          'differentiation',
        ],
      },
      {
        text: 'What is your experience with A/B testing and experimentation?',
        keywords: [
          'a/b testing',
          'experimentation',
          'hypothesis',
          'metrics',
          'statistical significance',
        ],
      },
      {
        text: 'How do you balance technical debt with new feature development?',
        keywords: [
          'technical debt',
          'prioritization',
          'trade-offs',
          'engineering',
          'balance',
        ],
      },
      {
        text: 'Describe your approach to pricing strategy.',
        keywords: [
          'pricing',
          'strategy',
          'value-based',
          'competition',
          'monetization',
        ],
      },
    ],
    Senior: [
      {
        text: 'How would you develop a product strategy for a new market?',
        keywords: [
          'product strategy',
          'market entry',
          'positioning',
          'differentiation',
          'vision',
        ],
      },
      {
        text: 'Describe your experience leading cross-functional product teams.',
        keywords: [
          'leadership',
          'cross-functional',
          'collaboration',
          'alignment',
          'execution',
        ],
      },
      {
        text: 'How do you build and communicate a long-term product vision?',
        keywords: [
          'product vision',
          'strategy',
          'communication',
          'alignment',
          'inspiration',
        ],
      },
      {
        text: 'What is your approach to portfolio management across multiple products?',
        keywords: [
          'portfolio management',
          'prioritization',
          'resource allocation',
          'strategy',
        ],
      },
      {
        text: 'How would you handle a product that is underperforming?',
        keywords: [
          'underperforming',
          'analysis',
          'pivot',
          'iteration',
          'decision making',
        ],
      },
      {
        text: 'Describe your experience with product-led growth strategies.',
        keywords: [
          'product-led growth',
          'self-service',
          'viral loops',
          'activation',
          'retention',
        ],
      },
      {
        text: 'How do you incorporate data and analytics into product decisions?',
        keywords: [
          'data-driven',
          'analytics',
          'metrics',
          'insights',
          'decision making',
        ],
      },
      {
        text: 'What is your approach to managing product sunset or deprecation?',
        keywords: [
          'sunset',
          'deprecation',
          'migration',
          'communication',
          'customer impact',
        ],
      },
      {
        text: 'How would you scale product processes in a growing organization?',
        keywords: [
          'scaling',
          'processes',
          'frameworks',
          'team growth',
          'efficiency',
        ],
      },
      {
        text: 'Describe your experience with international product expansion.',
        keywords: [
          'international',
          'expansion',
          'localization',
          'market research',
          'compliance',
        ],
      },
    ],
  },
  UX: {
    Junior: [
      {
        text: 'What is the difference between UX and UI design?',
        keywords: [
          'ux',
          'ui',
          'user experience',
          'user interface',
          'interaction',
          'visual',
        ],
      },
      {
        text: 'Can you explain what user personas are and why they are important?',
        keywords: [
          'personas',
          'user research',
          'target audience',
          'empathy',
          'design',
        ],
      },
      {
        text: 'What is the purpose of wireframing?',
        keywords: [
          'wireframing',
          'layout',
          'structure',
          'low-fidelity',
          'iteration',
        ],
      },
      {
        text: 'How do you conduct usability testing?',
        keywords: [
          'usability testing',
          'user testing',
          'feedback',
          'observation',
          'iteration',
        ],
      },
      {
        text: 'What is the importance of accessibility in design?',
        keywords: [
          'accessibility',
          'inclusive',
          'wcag',
          'disabilities',
          'universal design',
        ],
      },
      {
        text: 'Explain the concept of information architecture.',
        keywords: [
          'information architecture',
          'structure',
          'navigation',
          'organization',
          'hierarchy',
        ],
      },
      {
        text: 'What is a user journey map?',
        keywords: [
          'user journey',
          'touchpoints',
          'experience',
          'pain points',
          'emotions',
        ],
      },
      {
        text: 'How do you gather user requirements for a design project?',
        keywords: [
          'requirements',
          'user research',
          'interviews',
          'surveys',
          'stakeholders',
        ],
      },
      {
        text: 'What is the difference between qualitative and quantitative research?',
        keywords: [
          'qualitative',
          'quantitative',
          'research',
          'data',
          'insights',
          'methods',
        ],
      },
      {
        text: 'Can you explain what responsive design is?',
        keywords: [
          'responsive design',
          'mobile',
          'adaptive',
          'breakpoints',
          'flexible',
        ],
      },
    ],
    Mid: [
      {
        text: 'How do you approach designing for mobile versus desktop?',
        keywords: [
          'mobile',
          'desktop',
          'responsive',
          'touch',
          'screen size',
          'context',
        ],
      },
      {
        text: 'Describe your process for conducting user research.',
        keywords: [
          'user research',
          'methodology',
          'interviews',
          'testing',
          'synthesis',
        ],
      },
      {
        text: 'How would you improve the user experience of an existing product?',
        keywords: [
          'ux improvement',
          'analysis',
          'user feedback',
          'iteration',
          'testing',
        ],
      },
      {
        text: 'What is your approach to creating a design system?',
        keywords: [
          'design system',
          'components',
          'consistency',
          'documentation',
          'scalability',
        ],
      },
      {
        text: 'How do you measure the success of a design?',
        keywords: [
          'success metrics',
          'usability',
          'analytics',
          'user satisfaction',
          'kpis',
        ],
      },
      {
        text: 'Explain the concept of design thinking and its phases.',
        keywords: [
          'design thinking',
          'empathize',
          'define',
          'ideate',
          'prototype',
          'test',
        ],
      },
      {
        text: 'How would you handle conflicting feedback from stakeholders?',
        keywords: [
          'stakeholder management',
          'feedback',
          'prioritization',
          'negotiation',
          'alignment',
        ],
      },
      {
        text: 'What tools do you use for prototyping and why?',
        keywords: ['prototyping', 'figma', 'sketch', 'tools', 'fidelity'],
      },
      {
        text: 'How do you ensure accessibility in your designs?',
        keywords: [
          'accessibility',
          'wcag',
          'aria',
          'contrast',
          'keyboard navigation',
          'testing',
        ],
      },
      {
        text: 'Describe your experience with A/B testing for design decisions.',
        keywords: [
          'a/b testing',
          'experimentation',
          'data-driven',
          'metrics',
          'validation',
        ],
      },
    ],
    Senior: [
      {
        text: 'How would you establish a UX culture in an organization?',
        keywords: [
          'ux culture',
          'advocacy',
          'education',
          'process',
          'leadership',
        ],
      },
      {
        text: 'Describe your approach to leading a design team.',
        keywords: [
          'leadership',
          'mentorship',
          'collaboration',
          'team growth',
          'process',
        ],
      },
      {
        text: 'How do you balance user needs with business goals?',
        keywords: [
          'user needs',
          'business goals',
          'trade-offs',
          'alignment',
          'strategy',
        ],
      },
      {
        text: 'What is your strategy for scaling design processes?',
        keywords: [
          'scaling',
          'design systems',
          'processes',
          'efficiency',
          'consistency',
        ],
      },
      {
        text: 'How would you approach designing for emerging technologies?',
        keywords: [
          'emerging technologies',
          'innovation',
          'experimentation',
          'research',
          'adaptation',
        ],
      },
      {
        text: 'Describe your experience with cross-cultural design.',
        keywords: [
          'cross-cultural',
          'localization',
          'internationalization',
          'research',
          'adaptation',
        ],
      },
      {
        text: 'How do you incorporate data and analytics into design decisions?',
        keywords: [
          'data-driven design',
          'analytics',
          'metrics',
          'insights',
          'validation',
        ],
      },
      {
        text: 'What is your approach to managing design debt?',
        keywords: [
          'design debt',
          'consistency',
          'refactoring',
          'prioritization',
          'systems',
        ],
      },
      {
        text: 'How would you conduct a comprehensive UX audit?',
        keywords: [
          'ux audit',
          'heuristic evaluation',
          'analytics',
          'user testing',
          'recommendations',
        ],
      },
      {
        text: 'Describe your strategy for building and maintaining a design system at scale.',
        keywords: [
          'design system',
          'governance',
          'documentation',
          'adoption',
          'evolution',
        ],
      },
    ],
  },
};

/**
 * Get questions for a specific role and seniority
 */
export function getQuestions(role: Role, seniority: Seniority): Question[] {
  return QUESTIONS[role][seniority];
}

/**
 * Get keywords for a specific role (aggregated from all questions)
 */
export function getRoleKeywords(role: Role, seniority: Seniority): string[] {
  const questions = getQuestions(role, seniority);
  const allKeywords = questions.flatMap((q) => q.keywords);
  return [...new Set(allKeywords)]; // Remove duplicates
}
