import React, { useState } from 'react';
import Card from '../components/ui/Card';

const INITIAL_CASES = [
  {
    id: 'CMP-782',
    studentName: 'Rahul Sharma',
    dept: 'CSE - 3rd Year',
    avatarInitials: 'RS',
    category: 'security',
    subject: 'Flickering Lights North Gate',
    description: 'The lights near the North gate are flickering very badly. It is almost pitch black in some areas during the change of shifts. Feels unsafe for students leaving late.',
    date: 'Oct 12, 2023',
    status: 'open', // open, in_progress, resolved
  },
  {
    id: 'CMP-781',
    studentName: 'Ananya Patel',
    dept: 'ECE - 2nd Year',
    avatarInitials: 'AP',
    category: 'academic',
    subject: 'Library Lab Equipment Access',
    description: 'We need permission to access the DSP lab equipment after 5 PM for our semester project. The security guards are locking the labs early.',
    date: 'Oct 11, 2023',
    status: 'in_progress',
  },
  {
    id: 'CMP-764',
    studentName: 'Vikram Singh',
    dept: 'EEE - 4th Year',
    avatarInitials: 'VS',
    category: 'maintenance',
    subject: 'Power Socket Damage Block B',
    description: 'Multiple electrical sockets on the second floor of Block B are damaged or broken. Needs immediate replacement to avoid safety hazards.',
    date: 'Oct 09, 2023',
    status: 'resolved',
  },
  {
    id: 'CMP-759',
    studentName: 'Priya Sen',
    dept: 'Civil - 1st Year',
    avatarInitials: 'PS',
    category: 'harassment',
    subject: 'Ragging Alert Near Cafeteria',
    description: 'Experienced senior students asking juniors to stand for long periods near the canteen. Kindly monitor this area during lunch hours.',
    date: 'Oct 08, 2023',
    status: 'open',
  }
];

