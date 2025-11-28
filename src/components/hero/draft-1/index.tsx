// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Briefcase, 
  Award, 
  Linkedin, 
  Moon, 
  Sun,
  Globe,
  Menu,
  X
} from 'lucide-react';

// --- Configuration & Data ---

const THEMES = {
  blue: {
    name: 'Tech Blue',
    primary: 'rgb(21, 95, 255)', // Bright Blue
    secondary: 'rgb(12, 55, 97)', // Dark Navy
    accent: '#60A5FA',
    bg: '#050505',
    text: '#ffffff',
    gradient: 'from-[#155FFF] to-[#0C3761]',
    button: 'bg-[#155FFF] hover:bg-[#0C3761]',
  },
  rust: {
    name: 'Future Rust',
    primary: 'rgb(233, 94, 40)', // Rust Orange
    secondary: 'rgb(122, 52, 24)', // Dark Brown
    accent: '#FDBA74',
    bg: '#080504',
    text: '#ffffff',
    gradient: 'from-[#E95E28] to-[#7A3418]',
    button: 'bg-[#E95E28] hover:bg-[#7A3418]',
  }
};

const ALUMNI_DATA = [
  { id: 1, name: "Sarah J.", role: "SDE II", company: "Google", img: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Mike T.", role: "Frontend Lead", company: "Amazon", img: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Priya R.", role: "Full Stack", company: "Netflix", img: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "David L.", role: "Backend Eng", company: "Uber", img: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Alex K.", role: "Product Eng", company: "Meta", img: "https://i.pravatar.cc/150?u=5" },
  { id: 6, name: "James B.", role: "DevOps", company: "Microsoft", img: "https://i.pravatar.cc/150?u=6" },
  { id: 7, name: "Tara S.", role: "Data Sci", company: "Spotify", img: "https://i.pravatar.cc/150?u=7" },
  { id: 8, name: "Chen W.", role: "Mobile Dev", company: "Airbnb", img: "https://i.pravatar.cc/150?u=8" },
  { id: 9, name: "Fiona G.", role: "Security", company: "Cloudflare", img: "https://i.pravatar.cc/150?u=9" },
  { id: 10, name: "Omar H.", role: "Tech Lead", company: "Oracle", img: "https://i.pravatar.cc/150?u=10" },
];

const METRICS = [
  { label: "Career Transitions", value: "12,000+", icon: <TrendingUp size={20} /> },
  { label: "Average Hike", value: "125%", icon: <Award size={20} /> },
  { label: "Highest CTC", value: "₹1.2 Cr", icon: <Briefcase size={20} /> },
  { label: "Success Rate", value: "96%", icon: <CheckCircle size={20} /> },
];

const COURSES = [
  { 
    id: 1, 
    title: "Full Stack Development Masterclass", 
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    highlights: ["MERN Stack", "System Design", "AWS Deployment"],
    instructorsFrom: ["Google", "Microsoft", "Atlassian"]
  },
  { 
    id: 2, 
    title: "Data Structures & Algorithms Elite", 
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    highlights: ["300+ Problems", "Competitive Coding", "Mock Interviews"],
    instructorsFrom: ["Meta", "Uber", "Apple"]
  },
  { 
    id: 3, 
    title: "System Design for Professionals", 
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    highlights: ["HLD & LLD", "Scalability", "Microservices"],
    instructorsFrom: ["Netflix", "Airbnb", "Twitter"]
  },
  { 
    id: 4, 
    title: "Data Science & AI Bootcamp", 
    thumbnail: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    highlights: ["Python", "TensorFlow", "Generative AI"],
    instructorsFrom: ["OpenAI", "DeepMind", "Amazon"]
  }
];

const DETAILED_REVIEWS = [
  {
    id: 1,
    name: "Rahul Verma",
    role: "Software Engineer",
    text: "The structured path and the mentorship were game changers. I moved from a service-based company to a product giant in just 6 months.",
    avatar: "https://i.pravatar.cc/150?u=10",
    from: "TCS",
    to: "Microsoft",
    hike: "150%"
  },
  {
    id: 2,
    name: "Sneha Gupta",
    role: "Senior Backend Dev",
    text: "System design interviews were my nightmare. This course broke it down so simply. Highly recommended for experienced folks.",
    avatar: "https://i.pravatar.cc/150?u=20",
    from: "Infosys",
    to: "Uber",
    hike: "200%"
  },
  {
    id: 3,
    name: "John Doe",
    role: "SDE-1",
    text: "I was struggling with DSA. The visual explanations and pattern recognition techniques helped me crack 4 offers.",
    avatar: "https://i.pravatar.cc/150?u=30",
    from: "Capgemini",
    to: "Amazon",
    hike: "110%"
  }
];

const COMPACT_REVIEWS = [
  { id: 1, name: "A. Kumar", from: "Wipro", to: "Google", hike: "300%" },
  { id: 2, name: "B. Singh", from: "HCL", to: "Atlassian", hike: "180%" },
  { id: 3, name: "C. Patel", from: "Accenture", to: "Salesforce", hike: "210%" },
  { id: 4, name: "D. Rao", from: "Tech M", to: "Intuit", hike: "140%" },
  { id: 5, name: "E. Das", from: "Cognizant", to: "Adobe", hike: "175%" },
];

const BLOGS = [
  { id: 1, title: "Cracking the System Design Interview", desc: "Top 5 patterns you need to know for HLD rounds.", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { id: 2, title: "The Future of AI in EdTech", desc: "How LLMs are reshaping the way we learn to code.", img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { id: 3, title: "Salary Trends in 2025", desc: "Which tech stack pays the most this year?", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
];

const COMPANIES = ["Google", "Microsoft", "Amazon", "Netflix", "Meta", "Uber", "Adobe", "Salesforce", "Atlassian", "Twitter", "Airbnb", "Spotify"];

// --- Components ---

const Navbar = ({ theme, currentTheme, toggleTheme }: {theme: unknown, currentTheme: unknown, toggleTheme: unknown}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: `${theme.bg}CC` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: theme.primary }}></div>
            <span className="text-2xl font-bold tracking-tighter text-white">Tutort<span style={{ color: theme.primary }}>Academy</span></span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Courses</a>
            <a href="#" className="hover:text-white transition-colors">Placements</a>
            <a href="#" className="hover:text-white transition-colors">Reviews</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white"
              title="Switch Theme"
            >
              {currentTheme === 'blue' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-orange-400" />}
            </button>
            <button 
              className="hidden md:block px-6 py-2.5 rounded-full font-bold text-white transition-all transform hover:scale-105"
              style={{ backgroundColor: theme.primary }}
            >
              Login
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full p-4 border-b border-white/10 shadow-xl" style={{ backgroundColor: theme.bg }}>
          <div className="flex flex-col space-y-4 font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Courses</a>
            <a href="#" className="hover:text-white transition-colors">Placements</a>
            <a href="#" className="hover:text-white transition-colors">Reviews</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
            <button 
              className="w-full py-3 rounded-lg font-bold text-white mt-4"
              style={{ backgroundColor: theme.primary }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const RadarGraph = ({ theme }: {theme: unknown}) => {
  const radius = 220;
  // Updated labels to be broader than just courses
  const labels = ["Placements", "Avg Hike", "Flexibility", "Curriculum", "Mentorship"];
  const ticks = [0.2, 0.4, 0.6, 0.8, 1];
  
  // Data points updated to reflect high scores in these new categories
  const dataValues = [0.95, 0.9, 0.85, 0.95, 0.9]; 

  const getPoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return `${Math.cos(angle) * radius * value},${Math.sin(angle) * radius * value}`;
  };

  const getLabelPos = (index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const padding = 30;
    return {
      x: Math.cos(angle) * (radius + padding),
      y: Math.sin(angle) * (radius + padding)
    };
  };

  const polygonPoints = dataValues.map((val, i) => getPoint(val, i, dataValues.length)).join(" ");

  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
      <svg width="600" height="600" viewBox="-300 -300 600 600" className="opacity-30">
        {/* Radar Background Webs */}
        {ticks.map((tick, tIndex) => (
          <polygon
            key={tIndex}
            points={labels.map((_, i) => getPoint(tick, i, labels.length)).join(" ")}
            fill="none"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {labels.map((label, i) => {
          const endPoint = getPoint(1, i, labels.length);
          const labelPos = getLabelPos(i, labels.length);
          return (
            <g key={i}>
              <line x1="0" y1="0" x2={endPoint.split(',')[0]} y2={endPoint.split(',')[1]} stroke="white" strokeOpacity="0.1" />
              <text 
                x={labelPos.x} 
                y={labelPos.y} 
                textAnchor="middle" 
                alignmentBaseline="middle" 
                fill="gray" 
                fontSize="14"
                fontWeight="bold"
                className="font-sans uppercase tracking-wider"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Data Shape */}
        <motion.polygon
          points={polygonPoints}
          fill={theme.primary}
          fillOpacity="0.2"
          stroke={theme.primary}
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Glowing Data Points */}
        {dataValues.map((val, i) => {
          const pt = getPoint(val, i, labels.length);
          return (
             <circle key={i} cx={pt.split(',')[0]} cy={pt.split(',')[1]} r="4" fill={theme.accent} />
          );
        })}
      </svg>
    </div>
  );
};

const Hero = ({ theme }: {theme: unknown}) => {
  const [activeSet, setActiveSet] = useState(0); // 0 for first 5, 1 for next 5

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSet(prev => (prev === 0 ? 1 : 0));
    }, 4000); // Switch every 4 seconds
    return () => clearInterval(timer);
  }, []);

  // Filter alumni based on active set
  const currentAlumni = activeSet === 0 ? ALUMNI_DATA.slice(0, 5) : ALUMNI_DATA.slice(5, 10);
  const rotationOffset = activeSet === 0 ? 0 : 36; // Shift angles for the second set so they appear in new positions

  return (
    <div className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: theme.primary }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: theme.secondary }} />

      <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-6 text-gray-300">
            🚀 New Batch starting Nov 30th
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
            Master the Code,<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.accent})` }}>
              Own Your Future.
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-lg">
            Our alumni work at top-tier product companies. We don't just teach coding; we engineer careers.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="px-8 py-4 rounded-lg font-bold text-lg text-white shadow-lg shadow-black/20 hover:shadow-xl transition-all transform hover:-translate-y-1" style={{ backgroundColor: theme.primary }}>
              Explore Courses
            </button>
            <button className="px-8 py-4 rounded-lg font-bold text-lg text-white border border-white/20 hover:bg-white/5 transition-all">
              Download Syllabus
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {METRICS.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-gray-500 mb-1">{metric.icon}</div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Interactive Radar & Alumni Orbit */}
        {/* Mobile Optimization: Added scale-[0.6] md:scale-100 to prevent overflow on mobile */}
        <div className="relative h-[450px] md:h-[600px] flex items-center justify-center scale-[0.6] md:scale-100 origin-center">
          
          {/* Radar Background */}
          <RadarGraph theme={theme} />
          
          {/* Central Logo/Text */}
          <motion.div 
            className="w-32 h-32 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 z-20 text-center p-4 shadow-2xl relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ boxShadow: `0 0 40px ${theme.primary}40` }}
          >
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-[10px] text-gray-400">Commitment</div>
            </div>
          </motion.div>

          {/* Floating Alumni Cards */}
          <AnimatePresence mode="wait">
            {currentAlumni.map((alum, idx) => {
              // Calculate positions for a circular layout
              const totalInSet = 5;
              const angleDeg = (idx / totalInSet) * 360 + rotationOffset;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 240; // Slightly larger than radar
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              return (
                <motion.div
                  key={alum.id}
                  className="absolute z-30"
                  initial={{ opacity: 0, scale: 0, x: x, y: y }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: [x, x + (Math.random() * 10 - 5)], 
                    y: [y, y + (Math.random() * 10 - 5)] 
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: idx * 0.1, // Stagger effect
                    ease: "backOut"
                  }}
                  style={{ top: '50%', left: '50%', marginLeft: -80, marginTop: -30 }} 
                >
                  <div 
                    className="w-48 p-3 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-3 hover:scale-110 transition-transform cursor-pointer shadow-lg"
                    style={{ backgroundColor: `${theme.secondary}95`, borderColor: `${theme.primary}40` }}
                  >
                    <img src={alum.img} alt={alum.name} className="w-10 h-10 rounded-full border-2 border-white/20" />
                    <div>
                      <div className="text-white font-bold text-sm">{alum.name}</div>
                      <div className="text-xs text-gray-300 flex items-center gap-1">
                        {alum.role} @ <span style={{ color: theme.accent }}>{alum.company}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Marquee = ({ children, direction = "left", speed = 20 }: {children: React.ReactNode, direction: unknown, speed: number}) => (
  <div className="overflow-hidden flex relative z-10 w-full">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: direction === "left" ? "-50%" : "0%" }}
      initial={{ x: direction === "left" ? "0%" : "-50%" }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
    >
      <div className="flex gap-16 px-8">{children}</div>
      <div className="flex gap-16 px-8">{children}</div>
    </motion.div>
  </div>
);

const HiringPartners = ({ theme }: {theme: unknown}) => (
  <div className="py-12 border-y border-white/5 bg-black/20">
    <div className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">Trusted by Hiring Partners</div>
    <Marquee speed={30}>
      {COMPANIES.map((company, idx) => (
        <span key={idx} className="text-2xl font-bold text-gray-400 flex items-center gap-2">
          <Globe size={18} style={{ color: theme.primary }} /> {company}
        </span>
      ))}
    </Marquee>
  </div>
);

const CoursesSection = ({ theme }: {theme: unknown}) => (
  <section className="py-24 relative">
    <div className="max-w-7xl mx-auto px-4 mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">Master In-Demand Skills</h2>
      <div className="w-20 h-1 rounded-full" style={{ backgroundColor: theme.primary }}></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {COURSES.map((course) => (
        <motion.div 
          key={course.id}
          whileHover={{ y: -10 }}
          className="group rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F0F] hover:border-white/20 transition-all duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
              <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-xs text-white font-medium">Live Classes</span>
              <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-xs text-white font-medium">Placement Asst.</span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.accent})` }}>
              {course.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {course.highlights.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded border border-white/10 text-gray-400">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Instructors from</p>
              <div className="flex gap-4">
                {course.instructorsFrom.map((inst, i) => (
                  <span key={i} className="flex items-center gap-1 text-sm text-gray-300 font-semibold">
                    <img src={`https://ui-avatars.com/api/?name=${inst}&background=random&color=fff&size=20`} className="rounded-full w-5 h-5" alt="" />
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full mt-6 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 group-hover:bg-white/10 transition-colors" style={{ border: `1px solid ${theme.primary}` }}>
              View Curriculum <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const DetailedTestimonials = ({ theme }: {theme: unknown}) => {
  const scrollRef = useRef(null);

  return (
    <section className="py-24 bg-black/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Success Stories</h2>
          <p className="text-gray-400">Real people, real growth.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth'})} className="p-3 rounded-full border border-white/10 text-white hover:bg-white/10"><ArrowRight className="rotate-180" /></button>
          <button onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth'})} className="p-3 rounded-full border border-white/10 text-white hover:bg-white/10"><ArrowRight /></button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 md:px-[max(1rem,calc((100vw-80rem)/2))] pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {DETAILED_REVIEWS.map((review) => (
          <motion.div 
            key={review.id}
            className="min-w-[350px] md:min-w-[450px] snap-center bg-[#0F0F0F] rounded-2xl p-8 border border-white/5 relative group"
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 left-0 w-2 h-full rounded-l-2xl" style={{ backgroundColor: theme.primary }} />
            
            <p className="text-lg text-gray-300 mb-8 italic leading-relaxed">"{review.text}"</p>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full ring-2 ring-white/10" />
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
              <a href="#" className="text-[#0077b5] hover:scale-110 transition-transform"><Linkedin /></a>
            </div>

            <div className="mt-6 flex items-center justify-between bg-black/30 rounded-lg p-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">From</div>
                <div className="font-bold text-gray-300">{review.from}</div>
              </div>
              <ArrowRight className="text-gray-600" size={16} />
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">To</div>
                <div className="font-bold text-white">{review.to}</div>
              </div>
              <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">Hike</div>
                <div className="font-bold text-xl" style={{ color: theme.accent }}>{review.hike}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CompactTestimonials = ({ theme }: {theme: unknown}) => (
  <section className="py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-xl text-center text-gray-400 mb-8">Recent Placements</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {COMPACT_REVIEWS.map((review) => (
          <motion.div 
            key={review.id}
            whileHover={{ scale: 1.05 }}
            className="bg-[#111] border border-white/5 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2"
          >
            <div className="text-3xl font-bold" style={{ color: theme.primary }}>{review.hike}</div>
            <div className="text-xs text-gray-400">Hike</div>
            <div className="flex items-center gap-2 text-sm text-white font-medium mt-2">
              <span className="text-gray-500">{review.from}</span>
              <ArrowRight size={12} className="text-gray-600" />
              <span>{review.to}</span>
            </div>
            <div className="text-[10px] text-gray-600 mt-1">{review.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PlatformRatings = () => (
  <section className="py-12 bg-black">
    <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
      {[
        { name: "Google Reviews", rating: "4.9/5", stars: 5 },
        { name: "CourseReport", rating: "4.8/5", stars: 5 },
        { name: "TrustPilot", rating: "4.9/5", stars: 5 },
      ].map((platform, idx) => (
        <div key={idx} className="pt-4 md:pt-0">
          <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{platform.name}</h4>
          <div className="text-3xl font-bold text-white mb-2">{platform.rating}</div>
          <div className="flex justify-center gap-1 text-yellow-400">
            {[...Array(platform.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const BlogSection = ({ theme }: {theme: unknown}) => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-white mb-12">Latest Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOGS.map((blog) => (
          <div key={blog.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl mb-4 relative h-56">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.accent})` }}>
              {blog.title}
            </h3>
            <p className="text-gray-400 text-sm">{blog.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = ({ theme }: {theme: unknown}) => (
  <section className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900" />
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${theme.primary} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
    
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
        Ready to <br />
        <span style={{ color: theme.primary }}>Level Up?</span>
      </h2>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
        Join the elite community of developers who are shaping the future. Your dream company is just one course away.
      </p>
      <button 
        className="px-12 py-5 rounded-full text-xl font-bold text-white shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-1"
        style={{ backgroundColor: theme.primary }}
      >
        Start Learning Now
      </button>
    </div>
  </section>
);

const Footer = ({ theme }: {theme: unknown}) => (
  <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="space-y-4">
        <span className="text-2xl font-bold text-white">Tutort<span style={{ color: theme.primary }}>Academy</span></span>
        <p className="text-gray-500 text-sm">Building the next generation of tech leaders through premium mentorship and industry-aligned curriculum.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Courses</h4>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li>Full Stack Web Dev</li>
          <li>System Design</li>
          <li>Data Structures</li>
          <li>Data Science</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Company</h4>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li>About Us</li>
          <li>Careers</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Legal</h4>
        <ul className="space-y-2 text-gray-500 text-sm">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Refund Policy</li>
        </ul>
      </div>
    </div>
    <div className="text-center text-gray-600 text-xs">
      © 2024 Tutort Academy. All rights reserved.
    </div>
  </footer>
);

// --- Main App Component ---

export default function HeroDraft2() {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const theme = THEMES[currentTheme];

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'blue' ? 'rust' : 'blue');
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <Navbar theme={theme} currentTheme={currentTheme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero theme={theme} />
        <HiringPartners theme={theme} />
        <CoursesSection theme={theme} />
        
        {/* Placement Marquee - 2 Rows */}
        <div className="py-12 bg-[#0A0A0A]">
           <div className="text-center mb-8">
              <h3 className="text-white font-bold text-2xl">Where our students work</h3>
           </div>
           <Marquee direction="left" speed={40}>
              {COMPANIES.map((c, i) => <span key={i} className="text-lg font-bold text-gray-500 opacity-50">{c}</span>)}
           </Marquee>
           <div className="h-4"></div>
           <Marquee direction="right" speed={40}>
              {COMPANIES.reverse().map((c, i) => <span key={i} className="text-lg font-bold text-gray-500 opacity-50">{c}</span>)}
           </Marquee>
        </div>

        <DetailedTestimonials theme={theme} />
        <CompactTestimonials theme={theme} />
        <PlatformRatings />
        <BlogSection theme={theme} />
        <CTA theme={theme} />
      </main>
      
      <Footer theme={theme} />
    </div>
  );
}