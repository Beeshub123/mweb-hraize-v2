"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock, Settings, Briefcase, Plus, X, Pencil, Trash2, LogOut,
  Eye, EyeOff, CheckCircle, AlertCircle, ChevronRight
} from "lucide-react";
import type { JobVacancy } from "@/src/types";

const API_BASE = "/api";

const emptyForm = {
  title: "", department: "", location: "", type: "Full-Time" as JobVacancy["type"],
  experience: "", salary: "", description: "", requirements: [""],
};

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"settings" | "careers">("careers");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (t) setToken(t);
    setLoading(false);
  }, []);

  const handleLogin = (t: string) => {
    setToken(t);
    localStorage.setItem("admin_token", t);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("admin_token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-sky-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!token) return <LoginForm onLogin={handleLogin} />;

  return <AdminDashboard token={token} onLogout={handleLogout} tab={tab} onTabChange={setTab} />;
}

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) { setError("All fields are required"); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed"); return; }
      onLogin(data.token);
    } catch { setError("Connection error"); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="bg-cream-50 rounded-2xl border border-navy-900/10 p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-sky-600/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <h1 className="text-lg font-black text-navy-900 uppercase tracking-tight">Admin</h1>
              <p className="text-[10px] font-bold text-navy-900/50 uppercase tracking-wider">Sign in to continue</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-navy-900/50 block mb-1">Username</label>
              <input
                type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-navy-900/15 rounded-lg text-sm text-navy-900 font-medium focus:outline-none focus:border-sky-600 transition-colors"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-navy-900/50 block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 bg-white border border-navy-900/15 rounded-lg text-sm text-navy-900 font-medium focus:outline-none focus:border-sky-600 transition-colors"
                  placeholder="Enter password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-2.5 text-navy-900/40 hover:text-navy-900/70 cursor-pointer">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-xs font-bold text-red-muted bg-red-muted/10 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <button
              type="submit" disabled={submitting}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ token, onLogout, tab, onTabChange }: {
  token: string; onLogout: () => void;
  tab: "settings" | "careers"; onTabChange: (t: "settings" | "careers") => void;
}) {
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchVacancies = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (res.ok) setVacancies(data.vacancies);
    } catch { setMessage({ type: "error", text: "Failed to load vacancies" }); }
    finally { setLoading(false); }
  }, [token, onLogout]);

  useEffect(() => { fetchVacancies(); }, [fetchVacancies]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="border-b border-navy-900/10 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-sky-600/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-sky-600" />
              </div>
              <span className="text-base font-black text-navy-900 uppercase tracking-tight">Admin Panel</span>
            </div>
            <button onClick={onLogout} className="flex items-center gap-1.5 text-xs font-bold text-navy-900/50 hover:text-navy-900 transition-colors cursor-pointer">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-1 mb-6">
          <button onClick={() => onTabChange("careers")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              tab === "careers" ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20" : "text-navy-900/50 hover:text-navy-900 hover:bg-sky-600/5"
            }`}>
            <Briefcase className="h-3.5 w-3.5 inline mr-1.5" /> Careers
          </button>
          <button onClick={() => onTabChange("settings")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              tab === "settings" ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20" : "text-navy-900/50 hover:text-navy-900 hover:bg-sky-600/5"
            }`}>
            <Settings className="h-3.5 w-3.5 inline mr-1.5" /> Settings
          </button>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className={`mb-4 flex items-center gap-2 text-xs font-bold rounded-lg px-4 py-3 ${
                message.type === "success" ? "text-forest-500 bg-forest-500/10" : "text-red-muted bg-red-muted/10"
              }`}
            >
              {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {tab === "settings" ? (
            <SettingsPanel key="settings" token={token} onLogout={onLogout} showMessage={showMessage} />
          ) : (
            <CareersPanel key="careers" token={token} vacancies={vacancies} loading={loading}
              onUpdate={fetchVacancies} showMessage={showMessage} onLogout={onLogout} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SettingsPanel({ token, showMessage }: {
  token: string; onLogout: () => void; showMessage: (t: "success" | "error", msg: string) => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (): boolean => {
    const errs: string[] = [];
    if (!currentPassword) errs.push("Current password is required");
    if (newPassword.length < 8) errs.push("New password must be at least 8 characters");
    if (!/[A-Z]/.test(newPassword)) errs.push("Must contain an uppercase letter");
    if (!/[a-z]/.test(newPassword)) errs.push("Must contain a lowercase letter");
    if (!/[0-9]/.test(newPassword)) errs.push("Must contain a number");
    if (newPassword !== confirmPassword) errs.push("Passwords do not match");
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { showMessage("error", data.error || "Failed to update password"); return; }
      showMessage("success", "Password updated successfully");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setErrors([]);
    } catch { showMessage("error", "Connection error"); }
    finally { setSubmitting(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
      <div className="bg-cream-50 rounded-2xl border border-navy-900/10 p-6 sm:p-8 max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-lg bg-sky-600/10 flex items-center justify-center">
            <Lock className="h-4 w-4 text-sky-600" />
          </div>
          <div>
            <h2 className="text-sm font-black text-navy-900 uppercase tracking-tight">Change Password</h2>
            <p className="text-[10px] font-bold text-navy-900/50">Update your admin password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["current", "new", "confirm"].map((field) => (
            <div key={field}>
              <label className="text-[10px] font-bold uppercase tracking-wider text-navy-900/50 block mb-1">
                {field === "current" ? "Current Password" : field === "new" ? "New Password" : "Confirm New Password"}
              </label>
              <div className="relative">
                <input
                  type={showPw[field as keyof typeof showPw] ? "text" : "password"}
                  value={field === "current" ? currentPassword : field === "new" ? newPassword : confirmPassword}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (field === "current") setCurrentPassword(val);
                    else if (field === "new") setNewPassword(val);
                    else setConfirmPassword(val);
                  }}
                  className="w-full px-3 py-2.5 pr-10 bg-white border border-navy-900/15 rounded-lg text-sm text-navy-900 font-medium focus:outline-none focus:border-sky-600"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw({ ...showPw, [field]: !showPw[field as keyof typeof showPw] })}
                  className="absolute right-3 top-2.5 text-navy-900/40 hover:text-navy-900/70 cursor-pointer">
                  {showPw[field as keyof typeof showPw] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}

          {errors.length > 0 && (
            <div className="bg-red-muted/10 rounded-lg px-3 py-2">
              {errors.map((err, i) => (
                <p key={i} className="text-[11px] font-medium text-red-muted flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" /> {err}
                </p>
              ))}
            </div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer">
            {submitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function CareersPanel({ token, vacancies, loading, onUpdate, showMessage, onLogout }: {
  token: string; vacancies: JobVacancy[]; loading: boolean;
  onUpdate: () => void; showMessage: (t: "success" | "error", msg: string) => void; onLogout: () => void;
}) {
  const [modal, setModal] = useState<{ open: boolean; edit?: JobVacancy }>({ open: false });
  const [deleteTarget, setDeleteTarget] = useState<JobVacancy | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => { setForm(emptyForm); setModal({ open: true }); };
  const openEdit = (v: JobVacancy) => {
    setForm({ ...v, salary: v.salary || "", requirements: v.requirements.length ? v.requirements : [""] });
    setModal({ open: true, edit: v });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API_BASE}/admin/vacancies/${deleteTarget.id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (!res.ok) { showMessage("error", data.error || "Delete failed"); return; }
      showMessage("success", "Vacancy deleted successfully");
      setDeleteTarget(null);
      onUpdate();
    } catch { showMessage("error", "Connection error"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.department || !form.location || !form.description || !form.experience) {
      showMessage("error", "All required fields must be filled"); return;
    }
    setSubmitting(true);
    try {
      const body = { ...form, requirements: form.requirements.filter((r) => r.trim()) };
      const isEdit = modal.edit;
      const url = isEdit ? `${API_BASE}/admin/vacancies/${modal.edit!.id}` : `${API_BASE}/admin/vacancies`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (!res.ok) { showMessage("error", data.error || "Operation failed"); return; }
      showMessage("success", isEdit ? "Vacancy updated successfully" : "Vacancy created successfully");
      setModal({ open: false });
      onUpdate();
    } catch { showMessage("error", "Connection error"); }
    finally { setSubmitting(false); }
  };

  const addRequirement = () => setForm({ ...form, requirements: [...form.requirements, ""] });
  const removeRequirement = (i: number) => {
    if (form.requirements.length <= 1) return;
    setForm({ ...form, requirements: form.requirements.filter((_, idx) => idx !== i) });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
      <div className="bg-cream-50 rounded-2xl border border-navy-900/10 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-navy-900/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-sky-600/10 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <h2 className="text-sm font-black text-navy-900 uppercase tracking-tight">Careers Management</h2>
              <p className="text-[10px] font-bold text-navy-900/50">{vacancies.length} vacancy post{vacancies.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Add Vacancy
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin h-6 w-6 border-2 border-sky-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : vacancies.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase className="h-10 w-10 text-navy-900/30 mx-auto mb-3" />
            <p className="text-sm font-bold text-navy-900/50">No vacancies yet</p>
            <p className="text-xs text-navy-900/40 mt-1">Create your first vacancy posting</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-900/10 text-[10px] font-black uppercase tracking-wider text-navy-900/40">
                  <th className="px-4 sm:px-6 py-3">Title</th>
                  <th className="px-4 py-3 hidden md:table-cell">Department</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Location</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vacancies.map((v) => (
                  <tr key={v.id} className="border-b border-navy-900/10 hover:bg-sky-600/5 transition-colors">
                    <td className="px-4 sm:px-6 py-3">
                      <p className="text-sm font-bold text-navy-900">{v.title}</p>
                      <p className="text-[10px] text-navy-900/40 mt-0.5">{v.experience}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-navy-900/70">{v.department}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-navy-900/70">{v.location}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        v.type === "Full-Time" ? "bg-forest-500/10 text-forest-500" :
                        v.type === "Contract" ? "bg-copper-400/10 text-copper-400" :
                        "bg-sky-500/10 text-sky-500"
                      }`}>{v.type}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(v)}
                          className="p-1.5 rounded-lg text-navy-900/40 hover:text-sky-600 hover:bg-sky-600/5 transition-colors cursor-pointer">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(v)}
                          className="p-1.5 rounded-lg text-navy-900/40 hover:text-red-muted hover:bg-sky-600/5 transition-colors cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal.open && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-cream-50 rounded-2xl border border-navy-900/10 w-full max-w-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-navy-900/10">
                <h3 className="text-sm font-black text-navy-900 uppercase tracking-tight">
                  {modal.edit ? "Edit Vacancy" : "Create Vacancy"}
                </h3>
                <button onClick={() => setModal({ open: false })}
                  className="h-8 w-8 rounded-lg hover:bg-sky-600/5 flex items-center justify-center text-navy-900/40 hover:text-navy-900 transition-colors cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(["title", "department", "location", "experience", "salary"] as const).map((field) => (
                    <div key={field} className={field === "title" ? "sm:col-span-2" : ""}>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-navy-900/50 block mb-1">
                        {field === "salary" ? "Salary (optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input type="text" value={form[field] || ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-navy-900/15 rounded-lg text-sm text-navy-900 font-medium focus:outline-none focus:border-sky-600"
                        placeholder={field === "salary" ? "e.g. ₹18,00,000 - ₹24,00,000" : `Enter ${field}`} />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-navy-900/50 block mb-1">Type</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as JobVacancy["type"] })}
                      className="w-full px-3 py-2.5 bg-white border border-navy-900/15 rounded-lg text-sm text-navy-900 font-medium focus:outline-none focus:border-sky-600">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-navy-900/50 block mb-1">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-navy-900/15 rounded-lg text-sm text-navy-900 font-medium focus:outline-none focus:border-sky-600 resize-none"
                    placeholder="Enter job description" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-navy-900/50">Requirements</label>
                    <button type="button" onClick={addRequirement}
                      className="text-[10px] font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer">+ Add requirement</button>
                  </div>
                  <div className="space-y-2">
                    {form.requirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="text" value={req} onChange={(e) => {
                          const reqs = [...form.requirements];
                          reqs[i] = e.target.value;
                          setForm({ ...form, requirements: reqs });
                        }}
                          className="flex-1 px-3 py-2 bg-white border border-navy-900/15 rounded-lg text-sm text-navy-900 font-medium focus:outline-none focus:border-sky-600"
                          placeholder="Requirement" />
                        <button type="button" onClick={() => removeRequirement(i)}
                          className="p-2 text-navy-900/40 hover:text-red-muted transition-colors cursor-pointer">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-navy-900/10">
                  <button type="button" onClick={() => setModal({ open: false })}
                    className="px-4 py-2 text-xs font-bold text-navy-900/50 hover:text-navy-900 transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer">
                    {submitting ? "Saving..." : modal.edit ? "Update Vacancy" : "Create Vacancy"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 bg-navy-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-cream-50 rounded-2xl border border-navy-900/10 w-full max-w-sm p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-red-muted/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-muted" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-navy-900 uppercase tracking-tight">Delete Vacancy</h3>
                  <p className="text-[10px] font-bold text-navy-900/50">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-xs text-navy-900/70 mb-6">
                Are you sure you want to delete <span className="font-bold text-navy-900">&quot;{deleteTarget.title}&quot;</span>?
              </p>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 text-xs font-bold text-navy-900/50 hover:text-navy-900 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button onClick={handleDelete}
                  className="px-4 py-2 bg-red-muted hover:bg-red-muted-dark text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