export default function FacultyDashboard() {
  const [cases, setCases] = useState(INITIAL_CASES);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal states
  const [selectedCase, setSelectedCase] = useState(null);

  // Dynamic statistics
  const totalCount = cases.length;
  const pendingCount = cases.filter(c => c.status === 'open').length;
  const resolvedCount = cases.filter(c => c.status === 'resolved').length;

  const handleExport = () => {
    // Simulate CSV download
    const headers = 'ID,Student,Dept,Category,Date,Status\n';
    const rows = cases.map(c => `${c.id},${c.studentName},${c.dept},${c.category},${c.date},${c.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SecureMyCampus_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleStatusChange = (caseId, newStatus) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updated = { ...c, status: newStatus };
        if (selectedCase && selectedCase.id === caseId) {
          setSelectedCase(updated); // Sync modal
        }
        return updated;
      }
      return c;
    }));
  };

  const handleDeleteCase = (caseId) => {
    if (confirm(`Are you sure you want to dismiss and archive case #${caseId}?`)) {
      setCases(prev => prev.filter(c => c.id !== caseId));
      setSelectedCase(null);
    }
  };

  // Filters logic
  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || c.category === categoryFilter;
    const matchesStatus = !statusFilter || c.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'security':
        return 'bg-error-container text-on-error-container';
      case 'academic':
        return 'bg-primary-fixed text-primary';
      case 'maintenance':
        return 'bg-surface-container-high text-on-surface-variant';
      case 'harassment':
        return 'bg-tertiary-fixed text-tertiary-container';
      default:
        return 'bg-outline-variant/30 text-on-surface-variant';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'security': return 'Security Alert';
      case 'academic': return 'Academic Grievance';
      case 'maintenance': return 'Maintenance';
      case 'harassment': return 'Campus Conduct';
      default: return category;
    }
  };

  return (
    <div className="w-full min-h-screen pb-3xl">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Welcome Section */}
        <section className="mb-2xl pt-xl">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">Faculty Portal</h1>
          <p className="text-on-surface-variant font-body-md">
            Oversee campus safety alerts and student complaints from a centralized dashboard.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
          {/* Total Cases */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex items-center gap-lg select-none">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">assignment</span>
            </div>
            <div>
              <p className="text-caption font-caption text-on-surface-variant">Total Cases</p>
              <h3 className="text-headline-md font-headline-md text-primary">{totalCount}</h3>
            </div>
          </div>
          
          {/* Pending Cases */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex items-center gap-lg select-none">
            <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary-container">
              <span className="material-symbols-outlined text-[28px]">pending_actions</span>
            </div>
            <div>
              <p className="text-caption font-caption text-on-surface-variant">Pending Review</p>
              <h3 className="text-headline-md font-headline-md text-tertiary-container">{pendingCount}</h3>
            </div>
          </div>

          {/* Resolved Cases */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant flex items-center gap-lg select-none">
            <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[28px]">task_alt</span>
            </div>
            <div>
              <p className="text-caption font-caption text-on-surface-variant">Resolved Cases</p>
              <h3 className="text-headline-md font-headline-md text-secondary">{resolvedCount}</h3>
            </div>
          </div>
        </section>

        {/* Filters Bar */}
        <section className="bg-surface-container-low p-md rounded-lg mb-lg flex flex-col md:flex-row gap-md items-center justify-between border border-outline-variant/30 shadow-sm w-full">
          <div className="flex flex-wrap gap-md w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline select-none">search</span>
              <input
                id="searchInput"
                className="w-full pl-10 pr-md py-sm bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md outline-none"
                placeholder="Search Student or Subject"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="bg-white border border-outline-variant rounded-lg px-md py-sm font-label-md text-label-md text-on-surface-variant focus:border-primary outline-none cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="security">Security Alert</option>
              <option value="academic">Academic Grievance</option>
              <option value="maintenance">Maintenance</option>
              <option value="harassment">Campus Conduct</option>
            </select>
            <select
              className="bg-white border border-outline-variant rounded-lg px-md py-sm font-label-md text-label-md text-on-surface-variant focus:border-primary outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <button 
            onClick={handleExport}
            className="w-full md:w-auto bg-primary text-white font-label-md text-label-md px-lg py-sm rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-sm active:scale-95 shadow-md cursor-pointer border-none"
          >
            <span className="material-symbols-outlined select-none">download</span>
            Export Report
          </button>
        </section>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant overflow-hidden w-full">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container text-on-surface-variant font-label-md text-label-md border-b border-outline-variant">
                <tr>
                  <th className="px-lg py-md">ID</th>
                  <th className="px-lg py-md">Student</th>
                  <th className="px-lg py-md">Category</th>
                  <th className="px-lg py-md">Date</th>
                  <th className="px-lg py-md">Status</th>
                  <th className="px-lg py-md text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-lg py-lg font-label-md text-primary font-bold">#{c.id}</td>
                    <td className="px-lg py-lg">
                      <div className="flex items-center gap-md">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px] select-none">
                          {c.avatarInitials}
                        </div>
                        <div>
                          <p className="font-label-md text-on-surface">{c.studentName}</p>
                          <p className="text-caption text-on-surface-variant">{c.dept}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-lg">
                      <span className={`px-sm py-xs rounded-full text-caption font-bold ${getCategoryBadgeClass(c.category)}`}>
                        {getCategoryLabel(c.category)}
                      </span>
                    </td>
                    <td className="px-lg py-lg text-on-surface-variant font-body-md">{c.date}</td>
                    <td className="px-lg py-lg">
                      <span className={`flex items-center gap-xs font-label-md ${
                        c.status === 'resolved' 
                          ? 'text-secondary' 
                          : c.status === 'in_progress' 
                          ? 'text-primary' 
                          : 'text-tertiary-container'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          c.status === 'resolved' 
                            ? 'bg-secondary' 
                            : c.status === 'in_progress' 
                            ? 'bg-primary' 
                            : 'bg-tertiary-container'
                        }`} />
                        {c.status === 'resolved' ? 'Resolved' : c.status === 'in_progress' ? 'In Progress' : 'Pending Review'}
                      </span>
                    </td>
                    <td className="px-lg py-lg text-right">
                      <button 
                        onClick={() => setSelectedCase(c)}
                        className="p-xs text-primary hover:bg-primary-fixed rounded-full transition-all cursor-pointer border-none bg-transparent"
                      >
                        <span className="material-symbols-outlined select-none">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-md w-full">
          {filteredCases.map((c) => (
            <div 
              key={c.id} 
              className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant card-hover-effect flex flex-col"
            >
              <div className="flex justify-between items-start mb-md">
                <div>
                  <span className="text-primary font-label-md font-bold">#{c.id}</span>
                  <h4 className="font-headline-md text-[18px] text-on-surface">{c.studentName}</h4>
                </div>
                <span className={`px-sm py-xs rounded-full text-caption font-bold ${getCategoryBadgeClass(c.category)}`}>
                  {c.category.toUpperCase().slice(0, 8)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-md mb-lg">
                <div>
                  <p className="text-caption text-on-surface-variant mb-1">Status</p>
                  <p className={`text-label-md font-bold ${
                    c.status === 'resolved' 
                      ? 'text-secondary' 
                      : c.status === 'in_progress' 
                      ? 'text-primary' 
                      : 'text-tertiary-container'
                  }`}>
                    {c.status === 'resolved' ? 'Resolved' : c.status === 'in_progress' ? 'In Progress' : 'Pending Review'}
                  </p>
                </div>
                <div>
                  <p className="text-caption text-on-surface-variant mb-1">Date</p>
                  <p className="text-label-md font-bold text-on-surface">{c.date}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCase(c)}
                className="w-full py-sm bg-primary-fixed text-primary font-label-md rounded-lg active:scale-95 transition-transform cursor-pointer border-none"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-md animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex justify-between items-center p-lg border-b border-outline-variant/30 bg-surface">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm select-none">
                  {selectedCase.avatarInitials}
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">{selectedCase.studentName}</h3>
                  <p className="text-caption text-on-surface-variant">{selectedCase.dept}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCase(null)}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer p-xs hover:bg-surface-container-high rounded-full select-none"
              >
                close
              </button>
            </div>
            
            <div className="p-lg space-y-lg">
              <div className="flex flex-wrap gap-md justify-between items-center bg-surface-container-low p-md rounded-xl border border-outline-variant/40">
                <div>
                  <p className="text-caption text-on-surface-variant mb-xs">Case Reference</p>
                  <p className="font-label-md text-primary font-bold">#{selectedCase.id}</p>
                </div>
                <div>
                  <p className="text-caption text-on-surface-variant mb-xs">Incident Category</p>
                  <span className={`px-sm py-xs rounded-full text-caption font-bold ${getCategoryBadgeClass(selectedCase.category)}`}>
                    {getCategoryLabel(selectedCase.category)}
                  </span>
                </div>
                <div>
                  <p className="text-caption text-on-surface-variant mb-xs">Date Logged</p>
                  <p className="font-label-md text-on-surface">{selectedCase.date}</p>
                </div>
              </div>

              <div>
                <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs select-none">Subject</h4>
                <p className="font-headline-md text-[18px] text-primary">{selectedCase.subject}</p>
              </div>

              <div>
                <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs select-none">Full Description</h4>
                <p className="text-on-surface font-body-md bg-surface p-md rounded-lg border border-outline-variant/30 leading-relaxed">
                  "{selectedCase.description}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md pt-md border-t border-outline-variant/30">
                <div className="flex items-center gap-sm">
                  <label htmlFor="modal-status" className="font-label-md text-label-md text-on-surface-variant">Update Status:</label>
                  <select 
                    id="modal-status"
                    className="bg-white border border-outline-variant rounded-lg px-sm py-xs font-label-md text-label-md text-on-surface-variant focus:border-primary outline-none cursor-pointer"
                    value={selectedCase.status}
                    onChange={(e) => handleStatusChange(selectedCase.id, e.target.value)}
                  >
                    <option value="open">Pending Review</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div className="flex gap-sm">
                  <button 
                    onClick={() => handleStatusChange(selectedCase.id, 'resolved')}
                    disabled={selectedCase.status === 'resolved'}
                    className="px-md py-sm bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary-container transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 border-none"
                  >
                    Resolve Case
                  </button>
                  <button 
                    onClick={() => handleDeleteCase(selectedCase.id)}
                    className="px-md py-sm border border-error text-error font-label-md rounded-lg hover:bg-error/10 transition-all active:scale-95 cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
