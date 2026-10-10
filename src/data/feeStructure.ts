export interface SemesterFeeItem {
  semester: number;
  tuitionFee: number;
  labFee: number;
  specialFee: number;
  examFee: number;
  total: number;
}

export interface DetailedCourse {
  id: string;
  name: string;
  code: string;
  duration: string;
  semestersCount: number;
  degree: 'UG' | 'PG';
  programType: 'FYUGP' | 'PG';
  category: 'Science' | 'Commerce' | 'Social Work';
  feePerSemester: number;
  totalCourseFee: number;
  eGrantzEligible: boolean;
  semesters: SemesterFeeItem[];
}

export interface CourseFeeDetail extends DetailedCourse {}

export const DETAILED_COURSES: DetailedCourse[] = [
  // -------------------------------------------------------------
  // UNDERGRADUATE: CUFYUGP 2024 FOUR YEAR HONOURS PROGRAMMES
  // -------------------------------------------------------------
  {
    id: "bsc-ai",
    name: "B.Sc. Artificial Intelligence (AI) Honours",
    code: "B.Sc AI (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 24000,
    totalCourseFee: 192000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 18000,
      labFee: 4000,
      specialFee: 1200,
      examFee: 800,
      total: 24000
    }))
  },
  {
    id: "bsc-it",
    name: "B.Sc. Information Technology (IT) Honours",
    code: "B.Sc IT (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 21500,
    totalCourseFee: 172000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 16000,
      labFee: 3500,
      specialFee: 1200,
      examFee: 800,
      total: 21500
    }))
  },
  {
    id: "bsc-psy",
    name: "B.Sc. Psychology Honours",
    code: "B.Sc Psy (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 19000,
    totalCourseFee: 152000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 14500,
      labFee: 2500,
      specialFee: 1200,
      examFee: 800,
      total: 19000
    }))
  },
  {
    id: "bsc-phy",
    name: "B.Sc. Physics Honours",
    code: "B.Sc Phy (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 14500,
    totalCourseFee: 116000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 10500,
      labFee: 2200,
      specialFee: 1000,
      examFee: 800,
      total: 14500
    }))
  },
  {
    id: "bsc-chem",
    name: "B.Sc. Chemistry Honours",
    code: "B.Sc Chem (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 15500,
    totalCourseFee: 124000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 11000,
      labFee: 2700,
      specialFee: 1000,
      examFee: 800,
      total: 15500
    }))
  },
  {
    id: "bsc-math",
    name: "B.Sc. Mathematics Honours",
    code: "B.Sc Maths (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 13000,
    totalCourseFee: 104000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 10000,
      labFee: 1500,
      specialFee: 900,
      examFee: 600,
      total: 13000
    }))
  },
  {
    id: "bsc-geo",
    name: "B.Sc. Geography Honours",
    code: "B.Sc Geog (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 13500,
    totalCourseFee: 108000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 9800,
      labFee: 2200,
      specialFee: 1000,
      examFee: 500,
      total: 13500
    }))
  },
  {
    id: "bsc-geology",
    name: "B.Sc. Geology Honours",
    code: "B.Sc Geol (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 16500,
    totalCourseFee: 132000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 12000,
      labFee: 2500,
      specialFee: 1200,
      examFee: 800,
      total: 16500
    }))
  },
  {
    id: "bsc-zoology",
    name: "B.Sc. Zoology Honours",
    code: "B.Sc Zool (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 15000,
    totalCourseFee: 120000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 10500,
      labFee: 2700,
      specialFee: 1000,
      examFee: 800,
      total: 15000
    }))
  },
  {
    id: "bsc-botany",
    name: "B.Sc. Botany Honours",
    code: "B.Sc Bot (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Science",
    feePerSemester: 15000,
    totalCourseFee: 120000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 10500,
      labFee: 2700,
      specialFee: 1000,
      examFee: 800,
      total: 15000
    }))
  },
  {
    id: "bcom-fin",
    name: "B.Com. Finance Honours",
    code: "B.Com Fin (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Commerce",
    feePerSemester: 16500,
    totalCourseFee: 132000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 13000,
      labFee: 1700,
      specialFee: 1000,
      examFee: 800,
      total: 16500
    }))
  },
  {
    id: "bcom-ca",
    name: "B.Com. Computer Application Honours",
    code: "B.Com CA (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Commerce",
    feePerSemester: 17500,
    totalCourseFee: 140000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 13500,
      labFee: 2200,
      specialFee: 1000,
      examFee: 800,
      total: 17500
    }))
  },
  {
    id: "bcom-prof",
    name: "B.Com. Professional Honours (CA/CMA Aligned)",
    code: "B.Com Prof (Hons)",
    duration: "4 Years (8 Semesters) / 3-Year Exit Option",
    semestersCount: 8,
    degree: "UG",
    programType: "FYUGP",
    category: "Commerce",
    feePerSemester: 19500,
    totalCourseFee: 156000,
    eGrantzEligible: true,
    semesters: Array.from({ length: 8 }, (_, i) => ({
      semester: i + 1,
      tuitionFee: 15000,
      labFee: 2500,
      specialFee: 1200,
      examFee: 800,
      total: 19500
    }))
  },

  // -------------------------------------------------------------
  // POSTGRADUATE (PG) PROGRAMMES
  // -------------------------------------------------------------
  {
    id: "msw-dm",
    name: "Master of Social Work (MSW) — Disaster Management",
    code: "MSW DM",
    duration: "2 Years (4 Semesters)",
    semestersCount: 4,
    degree: "PG",
    programType: "PG",
    category: "Social Work",
    feePerSemester: 22000,
    totalCourseFee: 88000,
    eGrantzEligible: true,
    semesters: [
      { semester: 1, tuitionFee: 17000, labFee: 2000, specialFee: 2000, examFee: 1000, total: 22000 },
      { semester: 2, tuitionFee: 17000, labFee: 2000, specialFee: 2000, examFee: 1000, total: 22000 },
      { semester: 3, tuitionFee: 17000, labFee: 2000, specialFee: 2000, examFee: 1000, total: 22000 },
      { semester: 4, tuitionFee: 17000, labFee: 2000, specialFee: 2000, examFee: 1000, total: 22000 }
    ]
  },
  {
    id: "msc-psy",
    name: "M.Sc. Psychology",
    code: "M.Sc Psy",
    duration: "2 Years (4 Semesters)",
    semestersCount: 4,
    degree: "PG",
    programType: "PG",
    category: "Science",
    feePerSemester: 26000,
    totalCourseFee: 104000,
    eGrantzEligible: true,
    semesters: [
      { semester: 1, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 2, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 3, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 4, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 }
    ]
  },
  {
    id: "msc-geo",
    name: "M.Sc. Geography",
    code: "M.Sc Geog",
    duration: "2 Years (4 Semesters)",
    semestersCount: 4,
    degree: "PG",
    programType: "PG",
    category: "Science",
    feePerSemester: 26000,
    totalCourseFee: 104000,
    eGrantzEligible: true,
    semesters: [
      { semester: 1, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 2, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 3, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 4, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 }
    ]
  },
  {
    id: "msc-phy",
    name: "M.Sc. Physics",
    code: "M.Sc Phy",
    duration: "2 Years (4 Semesters)",
    semestersCount: 4,
    degree: "PG",
    programType: "PG",
    category: "Science",
    feePerSemester: 26000,
    totalCourseFee: 104000,
    eGrantzEligible: true,
    semesters: [
      { semester: 1, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 2, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 3, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 },
      { semester: 4, tuitionFee: 20000, labFee: 3500, specialFee: 1500, examFee: 1000, total: 26000 }
    ]
  },
  {
    id: "mcom-fin",
    name: "M.Com. Finance",
    code: "M.Com Fin",
    duration: "2 Years (4 Semesters)",
    semestersCount: 4,
    degree: "PG",
    programType: "PG",
    category: "Commerce",
    feePerSemester: 20000,
    totalCourseFee: 80000,
    eGrantzEligible: true,
    semesters: [
      { semester: 1, tuitionFee: 16000, labFee: 1500, specialFee: 1500, examFee: 1000, total: 20000 },
      { semester: 2, tuitionFee: 16000, labFee: 1500, specialFee: 1500, examFee: 1000, total: 20000 },
      { semester: 3, tuitionFee: 16000, labFee: 1500, specialFee: 1500, examFee: 1000, total: 20000 },
      { semester: 4, tuitionFee: 16000, labFee: 1500, specialFee: 1500, examFee: 1000, total: 20000 }
    ]
  }
];

