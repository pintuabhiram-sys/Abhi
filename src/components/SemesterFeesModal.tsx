import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Receipt,
  Printer,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Copy,
  Check,
  Search,
  FileText,
  Landmark,
  BadgeCheck
} from 'lucide-react';
import { COURSE_FEES_DATA, BANK_TRANSFER_DETAILS } from '../data/feeStructure';

interface SemesterFeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
  initialTab?: 'breakdown' | 'allCourses' | 'payOnline';
}

export default function SemesterFeesModal({
  isOpen,
  onClose,
  defaultCourseId,
  initialTab = 'breakdown'
}: SemesterFeesModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    defaultCourseId || COURSE_FEES_DATA[0].id
  );
  const [activeTab, setActiveTab] = useState<'breakdown' | 'allCourses' | 'payOnline'>(initialTab);
  const [courseSearch, setCourseSearch] = useState('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<'all' | 'UG' | 'PG' | 'FYUGP' | 'Science' | 'Commerce'>('all');
  const [studentName, setStudentName] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'bank'>('upi');
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });
  const [paidReceipt, setPaidReceipt] = useState<{
    receiptNo: string;
    txnId: string;
    date: string;
    studentName: string;
    admissionNo: string;
    phone: string;
    courseName: string;
    courseCode: string;
    degree: string;
    semester: number;
    tuitionFee: number;
    labFee: number;
    specialFee: number;
    examFee: number;
    totalAmount: number;
    paymentMethod: string;
    bankReference: string;
  } | null>(null);

  useEffect(() => {
    if (defaultCourseId) {
      setSelectedCourseId(defaultCourseId);
    }
  }, [defaultCourseId]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const currentCourse =
    COURSE_FEES_DATA.find((c) => c.id === selectedCourseId) || COURSE_FEES_DATA[0];
  const validSemester =
    selectedSemester > currentCourse.semestersCount ? 1 : selectedSemester;
  const semesterFee =
    currentCourse.semesters.find((s) => s.semester === validSemester) ||
    currentCourse.semesters[0];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedReceiptNo =
        'HMC/REC/' +
        new Date().getFullYear() +
        '/' +
        Math.floor(10000 + Math.random() * 90000);
      const generatedTxn = 'TXN-HMC-' + Math.floor(10000000 + Math.random() * 90000000);
      setPaidReceipt({
        receiptNo: generatedReceiptNo,
        txnId: generatedTxn,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        studentName: studentName || 'Student (Self)',
        admissionNo: admissionNo || 'HMC-' + Math.floor(1000 + Math.random() * 9000),
        phone: studentPhone || '98XXXXXXXX',
        courseName: currentCourse.name,
        courseCode: currentCourse.code,
        degree: currentCourse.degree,
        semester: validSemester,
        tuitionFee: semesterFee.tuitionFee,
        labFee: semesterFee.labFee,
        specialFee: semesterFee.specialFee,
        examFee: semesterFee.examFee,
        totalAmount: semesterFee.total,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI / QR Payment'
            : paymentMethod === 'card'
            ? 'Debit / Credit Card'
            : paymentMethod === 'netbanking'
            ? `Net Banking (${selectedBank})`
            : 'Direct Bank NEFT/RTGS',
        bankReference: 'SBI-REF-' + Math.floor(100000 + Math.random() * 900000)
      });
    }, 1000);
  };

  const filteredCoursesForTable = COURSE_FEES_DATA.filter((course) => {
    const matchesCategory =
      courseCategoryFilter === 'all' ||
      course.degree === courseCategoryFilter ||
      course.programType === courseCategoryFilter ||
      course.category === courseCategoryFilter;
    const matchesSearch =
      course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.code.toLowerCase().includes(courseSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#061838]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="bg-[#12503f] text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center font-black shadow-md shrink-0">
              <img src="/images/college_logo.svg" alt="H.M College Crest" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#ffe7a8]">
                  Office of the Bursar &amp; Student Accounts
                </span>
                <span className="text-white/40 text-[11px] hidden sm:inline" aria-hidden="true">•</span>
                <span className="text-[11px] text-white/80 hidden sm:inline">
                  University of Calicut Statutes
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-white leading-tight mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                Semester Tuition &amp; Examination Remittance Portal
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
            aria-label="Close Fee Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 pt-3 flex items-center justify-between gap-3 overflow-x-auto shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab('breakdown');
                setPaidReceipt(null);
              }}
              className={`pb-3 px-3.5 sm:px-4 border-b-2 font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'breakdown'
                  ? 'border-[#12503f] text-[#12503f]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Semester Fee Breakdown</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('allCourses');
                setPaidReceipt(null);
              }}
              className={`pb-3 px-3.5 sm:px-4 border-b-2 font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'allCourses'
                  ? 'border-[#12503f] text-[#12503f]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>All Courses Fee Table ({COURSE_FEES_DATA.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('payOnline')}
              className={`pb-3 px-3.5 sm:px-4 border-b-2 font-bold text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'payOnline'
                  ? 'border-[#e0502d] text-[#e0502d]'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#e0502d]" />
              <span>Pay Semester Fee Online</span>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 pb-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-bit Secure Collegiate Gateway</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-grow space-y-6">
          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-emerald-50 to-teal-50/60 p-5 rounded-2xl border border-emerald-100">
                <div className="flex-grow">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Academic Programme:
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => {
                      setSelectedCourseId(e.target.value);
                      setSelectedSemester(1);
                    }}
                    className="w-full sm:max-w-md bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-[#12503f] shadow-sm outline-none"
                  >
                    {COURSE_FEES_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.duration} ({c.degree})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-emerald-200/60">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider block">
                      Per Semester Fee
                    </span>
                    <strong className="text-xl sm:text-2xl font-black text-[#12503f]">
                      ₹ {currentCourse.feePerSemester.toLocaleString()}
                    </strong>
                    <span className="text-[11px] text-slate-500 block">
                      Total ({currentCourse.semestersCount} Semesters): ₹ {currentCourse.totalCourseFee.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSemester(1);
                      setActiveTab('payOnline');
                    }}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>Pay Sem 1 Online</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-600 block mb-2">
                  Select Semester to Inspect Breakdown:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentCourse.semesters.map((sem) => (
                    <button
                      key={sem.semester}
                      onClick={() => setSelectedSemester(sem.semester)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                        validSemester === sem.semester
                          ? 'bg-[#12503f] text-white border-[#12503f] shadow-md shadow-emerald-900/20'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>Semester {sem.semester}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        validSemester === sem.semester
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        ₹ {sem.total.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Tuition Fee
                  </span>
                  <div className="text-2xl font-black text-slate-900">
                    ₹ {semesterFee.tuitionFee.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-400">Classroom lectures, curriculum &amp; faculty</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Laboratory &amp; IT Fee
                  </span>
                  <div className="text-2xl font-black text-slate-900">
                    ₹ {semesterFee.labFee.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-400">High-speed computing &amp; experimental labs</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Special &amp; Library Fee
                  </span>
                  <div className="text-2xl font-black text-slate-900">
                    ₹ {semesterFee.specialFee.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-400">INFLIBNET, journals &amp; campus facilities</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    Calicut Univ Exam Fee
                  </span>
                  <div className="text-2xl font-black text-amber-950">
                    ₹ {semesterFee.examFee.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-amber-800">University Pareeksha Bhavan semester fees</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-4 py-3 font-bold text-xs text-slate-700 uppercase tracking-wider flex justify-between items-center">
                  <span>Semester-wise Schedule — {currentCourse.name}</span>
                  <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-semibold">
                    Approved by University of Calicut
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr>
                        <th className="py-3 px-4">Semester</th>
                        <th className="py-3 px-4">Tuition</th>
                        <th className="py-3 px-4">Lab / IT</th>
                        <th className="py-3 px-4">Library &amp; Special</th>
                        <th className="py-3 px-4">University Exam</th>
                        <th className="py-3 px-4 text-right">Total Semester Fee</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentCourse.semesters.map((s) => (
                        <tr
                          key={s.semester}
                          className={`transition-colors ${
                            validSemester === s.semester ? 'bg-emerald-50/70' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-[#12503f]">
                            Semester {s.semester}
                          </td>
                          <td className="py-3 px-4">₹ {s.tuitionFee.toLocaleString()}</td>
                          <td className="py-3 px-4">₹ {s.labFee.toLocaleString()}</td>
                          <td className="py-3 px-4">₹ {s.specialFee.toLocaleString()}</td>
                          <td className="py-3 px-4">₹ {s.examFee.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-black text-slate-900">
                            ₹ {s.total.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedSemester(s.semester);
                                setActiveTab('payOnline');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#12503f] hover:bg-[#1f7a5c] text-white font-bold text-[11px] transition-colors shadow-sm"
                            >
                              Pay Sem {s.semester}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
                      <tr>
                        <td className="py-3.5 px-4" colSpan={5}>
                          Full {currentCourse.duration} Programme Aggregate Total
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-base text-[#12503f]">
                          ₹ {currentCourse.totalCourseFee.toLocaleString()}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => {
                              setSelectedSemester(1);
                              setActiveTab('payOnline');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px]"
                          >
                            Pay Online
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'allCourses' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by course name or code..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-300 text-xs outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => setCourseCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      courseCategoryFilter === 'all'
                        ? 'bg-[#12503f] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    All Courses ({COURSE_FEES_DATA.length})
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter('FYUGP')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      courseCategoryFilter === 'FYUGP'
                        ? 'bg-[#12503f] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    FYUGP Honours (13)
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter('PG')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      courseCategoryFilter === 'PG'
                        ? 'bg-[#12503f] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Postgraduate Masters (5)
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter('Science')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      courseCategoryFilter === 'Science'
                        ? 'bg-[#12503f] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Sciences (AI / IT / Core)
                  </button>
                  <button
                    onClick={() => setCourseCategoryFilter('Commerce')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      courseCategoryFilter === 'Commerce'
                        ? 'bg-[#12503f] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Commerce &amp; Fin
                  </button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#12503f] text-white font-bold">
                      <tr>
                        <th className="py-3 px-4">Programme Name</th>
                        <th className="py-3 px-4">Degree</th>
                        <th className="py-3 px-4">Duration</th>
                        <th className="py-3 px-4 text-right">Fee Per Semester</th>
                        <th className="py-3 px-4 text-right">Total Programme Fee</th>
                        <th className="py-3 px-4 text-center">E-Grantz</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCoursesForTable.map((c) => (
                        <tr key={c.id} className="hover:bg-emerald-50/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{c.code} • Calicut University</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-[#12503f]">
                              {c.degree} ({c.semestersCount} Semesters)
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{c.duration}</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="font-bold text-slate-900 text-sm">
                              ₹ {c.feePerSemester.toLocaleString()}
                            </span>
                            <span className="block text-[10px] text-slate-400">/ semester</span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-black text-base text-[#12503f]">
                            ₹ {c.totalCourseFee.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                              <BadgeCheck className="w-3 h-3 text-emerald-600" />
                              <span>Eligible</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedCourseId(c.id);
                                  setSelectedSemester(1);
                                  setActiveTab('breakdown');
                                }}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px] transition-colors"
                              >
                                Breakdown
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCourseId(c.id);
                                  setSelectedSemester(1);
                                  setActiveTab('payOnline');
                                }}
                                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-[11px] shadow-sm transition-colors"
                              >
                                Pay Now
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payOnline' && (
            <div>
              {paidReceipt ? (
                <div className="bg-white border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                  {/* Watermark Crest */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
                    <img src="/images/college_logo.svg" alt="" className="w-96 h-96 object-contain" />
                  </div>

                  <div className="border-b-2 border-slate-200 pb-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src="/images/college_logo.svg" alt="H.M College Crest" className="w-16 h-18 object-contain shrink-0 hidden sm:block" />
                      <div>
                        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Payment Successfully Remitted</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-[#12503f]">
                          H.M COLLEGE OF SCIENCE &amp; TECHNOLOGY, MANJERI
                        </h3>
                        <p className="text-xs text-slate-500">
                          Alukkal, P.O. Mariyad, Manjeri, Malappuram Dist., Kerala - 676122 • Affiliated to University of Calicut
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-center sm:text-right shrink-0">
                      <span className="text-[11px] text-slate-400 block uppercase font-bold">Official E-Receipt</span>
                      <strong className="text-sm font-mono text-slate-900 block font-bold">
                        {paidReceipt.receiptNo}
                      </strong>
                      <span className="text-[11px] text-slate-500 block">{paidReceipt.date}</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-xs">
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Student Name:</span>
                        <strong className="text-slate-900 font-bold">{paidReceipt.studentName}</strong>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Admission / CAP Reg No:</span>
                        <strong className="text-slate-900 font-mono font-bold">{paidReceipt.admissionNo}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Contact Mobile:</span>
                        <strong className="text-slate-900">{paidReceipt.phone}</strong>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Programme:</span>
                        <strong className="text-[#12503f] font-bold">{paidReceipt.courseName}</strong>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1.5">
                        <span className="text-slate-500">Semester Term:</span>
                        <strong className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-extrabold">
                          Semester {paidReceipt.semester}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Payment Mode:</span>
                        <strong className="text-slate-900">{paidReceipt.paymentMethod}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#12503f] text-white font-bold">
                        <tr>
                          <th className="py-2.5 px-4">Fee Head Particulars</th>
                          <th className="py-2.5 px-4 text-right">Amount (INR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-slate-800">
                            Semester {paidReceipt.semester} Tuition Fee
                          </td>
                          <td className="py-2.5 px-4 text-right">₹ {paidReceipt.tuitionFee.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-slate-800">
                            Laboratory, Computer Center &amp; Scientific Instrumentation
                          </td>
                          <td className="py-2.5 px-4 text-right">₹ {paidReceipt.labFee.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-slate-800">
                            Library Resource Access, INFLIBNET &amp; Special Fee
                          </td>
                          <td className="py-2.5 px-4 text-right">₹ {paidReceipt.specialFee.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-slate-800">
                            University of Calicut Pareeksha Bhavan Exam Fee
                          </td>
                          <td className="py-2.5 px-4 text-right">₹ {paidReceipt.examFee.toLocaleString()}</td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-emerald-50 border-t-2 border-emerald-200 font-bold">
                        <tr>
                          <td className="py-3 px-4 text-emerald-950 font-black text-sm">
                            Total Remitted &amp; Reconciled
                          </td>
                          <td className="py-3 px-4 text-right text-emerald-800 font-black text-base">
                            ₹ {paidReceipt.totalAmount.toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Official Receipt</span>
                    </button>
                    <button
                      onClick={() => setPaidReceipt(null)}
                      className="px-6 py-2.5 rounded-xl bg-[#12503f] hover:bg-[#1f7a5c] text-white font-bold text-xs transition-all"
                    >
                      Pay Another Semester
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProcessPayment} className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-6 space-y-4">
                    <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-[#12503f]" />
                        <span>1. Student &amp; Course Details</span>
                      </h3>
                      <span className="text-[11px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
                        Academic Year 2026-27
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student Full Name (as registered) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mohammed Farhan"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Admission / CAP Reg No *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. HMC-2026-1042"
                          value={admissionNo}
                          onChange={(e) => setAdmissionNo(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          WhatsApp Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Select Programme *
                        </label>
                        <select
                          value={selectedCourseId}
                          onChange={(e) => {
                            setSelectedCourseId(e.target.value);
                            setSelectedSemester(1);
                          }}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs outline-none font-medium"
                        >
                          {COURSE_FEES_DATA.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Semester to Pay *
                        </label>
                        <select
                          value={validSemester}
                          onChange={(e) => setSelectedSemester(Number(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs outline-none font-bold text-[#12503f]"
                        >
                          {currentCourse.semesters.map((s) => (
                            <option key={s.semester} value={s.semester}>
                              Semester {s.semester} (₹ {s.total.toLocaleString()})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                      <div className="flex justify-between text-slate-600">
                        <span>Tuition Fee (Sem {validSemester}):</span>
                        <span className="font-semibold text-slate-900">₹ {semesterFee.tuitionFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Laboratory &amp; IT Access:</span>
                        <span className="font-semibold text-slate-900">₹ {semesterFee.labFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Special &amp; Library Resource:</span>
                        <span className="font-semibold text-slate-900">₹ {semesterFee.specialFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Calicut Univ Exam Fee:</span>
                        <span className="font-semibold text-slate-900">₹ {semesterFee.examFee.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-[#12503f]">
                        <span>Total Payable Amount:</span>
                        <span className="text-base text-emerald-700">₹ {semesterFee.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-4">
                    <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-amber-500" />
                        <span>2. Choose Payment Channel</span>
                      </h3>
                      <span className="text-[11px] text-slate-400">Zero Convenience Fee</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'upi', label: 'UPI / GPay / QR', icon: Smartphone, tag: 'Instant' },
                        { id: 'card', label: 'Debit / Credit Card', icon: CreditCard, tag: 'RuPay/Visa' },
                        { id: 'netbanking', label: 'Net Banking', icon: Landmark, tag: 'All Banks' },
                        { id: 'bank', label: 'NEFT / RTGS Transfer', icon: ShieldCheck, tag: 'Challan' }
                      ].map((m) => {
                        const Icon = m.icon;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id as any)}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between text-xs font-bold transition-all ${
                              paymentMethod === m.id
                                ? 'border-[#12503f] bg-emerald-50/80 text-[#12503f] shadow-sm ring-1 ring-[#12503f]'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-1">
                              <Icon className="w-4 h-4" />
                              <span className="text-[10px] text-slate-400 font-normal">{m.tag}</span>
                            </div>
                            <span>{m.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-3">
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                          Scan with Any UPI App (GPay • PhonePe • Paytm)
                        </span>
                        <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=hmcollegemanjeri@sbi&pn=HM%20College%20Manjeri&am=${semesterFee.total}&cu=INR`}
                            alt="College UPI QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
                          <span className="text-slate-600">College UPI ID:</span>
                          <strong className="text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 font-mono font-bold">
                            {BANK_TRANSFER_DETAILS.upiId}
                          </strong>
                          <button
                            type="button"
                            onClick={() => handleCopy(BANK_TRANSFER_DETAILS.upiId, 'upi-pay')}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600"
                            title="Copy UPI ID"
                          >
                            {copiedField === 'upi-pay' ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. MOHAMMED FARHAN"
                            value={cardData.holder}
                            onChange={(e) => setCardData({ ...cardData, holder: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="4532 •••• •••• 8921"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">Expiry</label>
                            <input
                              type="text"
                              maxLength={5}
                              placeholder="MM/YY"
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="•••"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                        <label className="block font-semibold text-slate-700">Choose Bank:</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs outline-none font-medium"
                        >
                          <option>State Bank of India (SBI)</option>
                          <option>Federal Bank</option>
                          <option>Canara Bank</option>
                          <option>Kerala Gramin Bank</option>
                          <option>HDFC Bank</option>
                          <option>South Indian Bank</option>
                          <option>ICICI Bank</option>
                        </select>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                        <div className="font-bold text-slate-800 pb-1 border-b border-slate-200">
                          Direct College NEFT / RTGS Details
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Account Name:</span>
                          <strong className="text-slate-900">{BANK_TRANSFER_DETAILS.accountName}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Bank &amp; Branch:</span>
                          <strong className="text-slate-900">{BANK_TRANSFER_DETAILS.bankName}, {BANK_TRANSFER_DETAILS.branch}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Account No:</span>
                          <strong className="text-[#12503f] font-mono">{BANK_TRANSFER_DETAILS.accountNumber}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">IFSC Code:</span>
                          <strong className="text-slate-900 font-mono">{BANK_TRANSFER_DETAILS.ifscCode}</strong>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Authorizing Payment...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5 text-slate-950" />
                          <span>
                            Authorize &amp; Pay Semester {validSemester} Fee (₹ {semesterFee.total.toLocaleString()})
                          </span>
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-bit SSL encrypted. Official fee receipt issued immediately.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
