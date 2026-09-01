import React, { useState, useEffect, useTransition } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  Users, 
  Activity, 
  Calendar, 
  Globe, 
  Laptop, 
  Smartphone, 
  RefreshCw, 
  LogOut, 
  ArrowLeft, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  AlertCircle, 
  ExternalLink,
  ChevronDown,
  Download
} from 'lucide-react';
import { AnalyticsStats } from '@/lib/analytics';

const TOKEN_KEY = '_adm_sec_tok';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Login form state - starts completely empty
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [, startTransition] = useTransition();

  // Check existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      verifyToken(savedToken);
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  const verifyToken = async (tok: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', token: tok }),
      });
      const data = await res.json();
      if (data.authenticated) {
        setToken(tok);
        fetchStats(tok);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      setToken(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.token) {
        sessionStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUsername('');
        setPassword('');
        fetchStats(data.token);
      } else {
        setLoginError(data.message || 'Access Denied: Invalid credentials.');
      }
    } catch {
      setLoginError('Connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setStats(null);
  };

  const fetchStats = async (tok?: string) => {
    const activeToken = tok || token;
    if (!activeToken) return;

    setIsLoadingStats(true);
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${activeToken}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to load telemetry stats:', err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleClearLogs = async () => {
    if (!token) return;
    setIsClearing(true);
    try {
      const res = await fetch('/api/admin/analytics', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setShowClearModal(false);
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to clear logs:', err);
    } finally {
      setIsClearing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(text);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const exportToJson = () => {
    if (!stats) return;
    const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitor_analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Filter logs based on search term
  const filteredLogs = (stats?.recentLogs || []).filter((log) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      log.ip.toLowerCase().includes(term) ||
      log.path.toLowerCase().includes(term) ||
      log.browser.toLowerCase().includes(term) ||
      log.os.toLowerCase().includes(term) ||
      log.device.toLowerCase().includes(term) ||
      log.country.toLowerCase().includes(term)
    );
  });

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);

      if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHour < 24) return `${diffHour}h ago`;
      return `${diffDay}d ago`;
    } catch {
      return isoString;
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3 font-mono text-xs">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
          <span>Verifying security authorization...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Security Console</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
        
        {/* If Not Logged In -> Clean Stealth Login Form */}
        {!token ? (
          <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-grid-pattern relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="w-full max-w-sm">
              <div className="text-center mb-6 space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-emerald-400 mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Security Console
                </h1>
                <p className="text-xs text-slate-500 font-mono">
                  Authentication required for system telemetry
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-5">
                
                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-400 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-emerald-500 focus:outline-none text-white text-xs placeholder-slate-600 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        required
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-emerald-500 focus:outline-none text-white text-xs placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </form>

                <div className="pt-2 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Return to site</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In -> Admin Dashboard View */
          <div className="w-full flex-1 flex flex-col">
            
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Telemetry & Analytics Console</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h1>
                    <p className="text-[11px] font-mono text-slate-400">
                      Authenticated Session • <span className="text-emerald-400">Encrypted</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => fetchStats()}
                    disabled={isLoadingStats}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-colors cursor-pointer"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStats ? 'animate-spin text-emerald-400' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    onClick={exportToJson}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-colors cursor-pointer"
                    title="Export JSON"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">Export</span>
                  </button>

                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline">View Site</span>
                  </Link>

                  <button
                    onClick={() => setShowClearModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-mono transition-colors cursor-pointer"
                    title="Clear Analytics Logs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear Logs</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Logout</span>
                  </button>
                </div>

              </div>
            </header>

            {/* Dashboard Content Body */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
              
              {/* Metric Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Views */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Total Web Page Views
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-extrabold text-white font-mono text-gradient">
                      {stats?.totalViews ?? 0}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span className="text-emerald-400 font-semibold">Live Counter</span>
                      <span>• across all pages</span>
                    </div>
                  </div>
                </div>

                {/* Unique IP Visitors */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Unique IP Addresses
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-extrabold text-white font-mono">
                      {stats?.uniqueIpsCount ?? 0}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Distinct visitor IP addresses recorded
                    </div>
                  </div>
                </div>

                {/* Today's Views */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Views Today
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-extrabold text-white font-mono">
                      {stats?.todayViews ?? 0}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Views in the current UTC day
                    </div>
                  </div>
                </div>

                {/* 7-Day Volume */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Past 7 Days
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-extrabold text-white font-mono">
                      {stats?.weeklyViews ?? 0}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Total weekly active traffic
                    </div>
                  </div>
                </div>

              </div>

              {/* Middle Breakdown: Top Paths, Browsers & Operating Systems */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Views By Route / Page */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold font-mono text-slate-200 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Top Visited Paths</span>
                  </h3>
                  <div className="space-y-2.5">
                    {stats?.viewsByPath && Object.keys(stats.viewsByPath).length > 0 ? (
                      Object.entries(stats.viewsByPath)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([pathname, count]) => {
                          const percentage = stats.totalViews > 0 ? Math.round((count / stats.totalViews) * 100) : 0;
                          return (
                            <div key={pathname} className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-300 truncate max-w-[200px]">{pathname}</span>
                                <span className="text-emerald-400 font-semibold">{count} views ({percentage}%)</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-xs text-slate-500 font-mono py-4 text-center">No path visits yet.</p>
                    )}
                  </div>
                </div>

                {/* Top Browsers */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold font-mono text-slate-200 flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    <span>Browser Breakdown</span>
                  </h3>
                  <div className="space-y-2.5">
                    {stats?.topBrowsers && Object.keys(stats.topBrowsers).length > 0 ? (
                      Object.entries(stats.topBrowsers)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([browserName, count]) => {
                          const percentage = stats.totalViews > 0 ? Math.round((count / stats.totalViews) * 100) : 0;
                          return (
                            <div key={browserName} className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-300">{browserName}</span>
                                <span className="text-cyan-400 font-semibold">{count} ({percentage}%)</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-xs text-slate-500 font-mono py-4 text-center">No browser data yet.</p>
                    )}
                  </div>
                </div>

                {/* Operating Systems */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold font-mono text-slate-200 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <span>Operating Systems</span>
                  </h3>
                  <div className="space-y-2.5">
                    {stats?.topOs && Object.keys(stats.topOs).length > 0 ? (
                      Object.entries(stats.topOs)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([osName, count]) => {
                          const percentage = stats.totalViews > 0 ? Math.round((count / stats.totalViews) * 100) : 0;
                          return (
                            <div key={osName} className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-300">{osName}</span>
                                <span className="text-indigo-400 font-semibold">{count} ({percentage}%)</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-xs text-slate-500 font-mono py-4 text-center">No OS data yet.</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Detailed Live Visitor Log Table */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* Table Header & Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                      <span>Visitor IP & Activity Log</span>
                      <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                        {filteredLogs.length} Records
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Chronological log of viewer IP addresses, paths, and device metadata.
                    </p>
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => startTransition(() => setSearchTerm(e.target.value))}
                      placeholder="Search by IP, path, browser..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-emerald-500 focus:outline-none text-white text-xs placeholder-slate-500 font-mono"
                    />
                  </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-950/60">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono">
                        <th className="py-3 px-4">Visitor IP Address</th>
                        <th className="py-3 px-4">Time & Date</th>
                        <th className="py-3 px-4">Visited Path</th>
                        <th className="py-3 px-4">Device & OS</th>
                        <th className="py-3 px-4">Browser</th>
                        <th className="py-3 px-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 font-mono">
                      {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => {
                          const isExpanded = expandedLogId === log.id;
                          return (
                            <React.Fragment key={log.id}>
                              <tr className="hover:bg-slate-900/50 transition-colors">
                                
                                {/* IP Address */}
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-100">
                                      {log.ip}
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(log.ip)}
                                      className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                                      title="Copy IP"
                                    >
                                      {copiedIp === log.ip ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                </td>

                                {/* Timestamp */}
                                <td className="py-3 px-4 text-slate-300">
                                  <div>{formatRelativeTime(log.timestamp)}</div>
                                  <div className="text-[10px] text-slate-500">
                                    {new Date(log.timestamp).toLocaleString()}
                                  </div>
                                </td>

                                {/* Path */}
                                <td className="py-3 px-4">
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                                    {log.path}
                                  </span>
                                </td>

                                {/* Device / OS */}
                                <td className="py-3 px-4 text-slate-300">
                                  <div className="flex items-center gap-1.5">
                                    {log.device === 'Mobile' ? (
                                      <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                                    ) : (
                                      <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                                    )}
                                    <span>{log.os}</span>
                                    <span className="text-[10px] text-slate-500">({log.device})</span>
                                  </div>
                                </td>

                                {/* Browser */}
                                <td className="py-3 px-4 text-slate-300">
                                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700/60 text-[11px]">
                                    {log.browser}
                                  </span>
                                </td>

                                {/* Expand Inspect Button */}
                                <td className="py-3 px-4 text-right">
                                  <button
                                    onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                    title="View Raw User-Agent"
                                  >
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180 text-emerald-400' : ''}`} />
                                  </button>
                                </td>
                              </tr>

                              {/* Expanded Raw Telemetry Row */}
                              {isExpanded && (
                                <tr className="bg-slate-950 border-b border-slate-800">
                                  <td colSpan={6} className="p-4 space-y-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono text-slate-400">
                                      <div>
                                        <span className="text-slate-500">Log ID:</span> <span className="text-slate-300">{log.id}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-500">Referrer:</span> <span className="text-slate-300">{log.referrer || 'Direct visit'}</span>
                                      </div>
                                      <div className="sm:col-span-2">
                                        <span className="text-slate-500">Raw User Agent:</span>
                                        <div className="mt-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 break-all select-all">
                                          {log.userAgent || 'None reported'}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                            {searchTerm ? 'No visitor logs match your search filter.' : 'No page views recorded yet.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </main>

            {/* Clear Logs Confirmation Modal */}
            {showClearModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
                <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold text-white">
                      Clear All Analytics Data?
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This will erase all recorded visitor IP logs, page view counters, and telemetry data. This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowClearModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClearLogs}
                      disabled={isClearing}
                      className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isClearing ? 'Clearing...' : 'Yes, Erase All'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Footer */}
            <footer className="py-6 border-t border-slate-900 bg-slate-950 text-center text-xs font-mono text-slate-500">
              Security Console • Samir Shrestha Portfolio Telemetry
            </footer>

          </div>
        )}

      </div>
    </>
  );
}
