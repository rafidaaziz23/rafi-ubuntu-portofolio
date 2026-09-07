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
    title: 'Maintenance Management System (MMS)',
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
      'PDFKit',
      'ExcelJS',
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
    title: 'Bluefin - Chemical Blending Management',
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
  {
    id: 'peduli-amt',
    title: 'Peduli AMT - Driver Monitoring App',
    category: 'logistics',
    categoryLabel: 'Mobile & Fleet',
    tagline: 'Mobile-First Driver Monitoring & Performance Tracking for Fuel Transport AMT',
    description:
      'Internal mobile application for PT Elnusa Petrofin to monitor Awak Mobil Tangki (AMT) drivers in real-time. The app covers driver login, daily shipment history, performance analytics, point/reward tracking, and driver biodata — all in a mobile-first interface designed for field operations.',
    thumbnail: '/projects/pamt/pamt-thumbnail.png',
    screenshots: [
      {
        src: '/projects/pamt/Login Mobile (Sensored) - Peduli AMT.png',
        caption: 'Login Screen: Company-branded authentication with myElfin ID & secure password entry',
      },
      {
        src: '/projects/pamt/Home Mobile (Sensored) - Peduli AMT.png',
        caption: 'Home Dashboard: Driver profile, live clock, point card, last shipment summary & daily performance stats',
      },
      {
        src: '/projects/pamt/Riwayat Perjalanan Mobile (Sensored) - Peduli AMT.png',
        caption: 'Riwayat Perjalanan: Weekly bar chart (AMT role stacking), paginated shipment history cards',
      },
      {
        src: '/projects/pamt/Riwayat Kinerja Mobile (Sensored) - Peduli AMT.png',
        caption: 'Riwayat Kinerja: Date-range filter with aggregated stats — jam kerja, KM, tonase, ritase & SPBU',
      },
      {
        src: '/projects/pamt/Profil Driver Mobile (Sensored) - Peduli AMT.png',
        caption: 'Profil Driver: FIT/UNFIT status badge, biodata rows with icons, SIM B2 & MCU expiry tracking',
      },
      {
        src: '/projects/pamt/Riwayat Point Mobile (Sensored) - Peduli AMT.png',
        caption: 'Riwayat Point: Point summary card, violation history list, Awards Goals tab & pagination',
      },
    ],
    techStack: [
      'Flutter',
      'Dart',
      'REST APIs',
      'NestJS',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    features: [
      'Real-time driver profile & FIT/UNFIT health status display (MCU tracking)',
      'Weekly shipment history with stacked bar chart (Chart.js style, AMT role breakdown)',
      'Performance analytics with date-range filter — jam kerja, KM tempuh, tonase, ritase',
      'Point & reward system with violation history, deduction log, and Awards Goals',
      'Driver biodata page with SIM B2 & MCU expiry tracking',
    ],
    role: 'Full-Stack Developer (Mobile & Backend)',
    clientOrContext: 'PT Elnusa Petrofin / Pertamina Patra Niaga Group',
    year: '2023 - 2024',
    highlights: [
      'Designed & implemented mobile-first UI reconstructed via Google Stitch from production source',
      'Integrated driver monitoring pipeline with point deduction engine and MCU/SIM compliance checks',
    ],
  },
  {
    id: 'tms-elnusa',
    title: 'Tyre Management System (TMS)',
    category: 'operations',
    categoryLabel: 'Fleet Operations',
    tagline: 'Enterprise Tyre Lifecycle, Axle Position Tracking & Retreading Pipeline for Fuel Tankers',
    description:
      'Enterprise web platform developed for PT Elnusa Petrofin (Pertamina Group) to digitize, monitor, and optimize the complete end-to-end lifecycle of tyre assets across hundreds of Fuel Tank Trucks (Mobil Tangki BBM) nationwide. The system manages unique emboss serial registration, axle wheel positioning, odometer & GPS telemetry, periodic rotation, retreading (vulkanisir) workflow, multi-depo transfers, and scrap disposal/auction.',
    thumbnail: '/projects/tms/tms-thumbnail.png',
    screenshots: [
      {
        src: '/projects/tms/1.png',
        caption: 'Executive Dashboard: Real-time fleet tyre health, tread depth indicators, cost-per-KM analytics & axle wheel inspection',
      },
      {
        src: '/projects/tms/2.png',
        caption: 'Master Inventory & Lifecycle: Unique serial emboss database, multi-depo stock filtering & retreading status tracking',
      },
      {
        src: '/projects/tms/3.png',
        caption: 'Tyre Installation & Axle Form: Digital SPK, wheel position assignment, odometer recording & justification approval workflow',
      },
    ],
    techStack: [
      'Remix.js',
      'React 18',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Prisma ORM',
      'Tailwind CSS',
      'PDFKit',
      'ExcelJS',
    ],
    features: [
      'End-to-end tyre lifecycle tracking with unique emboss serial numbering per unit',
      'Axle wheel position mapping & installation tracking for fuel tank trucks (6x4 rigid & trailers)',
      'Periodic tread depth (RTD) & pressure assessment with mass technician upload',
      'Retreading (vulkanisir) pipeline with digital MPR, vendor PO, and lifespan reset management',
      'Multi-TBBM inventory transfer with real-time digital stock card ledger',
      'Cost per Kilometer (CPK) calculation engine and multi-tier approval justification for premature replacement',
      'Granular role-based access control (RBAC) with dynamic button permissions and plant isolation',
    ],
    role: 'Core Full-Stack Developer',
    clientOrContext: 'PT Elnusa Petrofin (Pertamina Patra Niaga Group)',
    year: '2023 - 2025',
    highlights: [
      'Engineered dedicated SSR-based tyre management platform extracted from MMS into high-throughput operations system',
      'Implemented automated Cost per KM (CPK) metrics and multi-tier digital justification workflows',
    ],
  },
  {
    id: 'aimind-audit',
    title: 'AI-MIND - Internal Audit System',
    category: 'enterprise',
    categoryLabel: 'Enterprise Audit',
    tagline: 'Centralized Internal Audit Monitoring, Document Vault & Compliance Automation',
    description:
      'Enterprise web-based internal audit management platform developed during internship at PT Sekawan Media Informatika for a state-owned mining and minerals holding group. The application solves fragmented audit workflows by providing centralized real-time monitoring of Annual Audit Plans (PKAT), audit execution timelines, finding follow-ups, automated official reporting, and secure master document vaulting.',
    thumbnail: '/projects/aimind/thumbnail-aimind.png',
    screenshots: [
      {
        src: '/projects/aimind/2.png',
        caption: 'Audit Command Center: Real-time PKAT monitoring & evaluation dashboard, achievement metrics, findings & auditor assignments',
      },
      {
        src: '/projects/aimind/1.png',
        caption: 'PKAT Planning Form: Multi-assignment creation, audit category classification, scheduling, and multi-format document attachment',
      },
      {
        src: '/projects/aimind/3.png',
        caption: 'Execution & Timeline Realization: Schedule deviation tracking, mass upload tools, Bank Data repository & activity audit logs',
      },
    ],
    techStack: [
      'PHP (CodeIgniter HMVC)',
      'JavaScript',
      'MySQL',
      'Bootstrap / CSS3',
      'ExcelJS / PHPSpreadsheet',
      'REST APIs',
      'Custom RBAC',
    ],
    features: [
      'Centralized PKAT (Program Kerja Audit Tahunan) planning, review, and approval lifecycle',
      'Bank Data Module: Comprehensive master document vault & evidence management for all audit activities',
      'Automated audit report generator and seamless multi-format export/import (Excel & PDF)',
      'Dynamic Role-Based Access Control (RBAC) with granular button-level and menu security permissions',
      'Timeline realization tracking with schedule deviation indicators and full activity audit logging',
    ],
    role: 'Full-Stack Developer (Intern)',
    clientOrContext: 'State-Owned Mining & Minerals Holding (via PT Sekawan Media Informatika)',
    year: '2021',
    highlights: [
      'Handled end-to-end development of the Bank Data module including schema design, file handling, and UI',
      'Engineered automated Excel/PDF export pipelines and batch import tools for large audit datasets',
      'Implemented dynamic RBAC permission engine providing granular access control across audit roles',
    ],
  },
  {
    id: 'pretrip-inspection',
    title: 'MMS Daily Checklist — Pre-Trip Safety Inspection',
    category: 'logistics',
    categoryLabel: 'Fleet Safety & Logistics',
    tagline: 'Pre-Dispatch Safety Inspection, Automated GO/NO-GO Determination & GPS Telemetry',
    description:
      'Digital safety inspection platform developed for PT Elnusa Petrofin (Pertamina Group) to verify the roadworthiness and HSE compliance of Fuel Tank Trucks (Mobil Tangki BBM) before daily dispatch. The system digitizes paper checklists into an interactive mobile and web interface with real-time GPS telemetry validation, live webcam evidence capture, MinIO cloud storage, and automatic GO / NO-GO roadworthiness determination.',
    thumbnail: '/projects/pretrip/pretrip-thumbnail.png',
    screenshots: [
      {
        src: '/projects/pretrip/1.png',
        caption: 'Operations Monitoring Dashboard: Real-time inspection logs, TBBM multi-depo filter, GO/NO-GO status badges & defect logs',
      },
      {
        src: '/projects/pretrip/2.png',
        caption: 'Digital Pre-Trip Form: Driver & fleet technical identity, odometer tracking, and mandatory physical evidence upload',
      },
      {
        src: '/projects/pretrip/3.png',
        caption: 'Critical Component Inspection & Decision: Automated roadworthiness assessment, mandatory safety checks & field notes',
      },
    ],
    techStack: [
      'Laravel 8',
      'PHP 8',
      'MySQL',
      'Bootstrap 5',
      'REST APIs',
      'MinIO Storage',
      'GPS Telemetry (SCU & TrackSynq)',
      'WebcamJS API',
    ],
    features: [
      'Digital Pre-Trip safety inspection forms (Daily, Weekly, Monthly) for fuel tank fleet operations',
      'Automated GO / NO-GO roadworthiness determination based on critical safety compliance rules',
      'Live camera snapshot integration via WebcamJS API for on-site driver and vehicle verification',
      'Real-time GPS telemetry validation via SCU & TrackSynq APIs (24h ping health check)',
      'Secure photo evidence vault integrated with internal MinIO Object Storage via REST API',
      'Multi-tier review & approval workflow for Field Supervisors, Head Office (HO), and Super Admins',
    ],
    role: 'Full-Stack Developer',
    clientOrContext: 'PT Elnusa Petrofin (Pertamina Group)',
    year: '2023 - 2024',
    highlights: [
      'Replaced paper inspection logs with zero-paper real-time digital pre-trip verification',
      'Integrated automated NO-GO decision engine preventing unfit vehicles from road dispatch',
      'Connected live GPS telemetry checks and MinIO cloud object storage for tamper-proof evidence',
    ],
  },
];
