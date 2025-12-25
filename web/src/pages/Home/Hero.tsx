import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import studentImage from "../../assets/studying.png";

const Hero = () => {
  const constraintsRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), springConfig);

  useEffect(() => {
    const rotateBackground = () => {
      animate(0, 360, {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        onUpdate: (latest) => {
          document.documentElement.style.setProperty('--gradient-rotation', `${latest}deg`);
        }
      });
    };
    rotateBackground();
  }, []);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } = constraintsRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) / 10);
    mouseY.set((clientY - centerY) / 10);
  };

  const FloatingParticle = ({ delay, duration, size, color, position }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [position.x, position.x + 100, position.x],
        y: [position.y, position.y - 150, position.y]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute ${size} ${color} rounded-full blur-sm`}
    />
  );

  return (
    <div 
      ref={constraintsRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center px-4 overflow-hidden "
      style={{
        background: `linear-gradient(var(--gradient-rotation, 45deg), 
          rgb(15 23 42) 0%, 
          rgb(30 58 138) 30%, 
          rgb(6 78 59) 70%, 
          rgb(12 74 110) 100%)`
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Floating Particles */}
      <FloatingParticle delay={0} duration={6} size="w-4 h-4" color="bg-cyan-400" position={{ x: '10%', y: '20%' }} />
      <FloatingParticle delay={2} duration={8} size="w-6 h-6" color="bg-emerald-400" position={{ x: '80%', y: '40%' }} />
      <FloatingParticle delay={4} duration={7} size="w-3 h-3" color="bg-blue-400" position={{ x: '20%', y: '80%' }} />
      <FloatingParticle delay={1} duration={9} size="w-5 h-5" color="bg-teal-400" position={{ x: '90%', y: '10%' }} />

      {/* Magnetic Cursor */}
      

      {/* Animated Orb Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute w-[200vh] h-[200vh] bg-gradient-conic from-cyan-500/10 via-blue-500/10 to-emerald-500/10 rounded-full animate-spin [animation-duration:20s]"
      />

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10">
        
        {/* Text Content - Premium */}
        <div className="space-y-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-black text-white leading-tight"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Government
                </span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-white"
                >
                  Schemes
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-white"
                >
                  Reimagined
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light"
            >
              AI-powered platform that matches you with perfect government schemes. 
              <span className="font-semibold text-cyan-300"> Smart, Fast, and Personalized </span>
              recommendations for your unique needs.
            </motion.p>
          </div>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex gap-12"
          >
            {[
              { number: "500+", label: "Schemes", color: "text-cyan-400" },
              { number: "50K+", label: "Users", color: "text-blue-400" },
              { number: "95%", label: "Success", color: "text-emerald-400" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className={`text-3xl font-bold ${stat.color} group-hover:drop-shadow-glow transition-all duration-300`}>
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium mt-1 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Advanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r mb-5 from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-3">
                Get Started Free
                <motion.svg
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>

            
          </motion.div>
        </div>

        {/* 3D Visual Content */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative perspective-1000"
        >
          {/* Main 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative transform-style-3d"
          >
            {/* Card Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl rounded-full"
              style={{ transform: "translateZ(-20px)" }}
            />

            {/* Floating Elements */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={studentImage}
                alt="JanaSev - Government Schemes"
                className="w-full max-w-md mx-auto object-contain drop-shadow-2xl rounded-full"
              />
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="absolute -top-4 -left-4 bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex items-center gap-3 text-white font-bold">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                Education
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 border-2 border-white rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.1, y: 5 }}
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-500 p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex items-center gap-3 text-white font-bold">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                Agriculture
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 border-2 border-white rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              whileHover={{ scale: 1.1, x: -5 }}
              className="absolute top-1/2 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <div className="w-2 h-2 bg-white rounded-full" />
                Women
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Advanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-sm text-cyan-300/80 font-light tracking-widest">SCROLL TO EXPLORE</span>
          <div className="w-px h-16 bg-gradient-to-b from-cyan-400/50 to-transparent relative">
            <motion.div
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-4 bg-cyan-400 rounded-full absolute top-0"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Background Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none" />
    </div>
  );
};

export default Hero;

// Add this to your global CSS
const globalStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  .drop-shadow-glow {
    filter: drop-shadow(0 0 8px currentColor);
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-3d {
    transform-style: preserve-3d;
  }
`;