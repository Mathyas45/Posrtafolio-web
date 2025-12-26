import { ArrowRight, ExternalLink, Github, ChevronUp, ChevronLeft, ChevronRight, Star, Code, ChevronDown, MoveRight, Filter, Sparkles, Award, Zap, Play, Eye, Calendar, Users, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Vecinos 360",
    category: "Full Stack",
    description: "Sistema web para gestión integral de comunidades residenciales. Soporte continuo y desarrollo de nuevas funcionalidades. Backend robusto y lógica de negocio compleja.",
    image: "/projects/vecinos360.png",
    gallery: [
      "/projects/vecinos360.png",
      "/projects/vecinos360-1.png",
      "/projects/vecinos360-2.png",
      "/projects/vecinos360-3.png"
    ],
    video: "/projects/videos/vecinos360-demo.mp4",
    tags: ["PHP", "Laravel", "Kotlin", "MySQL", "HTML", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    accentColor: "from-emerald-500 to-teal-600",
    status: "En Producción",
    highlights: ["Gestión de comunidades", "Backend y lógica de negocio", "Sistema en producción"]
  },
  {
    id: 2,
    title: "Sogu Constructora",
    category: "Full Stack",
    description: "Web corporativa profesional con sistema interno integrado. Apoyo en la construcción completa del sistema para gestión empresarial.",
    image: "/projects/sogu.png",
    gallery: [
      "/projects/sogu.png",
      "/projects/sogu-1.png",
      "/projects/sogu-2.png"
    ],
    video: "/projects/videos/sogu-demo.mp4",
    tags: ["PHP", "MySQL", "Bootstrap"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    accentColor: "from-blue-500 to-cyan-600",
    status: "Completado",
    highlights: ["Web corporativa", "Sistema interno", "Gestión empresarial"]
  },
  {
    id: 3,
    title: "Sistema ATU - Backend",
    category: "Backend",
    description: "Backend robusto con Spring Boot para gestión de trámites, reclamos y estados. Apoyo en construcción del backend y documentación completa del sistema. APIs REST con arquitectura limpia.",
    image: "/projects/atu.png",
    gallery: [
      "/projects/atu.png",
      "/projects/atu-1.png",
      "/projects/atu-2.png"
    ],
    video: "/projects/videos/atu-demo.mp4",
    tags: ["Spring Boot", "Java", "REST APIs", "Arquitectura Limpia"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    accentColor: "from-green-500 to-emerald-600",
    status: "Completado",
    highlights: ["Backend Spring Boot", "Gestión de trámites", "Documentación completa"]
  },
  {
    id: 4,
    title: "Sistema de Cotización de Préstamos Bancarios",
    category: "Full Stack",
    description: "Proyecto de Maestría en Ingeniería de Software. Sistema completo con backend Spring Boot, panel administrativo Angular y aplicación móvil Kotlin. JWT, roles, permisos y arquitectura en capas.",
    image: "/projects/cotizacion-bancaria.png",
    gallery: [
      "/projects/cotizacion-bancaria.png",
      "/projects/cotizacion-bancaria-1.png",
      "/projects/cotizacion-bancaria-2.png",
      "/projects/cotizacion-bancaria-3.png",
      "/projects/cotizacion-bancaria-4.png"
    ],
    video: "/projects/videos/banking-demo.mp4",
    tags: ["Spring Boot", "Angular", "Kotlin", "JWT", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    accentColor: "from-purple-500 to-indigo-600",
    status: "Proyecto de Maestría",
    highlights: ["Backend Spring Boot", "Panel Angular", "App móvil Kotlin", "Arquitectura en capas"]
  },
  {
    id: 5,
    title: "Sistema Odontológico Universitario",
    category: "Backend",
    description: "Backend para sistema médico de facultad de odontología. Módulos de usuarios, estudiantes, docentes, pacientes, odontograma, citas, fichas sintomatológicas y registro de pacientes.",
    image: "/projects/odontologia.png",
    gallery: [
      "/projects/odontologia.png",
      "/projects/odontologia-1.png",
      "/projects/odontologia-2.png"
    ],
    video: "/projects/videos/odonto-demo.mp4",
    tags: ["Laravel", "PHP", "MySQL", "REST API"],
    demoUrl: "#",
    githubUrl: "#",
    accentColor: "from-rose-500 to-pink-600",
    status: "Completado",
    highlights: ["Múltiples módulos", "Sistema médico", "Gestión de pacientes"]
  },
  {
    id: 6,
    title: "Sistema Punto de Venta",
    category: "Full Stack",
    description: "Sistema completo de punto de venta con PHP puro, MySQL y Bootstrap. Patrón MVC con módulos de productos, ventas, usuarios, clientes, trabajadores, asistencia, reportes y tipo de cambio desde API.",
    image: "/projects/pos.png",
    gallery: [
      "/projects/pos.png",
      "/projects/pos-1.png",
      "/projects/pos-2.png",
      "/projects/pos-3.png"
    ],
    video: "/projects/videos/pos-demo.mp4",
    tags: ["PHP", "MySQL", "Bootstrap", "MVC"],
    demoUrl: "#",
    githubUrl: "#",
    accentColor: "from-amber-500 to-orange-600",
    status: "Completado",
    highlights: ["Patrón MVC", "Gestión completa", "Integración con API"]
  },
  {
    id: 7,
    title: "Adopta Pup",
    category: "Móvil",
    description: "App móvil para adopción de animales abandonados. Android Studio con Kotlin y Firebase. Integración con API para datos de animales. Chatbot con OpenAI para cuidados. Primer lugar en concurso de programación Universidad Continental.",
    image: "/projects/adoptapup.png",
    gallery: [
      "/projects/adoptapup.png",
      "/projects/adoptapup-1.png",
      "/projects/adoptapup-2.png",
      "/projects/adoptapup-3.png",
      "/projects/adoptapup-4.png"
    ],
    video: "/projects/videos/adoptapup-demo.mp4",
    tags: ["Kotlin", "Android Studio", "Firebase", "OpenAI API"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    accentColor: "from-pink-500 to-rose-600",
    status: "1er Lugar en Concurso",
    highlights: ["Chatbot con IA", "Firebase NoSQL", "Primer lugar UC"]
  },
  {
    id: 8,
    title: "Sistema de Asistencias para Personal",
    category: "Full Stack",
    description: "Sistema de control de asistencias con Laravel, MySQL y Bootstrap 5. Implementación de Spatie. Módulos de usuarios, miembros, asistencias, reportes y dashboard interactivo.",
    image: "/projects/asistencias.png",
    gallery: [
      "/projects/asistencias.png",
      "/projects/asistencias-1.png",
      "/projects/asistencias-2.png"
    ],
    video: "/projects/videos/asistencias-demo.mp4",
    tags: ["Laravel", "MySQL", "Bootstrap 5", "Spatie"],
    demoUrl: "#",
    githubUrl: "#",
    accentColor: "from-cyan-500 to-blue-600",
    status: "Completado",
    highlights: ["Control de asistencias", "Dashboard interactivo", "Reportes detallados"]
  },
  {
    id: 9,
    title: "Página Web Médica con Reserva de Citas",
    category: "Full Stack",
    description: "Sitio web médico con sistema de reserva de citas. PHP puro, MySQL, Bootstrap y CSS. Página web informativa y administrador completo con módulos de usuarios, productos y citas.",
    image: "/projects/web-medica.png",
    gallery: [
      "/projects/web-medica.png",
      "/projects/web-medica-1.png",
      "/projects/web-medica-2.png"
    ],
    video: "/projects/videos/medica-demo.mp4",
    tags: ["PHP", "MySQL", "Bootstrap", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
    accentColor: "from-teal-500 to-green-600",
    status: "Completado",
    highlights: ["Sistema de citas", "Panel administrativo", "Web informativa"]
  },
  {
    id: 10,
    title: "Sistema Médico con Node.js",
    category: "Backend",
    description: "Sistema médico completo con arquitectura MVC. Node.js, MySQL y Bootstrap. Módulos de medicamentos, pacientes, consultorios, asistencias de trabajadores y citas médicas con calendario integrado.",
    image: "/projects/sistema-medico-node.png",
    gallery: [
      "/projects/sistema-medico-node.png",
      "/projects/sistema-medico-node-1.png",
      "/projects/sistema-medico-node-2.png"
    ],
    video: "/projects/videos/medico-node-demo.mp4",
    tags: ["Node.js", "MySQL", "Bootstrap", "MVC"],
    demoUrl: "#",
    githubUrl: "#",
    accentColor: "from-indigo-500 to-purple-600",
    status: "Completado",
    highlights: ["Arquitectura MVC", "Calendario de citas", "Gestión completa"]
  }
];

const categoryColors = {
  "Full Stack": "from-emerald-500/20 to-teal-600/20 text-emerald-600 border-emerald-500/30",
  "Backend": "from-blue-500/20 to-cyan-600/20 text-blue-600 border-blue-500/30",
  "Móvil": "from-amber-500/20 to-orange-600/20 text-amber-600 border-amber-500/30",
  "Frontend": "from-purple-500/20 to-indigo-600/20 text-purple-600 border-purple-500/30",
};

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]);

  const filteredProjects = activeFilter === "Todos" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const categories = ["Todos", ...new Set(projects.map(project => project.category))];

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAll(false);
    setIsMobileFilterOpen(false);
  };

  const handleVideoPlay = (project) => {
    setSelectedVideo(project);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  const ProjectHighlights = ({ highlights }) => (
    <div className="space-y-2">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span className="text-muted-foreground">{highlight}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      ref={sectionRef}
    >
      {/* Clean Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4" />
            Mis Proyectos
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Portfolio de
            <span className="block text-primary">Proyectos</span>
          </motion.h2>

          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Una colección de proyectos que he desarrollado para demostrar mis habilidades en desarrollo backend, full stack y arquitectura de software.
          </motion.p>
        </motion.div>

        {/* Simple Filter */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative bg-background border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  
                  {/* Image/Video Section */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === "Live" 
                          ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-600 border border-amber-500/30"
                      }`}>
                        {project.status}
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${categoryColors[project.category]}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <motion.div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    >
                      {/* Video Play Button */}
                      <motion.button
                        onClick={() => handleVideoPlay(project)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-full backdrop-blur-sm border bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300"
                      >
                        <Play size={20} />
                      </motion.button>
                      
                      {/* Code Button */}
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                          project.githubUrl === "#" 
                            ? "bg-gray-500/50 text-gray-300 border-gray-500/30 cursor-not-allowed"
                            : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                        }`}
                        onClick={(e) => project.githubUrl === "#" && e.preventDefault()}
                      >
                        <Code size={20} />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <motion.div 
                          className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 text-xs font-medium border border-amber-500/30"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <Star size={12} className="fill-amber-500" /> 
                          Destacado
                        </motion.div>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-4">
                      <ProjectHighlights highlights={project.highlights} />
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.4 }}
                          className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <motion.button
                        onClick={() => handleProjectDetails(project)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Eye size={16} />
                        Ver Más
                      </motion.button>
                      
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium border transition-all duration-300 ${
                          project.githubUrl === "#"
                            ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                            : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
                        }`}
                        onClick={(e) => project.githubUrl === "#" && e.preventDefault()}
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>

                  {/* Accent Border */}
                  <div className={`h-1 bg-gradient-to-r ${project.accentColor}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredProjects.length > 3 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${
                showAll
                  ? "bg-muted text-foreground border border-border"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {showAll ? (
                <>
                  <ChevronUp size={18} />
                  Mostrar Menos
                </>
              ) : (
                <>
                  Ver Más Proyectos
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Simple CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-background border border-border rounded-2xl p-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Zap className="h-4 w-4" />
              Ponte en Contacto
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Te gusta lo que ves?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Siempre estoy abierto a discutir nuevas oportunidades y proyectos interesantes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                Contáctame
                <ArrowRight size={18} />
              </motion.a>
              
              <motion.a
                href="https://github.com/mathyascoronado"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-medium border border-border text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Github size={18} />
                Ver GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedVideo.title} - Demo
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedVideo.category}
                  </p>
                </div>
                <motion.button
                  onClick={handleCloseVideo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onEnded={handleCloseVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-muted-foreground text-sm flex-1">
                    Mira la demostración de {selectedVideo.title} en acción
                  </p>
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedVideo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedVideo.demoUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                      onClick={(e) => selectedVideo.demoUrl === "#" && e.preventDefault()}
                    >
                      Visitar Sitio
                    </motion.a>
                    <motion.a
                      href={selectedVideo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        selectedVideo.githubUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                          : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
                      }`}
                      onClick={(e) => selectedVideo.githubUrl === "#" && e.preventDefault()}
                    >
                      Ver Código
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal with Gallery */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseDetails}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm flex items-center justify-between p-6 border-b border-border">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {selectedProject.title}
                    </h3>
                    {selectedProject.featured && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 text-xs font-medium border border-amber-500/30">
                        <Star size={12} className="fill-amber-500" /> 
                        Destacado
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[selectedProject.category]}`}>
                      {selectedProject.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedProject.status === "Live" || selectedProject.status === "En Producción"
                        ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-600 border border-amber-500/30"
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={handleCloseDetails}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Image Gallery */}
              <div className="relative aspect-video bg-black">
                {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                  <>
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={selectedProject.gallery[currentImageIndex]}
                      alt={`${selectedProject.title} - Imagen ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Navigation Arrows */}
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <motion.button
                          onClick={handlePrevImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
                        >
                          <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                          onClick={handleNextImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
                        >
                          <ChevronRight size={24} />
                        </motion.button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white backdrop-blur-sm text-sm">
                          {currentImageIndex + 1} / {selectedProject.gallery.length}
                        </div>

                        {/* Thumbnail Navigation */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90%] overflow-x-auto p-2 scrollbar-hide">
                          {selectedProject.gallery.map((img, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              whileHover={{ scale: 1.1 }}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                idx === currentImageIndex
                                  ? "border-primary ring-2 ring-primary/50"
                                  : "border-white/30 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Miniatura ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Project Details */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Code size={18} className="text-primary" />
                    Descripción del Proyecto
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Sparkles size={18} className="text-primary" />
                    Características Principales
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 p-3 rounded-lg bg-muted/50"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Zap size={18} className="text-primary" />
                    Stack Tecnológico
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  {selectedProject.video && (
                    <motion.button
                      onClick={() => {
                        handleCloseDetails();
                        handleVideoPlay(selectedProject);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                    >
                      <Play size={18} />
                      Ver Demo en Video
                    </motion.button>
                  )}
                  
                  <motion.a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedProject.demoUrl === "#"
                        ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                        : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                    }`}
                    onClick={(e) => selectedProject.demoUrl === "#" && e.preventDefault()}
                  >
                    <ExternalLink size={18} />
                    {selectedProject.demoUrl === "#" ? "Próximamente" : "Visitar Sitio"}
                  </motion.a>
                  
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border transition-all duration-300 ${
                      selectedProject.githubUrl === "#"
                        ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                        : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
                    }`}
                    onClick={(e) => selectedProject.githubUrl === "#" && e.preventDefault()}
                  >
                    <Github size={18} />
                    Ver Código
                  </motion.a>
                </div>

                {/* Info Note */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Nota:</strong> Para agregar más imágenes a la galería, coloca las imágenes en <code className="px-1 py-0.5 rounded bg-primary/10 text-primary text-xs">/client/public/projects/</code> y actualiza el array <code className="px-1 py-0.5 rounded bg-primary/10 text-primary text-xs">gallery</code> en el objeto del proyecto.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};