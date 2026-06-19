"use client";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, CheckCircle, AlertCircle, ArrowUpRight, User, Mail, Phone, MapPin, Users, Calendar, Heart, GraduationCap, Briefcase, MessageSquare, FileText } from "lucide-react";
import Link from "next/link";

const qualifications = ["10th", "12th", "UG", "PG", "ITI", "Diploma", "Engineering", "MBA"];

export default function SubmitResumePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    gender: "",
    ageRange: "",
    maritalStatus: "",
    qualification: "",
    experience: "",
    comments: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) setUploadedFile(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!formData.firstName) errors.push("First name is required.");
    if (!formData.lastName) errors.push("Last name is required.");
    if (!formData.email) errors.push("Email is required.");
    if (!formData.phone) errors.push("Phone number is required.");
    if (!formData.location) errors.push("Location is required.");
    if (!formData.gender) errors.push("Please select your gender.");
    if (!formData.ageRange) errors.push("Please select your age range.");
    if (!formData.maritalStatus) errors.push("Please select your marital status.");
    if (!formData.qualification) errors.push("Please select your qualification.");
    if (!formData.experience) errors.push("Please select your experience level.");
    if (!formData.comments) errors.push("Comments are mandatory.");
    if (!uploadedFile) errors.push("Please upload your resume file.");
    if (errors.length > 0) {
      setFormErrors(errors);
      setSubmitSuccess(false);
    } else {
      setFormErrors([]);
      setSubmitSuccess(true);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1E293B] focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/10 text-sm font-medium placeholder:text-slate-400 transition-all duration-200";
  const labelClass = "block text-xs font-bold text-[#1E3A8A] mb-1.5";
  const selectClass = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1E293B] focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/10 text-sm font-medium transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#F8FAFF] min-h-screen py-16"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA5E9]/10 px-3 py-1 text-xs font-bold tracking-widest text-[#0EA5E9] uppercase">
            <FileText className="h-3.5 w-3.5" />
            Submit Your Resume
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-black text-[#1E3A8A] uppercase tracking-tight">
            Join Our Talent Pool
          </h1>
          <p className="mt-3 text-sm text-gray-500 font-medium">
            Complete the form below to register in our premium talent pipeline. Our team reviews every submission.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-[0_8px_40px_rgba(30,58,138,0.06)] border border-slate-100 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1E3A8A] via-[#0EA5E9] to-[#D4A017]" />

          <div className="p-8 sm:p-10">
            {formErrors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-xl border border-rose-200 bg-rose-50"
              >
                <p className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                  <AlertCircle className="h-4 w-4" />
                  Please resolve the following:
                </p>
                <ul className="mt-2 space-y-1">
                  {formErrors.map((err, i) => (
                    <li key={i} className="text-xs text-rose-500 font-medium flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                      {err}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center gap-5"
              >
                <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-wide">Resume Received!</h2>
                  <p className="text-sm text-gray-500 font-medium mt-3 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#1E3A8A]">{formData.firstName}</strong>. Your profile and resume have been cataloged in our talent pipeline. A recruiter will reach out when a suitable opportunity matches your profile.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFormData({ firstName: "", lastName: "", email: "", phone: "", location: "", gender: "", ageRange: "", maritalStatus: "", qualification: "", experience: "", comments: "" });
                    setUploadedFile(null);
                  }}
                  className="mt-2 px-8 py-3 bg-[#0EA5E9] text-white rounded-xl text-xs font-bold tracking-wide hover:bg-[#0EA5E9]/90 transition-all duration-200"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                    <div className="h-7 w-7 rounded-lg bg-[#1E3A8A]/5 flex items-center justify-center">
                      <User className="h-3.5 w-3.5 text-[#1E3A8A]" />
                    </div>
                    <span className="text-xs font-black text-[#1E3A8A] uppercase tracking-wider">Personal Information</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>First Name <span className="text-rose-500">*</span></label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Jane" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name <span className="text-rose-500">*</span></label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jane.doe@example.com" className={`${inputClass} pl-11`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className={`${inputClass} pl-11`} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Location <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Chennai, Tamil Nadu" className={`${inputClass} pl-11`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                    <div className="h-7 w-7 rounded-lg bg-[#1E3A8A]/5 flex items-center justify-center">
                      <Users className="h-3.5 w-3.5 text-[#1E3A8A]" />
                    </div>
                    <span className="text-xs font-black text-[#1E3A8A] uppercase tracking-wider">Demographic Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Gender <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className={`${selectClass} pl-11`}>
                          <option value="">Select Gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Non-binary">Non-binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Age Range <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select name="ageRange" value={formData.ageRange} onChange={handleInputChange} className={`${selectClass} pl-11`}>
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
                      <label className={labelClass}>Marital Status <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Heart className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className={`${selectClass} pl-11`}>
                          <option value="">Select Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widowed">Widowed</option>
                          <option value="Divorced">Divorced</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Qualification <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select name="qualification" value={formData.qualification} onChange={handleInputChange} className={`${selectClass} pl-11`}>
                          <option value="">Select Qualification</option>
                          {qualifications.map((q) => <option key={q} value={q}>{q}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                    <div className="h-7 w-7 rounded-lg bg-[#1E3A8A]/5 flex items-center justify-center">
                      <Briefcase className="h-3.5 w-3.5 text-[#1E3A8A]" />
                    </div>
                    <span className="text-xs font-black text-[#1E3A8A] uppercase tracking-wider">Professional Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Experience <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select name="experience" value={formData.experience} onChange={handleInputChange} className={`${selectClass} pl-11`}>
                          <option value="">Select Experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="Experienced">Experienced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                    <div className="h-7 w-7 rounded-lg bg-[#1E3A8A]/5 flex items-center justify-center">
                      <MessageSquare className="h-3.5 w-3.5 text-[#1E3A8A]" />
                    </div>
                    <span className="text-xs font-black text-[#1E3A8A] uppercase tracking-wider">Additional Information</span>
                  </div>
                  <div>
                    <label className={labelClass}>Comments &amp; Career Objective <span className="text-rose-500">*</span></label>
                    <textarea name="comments" rows={4} value={formData.comments} onChange={handleInputChange}
                      placeholder="Describe your background, what roles interest you, and why you are seeking a transition..."
                      className={`${inputClass} resize-none`} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
                    <div className="h-7 w-7 rounded-lg bg-[#D4A017]/10 flex items-center justify-center">
                      <Upload className="h-3.5 w-3.5 text-[#D4A017]" />
                    </div>
                    <span className="text-xs font-black text-[#1E3A8A] uppercase tracking-wider">Resume Upload <span className="text-rose-500">*</span></span>
                  </div>
                  <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
                      isDragging ? "border-[#0EA5E9] bg-[#0EA5E9]/5" : uploadedFile ? "border-emerald-400 bg-emerald-50" : "border-slate-200 hover:border-[#D4A017] bg-slate-50/50 hover:bg-[#D4A017]/5"
                    }`}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <div className="h-12 w-12 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full mx-auto">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-emerald-700">{uploadedFile.name}</p>
                        <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-10 w-10 text-[#D4A017] mx-auto" />
                        <div>
                          <p className="text-sm font-bold text-[#1E293B]">Drag & drop your resume here, or <span className="text-[#D4A017] underline underline-offset-2">browse files</span></p>
                          <p className="text-xs text-slate-400 mt-1">PDF, DOCX (Max 5MB)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#1E3A8A] to-[#0EA5E9] text-white hover:from-[#1E3A8A]/90 hover:to-[#0EA5E9]/90 rounded-xl font-black uppercase tracking-wider text-sm shadow-lg transition-all duration-200 cursor-pointer">
                  Submit Resume
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 font-medium">
            Already a candidate?{" "}
            <Link href="/vacancies" className="text-[#0EA5E9] font-bold hover:text-[#1E3A8A] transition-colors inline-flex items-center gap-1">
              View current vacancies <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
