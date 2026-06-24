"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Upload, CheckCircle, AlertCircle, ArrowUpRight, User, Mail, Phone, MapPin, Users, Calendar, Heart, GraduationCap, Briefcase, MessageSquare, FileText } from "lucide-react";
import { SectionLabel } from "@/src/components/UIElements";
import Link from "next/link";

const qualifications = ["10th", "12th", "UG", "PG", "ITI", "Diploma", "Engineering", "MBA"];

export default function SubmitResumePage() {
  const [appliedJob, setAppliedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", location: "",
    gender: "", ageRange: "", maritalStatus: "", qualification: "", experience: "", comments: "",
    website: "", // Honeypot field
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jobTitle = params.get("jobTitle");
    const jobId = params.get("jobId");
    const department = params.get("department");
    if (jobTitle && jobId && !appliedJob) {
      setAppliedJob(jobTitle);
      setFormData((prev) => ({
        ...prev,
        comments: `Applying for: ${jobTitle} (${jobId}) under ${department}. `,
      }));
    }
  }, [appliedJob]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isSubmitting) return;
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    if (isSubmitting) return;
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) setUploadedFile(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors: string[] = [];
    if (!formData.firstName.trim()) errors.push("First name is required.");
    if (!formData.lastName.trim()) errors.push("Last name is required.");
    if (!formData.email.trim()) errors.push("Email is required.");
    if (!formData.phone.trim()) errors.push("Phone number is required.");
    if (!formData.location.trim()) errors.push("Location is required.");
    if (!formData.gender) errors.push("Please select your gender.");
    if (!formData.ageRange) errors.push("Please select your age range.");
    if (!formData.maritalStatus) errors.push("Please select your marital status.");
    if (!formData.qualification) errors.push("Please select your qualification.");
    if (!formData.experience) errors.push("Please select your experience level.");
    if (!formData.comments.trim()) errors.push("Comments are mandatory.");
    if (!uploadedFile) errors.push("Please upload your resume file.");

    if (errors.length > 0) {
      setFormErrors(errors);
      setSubmitSuccess(false);
      return;
    }

    setFormErrors([]);
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });
      if (uploadedFile) {
        data.append("resume", uploadedFile);
      }

      const response = await fetch("/api/submit-resume", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        setFormErrors([result.error || "An error occurred while submitting your application. Please try again."]);
        setSubmitSuccess(false);
      } else {
        setSubmitSuccess(true);
        setFormErrors([]);
      }
    } catch (err: any) {
      setFormErrors(["Network error: Failed to connect to the server. Please try again."]);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-sky-600/50 bg-white text-navy-900 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-600/10 text-sm font-medium placeholder:text-navy-900/30 transition-all duration-200";
  const labelClass = "block text-xs font-bold text-navy-900 mb-1.5";
  const selectClass = "w-full px-4 py-3 rounded-xl border border-sky-600/50 bg-white text-navy-900 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-600/10 text-sm font-medium transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-cream-100 min-h-screen py-16"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-600/10 px-3 py-1 text-xs font-bold tracking-widest text-sky-700 uppercase">
            <FileText className="h-3.5 w-3.5" />
            Submit Your Resume
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-black text-navy-900 uppercase tracking-tight">
            Join Our Talent Pool
          </h1>
          <p className="mt-3 text-sm text-navy-900/60 font-medium">
            Complete the form below to register in our premium talent pipeline. Our team reviews every submission.
          </p>
        </div>

        <div className="relative bg-navy-600/5 rounded-3xl shadow-xl border border-sky-600/50 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5" />
          <div className="p-8 sm:p-10">
            {formErrors.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-xl border border-sky-600/50 bg-red-muted/5">
                <p className="flex items-center gap-2 text-red-muted font-bold text-xs">
                  <AlertCircle className="h-4 w-4" />
                  Please resolve the following:
                </p>
                <ul className="mt-2 space-y-1">
                  {formErrors.map((err, i) => (
                    <li key={i} className="text-xs text-red-muted/80 font-medium flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-muted/50 mt-1.5 shrink-0" />
                      {err}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {submitSuccess ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center gap-5">
                <div className="h-20 w-20 rounded-full bg-forest-500/10 text-forest-500 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-navy-900 uppercase tracking-wide">Resume Received!</h2>
                  <p className="text-sm text-navy-900/60 font-medium mt-3 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-navy-900">{formData.firstName}</strong>. Your profile and resume have been cataloged in our talent pipeline.
                  </p>
                </div>
                <button onClick={() => {
                  setSubmitSuccess(false);
                  setFormData({ firstName: "", lastName: "", email: "", phone: "", location: "", gender: "", ageRange: "", maritalStatus: "", qualification: "", experience: "", comments: "", website: "" });
                  setUploadedFile(null);
                }}
                  className="mt-2 px-8 py-3 bg-sky-600 text-white rounded-xl text-xs font-bold tracking-wide hover:bg-sky-700 transition-all cursor-pointer">
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot field for spam prevention */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-sky-600/50">
                    <div className="h-7 w-7 rounded-lg bg-sky-600/5 flex items-center justify-center">
                      <User className="h-3.5 w-3.5 text-sky-600" />
                    </div>
                    <span className="text-xs font-black text-navy-900 uppercase tracking-wider">Personal Information</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>First Name <span className="text-red-muted">*</span></label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Jane" className={inputClass} disabled={isSubmitting} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name <span className="text-red-muted">*</span></label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className={inputClass} disabled={isSubmitting} />
                    </div>
                    <div>
                      <label className={labelClass}>Email <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jane.doe@example.com" className={`${inputClass} pl-11`} disabled={isSubmitting} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Phone <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className={`${inputClass} pl-11`} disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Location <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Chennai, Tamil Nadu" className={`${inputClass} pl-11`} disabled={isSubmitting} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-sky-600/50">
                    <div className="h-7 w-7 rounded-lg bg-sky-600/5 flex items-center justify-center">
                      <Users className="h-3.5 w-3.5 text-sky-600" />
                    </div>
                    <span className="text-xs font-black text-navy-900 uppercase tracking-wider">Demographic Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Gender <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className={`${selectClass} pl-11`} disabled={isSubmitting}>
                          <option value="">Select Gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Non-binary">Non-binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Age Range <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <select name="ageRange" value={formData.ageRange} onChange={handleInputChange} className={`${selectClass} pl-11`} disabled={isSubmitting}>
                          <option value="">Select Age Range</option>
                          <option value="18 - 22">18 - 22</option>
                          <option value="23 - 28">23 - 28</option>
                          <option value="29 - 35">29 - 35</option>
                          <option value="36 - 45">36 - 45</option>
                          <option value="46+">46+</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Marital Status <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <Heart className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className={`${selectClass} pl-11`} disabled={isSubmitting}>
                          <option value="">Select Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widowed">Widowed</option>
                          <option value="Divorced">Divorced</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Qualification <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <select name="qualification" value={formData.qualification} onChange={handleInputChange} className={`${selectClass} pl-11`} disabled={isSubmitting}>
                          <option value="">Select Qualification</option>
                          {qualifications.map((q) => <option key={q} value={q}>{q}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-sky-600/50">
                    <div className="h-7 w-7 rounded-lg bg-sky-600/5 flex items-center justify-center">
                      <Briefcase className="h-3.5 w-3.5 text-sky-600" />
                    </div>
                    <span className="text-xs font-black text-navy-900 uppercase tracking-wider">Professional Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Experience <span className="text-red-muted">*</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-3.5 h-4 w-4 text-navy-900/30 pointer-events-none" />
                        <select name="experience" value={formData.experience} onChange={handleInputChange} className={`${selectClass} pl-11`} disabled={isSubmitting}>
                          <option value="">Select Experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="Experienced">Experienced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-sky-600/50">
                    <div className="h-7 w-7 rounded-lg bg-sky-600/5 flex items-center justify-center">
                      <MessageSquare className="h-3.5 w-3.5 text-sky-600" />
                    </div>
                    <span className="text-xs font-black text-navy-900 uppercase tracking-wider">Additional Information</span>
                  </div>
                  <div>
                    <label className={labelClass}>Comments &amp; Career Objective <span className="text-red-muted">*</span></label>
                    <textarea name="comments" rows={4} value={formData.comments} onChange={handleInputChange}
                      placeholder="Describe your background, what roles interest you, and why you are seeking a transition..."
                      className={`${inputClass} resize-none`} disabled={isSubmitting} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-sky-600/50">
                    <div className="h-7 w-7 rounded-lg bg-copper-400/10 flex items-center justify-center">
                      <Upload className="h-3.5 w-3.5 text-copper-400" />
                    </div>
                    <span className="text-xs font-black text-navy-900 uppercase tracking-wider">Resume Upload <span className="text-red-muted">*</span></span>
                  </div>
                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => !isSubmitting && fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${isDragging ? "border-sky-600/50 bg-sky-600/5" :
                      uploadedFile ? "border-sky-600/50 bg-forest-500/5" :
                        "border-sky-600/50 hover:border-sky-600/50 bg-cream-50 hover:bg-copper-50/50"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.docx" className="hidden" disabled={isSubmitting} />
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <div className="h-12 w-12 bg-forest-500/10 text-forest-500 flex items-center justify-center rounded-full mx-auto">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-forest-700">{uploadedFile.name}</p>
                        <p className="text-xs text-navy-900/40">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-10 w-10 text-copper-400 mx-auto" />
                        <div>
                          <p className="text-sm font-bold text-navy-900">Drag & drop your resume, or <span className="text-copper-400 underline underline-offset-2">browse files</span></p>
                          <p className="text-xs text-navy-900/40 mt-1">PDF, DOCX (Max 5MB)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className={`w-full py-4 text-white rounded-xl font-black uppercase tracking-wider text-sm shadow-lg transition-all ${isSubmitting ? "bg-sky-600/50 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700 shadow-sky-600/20 cursor-pointer"}`}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting Application...
                    </span>
                  ) : "Submit Resume"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-navy-900/40 font-medium">
            Already a candidate?{" "}
            <Link href="/vacancies" className="text-sky-600 font-bold hover:text-sky-700 transition-colors inline-flex items-center gap-1">
              View current vacancies <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
