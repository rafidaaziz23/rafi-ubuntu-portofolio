// src/data/projects.ts

export interface ProjectItem {
  id: string;
  title: string;
  category: 'logistics' | 'enterprise' | 'operations';
  categoryLabel: string;
  tagline: string;
  description: string;
  thumbnail: string;
  screenshots: {
    src: string;
    caption: string;
  }[];
  techStack: string[];
  features: string[];
  role: string;
  highlights?: string[];
  clientOrContext?: string;
  year?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'fleet-management',
    title: 'Fleet Management System',
    category: 'logistics',
    categoryLabel: 'Logistics & Fleet',
    tagline: 'Enterprise Fleet & Shipment Management for Fuel Transport & Heavy Contracts',
    description:
      'High-throughput logistics platform managing end-to-end fuel tank fleet operations (Awak Mobil Tangki), real-time shipment dispatching, automated tariff interpolation, and contractual billing generation.',
    thumbnail: '/projects/fleet-management/00-thumbnail.png',
    screenshots: [
      {
        src: '/projects/fleet-management/fleet-home-censored.png',
        caption: 'Fleet Dashboard: Real-time driver status, shipment dispatch overview, and alert center',
      },
      {
        src: '/projects/fleet-management/fleet-ba-censored.png',
        caption: 'BA & Billing Generator: Automated tariff calculation and digital handoff verification',
      },
      {
        src: '/projects/fleet-management/fleet-login-censored.png',
        caption: 'Secure Enterprise Authentication with role-based access control',
      },
    ],
    techStack: [
      'NestJS',
      'Remix.js',
      'Spring Boot',
      'PostgreSQL',
      'Apache Kafka',
      'Tailwind CSS',
      'Docker',
    ],
    features: [
      'Real-time fleet tracking & driver performance indexing',
      'Event-driven pipeline for shipment events using Apache Kafka',
      'Automated BA & tariff calculation engine with complex business rules',
      'Driver evaluation & mobilization audit log',
    ],
    role: 'Lead Full-Stack / Backend Engineer',
    clientOrContext: 'Elnusa Petrofin / Pertamina Patra Niaga Group',
    year: '2023 - 2025',
    highlights: [
      'Engineered event-driven pipeline handling high-throughput event processing',
      'Implemented robust contract pricing interpolation algorithms',
    ],
  },
  {
    id: 'mms-mining',
    title: 'MMS - Maintenance Management System',
    category: 'enterprise',
    categoryLabel: 'Mining & Materials',
    tagline: 'Heavy Material Logistics, Maintenance Tracking & Inventory Management',
    description:
      'Comprehensive material management and dispatch system tracking bulk material movements, barging shipments, MPR verification, and quality audit trails across mining operations.',
    thumbnail: '/projects/mms/mms-thumbnail.jpg',
    screenshots: [
      {
        src: '/projects/mms/mms-home-censored.png',
        caption: 'Operations Command Center: Active shipments, stockpile levels, and throughput metrics',
      },
      {
        src: '/projects/mms/mms-shipment-censored.png',
        caption: 'Shipment Dispatching & Vessel Loading Schedule',
      },
      {
        src: '/projects/mms/mms-mpr-censored.png',
        caption: 'Material Production Record (MPR) validation & multi-tier approval workflow',
      },
      {
        src: '/projects/mms/mms-login-censored.png',
        caption: 'Enterprise single sign-on & permission segregation',
      },
    ],
    techStack: [
      'NestJS',
      'React.js',
      'Next.js',
      'PostgreSQL',
      'Prisma ORM',
      'Redis',
      'Tailwind CSS',
    ],
    features: [
      'Multi-level approval workflow for material production verification',
      'High-speed stockpile querying and cached analytics using Redis',
      'Vessel & barge consignment tracking with digital manifest generation',
      'Audit-ready reporting conforming to mining compliance standards',
    ],
    role: 'Core Backend & Frontend Developer',
    clientOrContext: 'Mining & Mineral Logistics Operator',
    year: '2023 - 2025',
    highlights: [
      'Optimized database queries for massive shipment ledger datasets',
      'Built responsive UI dashboards with real-time sync',
    ],
  },
  {
    id: 'bluefin-erp',
    title: 'Bluefin Chemical Blending Management',
    category: 'operations',
    categoryLabel: 'SAP Operations',
    tagline: 'Operational Scheduling, Inventory Management & SAP',
    description:
      'Internal operations hub providing centralized stock ledger management, automated calendar dispatching, supplier coordination, and asset tracking.',
    thumbnail: '/projects/bluefin/bluefin-thumbnail.png',
    screenshots: [
      {
        src: '/projects/bluefin/inventory.png',
        caption: 'Inventory Control: Real-time stock valuation, reorder thresholds, and bin locations',
      },
      {
        src: '/projects/bluefin/calender.png',
        caption: 'Operations Calendar: Shift allocation, vehicle maintenance, and dispatch schedules',
      },
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'REST APIs',
      'PostgreSQL',
    ],
    features: [
      'Interactive visual operations calendar with drag-and-drop scheduling',
      'Real-time inventory levels, low-stock warnings, and barcode ledger tracking',
      'Role-based staff scheduling and maintenance work order assignments',
    ],
    role: 'Full-Stack Developer',
    clientOrContext: 'Supply Chain & Equipment Services',
    year: '2023 - 2024',
    highlights: [
      'Streamlined daily inventory auditing and maintenance turnaround times',
    ],
  },
];
