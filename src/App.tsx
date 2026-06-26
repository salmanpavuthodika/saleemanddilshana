import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ExternalLink,
  Info
} from "lucide-react";
import EnvelopeEntrance from "./components/EnvelopeEntrance";
import ScratchCard from "./components/ScratchCard";
import WishesSection from "./components/WishesSection";
import GallerySection from "./components/GallerySection";

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // References for parallax scrolling effects
  const heroRef = useRef<HTMLDivElement>(null);
  const messageSleeveRef = useRef<HTMLDivElement>(null);

  // 1. Hero Scroll Transformations (Smooth Title Scaling & Background Dim)
  const heroScroll = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(heroScroll.scrollYProgress, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(heroScroll.scrollYProgress, [0, 0.8], [1, 0]);

  // 2. Invitation Message Sliding Out of Envelope Sleeve on Scroll
  const messageScroll = useScroll({
    target: messageSleeveRef,
    offset: ["start end", "end start"]
  });
  // Card slides upwards out of its pocket sleeve
  const cardY = useTransform(messageScroll.scrollYProgress, [0.05, 0.55], [160, -60]);
  const cardScale = useTransform(messageScroll.scrollYProgress, [0.05, 0.55], [0.93, 1.03]);

  // 3. Photo Parallax is handled dynamically within GallerySection

  // 4. Background scroll-linked parallax elements for subtle 3D depth
  const { scrollY } = useScroll();
  const decoY1 = useTransform(scrollY, [0, 1000], [0, -120]);
  const decoY2 = useTransform(scrollY, [0, 2500], [0, 180]);
  const decoY3 = useTransform(scrollY, [0, 4000], [0, -150]);
  const decoY4 = useTransform(scrollY, [0, 5000], [0, 100]);

  // Live Countdown Timer to 27 July 2026
  useEffect(() => {
    const targetDate = new Date("July 27, 2026 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="microsite-root" className="min-h-screen paper-texture text-[#4A3B32] font-sans relative overflow-x-hidden antialiased">
      
      {/* 1. Fullscreen Wax-Sealed Envelope Entrance Overlay */}
      <EnvelopeEntrance onOpen={() => setIsEnvelopeOpened(true)} />

      {/* Main Content (Visible under the envelope but scroll-blocked/non-interactive until opened) */}
      <div 
        id="main-invitation-site" 
        className={`transition-all duration-1000 ${isEnvelopeOpened ? "opacity-100 blur-0 pointer-events-auto" : "opacity-0 blur-md pointer-events-none h-screen overflow-hidden"}`}
      >
        
        {/* Subtle global decorative gold frame on edges */}
        <div className="fixed inset-3 md:inset-6 border border-[#C2A289]/15 rounded-2xl pointer-events-none z-40" />
        <div className="fixed inset-4 md:inset-7 border border-[#C2A289]/5 rounded-2xl pointer-events-none z-40" />

        {/* Floating Background Parallax Ornaments */}
        <motion.div 
          style={{ y: decoY1 }}
          className="absolute left-[5%] top-[120vh] text-[#C2A289]/15 pointer-events-none z-0 hidden lg:block select-none"
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C60 30, 90 40, 100 50 C90 60, 60 70, 50 100 C40 70, 10 60, 0 50 C10 40, 40 30, 50 0 Z" />
          </svg>
        </motion.div>
        <motion.div 
          style={{ y: decoY2 }}
          className="absolute right-[8%] top-[240vh] text-[#C2A289]/12 pointer-events-none z-0 hidden lg:block select-none"
        >
          <svg width="160" height="160" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 15 C55 35, 75 45, 95 50 C75 55, 55 65, 50 85 C45 65, 25 55, 5 50 C25 45, 45 35, 50 15 Z" />
          </svg>
        </motion.div>
        <motion.div 
          style={{ y: decoY3 }}
          className="absolute left-[6%] top-[360vh] text-[#C2A289]/15 pointer-events-none z-0 hidden lg:block select-none"
        >
          <svg width="140" height="140" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 5 L55 35 L85 40 L58 55 L65 85 L50 65 L35 85 L42 55 L15 40 L45 35 Z" />
          </svg>
        </motion.div>
        <motion.div 
          style={{ y: decoY4 }}
          className="absolute right-[5%] top-[480vh] text-[#C2A289]/12 pointer-events-none z-0 hidden lg:block select-none"
        >
          <svg width="130" height="130" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C60 30, 90 40, 100 50 C90 60, 60 70, 50 100 C40 70, 10 60, 0 50 C10 40, 40 30, 50 0 Z" />
          </svg>
        </motion.div>

        {/* --- HERO SECTION --- */}
        <div 
          ref={heroRef}
          id="hero-section"
          className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden border-b border-[#DCD0C0]/50"
        >
          {/* Parallax Background */}
          <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-[0.03]"
            style={{ y: heroY, scale: 1.1 }}
          />
          <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/20 via-[#FAF7F2]/85 to-[#FAF7F2]" />

          {/* Golden Arch Accent Line */}
          <motion.div 
            className="w-24 h-24 mb-6 border-t border-l border-r border-[#C2A289]/30 rounded-t-full flex items-center justify-center relative opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={isEnvelopeOpened ? { opacity: 0.8, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C2A289] text-lg">
              ✦
            </div>
            {/* Glowing dot */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C2A289] rounded-full shadow-md shadow-[#C2A289]/40" />
          </motion.div>

          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="max-w-3xl z-10 space-y-4"
          >
            {/* Islamic Quranic Verse/Bismillah calligraphy subtitle */}
            <span className="block font-serif italic text-[#7E5E4E] text-sm tracking-wide md:text-base max-w-xl mx-auto px-4 leading-relaxed">
              "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
              <span className="block font-sans text-[9px] uppercase tracking-widest text-[#A68F80] mt-2">
                — SURAH AR-RUM [30:21]
              </span>
            </span>

            {/* Floral Golden Divider */}
            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#C2A289]/40" />
              <span className="text-[#C2A289] text-xs">✿</span>
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#C2A289]/40" />
            </div>

            {/* Wedding celebration tag */}
            <span className="block font-sans text-[10px] md:text-xs tracking-[0.25em] text-[#A68F80] font-semibold uppercase">
              THE WEDDING CELEBRATION OF
            </span>

            {/* Couples Names Display */}
            <h1 className="font-decorative text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A3B32] py-2 leading-tight">
              Mohammed Saleem
            </h1>
            
            <p className="font-serif italic text-lg md:text-xl text-[#C2A289] my-1">
              &
            </p>

            <h1 className="font-decorative text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A3B32] py-2 leading-tight">
              Dhilshana Suman
            </h1>

            {/* Subtle separator */}
            <div className="py-6 flex justify-center items-center">
              <div className="w-1 h-1 rounded-full bg-[#DCD0C0] mx-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C2A289] mx-1 shadow-sm" />
              <div className="w-1 h-1 rounded-full bg-[#DCD0C0] mx-1" />
            </div>

            {/* Mini location summary */}
            <p className="font-serif italic text-sm md:text-base text-[#8C7A6B] max-w-md mx-auto">
              Join us in our joy as we embark on a lifetime of faith, love, and devotion.
            </p>
          </motion.div>

          {/* Bounce Down Indicator */}
          <motion.div 
            className="absolute bottom-10 z-10 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => {
              document.getElementById("interactive-date-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-sans text-[9px] tracking-widest uppercase text-[#A68F80] font-semibold">
              Scroll down to reveal invite
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C2A289]" />
          </motion.div>
        </div>


        {/* --- SECTION: LIVE COUNTDOWN & DATE CARDS --- */}
        <section 
          id="interactive-date-section"
          className="relative py-20 px-6 max-w-5xl mx-auto space-y-16"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-2"
          >
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-[#A68F80] uppercase block">
              SAVE THE DATE
            </span>
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-[#4A3B32]">
              Scratch to Reveal the Date
            </h2>
          </motion.div>

          {/* 3 Interactive Scratch Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <ScratchCard label="Wedding Day" value="27" hint="Scratch Day" />
            <ScratchCard label="Wedding Month" value="JULY" hint="Scratch Month" />
            <ScratchCard label="Wedding Year" value="2026" hint="Scratch Year" />
          </motion.div>

          {/* Countdown timer container */}
          <motion.div 
            id="countdown-timer" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#FAF8F5] border border-[#DCD0C0] rounded-2xl p-8 max-w-3xl mx-auto relative overflow-hidden shadow-[0_15px_40px_rgba(163,117,109,0.05)]"
          >
            <div className="absolute inset-0 islamic-pattern opacity-[0.04]" />
            
            <div className="relative z-10 text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C2A289]" />
                <span className="font-sans text-[10px] font-semibold tracking-widest text-[#8C7A6B] uppercase">
                  TIME REMAINING UNTIL THE UNION
                </span>
              </div>

              {/* Countdown Grid */}
              <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
                {/* Days */}
                <div className="bg-white border border-[#E3DAC9] rounded-xl p-3 sm:p-5 flex flex-col justify-center items-center shadow-sm">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#7E5E4E]">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[9px] font-semibold text-[#A68F80] tracking-wider uppercase mt-1">
                    Days
                  </span>
                </div>

                {/* Hours */}
                <div className="bg-white border border-[#E3DAC9] rounded-xl p-3 sm:p-5 flex flex-col justify-center items-center shadow-sm">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#7E5E4E]">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[9px] font-semibold text-[#A68F80] tracking-wider uppercase mt-1">
                    Hours
                  </span>
                </div>

                {/* Minutes */}
                <div className="bg-white border border-[#E3DAC9] rounded-xl p-3 sm:p-5 flex flex-col justify-center items-center shadow-sm">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#7E5E4E]">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[9px] font-semibold text-[#A68F80] tracking-wider uppercase mt-1">
                    Mins
                  </span>
                </div>

                {/* Seconds */}
                <div className="bg-white border border-[#E3DAC9] rounded-xl p-3 sm:p-5 flex flex-col justify-center items-center shadow-sm">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#7E5E4E]">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[9px] font-semibold text-[#A68F80] tracking-wider uppercase mt-1">
                    Secs
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </section>


        {/* --- SECTION: ENVELOPE SCROLL REVEAL MESSAGE --- */}
        <section 
          ref={messageSleeveRef}
          id="scroll-envelope-section"
          className="relative py-24 px-4 bg-gradient-to-b from-[#FAF7F2] via-[#FAF8F5] to-[#FAF7F2] border-t border-b border-[#DCD0C0]/40 overflow-hidden flex flex-col items-center justify-center min-h-[640px]"
        >
          {/* Parallax background geometric details */}
          <div className="absolute inset-0 islamic-pattern opacity-[0.04]" />



          {/* Physical Envelope sleeve layout */}
          <div className="relative w-full max-w-lg h-[440px] flex justify-center items-end">
            
            {/* The Back Layer of the Envelope Pocket (Stays fixed) */}
            <div className="absolute inset-x-4 top-16 bottom-0 rounded-t-3xl bg-[#3D0A11] border-t-2 border-l-2 border-r-2 border-[#8C6D4A]/50 shadow-inner z-0 overflow-hidden">
              {/* Shiny Gold Lining inside the envelope */}
              <div className="absolute inset-1 rounded-t-2xl bg-gradient-to-tr from-[#8A6D3B] via-[#F3E5AB] to-[#8A6D3B] opacity-15 mix-blend-color-dodge" />
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#1E0306]/80 to-transparent" />
            </div>

            {/* The Scroll (This element translates UPWARD as the user scrolls) */}
            <motion.div
              id="sliding-scroll-card"
              style={{ y: cardY, scale: cardScale }}
              className="absolute inset-x-8 top-10 text-[#4A3B32] shadow-[0_20px_50px_rgba(40,15,20,0.15)] flex flex-col justify-center items-center text-center z-10 cursor-default select-none"
            >
              {/* Scroll Parchment Body */}
              <div className="w-full bg-gradient-to-b from-[#F6F0E5] via-[#FFFDF9] to-[#F6F0E5] border-l-4 border-r-4 border-[#C2A289] rounded-md px-6 py-8 sm:px-8 sm:py-10 relative overflow-hidden flex flex-col items-center">
                {/* Parchment texture overlay */}
                <div className="absolute inset-0 bg-[url('/paper_texture.png')] opacity-25 mix-blend-multiply pointer-events-none" />
                {/* Subtle soft shadows inside the parchment edges to make it look curled */}
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/[0.04] to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
                
                {/* Top Scroll Dowel Rod */}
                <div className="absolute -top-1.5 left-0 right-0 h-3 bg-gradient-to-r from-[#8C6D4A] via-[#E6D0AA] to-[#8C6D4A] rounded-full shadow-sm z-20">
                  {/* Left Endcap */}
                  <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-5 bg-gradient-to-b from-[#D4AF37] via-[#AA7C11] to-[#D4AF37] rounded-l-md border-r border-[#6B4E2D]" />
                  {/* Right Endcap */}
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-5 bg-gradient-to-b from-[#D4AF37] via-[#AA7C11] to-[#D4AF37] rounded-r-md border-l border-[#6B4E2D]" />
                </div>

                {/* Bottom Scroll Dowel Rod */}
                <div className="absolute -bottom-1.5 left-0 right-0 h-3 bg-gradient-to-r from-[#8C6D4A] via-[#E6D0AA] to-[#8C6D4A] rounded-full shadow-sm z-20">
                  {/* Left Endcap */}
                  <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-5 bg-gradient-to-b from-[#D4AF37] via-[#AA7C11] to-[#D4AF37] rounded-l-md border-r border-[#6B4E2D]" />
                  {/* Right Endcap */}
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-5 bg-gradient-to-b from-[#D4AF37] via-[#AA7C11] to-[#D4AF37] rounded-r-md border-l border-[#6B4E2D]" />
                </div>

                {/* Elegant Inner Scroll Frame with gold corners */}
                <div className="absolute inset-3 border border-[#E3DAC9] opacity-80 pointer-events-none rounded" />
                <div className="absolute inset-4 border border-[#C2A289]/40 pointer-events-none rounded" />

                {/* Decorative Scroll Corners */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#C2A289]/60 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#C2A289]/60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#C2A289]/60 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#C2A289]/60 pointer-events-none" />

                {/* Royal Golden Ornament top center */}
                <div className="text-[#C2A289] mb-2.5 text-sm select-none">✦ ⚜ ✦</div>

                <h3 className="font-cinzel text-[9px] font-bold tracking-widest text-[#A68F80] mb-3 uppercase select-none">
                  In the Name of Allah, the Most Beneficent, the Most Merciful
                </h3>

                {/* Invitation message */}
                <p className="font-serif italic text-[#4A3B32]/95 text-[11px] sm:text-[13px] md:text-[14px] leading-relaxed max-w-xs sm:max-w-sm mb-3">
                  "With the blessings of Allah (SWT), we warmly invite you to join us as we celebrate the union of Mohammed Saleem and Dhilshana Suman. Your presence, prayers, and blessings will make this special occasion even more memorable. We look forward to celebrating this joyous day with you and your family."
                </p>

                {/* Heart icon separator */}
                <div className="flex items-center gap-2 justify-center mt-2.5 select-none">
                  <div className="w-8 h-[1px] bg-[#E3DAC9]" />
                  <Heart className="w-3 h-3 fill-[#C2A289]/30 text-[#C2A289]" />
                  <div className="w-8 h-[1px] bg-[#E3DAC9]" />
                </div>
              </div>
            </motion.div>

            {/* The Front Layer of the Envelope Pocket (Stays on top of scroll, creating a slot look) */}
            <div className="absolute inset-x-4 bottom-0 h-48 rounded-b-3xl rounded-t-md bg-gradient-to-b from-[#5C111C] to-[#2B0409] border-t-2 border-l border-r border-b border-[#8C6D4A]/30 z-20 shadow-2xl overflow-hidden" />

          </div>
        </section>


        {/* --- SECTION: PHOTO GALLERY WITH PARALLAX --- */}
        <section id="gallery-section" className="py-24 px-6 max-w-6xl mx-auto">

          {/* Dynamically connected to Firestore database with real-time sync */}
          <GallerySection />
        </section>


        {/* --- SECTION: EVENT DETAILS & MAP --- */}
        <section 
          id="event-details-section"
          className="relative py-24 px-6 overflow-hidden"
        >
          {/* Subtle floral background highlight */}
          <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />

          <div className="max-w-5xl mx-auto space-y-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-2"
            >
              <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-[#A68F80] uppercase block">
                VENUE & VENUE GUIDE
              </span>
              <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-[#4A3B32]">
                Celebration Details
              </h2>
              <p className="font-serif italic text-[#8C7A6B] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Join us for the reception and blessings at the magnificent Emerald Palace.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Venue details cards */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-5 flex flex-col justify-between gap-6"
              >
                
                {/* Card 1: Venue Name & Address */}
                <div id="venue-info-card" className="bg-[#FCFAF6] border border-[#DCD0C0] rounded-2xl p-6 shadow-[0_10px_25px_rgba(163,117,109,0.04)] flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C2A289]/10 flex items-center justify-center text-[#7E5E4E] shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-cinzel text-[10px] font-bold tracking-wider text-[#A68F80] uppercase">
                      Venue Name & Location
                    </h4>
                    <p className="font-serif font-bold text-base text-[#4A3B32]">
                      Emerald Palace Kurukkol
                    </p>
                    <p className="font-sans text-xs text-[#8C7A6B] leading-relaxed">
                      Kurukkol Kunnu, Tirur - Vailathur - Puthanathani Road, Kalpakanchery, Kerala 676551
                    </p>
                  </div>
                </div>

                {/* Card 2: Date Card */}
                <div id="date-info-card" className="bg-[#FCFAF6] border border-[#DCD0C0] rounded-2xl p-6 shadow-[0_10px_25px_rgba(163,117,109,0.04)] flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C2A289]/10 flex items-center justify-center text-[#7E5E4E] shrink-0">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-cinzel text-[10px] font-bold tracking-wider text-[#A68F80] uppercase">
                      Date of Ceremony
                    </h4>
                    <p className="font-serif font-bold text-base text-[#4A3B32]">
                      27 July 2026
                    </p>
                    <p className="font-sans text-xs text-[#8C7A6B] leading-relaxed">
                      Monday, 27th July 2026 • Insha'Allah. Please join us for the grand feast.
                    </p>
                  </div>
                </div>

                {/* Card 3: Invitation Info */}
                <div id="additional-info-card" className="bg-[#FCFAF6] border border-[#DCD0C0] rounded-2xl p-6 shadow-[0_10px_25px_rgba(163,117,109,0.04)] flex gap-4 flex-grow justify-start">
                  <div className="w-10 h-10 rounded-full bg-[#C2A289]/10 flex items-center justify-center text-[#7E5E4E] shrink-0">
                    <Info className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-cinzel text-[10px] font-bold tracking-wider text-[#A68F80] uppercase">
                      Ceremony Note
                    </h4>
                    <p className="font-sans text-xs text-[#8C7A6B] leading-relaxed">
                      Your gracious presence and sincere prayers (du'as) are the most precious gifts we could ever ask for. We look forward to celebrating this beautiful day with you.
                    </p>
                  </div>
                </div>

              </motion.div>

              {/* Map Box */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-7 bg-[#FAF8F5] border border-[#DCD0C0] rounded-2xl p-4 shadow-[0_15px_40px_rgba(163,117,109,0.05)] flex flex-col gap-4"
              >
                {/* Embed Map Frame */}
                <div id="map-frame-wrapper" className="w-full h-80 rounded-xl overflow-hidden relative border border-[#E3DAC9] shadow-inner bg-[#FCFAF6]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1479815049363!2d75.95882487480572!3d10.946176589212852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b3c7638bfdb1%3A0xd8714c60099d0595!2sEmerald%20Palace%2C%20Kalpakanchery!5e0!3m2!1sen!2sin!4v1719389000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "contrast(1.05) brightness(0.98) grayscale(0.05)" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    title="Emerald Palace Location Map"
                  />
                </div>

                {/* Open in Google Maps Button */}
                <a
                  href="https://www.google.com/maps/dir//Emerald+Palace,+Kurukkol+Kunnu,+Tirur+-+Vailathur+-+Puthanathani+Rd,+Kalpakanchery,+Kerala+676551/@11.1527694,75.8882503,4485m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3ba7b3c7638bfdb1:0xd8714c60099d0595!2m2!1d75.9613998!2d10.9461713?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative overflow-hidden py-4 bg-[#4A3B32] hover:bg-[#5C4B3E] text-white rounded-xl font-cinzel text-xs font-bold tracking-widest transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>

            </div>
          </div>
        </section>


        {/* --- SECTION: GUEST WISHES BOARD --- */}
        <section id="wishes-section" className="py-24 px-6 max-w-6xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-2"
          >
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-[#A68F80] uppercase block">
              CONGRATULATIONS
            </span>
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-[#4A3B32]">
              Blessings & Du'as
            </h2>
            <p className="font-serif italic text-[#8C7A6B] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Please leave your congratulatory wishes and prayers for our marital life.
            </p>
          </motion.div>

          <WishesSection />
        </section>


        {/* --- FOOTER SECTION --- */}
        <footer id="footer-section" className="relative py-16 px-6 text-center border-t border-[#DCD0C0]/50">
          <div className="absolute inset-0 islamic-pattern opacity-[0.03]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-xl mx-auto space-y-4 relative z-10"
          >
            {/* Elegant Golden Calligraphy Ornament */}
            <div className="text-[#C2A289] text-sm">✦ ✿ ✦</div>
            
            <h3 className="font-decorative text-xl font-bold text-[#7E5E4E]">
              Saleem & Dhilshana
            </h3>

            <p className="font-serif italic text-xs text-[#8C7A6B] leading-relaxed">
              We look forward to welcoming you and celebrating this joyous day with you and your family. May Allah bless you always.
            </p>

            <div className="h-[1px] w-24 bg-[#DCD0C0] mx-auto my-4" />

            <p className="font-mono text-[9px] tracking-wider text-[#A68F80] uppercase">
              JULY 27, 2026 • EMERALD PALACE KURUKKOL
            </p>
          </motion.div>
        </footer>

      </div>
    </div>
  );
}