export const COURSE_FEES_DATA = DETAILED_COURSES;

export const OFFICIAL_BANK_DETAILS = {
  accountName: "H.M. College of Science and Technology",
  bankName: "State Bank of India (SBI)",
  branch: "Manjeri Town Branch",
  accountNumber: "389400210004921",
  ifscCode: "SBIN0070188",
  micrCode: "676002052",
  upiId: "hmcollegemanjeri@sbi",
  contactPhone: "0483 2767077 / 8075611845"
};

export const BANK_LABELS: Record<string, string> = {
  accountName: 'Account name',
  bankName: 'Bank',
  branch: 'Branch',
  accountNumber: 'Account number',
  ifscCode: 'IFSC',
  micrCode: 'MICR',
  upiId: 'UPI ID',
  contactPhone: 'Phone'
};

export interface CourseSummary {
  id: string;
  name: string;
  degree: 'UG' | 'PG';
  programType: 'FYUGP' | 'PG';
  category: 'Science' | 'Commerce' | 'Social Work';
  duration: string;
  seats: string;
  feePerSem: number;
  eligibility: string;
  highlights: string;
}

export const COURSES_SUMMARY: CourseSummary[] = [
  // -------------------------------------------------------------
  // UNDERGRADUATE CUFYUGP 2024 HONOURS (13 COURSES)
  // -------------------------------------------------------------
  {
    id: 'bsc-ai',
    name: 'B.Sc. Artificial Intelligence (AI) Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '36 Seats',
    feePerSem: 24000,
    eligibility: 'Pass in Higher Secondary (+2) with Mathematics / Computer Science / Informatics Practices or recognized equivalent under Calicut University UGCAP.',
    highlights: 'Machine Learning, Robotics, Deep Learning, NLP, Generative AI & Blockchain Technology under CUFYUGP 2024 Regulations.'
  },
  {
    id: 'bsc-it',
    name: 'B.Sc. Information Technology (IT) Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '36 Seats',
    feePerSem: 21500,
    eligibility: 'Pass in +2 with Mathematics or Computer Science as a subject.',
    highlights: 'Full-stack software engineering, Cloud systems, Cybersecurity, and hands-on coding laboratories.'
  },
  {
    id: 'bsc-psy',
    name: 'B.Sc. Psychology Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '36 Seats',
    feePerSem: 19000,
    eligibility: 'Pass in +2 Higher Secondary in any stream from recognized board.',
    highlights: 'Cognitive Science, Clinical counseling, Neuropsychology, and advanced psychometric testing lab.'
  },
  {
    id: 'bsc-phy',
    name: 'B.Sc. Physics Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '30 Seats',
    feePerSem: 14500,
    eligibility: 'Pass in +2 Higher Secondary with Physics and Mathematics.',
    highlights: 'Quantum mechanics, Condensed matter, Advanced optics, Electronics lab, and Computational physics.'
  },
  {
    id: 'bsc-chem',
    name: 'B.Sc. Chemistry Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '30 Seats',
    feePerSem: 15500,
    eligibility: 'Pass in +2 with Chemistry and Mathematics / Biology.',
    highlights: 'Organic synthesis, Analytical instrumentation, Polymer chemistry, and Green chemical methods.'
  },
  {
    id: 'bsc-math',
    name: 'B.Sc. Mathematics Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '30 Seats',
    feePerSem: 13000,
    eligibility: 'Pass in +2 with Mathematics group or equivalent.',
    highlights: 'Linear algebra, Real analysis, Data modeling, Graph theory, and Mathematical computing.'
  },
  {
    id: 'bsc-geo',
    name: 'B.Sc. Geography Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '30 Seats',
    feePerSem: 13500,
    eligibility: 'Pass in +2 in Science or Humanities group.',
    highlights: 'Geomorphology, Cartography, Satellite Remote Sensing, GIS mapping, and Field spatial surveys.'
  },
  {
    id: 'bsc-geology',
    name: 'B.Sc. Geology Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '30 Seats',
    feePerSem: 16500,
    eligibility: 'Pass in +2 with Science (Physics, Chemistry, Maths/Biology).',
    highlights: 'Mineralogy, Petrology, Structural geology, Paleontology, and Geoscience field training in Kerala terrain.'
  },
  {
    id: 'bsc-zoology',
    name: 'B.Sc. Zoology Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '30 Seats',
    feePerSem: 15000,
    eligibility: 'Pass in +2 with Biology / Life Sciences group.',
    highlights: 'Cell biology, Animal physiology, Genetics, Ecology, Applied zoology, and Biodiversity field studies.'
  },
  {
    id: 'bsc-botany',
    name: 'B.Sc. Botany Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Science',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '30 Seats',
    feePerSem: 15000,
    eligibility: 'Pass in +2 with Biology / Botany / Science group.',
    highlights: 'Plant anatomy, Phytochemistry, Plant tissue culture, Horticulture, and Herbal resource exploration.'
  },
  {
    id: 'bcom-fin',
    name: 'B.Com. Finance Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Commerce',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '40 Seats',
    feePerSem: 16500,
    eligibility: 'Pass in +2 with Commerce group or minimum 45% aggregate in other streams.',
    highlights: 'Corporate financial management, Investment analysis, Direct & Indirect tax, and Fintech tools.'
  },
  {
    id: 'bcom-ca',
    name: 'B.Com. Computer Application Honours',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Commerce',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '40 Seats',
    feePerSem: 17500,
    eligibility: 'Pass in +2 with Commerce or relevant qualifying stream.',
    highlights: 'E-commerce frameworks, Tally ERP, Database administration, and Business digital systems.'
  },
  {
    id: 'bcom-prof',
    name: 'B.Com. Professional Honours (CA/CMA Aligned)',
    degree: 'UG',
    programType: 'FYUGP',
    category: 'Commerce',
    duration: '4 Years (8 Sems) / 3-Yr Exit',
    seats: '40 Seats',
    feePerSem: 19500,
    eligibility: 'Pass in +2 with Commerce with high aggregate or qualifying marks.',
    highlights: 'Integrated CA/CMA preparation, Advanced corporate auditing, Strategic management, and Corporate governance.'
  },

  // -------------------------------------------------------------
  // POSTGRADUATE MASTER'S PROGRAMMES (5 COURSES)
  // -------------------------------------------------------------
  {
    id: 'msw-dm',
    name: 'Master of Social Work (MSW) — Disaster Management',
    degree: 'PG',
    programType: 'PG',
    category: 'Social Work',
    duration: '2 Years (4 Semesters)',
    seats: '20 Seats',
    feePerSem: 22000,
    eligibility: 'Pass in any recognized Bachelor degree (B.A / B.Sc / B.Com / BSW) with minimum 50% aggregate marks under University of Calicut PGCAP.',
    highlights: 'Specialization in Disaster Preparedness, Psychosocial Rehabilitation, Community Work, and Humanitarian Relief Logistics.'
  },
  {
    id: 'msc-psy',
    name: 'M.Sc. Psychology',
    degree: 'PG',
    programType: 'PG',
    category: 'Science',
    duration: '2 Years (4 Semesters)',
    seats: '15 Seats',
    feePerSem: 26000,
    eligibility: 'B.A / B.Sc in Psychology with minimum 50% aggregate marks from University of Calicut or recognized equivalent.',
    highlights: 'Advanced Psychometrics, Cognitive Neuroscience, Clinical Practicum, and State-of-the-Art Experimental Psychology Laboratory.'
  },
  {
    id: 'msc-geo',
    name: 'M.Sc. Geography',
    degree: 'PG',
    programType: 'PG',
    category: 'Science',
    duration: '2 Years (4 Semesters)',
    seats: '15 Seats',
    feePerSem: 26000,
    eligibility: 'B.Sc Geography or recognized allied geospatial/earth science degree with minimum 50% marks.',
    highlights: 'GIS & Remote Sensing Lab, GPS Surveying, Spatial Analytics, Urban Planning, and Environmental Field Work.'
  },
  {
    id: 'msc-phy',
    name: 'M.Sc. Physics',
    degree: 'PG',
    programType: 'PG',
    category: 'Science',
    duration: '2 Years (4 Semesters)',
    seats: '12 Seats',
    feePerSem: 26000,
    eligibility: 'B.Sc Physics with Mathematics subsidiary / complementary with minimum 50% marks under University of Calicut.',
    highlights: 'Condensed Matter Physics, Quantum Mechanics, Computational Modeling, and Advanced Optical & Electronic Instrumentation.'
  },
  {
    id: 'mcom-fin',
    name: 'M.Com. Finance',
    degree: 'PG',
    programType: 'PG',
    category: 'Commerce',
    duration: '2 Years (4 Semesters)',
    seats: '20 Seats',
    feePerSem: 20000,
    eligibility: 'B.Com or BBA degree with at least 45% aggregate marks from University of Calicut or recognized university.',
    highlights: 'Financial Derivatives, Corporate Taxation, Portfolio Theory, Financial Econometrics, and Strategic Corporate Analysis.'
  }
];

export const BANK_TRANSFER_DETAILS = OFFICIAL_BANK_DETAILS;
