import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUpcomingAwards } from "../services/api.js";

// Import Home Components
import Hero from "../components/home/Hero.jsx";
import Overview from "../components/home/Overview.jsx";
import WhyEnter from "../components/home/WhyEnter.jsx";
import ResearchMethodology from "../components/home/ResearchMethodology.jsx";
import Guests from "../components/home/Guests.jsx";
import PreviousAwardees from "../components/home/PreviousAwardees.jsx";
import SelectionProcess from "../components/home/SelectionProcess.jsx";
import FAQSection from "../components/home/FAQSection.jsx";
import UpcomingAwards from "../components/home/UpcomingAwards.jsx";
import ReelsSection from "../components/home/ReelsSection.jsx";
import WhoShouldNominate from "../components/home/WhoShouldNominate.jsx";

// Centralized brand background
const PRIMARY_BG = "bg-transparent";
const SECTION_BG = "bg-[#050505]";
const HIGHLIGHT_BG = "bg-[radial-gradient(circle_at_center,#1a120c_0%,#050505_100%)]";

export default function Home() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const sectionRefs = useRef([]);
  const [upcomingAwards, setUpcomingAwards] = useState([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "!z-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [upcomingAwards]);

  useEffect(() => {
    fetchUpcomingAwards()
      .then(setUpcomingAwards)
      .catch(err => console.error("Failed to fetch upcoming awards:", err));
  }, []);

  const handleNominateClick = () => {
    navigate("/nominate");
  };

  const events = [
    {
      title: "Global Education Awards 2026 – Mumbai Edition",
      desc: "Recognising excellence and innovation in educational leadership.",
      date: "17 May 2026",
      place: "Mumbai",
    },
    {
      title: "Global Education Awards 2026 – Dubai Edition",
      desc: "Recognising excellence and innovation in educational leadership.",
      date: "Announcement coming soon (rescheduled due to ongoing international situation)",
      place: "Dubai",
    },
  ];

  const guests = [
    { name: "Virender Sehwag", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Sunil Manohar Gavaskar", designation: "Indian Cricket Commentator & Former Cricketer" },
    { name: "Shri Ashwini Kumar Choubey", designation: "Guest of Honour & Former Union Minister" },
    { name: "Dr. Yoganand Shashtri", designation: "Former Reader, Shaheed Bhagat Singh College, Delhi" },
    { name: "Shri G. V. L. Narsimha Rao", designation: "National Spokesperson, BJP" },
    { name: "Mr. Brad Hogg", designation: "Former Australian Cricketer" },
    { name: "Dr. Najma A. Heptulla", designation: "Former Governor, Manipur" },
    { name: "Shri Anand Kumar", designation: "Founder & Director, Super 30" },
  ];

  const mediaPartners = [
    { name: "India Today", tagline: "India’s Leading News & Media Network", logo: "../india-today.png" },
    { name: "CNN ", tagline: "Global & National News Network", logo: "../cnn.jpg" },
    { name: "News18 India", tagline: "Trusted Hindi News Network", logo: "../news.png" },
    { name: "Bharat 24", tagline: "Hindi News & Current Affairs Channel", logo: "../bharat.jpg" },
    { name: "Doordarshan's", tagline: "India’s Public Service News Channel", logo: "../ddd.png" },
    { name: "News 1 India", tagline: "National Hindi News Channel", logo: "../new1.png" },
    { name: "News 10 India", tagline: "National News & Current Affairs Network", logo: "../news10.jpg" },
    { name: "Delhi Aaj Tak", tagline: "Regional Hindi News Network", logo: "../delhiaajtk.jpg" },
    { name: "Prime Time", tagline: "National News & Media Network", logo: "../prime.png" },
    { logo: "../The-SME-Times.png" },
    { name: "Xoom Studio", tagline: "Media Production & Event Coverage Partner", logo: "../xoom.jpg" },
    { logo: "../remont.jpg" },
  ];

  const nomineeCategories = [
    { title: "Schools & K-12 Institutions", desc: "Recognising excellence in primary and secondary education.", icon: "🏫" },
    { title: "Higher Education & Universities", desc: "Honouring colleges and universities for academic research.", icon: "🎓" },
    { title: "EdTech & Digital Learning", desc: "Celebrating platforms revolutionising education.", icon: "💻" },
    { title: "Educators & Leaders", desc: "Awaiting principals and teachers with exemplary vision.", icon: "👤" },
  ];

  const homeFaqs = [
    { q: "What is Global Education Awards 2026?", a: "Global Education Awards 2026 is an international recognition platform that honours schools, colleges, universities, educators, and education-tech companies for excellence, innovation, and quality education." },
    { q: "Who can apply for nomination?", a: "Schools, colleges, universities, individual educators and academic professionals, educational startups, edtech companies, and coaching or vocational training centres can apply for nomination." },
    { q: "What is the nomination process and deadline?", a: "The nomination process is completely online. Applicants need to fill out the nomination form and submit the required details and documents. The current extended deadline mentioned on this page is 15 April 2026." },
    { q: "How are the winners selected?", a: "Winners are selected through a structured evaluation process that includes research-based assessment, academic quality, innovation, student impact, and ethical practices." },
    { q: "What are the benefits of participating?", a: "Participants receive global recognition and credibility, enhanced brand visibility and media exposure, greater trust among students and partners, networking with education leaders, and marketing assets." },
    { q: "Is self-nomination allowed?", a: "Yes, eligible organisations and individuals can nominate themselves directly for relevant categories." },
  ];

  const getGridCols = (len) => {
    if (len >= 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    if (len === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    if (len === 2) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1";
  };

  return (
    <div className={`w-full text-[#f5f3f0] ${PRIMARY_BG}`}>
      <h1 className="sr-only">Global Education Excellence Awards 2026</h1>
      
      <Hero 
        videoRef={videoRef} 
        sectionRefs={sectionRefs} 
        events={events} 
        handleNominateClick={handleNominateClick} 
        getGridCols={getGridCols}
      />

      <Overview 
        handleNominateClick={handleNominateClick} 
        SECTION_BG={SECTION_BG} 
      />

      <WhyEnter 
        sectionRefs={sectionRefs} 
        HIGHLIGHT_BG={HIGHLIGHT_BG} 
        getGridCols={getGridCols}
      />

      <ResearchMethodology SECTION_BG={SECTION_BG} />

      <Guests 
        guests={guests} 
        sectionRefs={sectionRefs} 
        HIGHLIGHT_BG={HIGHLIGHT_BG} 
      />

      <PreviousAwardees 
        SECTION_BG={SECTION_BG} 
        mediaPartners={mediaPartners} 
      />

      <SelectionProcess SECTION_BG={SECTION_BG} />

      <FAQSection 
        homeFaqs={homeFaqs} 
        HIGHLIGHT_BG={HIGHLIGHT_BG} 
      />

      <UpcomingAwards 
        upcomingAwards={upcomingAwards} 
        HIGHLIGHT_BG={HIGHLIGHT_BG} 
      />

      <ReelsSection SECTION_BG={SECTION_BG} />

      <WhoShouldNominate 
        nomineeCategories={nomineeCategories} 
        sectionRefs={sectionRefs} 
        HIGHLIGHT_BG={HIGHLIGHT_BG} 
      />
    </div>
  );
}
