import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Award, Globe, Briefcase, Sparkles, ArrowRight, Mic, Presentation, Users, Landmark, School, GraduationCap, MapPin, Phone, Mail, Building, FileText, Facebook, Instagram, Youtube, Link, Upload, CheckCircle, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/api';

const categoryMap = {
  "University": {
    "Overall Excellence": [
      "University of the Year",
      "Emerging University of the Year",
      "Best Private University",
      "Best Government / Public University",
      "Best Deemed-to-be University",
      "Best International University (India / Asia / Global)",
      "Excellence in Higher Education Award",
      "University of the Year (India)",
      "Excellence in Higher Education – India",
      "Most Trusted University Brand (India)",
      "Outstanding Vice-Chancellor Leadership Award",
    ],
    "Internationalization": [
      "Excellence in Global Education",
      "Best International Collaboration",
      "Best Student Exchange Program",
      "Excellence in Study Abroad Programs",
      "Best Foreign University Collaboration",
      "Global Collaboration Excellence (India)",
      "Best International Student Support University",
      "Study in India Excellence Award",
      "International Research Partnerships Award",
    ],
    "Research & Innovation": [
      "Excellence in Research & Development",
      "Best Research University",
      "Innovation & Technology Excellence Award",
      "Best Patent & Intellectual Property Initiative",
      "Best Incubation & Startup Support University",
      "Excellence in Industry-Academia Collaboration",
      "Research & Innovation Excellence Award",
      "Best Doctoral & Research University",
      "Faculty Excellence Award",
      "Interdisciplinary Education Excellence",
    ],
    "Digital & Online Education": [
      "Excellence in Digital Learning",
      "Best Online University / Program",
      "Excellence in EdTech Integration",
      "Best Learning Management System (LMS)",
      "Digital University of the Year",
      "Best Online & Blended Learning University",
      "Innovation in EdTech Integration",
      "Innovation in Blended Learning",
      "AI & Technology-Enabled Campus",
      "Smart & Digital Campus Excellence",
    ],
    "Skill Development & Employability": [
      "Best Placement & Career Excellence University",
      "Skill India Excellence Award",
      "Industry–Academia Collaboration Award",
      "Internship & Apprenticeship Excellence",
      "Employability & Career Readiness Award",
    ],
    "Academic Excellence": [
      "Excellence in Teaching & Learning",
      "Best Curriculum Innovation",
      "Best Outcome-Based Education Model",
      "Excellence in Interdisciplinary Studies",
      "Best Liberal Arts University",
      "Best Research-Oriented University",
    ],
    "Employability & Career Development": [
      "Best Placement & Career Services",
      "Excellence in Skill Development & Employability",
      "Best Industry-Linked Programs",
      "Best Internship & Apprenticeship Initiative",
      "Excellence in Corporate Partnerships",
    ],
    "Infrastructure & Campus Development": [
      "Best University Infrastructure",
      "Smart & Digital Campus Award",
      "Excellence in Green & Sustainable Campus",
      "Best Residential Campus",
      "Excellence in Library & Learning Resources",
    ],
    "Student Experience & Support": [
      "Excellence in Student Support Services",
      "Best Campus Life & Student Engagement",
      "Excellence in Counseling & Wellness Services",
      "Best Inclusive Education Initiative",
      "Excellence in Alumni Engagement",
    ],
    "Sustainability, Inclusion & Social Impact": [
      "Green & Sustainable University (India)",
      "Excellence in Social Impact & Community Development",
      "Inclusive Education & Accessibility Award",
      "Women Empowerment in Higher Education",
      "Rural & Regional Education Excellence",
      "Excellence in Social Responsibility",
      "Best Community Engagement Program",
      "Excellence in Environmental Sustainability",
    ],
    "Faculty & Leadership": [
      "Vice-Chancellor / President of the Year",
      "Academic Leader of the Year",
      "Outstanding Faculty Award",
      "Young Educator of the Year",
      "Lifetime Achievement in Education",
    ],
    "Discipline-Specific Excellence": [
      "Excellence in Engineering Education",
      "Excellence in Medical Education",
      "Excellence in Management Education",
      "Excellence in Law Education",
      "Excellence in Science Education",
      "Excellence in Arts & Humanities",
      "Excellence in Design, Media & Creative Education",
    ],
    "Discipline-Specific University Awards": [
      "Best Engineering University (India)",
      "Best Medical & Healthcare University",
      "Best Management / Business School",
      "Best Law University",
      "Best Agriculture & Allied Sciences University",
      "Best Science, Technology & Innovation University",
      "Best Liberal Arts & Humanities University",
    ],
    "Future-Ready & Entrepreneurship": [
      "Startup & Innovation Ecosystem Award",
      "University Incubation Center of the Year",
      "Entrepreneurship Education Excellence",
      "Future Skills & Emerging Technologies Award",
    ],
    "Special Recognition Awards": [
      "Lifetime Contribution to Indian Education",
      "Excellence in Educational Leadership",
      "Iconic University of the Decade",
      "Transformational Education Award",
      "Education Icon of the Year",
      "University with Best Governance Practices",
      "Excellence in Quality Assurance & Accreditation",
      "Most Trusted University Brand",
      "Rising Star University Award",
    ],
  },
  "College": {
    "By Type of Institution": [
      "Best Government College",
      "Best Private College",
      "Best Autonomous College",
      "Best Deemed-to-be University College",
      "Best International College",
      "Best Emerging College",
    ],
    "Science & Technology": [
      "Best Science College",
      "Best Engineering College",
      "Best Polytechnic College",
      "Best Research-Oriented College",
      "Best Innovation & R&D College",
    ],
    "Management & Commerce": [
      "Best Management / MBA College",
      "Best Commerce College",
      "Best Business School",
      "Best Entrepreneurship-Focused College",
    ],
    "Law & Public Policy": [
      "Best Law College",
      "Best Legal Education Institution",
      "Best Moot Court & Legal Training College",
    ],
    "Medical & Healthcare": [
      "Best Medical College",
      "Best Dental College",
      "Best Nursing College",
      "Best Pharmacy College",
      "Best Allied Health Sciences College",
      "Best Paramedical College",
    ],
    "Arts, Humanities & Social Sciences": [
      "Best Arts College",
      "Best Humanities College",
      "Best Social Sciences College",
    ],
    "Design, Media & Creative Arts": [
      "Best Design College",
      "Best Fashion & Textile College",
      "Best Fine Arts College",
      "Best Media, Journalism & Mass Communication College",
      "Best Film & Performing Arts College",
    ],
    "Education & Teacher Training": [
      "Best B.Ed College",
      "Best Teacher Training College",
      "Best Education Research Institute",
    ],
    "Specialized & Professional Colleges": [
      "Best Agriculture College",
      "Best Veterinary College",
      "Best Architecture College",
      "Best Hotel Management & Hospitality College",
      "Best Aviation & Aeronautics College",
      "Best Maritime Studies College",
      "Best Sports & Physical Education College",
    ],
    "Excellence & Performance-Based Categories": [
      "College of the Year",
      "Excellence in Academic Achievement",
      "Excellence in Skill Development",
      "Excellence in Digital Learning & Smart Campus",
      "Excellence in Research & Innovation",
      "Excellence in Industry Interface & Placements",
      "Excellence in Global Exposure & International Tie-Ups",
    ],
    "Social Impact & Quality": [
      "Best Green & Sustainable College",
      "Best Rural Education College",
      "Best Women’s College",
      "Best Inclusive Education College",
      "Best Community Impact College",
    ],
    "Leadership & Faculty": [
      "Best College Principal / Director",
      "Best Faculty Team",
      "Best Young Educator College Award",
      "Lifetime Contribution to Education Award",
    ],
    "Student-Centric Awards": [
      "Best Campus Infrastructure",
      "Best Student Support & Career Guidance",
      "Best Alumni Network",
      "Best Placement & Internship Support",
    ],
    "By Level of Education": [
      "Junior College / Higher Secondary College",
      "Undergraduate Degree College",
      "Postgraduate College",
      "Integrated Degree College",
      "Autonomous College",
      "Deemed-to-be University College",
      "Affiliated College",
      "Constituent College",
    ],
  },
  "Vocational Institute": {
    "Healthcare & Paramedical": [
      "Paramedical Training Institutes",
      "Nursing Assistant & GNM Training Centers",
      "Medical Lab Technician (MLT) Institutes",
      "Radiology & Imaging Technician Institutes",
      "Emergency & Trauma Care Training Institutes",
      "Physiotherapy Assistant Training Centers",
      "Hospital Administration Vocational Institutes",
      "Pharmacy Technician Training Institutes",
      "Healthcare Skill Development Institutes",
    ],
    "Construction, Infrastructure & Trades": [
      "Civil Construction Skill Training Institutes",
      "Plumbing & Sanitation Training Institutes",
      "Masonry & Tiling Training Centers",
      "Interior Design & Drafting Institutes",
      "Surveying & Land Measurement Institutes",
      "Heavy Equipment & Crane Operator Institutes",
      "Road & Infrastructure Skill Training Centers",
    ],
    "Automobile, Aviation & Logistics": [
      "Automobile Repair & Maintenance Institutes",
      "EV (Electric Vehicle) Training Institutes",
      "Two-Wheeler & Four-Wheeler Technician Institutes",
      "Aviation Ground Staff & Cabin Crew Institutes",
      "Aircraft Maintenance Technician (AMT) Institutes",
      "Logistics, Supply Chain & Warehouse Training Institutes",
      "Driving & Transport Skill Institutes",
    ],
    "Hospitality, Tourism & Services": [
      "Hotel Management Vocational Institutes",
      "Culinary Arts & Bakery Institutes",
      "Food & Beverage Service Training Institutes",
      "Housekeeping & Facility Management Institutes",
      "Travel, Tourism & Ticketing Institutes",
      "Cruise & Aviation Hospitality Institutes",
      "Event Management Training Institutes",
    ],
    "Beauty, Wellness & Lifestyle": [
      "Beauty & Cosmetology Institutes",
      "Hair Styling & Makeup Academies",
      "Spa & Wellness Training Institutes",
      "Yoga & Fitness Trainer Institutes",
      "Ayurveda & Alternative Therapy Institutes",
      "Nutrition & Dietetics Vocational Institutes",
    ],
    "Fashion, Design & Creative Arts": [
      "Fashion Designing Institutes",
      "Tailoring & Apparel Making Centers",
      "Textile & Garment Technology Institutes",
      "Jewellery Designing Institutes",
      "Graphic Designing & Visual Arts Institutes",
      "Photography & Film Making Academies",
      "Fine Arts & Handicraft Training Institutes",
    ],
    "Agriculture, Rural & Green Skills": [
      "Agriculture & Horticulture Training Institutes",
      "Organic Farming Training Centers",
      "Dairy & Poultry Training Institutes",
      "Fisheries & Aquaculture Training Centers",
      "Agri-Entrepreneurship Institutes",
      "Food Processing & Cold Storage Training Institutes",
      "Sustainable & Green Skill Institutes",
    ],
    "Education, Training & Soft Skills": [
      "Teacher Training & Skill Trainer Institutes",
      "Spoken English & Communication Skill Institutes",
      "Personality Development Training Centers",
      "Leadership & Corporate Skill Institutes",
      "Entrepreneurship & Startup Training Institutes",
      "NSDC / Skill India Affiliated Training Centers",
    ],
    "Home Services & Community Skills": [
      "Electrician & Wireman Training Institutes",
      "Home Appliance Repair Training Centers",
      "Water Purifier & RO Technician Institutes",
      "Mobile Phone Repair Training Institutes",
      "Security Guard & Facility Staff Training Institutes",
      "Fire & Safety Training Institutes",
    ],
    "Special & Inclusive": [
      "Skill Development Institutes for Women",
      "Skill Training Centers for Persons with Disabilities",
      "Rural Skill Development Institutes",
      "Minority Skill Development Institutes",
      "Government & PPP Vocational Training Institutes",
      "International Vocational Training Centers",
    ],
    "Suggested Award Titles": [
      "Best Vocational Training Institute of the Year",
      "Excellence in Skill Development Award",
      "Best Industry-Oriented Training Institute",
      "Emerging Vocational Institute Award",
      "Outstanding Placement & Employability Award",
      "Innovation in Vocational Education Award",
    ],
  },
  "School Categories": {
    "Early Years & Foundation": [
      "Best Preschool / Kindergarten",
      "Excellence in Early Childhood Education",
      "Best Montessori School",
      "Best Play-Based Learning School",
    ],
    "Primary Education": [
      "Best Primary School",
      "Excellence in Foundational Literacy & Numeracy",
      "Best Value-Based Primary School",
      "Innovation in Primary Education",
    ],
    "Secondary & Senior Secondary": [
      "Best Secondary School",
      "Best Senior Secondary School",
      "Academic Excellence Award",
      "Best CBSE / ICSE / IB / IGCSE / State Board School",
      "Excellence in Board Results",
    ],
    "International & Global": [
      "Best International School",
      "Excellence in Global Curriculum Delivery",
      "Best IB World School",
      "Best Cambridge (IGCSE) School",
      "Global Citizenship Education Award",
    ],
    "Teaching, Learning & Innovation": [
      "Innovation in Teaching & Learning",
      "Best Digital / Smart School",
      "Excellence in Online & Blended Learning",
      "STEM Education Excellence Award",
      "AI & Robotics Education Award",
    ],
    "Student Development & Well-Being": [
      "Holistic Education Excellence Award",
      "Best School for Sports Education",
      "Best School for Arts, Music & Culture",
      "Student Well-Being & Mental Health Champion",
      "Inclusive Education Excellence Award",
    ],
    "Leadership & Management": [
      "Best School Leadership Award",
      "Excellence in School Management",
      "Most Trusted School Brand",
      "Fastest Growing School",
    ],
    "Sustainability & Social Impact": [
      "Green School / Sustainable School Award",
      "Community Impact & Social Responsibility Award",
      "Education for Sustainable Development Award",
      "Diversity, Equity & Inclusion Award",
    ],
    "Special Recognition": [
      "School of the Year – Global",
      "School of the Year – Country / Region",
      "Rising Star School Award",
      "Lifetime Achievement in School Education",
    ],
  },
  "EdTech": {
    "Overall Excellence": [
      "Best EdTech Company of the Year – Global",
      "Most Innovative EdTech Brand",
      "Fastest Growing EdTech Company",
      "Excellence in Digital Learning Solutions",
      "Outstanding Contribution to Global Education",
    ],
    "Learning Segments": [
      "Best K–12 EdTech Solution",
      "Best Higher Education Technology Provider",
      "Best Online Learning Platform",
      "Best Skill Development & Vocational EdTech",
      "Best Test Preparation & Competitive Exam Platform",
    ],
    "Technology & Innovation": [
      "Best AI-Powered Learning Platform",
      "Best Adaptive / Personalized Learning Solution",
      "Best LMS (Learning Management System)",
      "Best AR/VR Learning Technology",
      "Best Gamified Learning Platform",
    ],
    "Global & Social Impact": [
      "Best EdTech for Inclusive & Accessible Education",
      "EdTech Innovation for Rural & Remote Learning",
      "Best Global EdTech Brand",
      "EdTech Excellence in Emerging Markets",
      "Social Impact EdTech of the Year",
    ],
    "Educator & Institution Support": [
      "Best Teacher Empowerment Platform",
      "Best School Management Software",
      "Best Corporate Learning & Development Platform",
      "Best EdTech Solution for Universities & Institutions",
    ],
    "Product & User Experience": [
      "Best Mobile Learning App",
      "Best User Experience in EdTech",
      "Best Hybrid Learning Solution",
      "Best Assessment & Evaluation Platform",
    ],
    "Special Recognition": [
      "EdTech Startup of the Year",
      "Women-Led EdTech Company of the Year",
      "Green & Sustainable EdTech Initiative",
      "Lifetime Achievement in EdTech Innovation",
    ],
  },
  "Individual": {
    "Academic Leadership": [
      "Global Education Leader of the Year",
      "Visionary Academic Director of the Year",
      "International School Principal of the Year",
      "University Chancellor / Vice Chancellor of the Year",
      "Education Administrator of the Year",
    ],
    "Teaching Excellence": [
      "Global Teacher of the Year",
      "Innovative Educator of the Year",
      "Outstanding Professor / Lecturer of the Year",
      "Early Childhood Educator of the Year",
      "STEM Educator of the Year",
    ],
    "Global & International Education": [
      "Global Education Ambassador of the Year",
      "International Educator of the Year",
      "Cross-Border Education Excellence Award",
      "Study Abroad Program Leader of the Year",
    ],
    "Innovation & Digital Education": [
      "EdTech Innovator of the Year",
      "Digital Learning Pioneer Award",
      "AI in Education Excellence Award",
      "Online Educator of the Year",
    ],
    "Specialized Education Excellence": [
      "Special Education Professional of the Year",
      "Inclusive Education Champion Award",
      "Skill Development Trainer of the Year",
      "Vocational Education Leader of the Year",
    ],
    "Research & Academic Contribution": [
      "Outstanding Education Researcher of the Year",
      "Curriculum Development Excellence Award",
      "Educational Author of the Year",
    ],
    "Impact & Social Contribution": [
      "Education Changemaker Award",
      "Community Education Leader of the Year",
      "Education for Social Impact Award",
      "Rural / Underserved Education Champion",
    ],
    "Emerging & Lifetime Honors": [
      "Young Educator of the Year",
      "Rising Star in Education Award",
      "Lifetime Achievement in Education Award",
    ],
    "Special Recognition": [
      "Country Excellence in Education Award",
      "Woman Leader in Education Award",
      "Global Educator Icon Award",
    ],
  },
};

const AIChatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('welcome'); 
    const [userData, setUserData] = useState({ 
        participationType: 'nominated as award',
        nomineeName: '', 
        organization: '', 
        category: '',
        subCategory: '',
        turnover: '',
        contactName: '',
        contactMobile: '',
        contactEmail: '',
        city: '',
        state: '',
        designation: '',
        website: '',
        facebook: '',
        instagram: '',
        youtube: '',
        pdf: null
    });

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Namaste! 🙏 Welcome to Global Education Excellence Awards 2026. I'm your AI guide for nominations. How would you like to be part of this prestigious event?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            showOptions: true,
            optionsType: 'participation'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);
    const fileInputRef = useRef(null);

    const participationOptions = [
        { label: 'Award Nomination', value: 'nominated as award', icon: <Award size={14} /> },
        { label: 'Join as Speaker', value: 'attend as speaker', icon: <Mic size={14} /> },
        { label: 'Exhibit / Stall', value: 'attend as exhibitor', icon: <Presentation size={14} /> },
        { label: 'Become Sponsor', value: 'attend as sponsor', icon: <Users size={14} /> }
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const addMessage = (type, text, extras = null) => {
        const newMsg = {
            id: Date.now(),
            type,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            ...(extras || {})
        };
        setMessages(prev => [...prev, newMsg]);
    };

    const handleOptionClick = (opt) => {
        if (opt.type === 'participation') {
            setUserData(prev => ({ ...prev, participationType: opt.value }));
            addMessage('user', `Enroll as ${opt.label}`);
            
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                if (opt.value === 'nominated as award') {
                    addMessage('bot', "A great choice for recognition! 🏆 Select your category:", {
                        showOptions: true,
                        optionsType: 'category',
                        options: Object.keys(categoryMap).map(c => ({ label: c, value: c }))
                    });
                    setStep('award_category');
                } else {
                    addMessage('bot', `We are honored! What is the Full Name of the ${opt.label.split(' ')[1]}?`);
                    setStep('ask_name');
                }
            }, 800);
        } else if (opt.type === 'category') {
            setUserData(prev => ({ ...prev, category: opt.value }));
            addMessage('user', opt.label);
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const groups = categoryMap[opt.value] || {};
                const options = [];
                Object.entries(groups).forEach(([group, list]) => {
                    list.forEach(item => options.push({ label: item, value: item }));
                });
                // Add "Other" option
                options.push({ label: 'Other', value: 'Other', icon: <Edit3 size={14} /> });

                addMessage('bot', `Great! Now pick the specific Award Sub-Category under ${opt.value}:`, {
                    showOptions: true,
                    optionsType: 'subCategory',
                    options: options.slice(0, 16) 
                });
                setStep('award_subcategory');
            }, 800);
        } else if (opt.type === 'subCategory') {
            addMessage('user', opt.label);
            if (opt.value === 'Other') {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    addMessage('bot', "Please type your custom Award Sub-Category name:");
                    setStep('ask_custom_subcategory');
                }, 800);
            } else {
                setUserData(prev => ({ ...prev, subCategory: opt.value }));
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    addMessage('bot', "Perfect. What is the Full Name of the Nominee / Institution?");
                    setStep('ask_name');
                }, 800);
            }
        } else if (opt.type === 'pdf_skip') {
            addMessage('user', 'Skip Upload');
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                addMessage('bot', "No problem! Finalizing your nomination now... ✨");
                setStep('submitting');
                submitNomination(userData);
            }, 800);
        } else if (opt.type === 'final') {
            addMessage('user', opt.label);
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                if (opt.value === '/login') {
                    navigate('/login');
                    setIsOpen(false);
                }
            }, 600);
        }
    };

    const handleSend = (text) => {
        const input = text || inputValue;
        if (!input.trim()) return;

        addMessage('user', input);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            processStep(input);
            setIsTyping(false);
        }, 1000);
    };

    const processStep = (input) => {
        if (step === 'ask_custom_subcategory') {
            setUserData(prev => ({ ...prev, subCategory: input }));
            addMessage('bot', `Noted: "${input}". Now, what is the Full Name of the Nominee / Institution?`);
            setStep('ask_name');
        } else if (step === 'ask_name') {
            setUserData(prev => ({ ...prev, nomineeName: input }));
            addMessage('bot', `Got it. Which Organization / School / Institution does ${input} represent?`);
            setStep('ask_org');
        } else if (step === 'ask_org') {
            setUserData(prev => ({ ...prev, organization: input }));
            if (userData.participationType === 'nominated as award') {
                addMessage('bot', "What is the annual Turnover of the organization?");
                setStep('ask_turnover');
            } else {
                addMessage('bot', "What is your Designation / Role in the organization?");
                setStep('ask_designation');
            }
        } else if (step === 'ask_turnover') {
            setUserData(prev => ({ ...prev, turnover: input }));
            addMessage('bot', "Who is the Contact Person for this nomination?");
            setStep('ask_contact_name');
        } else if (step === 'ask_contact_name') {
            setUserData(prev => ({ ...prev, contactName: input }));
            addMessage('bot', `And ${input}'s Mobile Number?`);
            setStep('ask_mobile');
        } else if (step === 'ask_designation') {
            setUserData(prev => ({ ...prev, designation: input }));
            addMessage('bot', "Please provide your Mobile Number (with country code):");
            setStep('ask_mobile');
        } else if (step === 'ask_mobile') {
            setUserData(prev => ({ ...prev, contactMobile: input, mobile: input }));
            addMessage('bot', "What is the official Email Address? (We'll send login credentials here)");
            setStep('ask_email');
        } else if (step === 'ask_email') {
            setUserData(prev => ({ ...prev, contactEmail: input, email: input }));
            addMessage('bot', "Which City are you based in?");
            setStep('ask_city');
        } else if (step === 'ask_city') {
            setUserData(prev => ({ ...prev, city: input }));
            addMessage('bot', "And the State?");
            setStep('ask_state');
        } else if (step === 'ask_state') {
            setUserData(prev => ({ ...prev, state: input }));
            addMessage('bot', "Almost done! 🌐 Do you have a Website URL? (Type 'no' to skip)");
            setStep('ask_website');
        } else if (step === 'ask_website') {
            if (input.toLowerCase() !== 'no') setUserData(prev => ({ ...prev, website: input }));
            addMessage('bot', "Your Facebook profile or page link? (Type 'no' to skip)");
            setStep('ask_facebook');
        } else if (step === 'ask_facebook') {
            if (input.toLowerCase() !== 'no') setUserData(prev => ({ ...prev, facebook: input }));
            addMessage('bot', "Instagram profile link? (Type 'no' to skip)");
            setStep('ask_instagram');
        } else if (step === 'ask_instagram') {
            if (input.toLowerCase() !== 'no') setUserData(prev => ({ ...prev, instagram: input }));
            addMessage('bot', "YouTube channel link? (Type 'no' to skip)");
            setStep('ask_youtube');
        } else if (step === 'ask_youtube') {
            if (input.toLowerCase() !== 'no') setUserData(prev => ({ ...prev, youtube: input }));
            addMessage('bot', "Last part! 📄 Would you like to upload a Supporting Document (PDF)?", {
                showOptions: true,
                optionsType: 'pdf_options',
                options: [
                    { label: 'Upload PDF', value: 'upload', icon: <Upload size={14} />, isAction: true },
                    { label: 'Skip for now', value: 'skip', icon: <ArrowRight size={14} />, type: 'pdf_skip' }
                ]
            });
            setStep('ask_pdf');
        } else if (step === 'confirmed') {
            addMessage('bot', "Your nomination is confirmed! Use your login details to track it. Anything else?");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            if (file.size > 5 * 1024 * 1024) {
                addMessage('bot', "⚠️ File is too large. Please upload a PDF under 5MB.");
                return;
            }
            const updatedData = { ...userData, pdf: file };
            setUserData(updatedData);
            addMessage('user', `Uploaded: ${file.name}`);
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                addMessage('bot', "Perfect! Everything looks good. Submitting your nomination now... ✨");
                setStep('submitting');
                submitNomination(updatedData);
            }, 800);
        } else {
            addMessage('bot', "⚠️ Please select a valid PDF file.");
        }
    };

    const submitNomination = async (data) => {
        try {
            const formData = new FormData();
            
            const payloadMap = {
                participationType: data.participationType,
                nomineeName: data.nomineeName,
                organization: data.organization,
                turnover: data.turnover || "N/A",
                contactName: data.contactName || data.nomineeName,
                contactMobile: data.contactMobile || data.mobile,
                contactEmail: data.contactEmail || data.email,
                mobile: data.mobile,
                email: data.email,
                category: data.category || "General",
                subCategory: data.subCategory || "General",
                designation: data.designation || "Head",
                city: data.city,
                state: data.state,
                website: data.website,
                facebook: data.facebook,
                instagram: data.instagram,
                youtube: data.youtube,
                acceptTerms: 'true',
                remarks: "AI Chatbot Submission"
            };

            Object.entries(payloadMap).forEach(([key, val]) => {
                if (val) formData.append(key, val);
            });

            if (data.pdf) {
                formData.append('pdf', data.pdf);
            }

            const response = await request('/api/nominations', {
                method: 'POST',
                body: formData
            });

            addMessage('bot', `🎉 Congratulations! ${response.message || "Submission Successful."}`);
            addMessage('bot', "Check your email for your ID & Password. Use them to log in at our portal to complete your profile.", {
                showOptions: true,
                optionsType: 'final',
                options: [{ label: 'Go to Login', value: '/login', icon: <Users size={14} /> }]
            });
            setStep('confirmed');
        } catch (error) {
            console.error('Submission error:', error);
            addMessage('bot', "Oops! I encountered an error saving your data. Please try our official form or contact support.");
            setStep('welcome');
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100000]">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf" 
            />
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        className="absolute bottom-20 right-0 md:-right-2 w-[calc(100vw-3rem)] sm:w-[380px] md:w-[420px] h-[600px] md:h-[650px] max-h-[75vh] md:max-h-[85vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-[#d4af37]/30 backdrop-blur-3xl bg-[#0f0a07]/95 z-[100001]"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-[#d4af37]/20 to-[#ffd966]/20 border-b border-[#d4af37]/20 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#aa8920] flex items-center justify-center shadow-xl shadow-[#d4af37]/20 relative">
                                    <Bot className="text-black" size={24} />
                                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0f0a07] rounded-full animate-pulse"></span>
                                </div>
                                <div className="flex flex-col text-left">
                                    <h4 className="text-[#ffd966] font-black text-sm tracking-tight">Nomination AI</h4>
                                    <div className="flex items-center gap-1.5 justify-start">
                                        <span className="text-[#d4af37] text-[9px] font-black uppercase tracking-[0.2em] text-left">Excellence Awards</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => window.open('https://wa.me/919910555541', '_blank')} 
                                    className="w-10 h-10 rounded-xl bg-green-500/10 hover:bg-green-500/20 flex items-center justify-center text-green-500 transition-all active:scale-90 border border-green-500/20 group"
                                    title="Help on WhatsApp"
                                >
                                    <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 transition-all active:scale-90">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-8 scrollbar-hide bg-gradient-to-b from-transparent to-[#d4af37]/[0.03]">
                            {messages.map((msg) => (
                                <div key={msg.id} className="space-y-4">
                                    <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex gap-3 max-w-[88%] ${msg.type === 'user' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                                            <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20' : 'bg-white/5 border border-white/10 text-[#d4af37]'}`}>
                                                {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                                            </div>
                                            <div className="space-y-1.5 md:space-y-2">
                                                <div className={`p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] text-[13px] md:text-[14px] leading-relaxed shadow-sm ${
                                                    msg.type === 'user' 
                                                    ? 'bg-[#d4af37] text-black rounded-tr-none font-bold' 
                                                    : 'bg-white/10 text-white/90 border border-[#d4af37]/20 rounded-tl-none backdrop-blur-md'
                                                }`}>
                                                    {msg.text}
                                                </div>
                                                <span className="text-[9px] md:text-[10px] text-white/20 px-1 font-bold uppercase block text-left">{msg.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {msg.showOptions && (
                                        <div className="flex flex-wrap gap-2 pl-12 animate-in fade-in slide-in-from-left-4 duration-700">
                                            {(msg.optionsType === 'participation' ? participationOptions : msg.options || []).map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => opt.isAction ? fileInputRef.current.click() : handleOptionClick({...opt, type: opt.type || msg.optionsType})}
                                                    className="flex items-center gap-2 px-4 py-2.5 bg-[#d4af37]/10 hover:bg-[#d4af37]/30 border border-[#d4af37]/20 rounded-xl text-[10px] font-black uppercase tracking-wider text-[#ffd966] transition-all hover:scale-105 active:scale-95 group"
                                                >
                                                    {opt.icon} {opt.label} <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex justify-start pl-12 text-left">
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div 
                                                    key={i}
                                                    animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }} 
                                                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} 
                                                    className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 md:p-6 border-t border-white/5 bg-white/[0.03]">
                            <div className="relative group">
                                <input 
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                                    placeholder={
                                        step === 'ask_custom_subcategory' ? "Type category name..." : 
                                        step.includes('website') ? "https://..." : 
                                        "Type your message..."
                                    }
                                    className="w-full bg-[#0a0805] border border-[#d4af37]/20 rounded-xl md:rounded-2xl py-3.5 md:py-4.5 pl-4 md:pl-6 pr-14 md:pr-16 text-[13px] md:text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37]/50 transition-all text-left"
                                />
                                <button 
                                    onClick={() => handleSend(inputValue)}
                                    className="absolute right-1.5 md:right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 bg-gradient-to-r from-[#d4af37] to-[#aa8920] hover:brightness-125 rounded-lg md:rounded-xl flex items-center justify-center text-black transition-all shadow-lg shadow-[#d4af37]/20 active:scale-90"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4 md:mt-5 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Sparkles size={10} className="text-[#d4af37]" />
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#ffd966]">Nomination intelligence</span>
                                <Sparkles size={10} className="text-[#d4af37]" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <div className="relative group flex items-center justify-center">
                <AnimatePresence>
                    {!isOpen && (
                        <div className="absolute right-full mr-4 px-4 py-2 bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-wider rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border-b-4 border-[#aa8920] hidden md:block translate-x-2 group-hover:translate-x-0">
                            <motion.span
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                Nominate through AI Chatbot
                            </motion.span>
                            {/* Arrow Tip */}
                            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#d4af37] rotate-45"></div>
                        </div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 border border-[#d4af37]/30 ${
                        isOpen ? 'bg-[#d4af37] text-black' : 'bg-[#0f0a07] text-[#d4af37]'
                    }`}
                >
                    <AnimatePresence mode='wait'>
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                <X size={32} />
                            </motion.div>
                        ) : (
                            <motion.div key="open" className="relative" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                <MessageSquare size={32} />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-40"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#d4af37] items-center justify-center">
                                        <Sparkles size={10} className="text-black" />
                                    </span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default AIChatbot;
