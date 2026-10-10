import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Printer
} from 'lucide-react';
import SemesterFeesModal from './components/SemesterFeesModal';
import { DETAILED_COURSES, OFFICIAL_BANK_DETAILS, BANK_LABELS, COURSES_SUMMARY, CourseSummary } from './data/feeStructure';

export interface GallerySlide {
  id: number;
  src: string;
  fallbackSrc: string;
  title: string;
  subtitle: string;
}

export const OFFICIAL_SLIDES: GallerySlide[] = [
  {
    id: 1,
    src: '/images/slide1_himicon.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    title: 'HIMICON 2026 International Conference',
    subtitle: 'Celebrating Academic Excellence & Global Engagement at H.M College, Manjeri'
  },
  {
    id: 2,
    src: '/images/slide2_ranks.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    title: 'University of Calicut Rank Holders 2024-25',
    subtitle: 'Liya Fathima (1st Rank, BSc IT) • Haneen (2nd Rank, BSc Zoology) • Mahir (7th Rank, BSc IT)'
  },
  {
    id: 3,
    src: '/images/slide3_aerial.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    title: 'Panoramic Aerial View of Campus & Western Ghats',
    subtitle: 'H.M College nestled among green plantations at Alukkal, Mariyad with Main Campus Gate'
  },
  {
    id: 4,
    src: '/images/slide4_campus_collage.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    title: 'Academic Life, Laboratories & Central Library',
    subtitle: 'State-of-the-art science labs, central library, and student quadrangle.'
  },
  {
    id: 5,
    src: '/images/slide5_sports_gate.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    title: 'Sports Facilities & Campus Drive',
    subtitle: 'Multi-purpose Basketball Court, Campus Entrance Gate, and tree-lined campus road'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'fees' | 'exams' | 'portal' | 'pay'>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFeesModalOpen, setIsFeesModalOpen] = useState(false);
  const [selectedFeeCourseId, setSelectedFeeCourseId] = useState(DETAILED_COURSES[0].id);
  const [feesModalTab, setFeesModalTab] = useState<'breakdown' | 'allCourses' | 'payOnline'>('breakdown');
  const [selectedCourseInfo, setSelectedCourseInfo] = useState<CourseSummary | null>(null);
  const [homeCourseTab, setHomeCourseTab] = useState<'all' | 'FYUGP_Science' | 'FYUGP_Commerce' | 'PG'>('all');

  // Gallery slider state
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeLightboxSlide, setActiveLightboxSlide] = useState<GallerySlide | null>(null);

  // Fees page state
  const [feesSelectedCourseId, setFeesSelectedCourseId] = useState<string>(DETAILED_COURSES[0].id);

  // Pay fees online page state
  const [payStudentId, setPayStudentId] = useState('');
  const [payCourseId, setPayCourseId] = useState<string>(DETAILED_COURSES[0].id);
  const [paySemester, setPaySemester] = useState<number>(1);
  const [payMethod, setPayMethod] = useState<'UPI' | 'Card' | 'Net banking'>('UPI');
  const [paymentReceipt, setPaymentReceipt] = useState<{
    receiptNo: string;
    date: string;
    studentId: string;
    courseName: string;
    semester: number;
    method: string;
    amount: string;
  } | null>(null);

  // Student portal state
  const [portalUsername, setPortalUsername] = useState('');
  const [portalPassword, setPortalPassword] = useState('');
  const [showPortalPassword, setShowPortalPassword] = useState(false);
  const [isLoggedInStudent, setIsLoggedInStudent] = useState(false);

  // Exams page state
  const [examCourseFilter, setExamCourseFilter] = useState('');

  // Contact Form state
  const [nameVal, setNameVal] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  const [msgVal, setMsgVal] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#fees') setCurrentPage('fees');
      else if (hash === '#pay') setCurrentPage('pay');
      else if (hash === '#exams') setCurrentPage('exams');
      else if (hash === '#portal') setCurrentPage('portal');
      else if (hash === '#top' || hash === '' || hash === '#about' || hash === '#courses' || hash === '#notices' || hash === '#campus' || hash === '#contact') {
        setCurrentPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: 'home' | 'fees' | 'exams' | 'portal' | 'pay', anchor?: string) => {
    setCurrentPage(page);
    setMenuOpen(false);
    if (page === 'home' && anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setNameVal('');
      setPhoneVal('');
      setMsgVal('');
    }, 4000);
  };

  const openFeesModal = (courseId: string, tab: 'breakdown' | 'allCourses' | 'payOnline' = 'breakdown') => {
    setSelectedFeeCourseId(courseId);
    setFeesModalTab(tab);
    setIsFeesModalOpen(true);
  };

  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % OFFICIAL_SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + OFFICIAL_SLIDES.length) % OFFICIAL_SLIDES.length);
  };

  const currentDetailedCourse = DETAILED_COURSES.find((c) => c.id === feesSelectedCourseId) || DETAILED_COURSES[0];
  const payCurrentCourse = DETAILED_COURSES.find((c) => c.id === payCourseId) || DETAILED_COURSES[0];
  const paySemesterFee = payCurrentCourse.semesters.find((s) => s.semester === paySemester)?.total || payCurrentCourse.feePerSemester;

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentReceipt({
      receiptNo: 'DEMO-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('en-IN'),
      studentId: payStudentId || 'HMC-2026-REG',
      courseName: payCurrentCourse.name,
      semester: paySemester,
      method: payMethod,
      amount: '₹ ' + paySemesterFee.toLocaleString('en-IN')
    });
  };

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedInStudent(true);
  };

  return (
    <>
      {/* ---------------------------------------------------------------------
          HEADER (Exact collegiate styling with official logo)
          --------------------------------------------------------------------- */}
      <header>
        <div className="wrap nav">
          <a
            className="logo"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <img
              src="/images/college_logo.svg"
              alt="H.M College Logo"
              style={{ width: '42px', height: '48px', objectFit: 'contain' }}
            />
            <div>
              H.M College<small>of Science and Technology, Manjeri</small>
            </div>
          </a>

          <nav aria-label="Main">
            <ul id="menu" className={menuOpen ? 'open' : ''}>
              <li>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home');
                  }}
                  style={currentPage === 'home' ? { color: 'var(--coral)', fontWeight: 700 } : {}}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home', 'courses');
                  }}
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#fees"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('fees');
                  }}
                  style={currentPage === 'fees' || currentPage === 'pay' ? { color: 'var(--coral)', fontWeight: 700 } : {}}
                >
                  Fees
                </a>
              </li>
              <li>
                <a
                  href="#exams"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('exams');
                  }}
                  style={currentPage === 'exams' ? { color: 'var(--coral)', fontWeight: 700 } : {}}
                >
                  Exams
                </a>
              </li>
              <li>
                <a
                  href="#portal"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('portal');
                  }}
                  style={currentPage === 'portal' ? { color: 'var(--coral)', fontWeight: 700 } : {}}
                >
                  Student portal
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home', 'contact');
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => navigateTo('pay')}
              className="btn p"
              style={{ padding: '8px 18px', minHeight: '38px', fontSize: '14px' }}
            >
              Pay Fees
            </button>
            <button
              id="mb"
              aria-expanded={menuOpen}
              aria-controls="menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          PAGE VIEW: HOME
          ===================================================================== */}
      {currentPage === 'home' && (
        <main id="top">
          {/* -----------------------------------------------------------------
              HERO SECTION WITH SUBTLE WATERMARK BACKGROUND
              ----------------------------------------------------------------- */}
          <div className="hero-wrapper relative overflow-hidden">
            {/* Ultra-subtle, low-opacity collegiate watermark background behind hero content */}
            <div
              className="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center select-none"
              aria-hidden="true"
            >
              {/* Campus aerial silhouette backdrop */}
              <img
                src="/images/slide3_aerial.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80';
                }}
                alt=""
                className="w-full h-full object-cover opacity-[0.05] grayscale mix-blend-multiply scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/95" />
              {/* Centered large watermark crest */}
              <img
                src="/images/college_logo.svg"
                alt="H.M College Official Crest"
                className="absolute w-[440px] h-[480px] max-w-[70vw] object-contain opacity-[0.06] grayscale mix-blend-multiply"
              />
            </div>

            <div className="wrap">
              <div className="hero">
                <div>
                  <h1>
                    Science, commerce and social work, <em>close to home.</em>
                  </h1>
                  <p>
                    Degree (CUFYUGP 2024 Honours) and postgraduate programmes at Mariyad, Manjeri, affiliated to the University of Calicut. Small classes, real labs, and teachers who know your name.
                  </p>
                  <div className="cta">
                    <a className="btn p" href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }}>
                      Apply for 2026
                    </a>
                    <a className="btn s" href="#courses" onClick={(e) => { e.preventDefault(); navigateTo('home', 'courses'); }}>
                      See all courses
                    </a>
                    <button
                      type="button"
                      onClick={() => navigateTo('fees')}
                      className="btn s"
                      style={{ background: 'var(--green)', color: '#fff', borderColor: 'var(--green)' }}
                    >
                      Fee Structure
                    </button>
                  </div>
                </div>

                {/* Photo Collage with real official photos */}
                <div className="collage" aria-hidden="true">
                  <div className="ph a" onClick={() => setActiveLightboxSlide(OFFICIAL_SLIDES[2])} style={{ cursor: 'pointer' }} title="Click to enlarge">
                    <img
                      src="/images/slide3_aerial.jpg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                      }}
                      alt="H.M College Campus Panoramic Aerial View"
                    />
                    <span>Campus Aerial &amp; Gate</span>
                  </div>
                  <div className="ph b" onClick={() => setActiveLightboxSlide(OFFICIAL_SLIDES[1])} style={{ cursor: 'pointer' }} title="Click to enlarge">
                    <img
                      src="/images/slide2_ranks.jpg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
                      }}
                      alt="University of Calicut Rank Holders"
                    />
                    <span>University Rank Holders</span>
                  </div>
                  <div className="ph c" onClick={() => setActiveLightboxSlide(OFFICIAL_SLIDES[3])} style={{ cursor: 'pointer' }} title="Click to enlarge">
                    <img
                      src="/images/slide4_campus_collage.jpg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80';
                      }}
                      alt="Computer and Science Lab"
                    />
                    <span>Labs, Library &amp; Hall</span>
                  </div>
                  <div className="stick">
                    <b>Admissions open</b>
                    Calicut CAP Code: <strong>HMC</strong>
                    <span style={{ display: 'block', fontSize: '11px', marginTop: '3px', opacity: 0.85 }}>
                      CUFYUGP &amp; PG Programmes
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="quick">
                <button type="button" onClick={() => navigateTo('pay')}>
                  Pay fees<span>Online payment</span>
                </button>
                <button type="button" onClick={() => navigateTo('portal')}>
                  Student login<span>Marks, attendance</span>
                </button>
                <button type="button" onClick={() => navigateTo('exams')}>
                  Exam dates<span>By semester</span>
                </button>
                <a href="https://results.uoc.ac.in/" target="_blank" rel="noopener noreferrer">
                  Results<span>University of Calicut</span>
                </a>
                <a href="#notices" onClick={(e) => { e.preventDefault(); navigateTo('home', 'notices'); }}>
                  Notices<span>Latest updates</span>
                </a>
                <button type="button" onClick={() => navigateTo('exams')}>
                  Downloads<span>Forms, syllabus</span>
                </button>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              OFFICIAL CAMPUS PHOTO GALLERY SLIDER
              --------------------------------------------------------------------- */}
          <section id="gallery" style={{ padding: '56px 0', borderBottom: '1px solid var(--line)', background: '#ffffff' }}>
            <div className="wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 className="sh" style={{ margin: 0, fontSize: '32px', color: '#111827' }}>Campus &amp; Academic Highlights</h2>
                  <p className="sub" style={{ margin: '4px 0 0', fontSize: '15px', color: '#4b5563' }}>
                    Official imagery from H.M. College of Science and Technology, Manjeri.
                  </p>
                </div>
                {/* Slider Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#4b5563', marginRight: '6px' }}>
                    {activeSlideIndex + 1} / {OFFICIAL_SLIDES.length}
                  </span>
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '2px solid #111827',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#111827',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <ChevronLeft style={{ width: '18px', height: '18px' }} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '2px solid #111827',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#111827',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <ChevronRight style={{ width: '18px', height: '18px' }} />
                  </button>
                </div>
              </div>

              {/* Featured Slide Display */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  background: '#f3f4f6',
                  maxHeight: '440px',
                  border: '1px solid #e5e7eb'
                }}
                onClick={() => setActiveLightboxSlide(OFFICIAL_SLIDES[activeSlideIndex])}
              >
                <img
                  src={OFFICIAL_SLIDES[activeSlideIndex].src}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = OFFICIAL_SLIDES[activeSlideIndex].fallbackSrc;
                  }}
                  alt={OFFICIAL_SLIDES[activeSlideIndex].title}
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '440px', objectFit: 'contain', background: '#f8fafc' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto 0 0 0',
                    padding: '24px 20px 18px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(17,24,39,0.92) 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '16px'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '18px', display: 'block', fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
                      {OFFICIAL_SLIDES[activeSlideIndex].title}
                    </strong>
                    <span style={{ fontSize: '13px', opacity: 0.9, color: '#f3f4f6' }}>
                      {OFFICIAL_SLIDES[activeSlideIndex].subtitle}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: 'rgba(255,255,255,0.25)', color: '#ffffff', padding: '6px 12px', borderRadius: '99px', backdropFilter: 'blur(4px)', fontWeight: 600 }}>
                    <Maximize2 style={{ width: '14px', height: '14px' }} />
                    <span>Enlarge</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '12px',
                  marginTop: '14px'
                }}
              >
                {OFFICIAL_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    style={{
                      padding: 0,
                      border: activeSlideIndex === idx ? '3px solid var(--coral)' : '1px solid #e5e7eb',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      aspectRatio: '16/9',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                      boxShadow: activeSlideIndex === idx ? '0 4px 12px rgba(224,80,45,0.2)' : 'none'
                    }}
                    title={slide.title}
                  >
                    <img
                      src={slide.src}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = slide.fallbackSrc;
                      }}
                      alt={slide.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------------
              ABOUT SECTION (With Mrs. Shabana, Principal)
              --------------------------------------------------------------------- */}
          <section id="about">
            <div className="wrap pr">
              <div className="face">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80"
                  alt="Mrs. SHABANA (M.A.), Principal"
                />
              </div>
              <div>
                <blockquote>
                  “At H.M College, we believe higher education should combine scientific rigor with genuine mentorship. Here in Mariyad, Manjeri, our students work in real laboratories, learn in small classes, and graduate prepared for successful careers.”
                </blockquote>
                <p className="sig">Mrs. SHABANA (M.A.), Principal</p>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------------
              COURSES SECTION (CUFYUGP 2024 HONOURS & POSTGRADUATE PROGRAMMES)
              --------------------------------------------------------------------- */}
          <section id="courses" className="band">
            <div className="wrap">
              {/* Header with Affiliation Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '99px', background: '#d1fae5', color: '#065f46', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      CUFYUGP 2024 Honours Scheme
                    </span>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '99px', background: '#fef3c7', color: '#92400e', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Affiliated to University of Calicut
                    </span>
                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '99px', background: '#e0e7ff', color: '#3730a3', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      NEP 2020 Aligned
                    </span>
                  </div>
                  <h2 className="sh" style={{ margin: '4px 0 8px' }}>Academic Programmes</h2>
                  <p className="sub" style={{ margin: 0, maxWidth: '64ch' }}>
                    Choose from our 4-Year Undergraduate Honours Programmes (with 3-Year Exit Option &amp; 4th Year Research) and Postgraduate Master&apos;s Degrees.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('fees')}
                  className="btn p"
                  style={{ padding: '10px 22px', fontSize: '14px' }}
                >
                  View Complete Fee Structure
                </button>
              </div>

              {/* CUFYUGP Architecture & Flagship AI Banner */}
              <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #eff6ff 100%)', border: '1.5px solid #a7f3d0', borderRadius: '18px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ maxWidth: '68ch' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', display: 'inline-block' }}></span>
                    Latest Flagship Programme
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#064e3b', margin: '2px 0 6px' }}>
                    B.Sc. Artificial Intelligence (AI) Honours — 4-Year CUFYUGP
                  </h3>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
                    Comprehensive curriculum covering <strong>Machine Learning, Robotics, Deep Learning, Natural Language Processing, Generative AI &amp; Blockchain Technology</strong> with dedicated computing laboratories.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const aiCourse = COURSES_SUMMARY.find(c => c.id === 'bsc-ai');
                    if (aiCourse) setSelectedCourseInfo(aiCourse);
                  }}
                  className="btn p"
                  style={{ background: '#047857', fontSize: '13px', padding: '9px 18px', flexShrink: 0 }}
                >
                  Inspect B.Sc AI Curriculum
                </button>
              </div>

              {/* Filter Tabs Bar */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '18px' }}>
                <button
                  type="button"
                  onClick={() => setHomeCourseTab('all')}
                  className={`btn ${homeCourseTab === 'all' ? 'p' : 's'}`}
                  style={{ padding: '7px 16px', fontSize: '13px', minHeight: '36px', whiteSpace: 'nowrap' }}
                >
                  All Programmes ({COURSES_SUMMARY.length})
                </button>
                <button
                  type="button"
                  onClick={() => setHomeCourseTab('FYUGP_Science')}
                  className={`btn ${homeCourseTab === 'FYUGP_Science' ? 'p' : 's'}`}
                  style={{ padding: '7px 16px', fontSize: '13px', minHeight: '36px', whiteSpace: 'nowrap' }}
                >
                  CUFYUGP Science Honours ({COURSES_SUMMARY.filter(c => (c.degree === 'UG' || c.programType === 'FYUGP') && c.category === 'Science').length})
                </button>
                <button
                  type="button"
                  onClick={() => setHomeCourseTab('FYUGP_Commerce')}
                  className={`btn ${homeCourseTab === 'FYUGP_Commerce' ? 'p' : 's'}`}
                  style={{ padding: '7px 16px', fontSize: '13px', minHeight: '36px', whiteSpace: 'nowrap' }}
                >
                  CUFYUGP Commerce Honours ({COURSES_SUMMARY.filter(c => (c.degree === 'UG' || c.programType === 'FYUGP') && c.category === 'Commerce').length})
                </button>
                <button
                  type="button"
                  onClick={() => setHomeCourseTab('PG')}
                  className={`btn ${homeCourseTab === 'PG' ? 'p' : 's'}`}
                  style={{ padding: '7px 16px', fontSize: '13px', minHeight: '36px', whiteSpace: 'nowrap' }}
                >
                  Postgraduate Master&apos;s ({COURSES_SUMMARY.filter(c => c.degree === 'PG').length})
                </button>
              </div>

              {/* Course Columns */}
              <div className="cols">
                {(homeCourseTab === 'all' || homeCourseTab === 'FYUGP_Science') && (
                  <div>
                    <h3>
                      {homeCourseTab === 'FYUGP_Science' ? 'CUFYUGP Science Honours' : 'Science Honours (4-Year CUFYUGP)'}
                    </h3>
                    <ul>
                      {COURSES_SUMMARY.filter((c) => (c.degree === 'UG' || c.programType === 'FYUGP') && c.category === 'Science').map((c) => (
                        <li
                          key={c.id}
                          onClick={() => setSelectedCourseInfo(c)}
                          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}
                          title="Click to view course specifications and fee details"
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, color: '#111827' }}>
                              {c.name}
                              {c.id === 'bsc-ai' && (
                                <span style={{ marginLeft: '8px', fontSize: '10px', background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '99px', fontWeight: 800 }}>
                                  NEW / FLAGSHIP
                                </span>
                              )}
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green2)', flexShrink: 0, marginLeft: '8px' }}>
                              ₹ {c.feePerSem.toLocaleString()}/sem
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12.5px', color: 'var(--muted)' }}>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '38ch' }}>
                              {c.highlights}
                            </span>
                            <span style={{ fontWeight: 600, flexShrink: 0, marginLeft: '8px' }}>
                              {c.seats}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(homeCourseTab === 'all' || homeCourseTab === 'FYUGP_Commerce' || homeCourseTab === 'PG') && (
                  <div>
                    {homeCourseTab !== 'PG' && (
                      <>
                        <h3>Commerce Honours (4-Year CUFYUGP)</h3>
                        <ul style={{ marginBottom: '24px' }}>
                          {COURSES_SUMMARY.filter((c) => (c.degree === 'UG' || c.programType === 'FYUGP') && c.category === 'Commerce').map((c) => (
                            <li
                              key={c.id}
                              onClick={() => setSelectedCourseInfo(c)}
                              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}
                              title="Click to view course specifications and fee details"
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, color: '#111827' }}>{c.name}</span>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green2)', flexShrink: 0, marginLeft: '8px' }}>
                                  ₹ {c.feePerSem.toLocaleString()}/sem
                                </span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12.5px', color: 'var(--muted)' }}>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '38ch' }}>
                                  {c.highlights}
                                </span>
                                <span style={{ fontWeight: 600, flexShrink: 0, marginLeft: '8px' }}>
                                  {c.seats}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {homeCourseTab !== 'FYUGP_Commerce' && (
                      <>
                        <h3>Postgraduate Master&apos;s Degrees (M.Sc / M.Com / MSW)</h3>
                        <ul>
                          {COURSES_SUMMARY.filter((c) => c.degree === 'PG').map((c) => (
                            <li
                              key={c.id}
                              onClick={() => setSelectedCourseInfo(c)}
                              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}
                              title="Click to view course specifications and fee details"
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, color: '#111827' }}>{c.name}</span>
                                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green2)', flexShrink: 0, marginLeft: '8px' }}>
                                  ₹ {c.feePerSem.toLocaleString()}/sem
                                </span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12.5px', color: 'var(--muted)' }}>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '38ch' }}>
                                  {c.highlights}
                                </span>
                                <span style={{ fontWeight: 600, flexShrink: 0, marginLeft: '8px' }}>
                                  {c.seats}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------------
              NOTICE BOARD
              --------------------------------------------------------------------- */}
          <section id="notices">
            <div className="wrap">
              <h2 className="sh">On the notice board</h2>
              <p className="sub">Pinned updates, newest first.</p>
              <div className="board">
                <div
                  className="note"
                  onClick={() => alert('CUFYUGP Admissions 2026: Calicut University Centralised Allotment Process (UGCAP Code: HMC) for Four-Year Honours & Honours with Research programmes active. Contact office: 0483 2767077.')}
                >
                  <b>CUFYUGP 2024 Honours</b>
                  <span>Calicut University 4-Year Honours admissions open in Science, Commerce &amp; AI.</span>
                  <br />
                  <small>UGCAP Code: HMC (2026-27)</small>
                </div>
                <div
                  className="note"
                  onClick={() => {
                    const aiCourse = COURSES_SUMMARY.find(c => c.id === 'bsc-ai');
                    if (aiCourse) setSelectedCourseInfo(aiCourse);
                  }}
                >
                  <b>B.Sc. AI Honours Enrolling</b>
                  <span>Flagship Artificial Intelligence &amp; Machine Learning curriculum under CUFYUGP Scheme.</span>
                  <br />
                  <small>Click to view modules</small>
                </div>
                <div
                  className="note"
                  onClick={() => alert('PGCAP Admissions 2026: Calicut University Centralised PG Allotment for M.Sc, M.Com, and MSW Disaster Management open.')}
                >
                  <b>PGCAP 2026 Master&apos;s</b>
                  <span>M.Sc Psychology, Geography, Physics, M.Com Finance &amp; MSW Disaster Management open.</span>
                  <br />
                  <small>Office of Admissions</small>
                </div>
                <div className="note" onClick={() => setActiveLightboxSlide(OFFICIAL_SLIDES[1])}>
                  <b>Rank Holders 2024-25</b>
                  <span>Celebrating 1st &amp; 7th Rank in BSc IT and 2nd Rank in BSc Zoology under Calicut University.</span>
                  <br />
                  <small>Click to view honours</small>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------------
              CAMPUS SECTION
              --------------------------------------------------------------------- */}
          <section id="campus" className="band">
            <div className="wrap campus">
              <div>
                <h2 className="sh">Life on campus</h2>
                <p className="sub">Everything a student needs is within the same grounds.</p>
                <ul className="fac">
                  <li>Central Library</li>
                  <li>Science laboratories</li>
                  <li>Computer lab</li>
                  <li>Auditorium (Abdurahiman Hall)</li>
                  <li>Cafeteria</li>
                  <li>Girls&apos; hostel</li>
                  <li>Multi-purpose basketball court</li>
                  <li>High-speed Optical Wi-Fi</li>
                </ul>
              </div>
              <div
                className="big"
                onClick={() => setActiveLightboxSlide(OFFICIAL_SLIDES[3])}
                style={{ cursor: 'pointer' }}
                title="Click to expand campus photos"
              >
                <img
                  src="/images/slide4_campus_collage.jpg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80';
                  }}
                  alt="H.M College Campus Labs, Library and Auditorium"
                />
                <span>Alukkal, Mariyad Campus Facilities (Click to enlarge)</span>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------------
              CONTACT SECTION WITH SUBTLE WATERMARK BACKGROUND
              --------------------------------------------------------------------- */}
          <section id="contact" className="contact relative overflow-hidden">
            {/* Ultra-subtle, low-opacity collegiate watermark background behind contact information & form wrapper */}
            <div
              className="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center select-none"
              aria-hidden="true"
            >
              {/* Campus aerial / architectural silhouette */}
              <img
                src="/images/slide3_aerial.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80';
                }}
                alt=""
                className="w-full h-full object-cover opacity-[0.05] grayscale blur-[1px] mix-blend-multiply scale-105"
              />
              <div className="absolute inset-0 bg-white/85" />
              {/* College crest watermark seal */}
              <img
                src="/images/college_logo.svg"
                alt="H.M College Official Crest"
                className="absolute w-[380px] h-[420px] max-w-[60vw] object-contain opacity-[0.05] grayscale mix-blend-multiply"
              />
            </div>

            <div className="wrap cg">
              <div>
                <h2 className="sh">Come and visit</h2>
                <p className="sub">Talk to the office about admissions, fees or documents.</p>
                <p>
                  <b>Address</b>
                  <br />
                  Alukkal, Mariyad, Manjeri, Malappuram, Kerala 676122
                </p>
                <p>
                  <b>Phone</b>
                  <br />
                  <a href="tel:+918075611845">+91 80756 11845</a> • <a href="tel:04832767077">0483 2767077</a>
                </p>
                <p>
                  <b>Email</b>
                  <br />
                  <a href="mailto:hmcmanjeri@gmail.com">hmcmanjeri@gmail.com</a>
                </p>
              </div>

              {sentSuccess ? (
                <div style={{ background: '#ffffff', color: '#111827', padding: '32px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
                  <CheckCircle2 style={{ width: '44px', height: '44px', color: '#1f7a5c', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '20px', marginBottom: '6px', color: '#111827' }}>Message Dispatched</h3>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '15px' }}>
                    Thank you, {nameVal}. The admission office will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form id="cf" onSubmit={handleFormSubmit}>
                  <label className="sr-only" htmlFor="n" style={{ position: 'absolute', left: '-9999px' }}>
                    Name
                  </label>
                  <input
                    id="n"
                    type="text"
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                  <label htmlFor="p" style={{ position: 'absolute', left: '-9999px' }}>
                    Phone
                  </label>
                  <input
                    id="p"
                    type="tel"
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    placeholder="Phone number"
                    inputMode="tel"
                    required
                  />
                  <label htmlFor="m" style={{ position: 'absolute', left: '-9999px' }}>
                    Message
                  </label>
                  <textarea
                    id="m"
                    value={msgVal}
                    onChange={(e) => setMsgVal(e.target.value)}
                    placeholder="How can we help?"
                    required
                  />
                  <button className="btn p" type="submit">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          PAGE VIEW: FEES STRUCTURE
          ===================================================================== */}
      {currentPage === 'fees' && (
        <main className="wrap">
          <div className="ph1">
            <h1>Fee structure</h1>
            <p>Pick a programme to see the semester-wise fees.</p>
          </div>

          <div className="panel">
            <label className="f" style={{ maxWidth: '420px' }}>
              Programme
              <select
                id="c"
                value={feesSelectedCourseId}
                onChange={(e) => setFeesSelectedCourseId(e.target.value)}
              >
                {DETAILED_COURSES.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="panel">
            <div className="row">
              <div>
                <b id="nm" style={{ fontSize: '20px', color: '#111827' }}>
                  {currentDetailedCourse.name}
                </b>
                <div id="du" style={{ color: 'var(--muted)', marginTop: '4px', fontSize: '14.5px' }}>
                  {currentDetailedCourse.duration}
                </div>
              </div>
              <span className={`tag ${currentDetailedCourse.eGrantzEligible ? '' : 'not-eg'}`}>
                {currentDetailedCourse.eGrantzEligible ? 'e-Grantz eligible' : 'Not e-Grantz eligible'}
              </span>
            </div>

            <div className="tw" style={{ marginTop: '20px' }}>
              <table>
                <thead>
                  <tr>
                    <th>Semester</th>
                    <th>Tuition</th>
                    <th>Lab</th>
                    <th>Special</th>
                    <th>Exam</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDetailedCourse.semesters.map((sem) => (
                    <tr key={sem.semester}>
                      <td>Semester {sem.semester}</td>
                      <td>₹ {sem.tuitionFee.toLocaleString('en-IN')}</td>
                      <td>₹ {sem.labFee.toLocaleString('en-IN')}</td>
                      <td>₹ {sem.specialFee.toLocaleString('en-IN')}</td>
                      <td>₹ {sem.examFee.toLocaleString('en-IN')}</td>
                      <td>
                        <b>₹ {sem.total.toLocaleString('en-IN')}</b>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5}>Total course fee</td>
                    <td style={{ color: 'var(--coral)', fontSize: '18px' }}>
                      ₹ {currentDetailedCourse.totalCourseFee.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p style={{ margin: '22px 0 0', display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn p"
                onClick={() => {
                  setPayCourseId(currentDetailedCourse.id);
                  setPaySemester(1);
                  navigateTo('pay');
                }}
              >
                Pay online
              </button>
              <button
                type="button"
                className="btn s"
                onClick={() => openFeesModal(currentDetailedCourse.id, 'breakdown')}
              >
                View Full Bursar Breakdown
              </button>
            </p>
          </div>

          <div className="panel">
            <h3 style={{ marginBottom: '14px', fontSize: '20px' }}>Pay by bank transfer</h3>
            <div className="tw">
              <table style={{ minWidth: 0 }}>
                <tbody>
                  {Object.keys(BANK_LABELS).map((k) => (
                    <tr key={k}>
                      <td style={{ fontWeight: 600, color: 'var(--muted)', width: '220px' }}>
                        {BANK_LABELS[k]}
                      </td>
                      <td style={{ fontWeight: 600, color: '#111827' }}>
                        {(OFFICIAL_BANK_DETAILS as Record<string, string>)[k]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PAGE VIEW: PAY ONLINE
          ===================================================================== */}
      {currentPage === 'pay' && (
        <main className="wrap">
          <div className="ph1">
            <h1>Pay fees online</h1>
            <p>Choose your programme and semester, then pay.</p>
          </div>

          <div className="demo">
            Demo only. No real payment happens here. Connect your payment gateway (Razorpay, PayU or your bank) where the comment in the code says.
          </div>

          {!paymentReceipt ? (
            <div className="panel" id="form">
              <form className="f" onSubmit={handlePaySubmit}>
                <label>
                  Student ID / Register number
                  <input
                    id="sid"
                    type="text"
                    value={payStudentId}
                    onChange={(e) => setPayStudentId(e.target.value)}
                    placeholder="e.g. HMC23IT014"
                    required
                  />
                </label>
                <label>
                  Programme
                  <select
                    id="c"
                    value={payCourseId}
                    onChange={(e) => {
                      setPayCourseId(e.target.value);
                      setPaySemester(1);
                    }}
                  >
                    {DETAILED_COURSES.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Semester
                  <select
                    id="s"
                    value={paySemester}
                    onChange={(e) => setPaySemester(Number(e.target.value))}
                  >
                    {payCurrentCourse.semesters.map((s) => (
                      <option key={s.semester} value={s.semester}>
                        Semester {s.semester}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>Amount Due</span>
                  <div className="bn" id="amt" style={{ color: 'var(--coral)' }}>
                    ₹ {paySemesterFee.toLocaleString('en-IN')}
                  </div>
                </div>
                <fieldset style={{ border: 0, padding: 0, display: 'grid', gap: '8px', margin: '8px 0' }}>
                  <legend style={{ fontWeight: 600, marginBottom: '6px', fontSize: '14.5px' }}>Payment method</legend>
                  <label className="opt">
                    <input
                      type="radio"
                      name="m"
                      value="UPI"
                      checked={payMethod === 'UPI'}
                      onChange={() => setPayMethod('UPI')}
                    />
                    <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                  </label>
                  <label className="opt">
                    <input
                      type="radio"
                      name="m"
                      value="Card"
                      checked={payMethod === 'Card'}
                      onChange={() => setPayMethod('Card')}
                    />
                    <span>Debit / credit card</span>
                  </label>
                  <label className="opt">
                    <input
                      type="radio"
                      name="m"
                      value="Net banking"
                      checked={payMethod === 'Net banking'}
                      onChange={() => setPayMethod('Net banking')}
                    />
                    <span>Net banking</span>
                  </label>
                </fieldset>
                <button className="btn p" type="submit">
                  Pay now ₹ {paySemesterFee.toLocaleString('en-IN')}
                </button>
              </form>
            </div>
          ) : (
            <div className="panel" id="ok">
              <span className="tag">Payment successful (demo)</span>
              <h3 style={{ margin: '14px 0 8px', fontSize: '22px' }}>Receipt</h3>
              <div className="tw">
                <table style={{ minWidth: 0 }}>
                  <tbody id="rc">
                    <tr>
                      <td style={{ fontWeight: 600, color: 'var(--muted)', width: '200px' }}>Receipt no.</td>
                      <td style={{ fontWeight: 700, color: '#111827' }}>{paymentReceipt.receiptNo}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Date</td>
                      <td>{paymentReceipt.date}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Student ID</td>
                      <td>{paymentReceipt.studentId}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Programme</td>
                      <td>{paymentReceipt.courseName}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Semester</td>
                      <td>Semester {paymentReceipt.semester}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Method</td>
                      <td>{paymentReceipt.method}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Amount paid</td>
                      <td style={{ fontWeight: 800, color: 'var(--green2)', fontSize: '18px' }}>{paymentReceipt.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ margin: '20px 0 0', display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  className="btn s"
                  onClick={() => window.print()}
                >
                  <Printer style={{ width: '16px', height: '16px' }} />
                  Print receipt
                </button>
                <button
                  type="button"
                  className="btn p"
                  onClick={() => setPaymentReceipt(null)}
                >
                  Pay another fee
                </button>
              </p>
            </div>
          )}
        </main>
      )}

      {/* =====================================================================
          PAGE VIEW: EXAMS
          ===================================================================== */}
      {currentPage === 'exams' && (
        <main className="wrap">
          <div className="ph1">
            <h1>Exams</h1>
            <p>Timetables, deadlines and downloads in one place.</p>
          </div>

          <div className="panel">
            <label className="f" style={{ maxWidth: '420px' }}>
              Programme
              <select
                id="c"
                value={examCourseFilter}
                onChange={(e) => setExamCourseFilter(e.target.value)}
              >
                <option value="">All programmes</option>
                {DETAILED_COURSES.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="panel">
            <h3 style={{ marginBottom: '12px', fontSize: '20px' }}>Exam timetable</h3>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>Programme</th>
                    <th>Semester</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {DETAILED_COURSES.filter((c) => !examCourseFilter || c.id === examCourseFilter).map((course) =>
                    course.semesters.map((sem) => (
                      <tr key={`${course.id}-${sem.semester}`}>
                        <td>{course.name}</td>
                        <td>Semester {sem.semester}</td>
                        <td style={{ fontWeight: 600, color: 'var(--coral)' }}>
                          {sem.semester % 2 === 1 ? 'Nov 24, 2026' : 'Apr 18, 2027'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel" id="results">
            <h3 style={{ marginBottom: '12px', fontSize: '20px' }}>Important dates</h3>
            <div className="tw">
              <table style={{ minWidth: 0 }}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--muted)', width: '280px' }}>Exam registration last date</td>
                    <td style={{ fontWeight: 700 }}>October 30, 2026</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Hall ticket download</td>
                    <td style={{ fontWeight: 700 }}>November 15, 2026</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Results announced</td>
                    <td style={{ fontWeight: 700 }}>January 12, 2027</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: 'var(--muted)' }}>Revaluation last date</td>
                    <td style={{ fontWeight: 700 }}>January 28, 2027</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel" id="downloads">
            <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Downloads</h3>
            <p style={{ margin: 0, color: '#374151', fontSize: '15px' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading latest University of Calicut syllabus...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                Syllabus
              </a>{' '}
              •{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading 2026-27 Academic calendar...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                Academic calendar
              </a>{' '}
              •{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading previous semester question papers...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                Previous question papers
              </a>{' '}
              •{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading exam application forms...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                Forms
              </a>
            </p>
          </div>
        </main>
      )}

      {/* =====================================================================
          PAGE VIEW: STUDENT PORTAL
          ===================================================================== */}
      {currentPage === 'portal' && (
        <main className="wrap">
          <div className="ph1">
            <h1>Student portal</h1>
            <p>Log in to see your attendance, marks, fees and documents.</p>
          </div>

          <div className="demo">
            Demo screens with sample data. A real login needs a backend and your college records (ERP). Any ID and password work here.
          </div>

          {!isLoggedInStudent ? (
            <div className="panel" id="lg">
              <form className="f" onSubmit={handlePortalLogin}>
                <label>
                  Register number
                  <input
                    id="u"
                    type="text"
                    value={portalUsername}
                    onChange={(e) => setPortalUsername(e.target.value)}
                    placeholder="e.g. HMC24IT012"
                    required
                    autoComplete="username"
                  />
                </label>
                <label>
                  Password
                  <input
                    id="pw"
                    type={showPortalPassword ? 'text' : 'password'}
                    value={portalPassword}
                    onChange={(e) => setPortalPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    autoComplete="current-password"
                  />
                </label>
                <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 500, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showPortalPassword}
                    onChange={(e) => setShowPortalPassword(e.target.checked)}
                    style={{ width: 'auto', minHeight: 0 }}
                  />
                  <span>Show password</span>
                </label>
                <button className="btn p" type="submit">
                  Log in
                </button>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link sent to registered email address or contact college office.');
                  }}
                  style={{ color: 'var(--green2)', fontSize: '14px', textDecoration: 'underline' }}
                >
                  Forgot password?
                </a>
              </form>
            </div>
          ) : (
            <div id="db">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 className="sh" style={{ margin: 0, fontSize: '26px' }}>
                  Welcome, {portalUsername || 'Student'}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsLoggedInStudent(false)}
                  className="btn s"
                  style={{ minHeight: '36px', padding: '6px 16px', fontSize: '13.5px' }}
                >
                  Log out
                </button>
              </div>

              <div className="g3">
                <div className="panel">
                  <div style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 600 }}>Attendance</div>
                  <div className="bn" style={{ color: 'var(--green2)' }}>86%</div>
                </div>
                <div className="panel">
                  <div style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 600 }}>Pending fees</div>
                  <div className="bn" style={{ color: '#111827' }}>₹ 0</div>
                </div>
                <div className="panel">
                  <div style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 600 }}>Next exam</div>
                  <div className="bn" style={{ fontSize: '24px', color: 'var(--coral)' }}>Nov 24, 2026</div>
                </div>
              </div>

              <div className="panel" style={{ marginTop: '24px' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '20px' }}>Internal marks</h3>
                <div className="tw">
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Out of</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Data Structures &amp; Algorithms</td>
                        <td style={{ fontWeight: 700 }}>18</td>
                        <td>20</td>
                      </tr>
                      <tr>
                        <td>Database Management Systems</td>
                        <td style={{ fontWeight: 700 }}>16</td>
                        <td>20</td>
                      </tr>
                      <tr>
                        <td>Computer Networks</td>
                        <td style={{ fontWeight: 700 }}>19</td>
                        <td>20</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="panel">
                <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Documents</h3>
                <p style={{ margin: 0, color: '#374151', fontSize: '15px' }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading Student Digital ID card...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                    ID card
                  </a>{' '}
                  •{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Generating Bonafide certificate...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                    Bonafide certificate
                  </a>{' '}
                  •{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading Hall ticket...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                    Hall ticket
                  </a>{' '}
                  •{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading Fee receipts archive...'); }} style={{ color: 'var(--green)', fontWeight: 600, textDecoration: 'underline' }}>
                    Fee receipts
                  </a>
                </p>
              </div>

              <button
                type="button"
                className="btn s"
                onClick={() => navigateTo('pay')}
                style={{ marginTop: '10px' }}
              >
                Pay semester fees
              </button>
            </div>
          )}
        </main>
      )}

      {/* ---------------------------------------------------------------------
          FOOTER
          --------------------------------------------------------------------- */}
      <footer>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/images/college_logo.svg"
              alt="H.M College Crest"
              style={{ width: '40px', height: '46px', objectFit: 'contain' }}
            />
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: '#111827' }}>
                H.M College of Science and Technology, Manjeri
              </strong>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Affiliated to the University of Calicut • Alukkal, Mariyad, Malappuram, Kerala 676122
              </div>
            </div>
          </div>
          <div style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
            © {new Date().getFullYear()} H.M College. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ---------------------------------------------------------------------
          FULLSCREEN LIGHTBOX MODAL
          --------------------------------------------------------------------- */}
      {activeLightboxSlide && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'rgba(10, 20, 16, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveLightboxSlide(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '960px',
              width: '100%',
              background: '#15251e',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              color: '#fff'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxSlide(null)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              aria-label="Close Lightbox"
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
            <img
              src={activeLightboxSlide.src}
              onError={(e) => {
                (e.target as HTMLImageElement).src = activeLightboxSlide.fallbackSrc;
              }}
              alt={activeLightboxSlide.title}
              style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', background: '#0e1a15', display: 'block' }}
            />
            <div style={{ padding: '18px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <strong style={{ fontSize: '18px', display: 'block', fontFamily: 'var(--font-heading)' }}>
                {activeLightboxSlide.title}
              </strong>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#9db1a5' }}>
                {activeLightboxSlide.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          COURSE POPUP / MODAL
          --------------------------------------------------------------------- */}
      {selectedCourseInfo && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(20,35,28,0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setSelectedCourseInfo(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCourseInfo(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted)'
              }}
              aria-label="Close"
            >
              <X style={{ width: '22px', height: '22px' }} />
            </button>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {selectedCourseInfo.programType === 'FYUGP' ? 'CUFYUGP 2024 Honours (4-Year)' : 'Postgraduate Master\'s Degree'} • University of Calicut
            </span>
            <h3 style={{ fontSize: '24px', margin: '4px 0 16px', color: 'var(--ink)' }}>
              {selectedCourseInfo.name}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '14px', borderRadius: '12px', background: 'var(--bg)', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Fee per Semester</span>
                <strong style={{ fontSize: '18px', color: 'var(--ink)' }}>₹ {selectedCourseInfo.feePerSem.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>Duration &amp; Seats</span>
                <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>{selectedCourseInfo.duration} • {selectedCourseInfo.seats}</strong>
              </div>
            </div>
            <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Specialization &amp; Academic Focus
              </span>
              <p style={{ margin: 0, fontSize: '13px', color: '#1e293b', lineHeight: 1.5 }}>
                {selectedCourseInfo.highlights}
              </p>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 20px' }}>
              <strong>Eligibility:</strong> {selectedCourseInfo.eligibility}
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setSelectedCourseInfo(null)}
                className="btn s"
                style={{ padding: '8px 16px', fontSize: '14px', minHeight: '38px' }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = selectedCourseInfo.id;
                  setSelectedCourseInfo(null);
                  setPayCourseId(id);
                  navigateTo('pay');
                }}
                className="btn p"
                style={{ padding: '8px 18px', fontSize: '14px', minHeight: '38px' }}
              >
                Pay Semester Fee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          SEMESTER FEES & PAYMENT MODAL
          --------------------------------------------------------------------- */}
      <SemesterFeesModal
        isOpen={isFeesModalOpen}
        onClose={() => setIsFeesModalOpen(false)}
        defaultCourseId={selectedFeeCourseId}
        initialTab={feesModalTab}
      />
    </>
  );
}
