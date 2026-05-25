import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Mail, X, User, Phone, MapPin, Baby, Target, Briefcase, CircleDashed, Building2, Lock, ShieldCheck, Eye, FileText, Award, TrendingUp, Shield, LogIn, ClipboardCheck, Wallet, ArrowRight, Star, CheckCircle2 } from "lucide-react";

const PROBLEM_CARDS = [
  {
    title: "Built without a plan",
    explanation: "No defined goal, clear path, or view of progress.",
    image: "/card1.png"
  },
  {
    title: "Competes with everything else",
    explanation: "Gets mixed into your own finances, competing with every other priority and losing its original purpose.",
    image: "/card2.png"
  },
  {
    title: "Still just savings",
    explanation: "Can remain money on paper, instead of real support when life choices begin.",
    image: "/card3.png"
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [problemActiveIndex, setProblemActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaStep, setCtaStep] = useState<'initial' | 'form' | 'success'>('initial');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (ctaStep === 'success') {
      timer = setTimeout(() => {
        setCtaStep('initial');
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [ctaStep]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % PROBLEM_CARDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="fixed inset-0 bg-[#fffdf7] p-2 md:p-3 font-sans selection:bg-[#1E4B99]/30 overflow-hidden flex flex-col">
      {/* Scrollable Canvas Frame */}
      <main 
        className="relative flex-1 w-full h-full bg-[#102142] rounded-[20px] md:rounded-[24px] overflow-y-auto overflow-x-hidden scrollbar-hide"
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 100)}
      >
        
        {/* Navigation Overlay (Zero Height Sticky Wrapper) */}
        <div className="sticky top-0 z-50 w-full h-0 overflow-visible pointer-events-none text-[#102142]">
          <nav className={`absolute top-0 left-0 w-full transition-all duration-300 ease-in-out ${isScrolled ? 'pt-4 px-4 md:pt-6 md:px-6' : 'pt-0 px-0'}`}>
            <div className="w-full flex justify-center pointer-events-auto">
              <div 
                className={`w-full flex items-center justify-between transition-all duration-300 ease-in-out mx-auto ${
                  isScrolled 
                    ? 'bg-[#FFFFFF] rounded-[50px] px-5 py-2.5 md:px-8 md:py-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-black/5' 
                    : 'bg-transparent rounded-none px-6 sm:px-8 md:px-16 lg:px-24 py-4 md:py-6 shadow-none border border-transparent'
                }`}
                style={{
                  maxWidth: isScrolled ? '1200px' : '100%'
                }}
              >
                <div className="flex items-center relative z-20">
                  <img src="logo.png" alt="ForThem Logo" className={`w-auto object-contain mix-blend-multiply transition-all duration-500 flex-shrink-0 ${isScrolled ? 'h-9 md:h-12' : 'h-16 md:h-[80px] lg:h-[100px]'}`} />
                </div>
                
                <div className="flex items-center relative z-20">
                   <button
                     onClick={() => setIsModalOpen(true)}
                     className={`transition-all duration-300 ease-in-out flex items-center gap-2 font-bold ${
                       isScrolled 
                         ? 'opacity-100 translate-y-0 pointer-events-auto bg-[#173973] text-[#FFFFFF] px-5 py-2.5 rounded-full text-sm shadow-md hover:bg-[#1B4388] hover:shadow-lg' 
                         : 'opacity-0 translate-y-2 pointer-events-none bg-transparent text-[#102142] px-6 py-2.5 rounded-full text-sm'
                     }`}
                     aria-hidden={!isScrolled}
                   >
                     Show interest
                     <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isScrolled ? 'translate-x-0' : 'translate-x-0.5'}`} />
                   </button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] flex flex-col md:flex-row md:items-center overflow-hidden bg-[#fffdf7]">
          
          {/* Left Column - Text Content */}
          <div className="w-full mx-auto px-6 sm:px-8 md:px-16 lg:px-24 pt-24 lg:pt-32 pb-4 md:pb-0 relative z-20 order-1 md:order-none pointer-events-none flex flex-col justify-center h-full">
            <div className="flex flex-col items-start w-full md:w-[60%] lg:w-[50%] xl:w-[45%] pointer-events-auto text-left mt-2 md:mt-4 lg:mt-[-1rem]">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[32px] md:text-[40px] lg:text-[44px] font-extrabold tracking-tight text-[#102142] mb-5 leading-[1.12] text-left"
              >
                Build a dedicated <br /> financial base <br /> for your child
              </motion.h1>

              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[16px] md:text-[18px] text-[#102142] max-w-xl mb-8 font-normal text-left leading-[1.5]"
              >
                You want to give your child a stronger start in life. <br /> We help you make it happen.
              </motion.p>

              {/* Trigger Button */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center md:items-start gap-4 mt-2 w-full md:-ml-2"
              >
                <div className="flex flex-col items-center md:items-start w-fit">
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05, backgroundColor: '#142952' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#102142] text-[#FFFFFF] py-[14px] rounded-[2rem] font-bold text-[17px] shadow-md hover:bg-[#142952] hover:shadow-lg transition-all flex items-center justify-center gap-3 w-[260px] md:w-[310px]"
                  >
                    Show interest
                  </motion.button>
                  <p className="text-[13px] md:text-[14px] font-medium text-[#102142]/70 flex items-center justify-center md:justify-start gap-2 mt-3.5 w-full md:px-1">
                    <Mail className="w-[18px] h-[18px] opacity-60" strokeWidth={1.5} />
                    Be the first to know when we launch
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column / Background - Graphic */}
          <div className="relative flex-1 w-full md:absolute md:inset-0 z-0 order-2 md:order-none flex items-center justify-center mt-2 md:mt-0">
            {/* Mobile / Tablet Image (< 768px) */}
            <img 
              src="/bg-mobile.png" 
              alt="Child's Future Investment Illustration Mobile"
              className="block md:hidden relative w-full h-auto max-h-[45vh] object-contain object-bottom overflow-visible"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/bg.png';
              }}
              referrerPolicy="no-referrer"
            />
            {/* Desktop Image (>= 768px) */}
            <img 
              src="/bg.png" 
              alt="Child's Future Investment Illustration Desktop"
              className="hidden md:block absolute inset-0 w-full h-full object-cover object-[center_center]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2670';
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

      {/* Problem & Insights Section */}
      <section className="bg-[#fffdf7] w-full relative z-10 py-12 md:py-8 overflow-hidden min-h-[min(100dvh,800px)] flex flex-col justify-center">

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="mx-auto max-w-3xl text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-[#102142] tracking-tight mb-3 leading-tight">
              Are your savings actually becoming your child’s financial base?
            </h2>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Money meant for your child is often scattered, mixed with your own finances, and doesn’t reach them when it matters most.
            </p>
          </div>

          <div 
            className="flex md:grid flex-row md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 lg:gap-8 w-auto md:w-full mt-4 pb-6 md:pb-0 scrollbar-hide -mx-4 px-[7.5vw] sm:-mx-6 sm:px-[7.5vw] md:mx-0 md:px-0"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onScroll={(e) => {
              if (window.innerWidth < 768) {
                const scrollLeft = e.currentTarget.scrollLeft;
                const parentCenter = scrollLeft + e.currentTarget.clientWidth / 2;
                const children = Array.from(e.currentTarget.children) as HTMLElement[];
                let closestIndex = 0;
                let minDiff = Infinity;
                children.forEach((child, idx) => {
                  const childCenter = child.offsetLeft + child.offsetWidth / 2;
                  const diff = Math.abs(childCenter - parentCenter);
                  if (diff < minDiff) {
                    minDiff = diff;
                    closestIndex = idx;
                  }
                });
                setProblemActiveIndex(closestIndex);
              }
            }}
          >
            {PROBLEM_CARDS.map((card, idx) => {
               return (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.15, duration: 0.6, type: "spring", bounce: 0.4 }} 
                    className="relative w-[85vw] md:w-full shrink-0 snap-center snap-always rounded-[1.5rem] bg-[#FFFFFF] p-2.5 border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col z-10 hover:shadow-[0_16px_48px_rgba(30,75,153,0.12)] transition-all duration-500 group hover:-translate-y-1"
                 >
                    {/* Top: Image Container */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 md:mb-4 shrink-0 group-hover:scale-[0.98] transition-transform duration-500">
                      <img 
                         src={card.image} 
                         alt={card.title} 
                         className="absolute inset-0 w-full h-full object-cover mix-blend-multiply origin-top" 
                         referrerPolicy="no-referrer" 
                      />
                    </div>
                    
                    {/* Bottom: Text Content */}
                    <div className="flex flex-col px-3 pb-3 md:pb-4 flex-1">
                       <h3 className="text-lg md:text-xl font-bold text-[#102142] mb-1.5 md:mb-2 leading-tight tracking-tight">
                         {card.title}
                       </h3>
                       <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                         {card.explanation}
                       </p>
                    </div>
                 </motion.div>
               );
            })}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-0 mb-4">
            {PROBLEM_CARDS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  problemActiveIndex === idx ? "w-6 bg-[#102142]" : "w-1.5 bg-[#102142]/20"
                }`}
              />
            ))}
          </div>

        </div>


      </section>

      {/* Dark Footer Stats Bar (Ticker Tape) */}
      <section className="bg-[#102142] w-full relative z-0 overflow-hidden py-10 md:py-12 flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-black mb-8 text-center tracking-tight text-[#FFFFFF] drop-shadow-sm">
            What parents told us
          </h3>
          
          {/* Infinite Marquee Container */}
          <div className="w-full relative flex overflow-hidden group">
            {/* Fade masks for edges */}
            <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#102142] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#102142] to-transparent z-20 pointer-events-none"></div>

            <motion.div 
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            >
              {/* First Set of Stats */}
              <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
                <div className="flex flex-col items-center justify-center min-w-[240px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">72<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">save without a goal or a plan</span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[240px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">78<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">do it through their own finances or accounts</span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[260px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">81<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">didn’t achieve the financial base they planned</span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[240px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">93<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">said children received support too late</span>
                </div>
              </div>

              {/* Duplicate Set of Stats for Seamless Loop */}
              <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
                <div className="flex flex-col items-center justify-center min-w-[240px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">72<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">save without a goal or a plan</span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[240px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">78<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">do it through their own finances or accounts</span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[260px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">81<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">didn’t achieve the financial base they planned</span>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[240px]">
                  <span className="text-4xl md:text-5xl font-black text-[#1E4B99] mb-2 tracking-tighter">93<span className="text-3xl text-[#173973]">%</span></span>
                  <span className="text-sm font-bold text-[#FFFFFF] whitespace-normal text-center leading-tight">said children received support too late</span>
                </div>
              </div>
            </motion.div>
          </div>
      </section>

      {/* ForThem's Approach Section (3 Pillars) */}
      <section className="bg-[#fffdf7] border-t border-gray-200 w-full min-h-[min(100dvh,800px)] flex flex-col justify-center relative z-10 py-12 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <div className="flex items-center justify-center text-[#1E4B99] font-bold text-xs uppercase tracking-widest mb-1.5">
              <span>Your intent, our system</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#102142] tracking-tight mb-1.5 leading-[1.1]">
              A dedicated financial base for your child, now possible.
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">
              We help you build it step by step, so what you want for your child can take shape over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-2">
            {/* Pillar 1: One clear system */}
            <div className="relative w-full rounded-[1.5rem] bg-[#FFFFFF] p-2.5 border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col z-10 hover:shadow-[0_16px_48px_rgba(30,75,153,0.12)] transition-all duration-500 group hover:-translate-y-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-2 shrink-0 group-hover:scale-[0.98] transition-transform duration-500">
                 <img src="/pillar1.png" alt="One clear system" className="absolute inset-0 w-full h-full object-cover scale-[1.15] mix-blend-multiply origin-top" />
              </div>
              <div className="flex flex-col px-2 pb-2 flex-1 relative z-10">
                <h3 className="text-base md:text-lg font-black text-[#102142] mb-1 tracking-tight">One clear system</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  All in one place with a clear goal, plan, and progress you can track.
                </p>
              </div>
            </div>

            {/* Pillar 2: Truly dedicated for them */}
            <div className="relative w-full rounded-[1.5rem] bg-[#FFFFFF] p-2.5 border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col z-10 hover:shadow-[0_16px_48px_rgba(30,75,153,0.12)] transition-all duration-500 group hover:-translate-y-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-2 shrink-0 group-hover:scale-[0.98] transition-transform duration-500">
                 <img src="/pillar2.png" alt="Truly dedicated for them" className="absolute inset-0 w-full h-full object-cover scale-[1.15] mix-blend-multiply origin-top" />
              </div>
              <div className="flex flex-col px-2 pb-2 flex-1 relative z-10">
                <h3 className="text-base md:text-lg font-black text-[#102142] mb-1 tracking-tight">Truly dedicated for them</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Separate from everyday finances and meant only for your child.
                </p>
              </div>
            </div>

            {/* Pillar 3: There when it matters most */}
            <div className="relative w-full rounded-[1.5rem] bg-[#FFFFFF] p-2.5 border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col z-10 hover:shadow-[0_16px_48px_rgba(30,75,153,0.12)] transition-all duration-500 group hover:-translate-y-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-2 shrink-0 group-hover:scale-[0.98] transition-transform duration-500">
                 <img src="/pillar3.png" alt="There when it matters most" className="absolute inset-0 w-full h-full object-cover scale-[1.15] mix-blend-multiply origin-top" />
              </div>
              <div className="flex flex-col px-2 pb-2 flex-1 relative z-20">
                <h3 className="text-base md:text-lg font-black text-[#102142] mb-1 tracking-tight">There when it matters most</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  Designed to support your child in life’s key moments and through the unexpected.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

        {/* Features Section removed/replaced above; skipping How It Works to match strict spec */}

      {/* Trust Section - White Minimalist Style */}
      <section className="w-full bg-[#fffdf7] min-h-[min(100dvh,750px)] py-12 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden flex flex-col justify-center">
        <div className="max-w-6xl mx-auto relative z-10 w-full">
            
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-[#102142] tracking-tight mb-2 leading-tight">
                Trust is built into everything we do
              </h2>
              <p className="text-base md:text-lg text-gray-500 font-medium">
                With regulated partners, secure systems, and transparent processes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              
              {/* Card 1: Regulated Partners */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="relative overflow-hidden flex flex-col items-center text-center p-8 rounded-[32px] bg-[#FFFFFF]  border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(30,75,153,0.1)] hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E4B99]/10 flex items-center justify-center mb-6 relative z-10">
                  <Building2 className="w-8 h-8 text-[#1E4B99]" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-[#102142] mb-3 relative z-10">Regulated partners</h3>
                <p className="text-gray-500 font-medium leading-relaxed relative z-10">
                  We work only with RBI / SEBI regulated entities.
                </p>
              </motion.div>

              {/* Card 2: Bank-grade Security */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative overflow-hidden flex flex-col items-center text-center p-8 rounded-[32px] bg-[#FFFFFF]  border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(30,75,153,0.1)] hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E4B99]/10 flex items-center justify-center mb-6 relative z-10">
                  <Lock className="w-8 h-8 text-[#1E4B99]" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-[#102142] mb-3 relative z-10">Bank-grade security</h3>
                <p className="text-gray-500 font-medium leading-relaxed relative z-10">
                  Your data is protected using strong security standards.
                </p>
              </motion.div>

              {/* Card 3: Never in our accounts */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative overflow-hidden flex flex-col items-center text-center p-8 rounded-[32px] bg-[#FFFFFF]  border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(30,75,153,0.1)] hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E4B99]/10 flex items-center justify-center mb-6 relative z-10">
                  <ShieldCheck className="w-8 h-8 text-[#1E4B99]" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-[#102142] mb-3 relative z-10">Never in our accounts</h3>
                <p className="text-gray-500 font-medium leading-relaxed relative z-10">
                  Your money moves directly to regulated partner accounts, never ours.
                </p>
              </motion.div>

              {/* Card 4: Transparent fees */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative overflow-hidden flex flex-col items-center text-center p-8 rounded-[32px] bg-[#FFFFFF]  border border-[#FFFFFF] shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(30,75,153,0.1)] hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E4B99]/10 flex items-center justify-center mb-6 relative z-10">
                  <Eye className="w-8 h-8 text-[#1E4B99]" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-[#102142] mb-3 relative z-10">Transparent fees</h3>
                <p className="text-gray-500 font-medium leading-relaxed relative z-10">
                  No hidden charges at any step.
                </p>
              </motion.div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center mb-8">
              <span className="text-2xl" role="img" aria-label="India Flag">🇮🇳</span>
              <span className="text-lg md:text-xl font-medium text-gray-500">
                Hosted securely in India
              </span>
            </div>

          </div>


        </section>

        {/* Final CTA Section */}
        <section className="w-full relative z-10 bg-[#fffdf7] min-h-[min(100dvh,800px)] flex flex-col justify-center" id="cta-section">
          <AnimatePresence mode="wait">
            {ctaStep === 'initial' ? (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#173973] w-full relative py-16 min-h-[min(100dvh,800px)] flex flex-col items-center justify-center overflow-hidden"
              >
                
                {/* Elegant Glowing Orbs - Staticized for performance */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#1E4B99]/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen" />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">


                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FFFFFF] tracking-tight mb-8 leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                    What you want for your child starts here
                  </h2>
                  <p className="text-xl md:text-2xl text-blue-50 font-medium mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] relative z-10">
                    Show your interest today and be the first to know when ForThem launches.
                  </p>
                  
                  <div className="w-full max-w-lg mx-auto space-y-5">
                     <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-[#FFFFFF]  border border-[#FFFFFF] rounded-[24px] shadow-2xl">
                       <input 
                         type="email" 
                         value={ctaEmail}
                         onChange={(e) => setCtaEmail(e.target.value)}
                         placeholder="Email address"
                         className="flex-1 px-6 py-4 rounded-2xl bg-[#FFFFFF] focus:bg-[#FFFFFF] focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all font-medium text-gray-900 placeholder-gray-400 text-lg shadow-inner w-full"
                       />
                       <button 
                         onClick={() => {
                            if(ctaEmail.includes('@')) {
                              setCtaStep('form');
                              document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
                            }
                         }}
                         className="group bg-[#102142] text-[#FFFFFF] px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-[#142952] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 shrink-0 whitespace-nowrap border border-[#102142]/50"
                       >
                         Show interest
                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
                       </button>
                     </div>
                     <div className="flex items-center justify-center gap-2 text-blue-100/60 font-medium text-sm mt-4">
                       <ShieldCheck className="w-4 h-4" />
                       Only updates worth your time.
                     </div>
                  </div>
                </div>
              </motion.div>
            ) : ctaStep === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-[#102142] py-24 px-6 relative overflow-hidden"
              >
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B4388]/40 via-[#142952] to-[#102142] pointer-events-none" />
                 
                 <div className="max-w-[500px] mx-auto bg-[#FFFFFF] rounded-3xl p-8 md:p-10 relative shadow-2xl z-10 text-left">
                    <button 
                      onClick={() => setCtaStep('initial')}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2.5 mb-3">
                       <CheckCircle2 className="w-6 h-6 text-[#173973]" strokeWidth={2.5} />
                       <h2 className="text-2xl font-black text-[#102142] tracking-tight">
                         Thanks for showing interest.
                       </h2>
                    </div>
                    <p className="text-slate-600 font-medium mb-6 text-base">
                       Share a few details so we can learn from parents like you and build ForThem thoughtfully.
                    </p>

                    <form 
                      className="space-y-4" 
                      name="contact"
                      method="POST"
                      data-netlify="true"
                    >
                       <input type="hidden" name="form-name" value="contact" />
                       <div className="space-y-1.5">
                          <label className="text-sm font-bold text-slate-700">Your name</label>
                          <input type="text" name="name" required className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#1E4B99]/20 focus:border-[#1E4B99] outline-none transition-all text-[#102142] font-medium" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-sm font-bold text-slate-700">Email address</label>
                          <input 
                            type="email" 
                            name="email"
                            required 
                            value={ctaEmail}
                            onChange={(e) => setCtaEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#1E4B99]/20 focus:border-[#1E4B99] outline-none transition-all text-[#102142] font-medium" 
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-sm font-bold text-slate-700">Mobile number (+91)</label>
                          <input type="tel" name="mobile" required className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#1E4B99]/20 focus:border-[#1E4B99] outline-none transition-all text-[#102142] font-medium" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-sm font-bold text-slate-700">Child age bracket</label>
                          <div className="relative">
                             <select name="age_bracket" required className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#1E4B99]/20 focus:border-[#1E4B99] outline-none transition-all text-[#102142] font-medium appearance-none">
                                <option value="">Select age bracket</option>
                                <option value="0-5">0-5 years</option>
                                <option value="6-12">6-12 years</option>
                                <option value="13-17">13-17 years</option>
                                <option value="18+">18+ years</option>
                             </select>
                             <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-500">
                                <ChevronRight className="w-5 h-5 rotate-90" />
                             </div>
                          </div>
                       </div>

                       <button 
                         type="submit"
                         className="w-full py-3.5 mt-2 bg-[#173973] hover:bg-[#1B4388] text-[#FFFFFF] rounded-2xl font-bold shadow-md shadow-[#173973]/20 active:scale-[0.98] transition-all flex justify-center items-center h-[50px] text-base"
                       >
                         Submit details
                       </button>
                    </form>

                    <div className="mt-6 text-center border-t border-gray-100 pt-5">
                       <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          We respect your privacy. Your details will only be used for relevant updates and access to ForThem.
                       </p>
                    </div>
                 </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full bg-[#102142] py-32 px-6 relative overflow-hidden flex items-center justify-center min-h-[500px]"
              >
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B4388]/40 via-[#142952] to-[#102142] pointer-events-none" />
                 
                 <div className="max-w-md w-full mx-auto bg-[#FFFFFF] rounded-3xl p-10 text-center relative shadow-2xl z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                       <CheckCircle2 className="w-8 h-8 text-[#1E4B99]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#102142] tracking-tight mb-4">
                      Thank you for sharing your details.
                    </h2>
                    <p className="text-lg text-slate-600 font-medium mb-8">
                       We’ll keep you updated as ForThem takes shape.
                    </p>
                    <button 
                      onClick={() => setCtaStep('initial')}
                      className="w-full py-4 bg-gray-900 hover:bg-black text-[#FFFFFF] rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] text-lg"
                    >
                      Done
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Footer */}
        <footer className="bg-[#fffdf7] w-full pt-16 pb-8 px-6 relative z-10 border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col gap-2 items-start">
                   <img src="logo.png" alt="ForThem Logo" className="h-8 md:h-10 w-auto object-contain mix-blend-multiply opacity-90" />
                   <span className="text-[#102142]/80 font-medium text-sm mt-2">A dedicated financial base for your child.</span>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center text-[#102142]/80 font-medium text-sm">
                   <a href="mailto:hello@forthem.finance" className="hover:text-[#102142] transition-colors flex items-center gap-2">
                     <Mail className="w-4 h-4" />
                     hello@forthem.finance
                   </a>
                   <a href="#" className="hover:text-[#102142] transition-colors">Privacy Policy</a>
                   <a href="#" className="hover:text-[#102142] transition-colors">Terms of Service</a>
                </div>
             </div>
             
             <div className="flex flex-col items-center gap-4 border-t border-gray-200 pt-8 text-center mt-4">
                <p className="text-[#102142]/50 text-xs max-w-3xl leading-relaxed">
                  Financial disclaimer: Investing in securities markets is subject to market risks. Read all the related documents carefully before investing. ForThem is a technology platform and not a registered investment advisor.
                </p>
                <p className="text-[#102142]/60 text-sm font-medium">
                  © 2026 ForThem. All rights reserved.
                </p>
             </div>
          </div>
        </footer>

      </main>

      {/* Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#102142]/90 "
            />
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
               >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10">
                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="text-[#173973]">✓</span> Thanks for showing interest.
                      </h2>
                      <p className="text-gray-500 font-medium">Share a few details so we can learn from parents like you and build ForThem thoughtfully.</p>
                    </div>

                    <form className="space-y-4" name="contact" method="POST" data-netlify="true">
                      <input type="hidden" name="form-name" value="contact" />
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          required
                          name="name"
                          type="text" 
                          placeholder="Your name" 
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E4B99]/20 focus:border-[#1E4B99] transition-all font-medium text-sm"
                        />
                      </div>
                      
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          required
                          name="mobile"
                          type="tel" 
                          placeholder="Mobile number (+91)" 
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E4B99]/20 focus:border-[#1E4B99] transition-all font-medium text-sm"
                        />
                      </div>

                      <div className="relative">
                        <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select name="age_bracket" required className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1E4B99]/20 focus:border-[#1E4B99] transition-all font-medium text-sm appearance-none">
                          <option value="">Child age bracket</option>
                          <option value="0-5">0 - 5 years</option>
                          <option value="6-12">6 - 12 years</option>
                          <option value="13-17">13 - 17 years</option>
                          <option value="18+">18+ years</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#173973] text-[#FFFFFF] py-4 rounded-2xl font-bold text-base shadow-xl shadow-[#173973]/20 hover:bg-[#1B4388] hover:shadow-2xl transition-all mt-4 flex items-center justify-center gap-2"
                      >
                        Submit details
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      <p className="text-center text-xs font-medium text-gray-400 mt-4 leading-relaxed px-4">
                        We respect your privacy. Your details will only be used for relevant updates and access to ForThem.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-blue-100 text-[#173973] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Baby className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                       <span className="text-[#1E4B99] w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg">✓</span> 
                       Thank you for sharing your details.
                    </h2>
                    <p className="text-gray-500 max-w-sm mx-auto font-medium mb-8">
                       We’ll keep you updated as ForThem takes shape.
                    </p>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-100 text-gray-800 px-8 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
