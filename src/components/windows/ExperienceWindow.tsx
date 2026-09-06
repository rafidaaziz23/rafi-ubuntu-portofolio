import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Briefcase, GraduationCap, MapPin, Calendar, Terminal } from "lucide-react";

interface ExperienceWindowProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  controlledMaximized?: boolean;
  onToggleMaximize?: () => void;
}

const EXPERIENCE_DATA = [
  {
    type: "work",
    role: "Full-Stack Developer",
    company: "PT. Elnusa Petrofin",
    location: "Jakarta (Remote)",
    date: "Apr 2023 - Dec 2025",
    bullets: [
      "Developed and maintained core backend services using NestJS, Prisma, and PostgreSQL, handling daily operational workloads and scheduled data pipelines across multiple fleet branches.",
      "Integrated Elasticsearch to index shipment tracking and driver performance data, significantly speeding up complex search filters and operational dashboard queries.",
      "Built and optimized API endpoints serving both SSR (Remix.js) and CSR (React/Next.js) frontends, ensuring fast load times and clean state handling.",
      "Implemented unit and integration tests using Jest for critical business workflows to prevent regression bugs in production releases."
    ]
  },
  {
    type: "work",
    role: "Full-Stack Developer (Intern)",
    company: "PT. Sekawan Media Informatika",
    location: "Malang",
    date: "Apr 2021 - Dec 2021",
    bullets: [
      "Built fullstack modules for client web applications using PHP (CodeIgniter HMVC) and JavaScript, covering MVC controllers, database queries, and UI templates.",
      "Helped troubleshoot bugs, test features, and maintain existing code to keep applications running stably during development."
    ]
  }
];

const EDUCATION_DATA = [
  {
    type: "edu",
    degree: "Bachelor of Informatics (S1-PJJ Informatika)",
    school: "Asia Cyber University (Universitas Siber Asia)",
    location: "Remote",
    date: "2022 - Present",
    bullets: [
      "Thesis: Comparative Analysis of Clustering Algorithms (FCM vs. GMM) for Dynamic Difficulty Adjustment."
    ]
  },
  {
    type: "edu",
    degree: "Vocational High School Diploma in Software Engineering",
    school: "SMK Negeri 4 Malang",
    location: "Malang",
    date: "Graduated: Sep 2022",
    bullets: []
  }
];

export function ExperienceWindow({
  isOpen,
  onClose,
  className = "",
  controlledMaximized,
  onToggleMaximize,
}: ExperienceWindowProps) {
  const [internalClosed, setInternalClosed] = useState(false);
  const [internalMaximized, setInternalMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<"work" | "edu">("work");

  const isMaximized = controlledMaximized ?? internalMaximized;
  const isVisible = isOpen && !internalClosed;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalClosed(true);
    onClose();
  };

  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleMaximize) {
      onToggleMaximize();
    } else {
      setInternalMaximized(!internalMaximized);
    }
  };

  if (!isVisible) return null;

  const data = activeTab === "work" ? EXPERIENCE_DATA : EDUCATION_DATA;

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`w-full font-sans select-none flex flex-col ${
          isMaximized
            ? "fixed inset-0 z-50 rounded-none max-w-none h-screen"
            : "max-w-5xl mx-auto rounded-xl shadow-2xl shadow-black/85 ring-1 ring-white/10 h-[80vh] md:h-[650px] max-h-[85vh]"
        } bg-[#1E1E1E] text-zinc-200 overflow-hidden ${className}`}
      >
        {/* Header */}
        <header className="relative flex items-center justify-between px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#2C001E] via-[#241f23] to-[#1E1E1E] border-b border-black/50 select-none">
          {/* Traffic Light Controls */}
          <div className="flex items-center gap-2 z-10 group/traffic">
            <button
              onClick={handleClose}
              title="Close"
              className="w-3.5 h-3.5 rounded-full bg-[#E95420] flex items-center justify-center shadow-sm border border-red-900/30"
            >
              <X className="w-2.5 h-2.5 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleToggleMaximize}
              title={isMaximized ? "Restore Window" : "Expand Window"}
              className="w-3.5 h-3.5 rounded-full bg-[#38B44A] flex items-center justify-center shadow-sm border border-emerald-900/30"
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          {/* Window Title */}
          <div className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-semibold text-sm text-zinc-200">System Logs Viewer</span>
            <span className="text-[10px] text-zinc-400">/var/log/career.log</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#121212] flex flex-col md:flex-row min-h-0">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 p-4 shrink-0 bg-[#18181A]">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">Log Categories</h3>
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              <button
                onClick={() => setActiveTab("work")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm ${
                  activeTab === "work" 
                    ? "bg-[#E95420]/20 text-[#E95420] font-semibold" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Work Experience</span>
              </button>
              <button
                onClick={() => setActiveTab("edu")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm ${
                  activeTab === "edu" 
                    ? "bg-[#38B44A]/20 text-[#38B44A] font-semibold" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </button>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="flex-1 p-6 md:p-8 bg-[#121212] overflow-y-auto custom-scrollbar">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Terminal className={`w-6 h-6 ${activeTab === 'work' ? 'text-[#E95420]' : 'text-[#38B44A]'}`} />
                <h2 className="text-xl font-semibold text-white">
                  {activeTab === "work" ? "Professional Background" : "Academic Records"}
                </h2>
              </div>

              <div className="relative border-l-2 border-white/10 ml-3 md:ml-4 space-y-10 pb-4">
                {data.map((item, idx) => (
                  <div key={idx} className="relative pl-6 md:pl-8 group">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-[#121212] ${
                      activeTab === 'work' ? 'bg-[#E95420]' : 'bg-[#38B44A]'
                    }`} />
                    
                    {/* Content */}
                    <div className="flex flex-col gap-1 mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {activeTab === "work" ? (item as any).role : (item as any).degree}
                      </h3>
                      <div className="text-base text-zinc-300 font-medium">
                        {activeTab === "work" ? (item as any).company : (item as any).school}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs font-mono text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    {item.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="text-sm text-zinc-400 leading-relaxed flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
