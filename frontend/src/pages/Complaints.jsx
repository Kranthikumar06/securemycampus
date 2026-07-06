import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';

const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-9203',
    title: 'Flickering Lighting - Sector 4',
    description: 'Main walkway lights are intermittently failing near the library entrance, creating dark spots.',
    fullText: 'The lights near the North gate are flickering very badly. It is almost pitch black in some areas during the change of shifts. Feels unsafe for students leaving late.',
    category: 'security',
    status: 'pending',
    priority: 'high',
    location: 'Engineering Block North',
    city: 'Hyderabad',
    phone: '+91 98765 43210',
    date: 'Oct 24, 2023 | 08:15 PM',
    timeLeft: 2535, // in seconds (42m 15s)
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQQuPgfI-AkGxWITm_uh7u7hUpcaHfBsH0DhObiw951cV2yNAFpy1d-NvDS2ntaOAmWbwNt1AJErpiq5uqUv_ObQRMhafPiJYMob4-0Gq2jAHINZcCcLJu_9wFKEqqibDATzJa5hUXJi8wA2PvKBxsEFiV2oBXzMwS__JfkgQLPkvB3rz7FkHA_BAoIC317bg1WMqaKGalG0bCreYY19TUpiIg-GaDsL0ASEDxtVgGQcfPOeZ_UYOo'
  },
  {
    id: 'CMP-8812',
    title: 'Elevator Malfunction - Block C',
    description: 'Elevator No. 2 in the administrative block is stopping between floors frequently.',
    fullText: 'The lift stalled between the 3rd and 4th floor for about 5 minutes today. This is the third time this week. Staff are hesitant to use it.',
    category: 'maintenance',
    status: 'investigating',
    priority: 'medium',
    location: 'Central Plaza Elevators',
    city: 'Hyderabad',
    phone: '+91 88990 11223',
    date: 'Oct 25, 2023 | 09:30 AM',
    timeLeft: 765, // in seconds (12m 45s)
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUXPNo8zPLpX8p-zCn7k6VOODAV7E1RtHB59dYn7KjxjSN4NtpMsb3FehMnYPGHRrTYRj3Nkcbjc-v4SY9-5DrCN2qyzTSUczzUhYMZz5ageU71sd5gRZIw6X8Dq1l-xhhfSKv4UwP1GWhnfP1biPUreddLdf2N49TgXszi_MCdo8vusWoyWIXx1HRVvx2Lmxbexsklx61iTRcPgp57VOS1ZHTrfKoCExyVUBiya17pDrVapyLIs24'
  },
  {
    id: 'CMP-7741',
    title: 'Medical Kit Refill',
    description: 'The first aid station in the Gymnasium needs restocking of bandages and antiseptic.',
    fullText: 'The emergency kit near the treadmill area is empty. Please restock as soon as possible for evening peak hours.',
    category: 'medical',
    status: 'resolved',
    priority: 'low',
    location: 'Sports Complex East',
    city: 'Hyderabad',
    phone: '+91 77665 44332',
    date: 'Oct 23, 2023 | 02:00 PM',
    timeLeft: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIBE7QNolsnmNGci-O7Iuy7YlWXkfx8r-a53qrx6-INaML-XohhmpWg7q3Mk67xr3m7ki-hpbbK5fg-1wHg28IVOPrKCwSlXaB-K6XwaactpI37fvGty-KRiB_FdoqBPLY9FgDjQMHRuQLHNpcfyILhtpOxadlgF7yG67w3tOAYfB-rSKyp2vcedtyn-Fac0iwigxAf49yBgeM9LFyVxEGVWKGos7xRma0SEf8TfX1J8PuWHHwJBBa'
  }
];

export default function Complaints() {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  
  // Submit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('security');
  const [newLocation, setNewLocation] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  // Timer simulation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setComplaints((prevComplaints) =>
        prevComplaints.map((c) => {
          if (c.status !== 'resolved' && c.timeLeft > 0) {
            return { ...c, timeLeft: c.timeLeft - 1 };
          }
          return c;
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    if (seconds <= 0) return '00:00';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSolve = (id, e) => {
    e.stopPropagation();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, status: 'resolved', timeLeft: 0 };
        }
        return c;
      })
    );
  };

  const handleDismiss = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to dismiss this complaint?')) {
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleCreateComplaint = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newLocation) {
      alert('Please fill out all required fields.');
      return;
    }

    const randomIdNum = Math.floor(1000 + Math.random() * 9000);
    const newComplaintObj = {
      id: `CMP-${randomIdNum}`,
      title: newTitle,
      description: newDesc,
      fullText: newDesc,
      category: newCategory,
      status: 'pending',
      priority: newPriority,
      location: newLocation,
      city: 'Hyderabad',
      phone: newPhone || '+91 99999 88888',
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      timeLeft: newPriority === 'high' ? 3600 : newPriority === 'medium' ? 7200 : 10800,
      image: newCategory === 'security'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQQuPgfI-AkGxWITm_uh7u7hUpcaHfBsH0DhObiw951cV2yNAFpy1d-NvDS2ntaOAmWbwNt1AJErpiq5uqUv_ObQRMhafPiJYMob4-0Gq2jAHINZcCcLJu_9wFKEqqibDATzJa5hUXJi8wA2PvKBxsEFiV2oBXzMwS__JfkgQLPkvB3rz7FkHA_BAoIC317bg1WMqaKGalG0bCreYY19TUpiIg-GaDsL0ASEDxtVgGQcfPOeZ_UYOo'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUXPNo8zPLpX8p-zCn7k6VOODAV7E1RtHB59dYn7KjxjSN4NtpMsb3FehMnYPGHRrTYRj3Nkcbjc-v4SY9-5DrCN2qyzTSUczzUhYMZz5ageU71sd5gRZIw6X8Dq1l-xhhfSKv4UwP1GWhnfP1biPUreddLdf2N49TgXszi_MCdo8vusWoyWIXx1HRVvx2Lmxbexsklx61iTRcPgp57VOS1ZHTrfKoCExyVUBiya17pDrVapyLIs24'
    };

    setComplaints([newComplaintObj, ...complaints]);
    setIsModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewCategory('security');
    setNewLocation('');
    setNewPhone('');
    setNewPriority('medium');
  };

  // Filter complaints list
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="w-full min-h-screen pb-3xl relative">
      {/* Hero section */}
      <section className="relative pt-xl pb-md px-gutter max-w-container-max mx-auto">
        <div className="mb-lg">
          <h1 className="font-display-lg text-display-lg text-primary mb-sm">Complaint Browser</h1>
          <p className="text-on-surface-variant max-w-2xl font-body-lg text-body-lg">
            Maintain campus safety by monitoring and resolving reported issues. Filter through real-time complaints and take immediate action.
          </p>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-40 py-md mb-xl">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg p-md border border-outline-variant flex flex-col md:flex-row gap-md items-center w-full">
            <div className="relative w-full md:flex-1">
              <span className="absolute left-md top-1/2 -translate-y-1/2 text-outline material-symbols-outlined select-none">
                search
              </span>
              <input
                className="w-full pl-3xl pr-md py-sm bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md"
                placeholder="Search by complaint title or ID..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-sm w-full md:w-auto">
              <select
                className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-label-md text-label-md text-on-surface-variant focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="security">Security</option>
                <option value="maintenance">Maintenance</option>
                <option value="harassment">Harassment</option>
                <option value="medical">Medical Emergency</option>
              </select>
              <select
                className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-label-md text-label-md text-on-surface-variant focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Grid */}
        {filteredComplaints.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-3xl text-center w-full">
            <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-lg">
              <span className="material-symbols-outlined text-primary text-[48px] select-none">search_off</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-xs">No matching complaints found</h3>
            <p className="text-on-surface-variant">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
            {filteredComplaints.map((c) => {
              const isFlipped = !!flippedCards[c.id];
              return (
                <div 
                  key={c.id} 
                  className="card-container group select-none"
                  onClick={() => handleCardClick(c.id)}
                >
                  <div className={`card-inner shadow-sm hover:shadow-lg transition-all duration-500 ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* Front Face */}
                    <div className={`card-front bg-surface-container-lowest border border-outline-variant flex flex-col ${c.status === 'resolved' ? 'opacity-75' : ''}`}>
                      <div className="h-48 overflow-hidden relative">
                        <img
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${c.status === 'resolved' ? 'grayscale' : ''}`}
                          src={c.image}
                          alt={c.title}
                        />
                        <div className={`absolute top-md right-md px-sm py-xs rounded-full font-label-md text-[10px] uppercase tracking-wider text-white ${
                          c.status === 'resolved' 
                            ? 'bg-primary' 
                            : c.priority === 'high' 
                            ? 'bg-error' 
                            : c.priority === 'medium' 
                            ? 'bg-secondary' 
                            : 'bg-outline'
                        }`}>
                          {c.status === 'resolved' ? 'Resolved' : c.status === 'investigating' ? 'In Progress' : `${c.priority} Priority`}
                        </div>
                      </div>
                      <div className="p-lg flex flex-col flex-grow">
                        <h3 className="font-headline-md text-headline-md text-primary mb-xs">{c.title}</h3>
                        <p className="text-on-surface-variant line-clamp-2 mb-xl">{c.description}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-primary font-label-md text-label-md flex items-center gap-xs">
                            Click to view details
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </span>
                          <span className="text-outline font-caption text-caption">#{c.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="card-back bg-surface border-2 border-primary/20 flex flex-col p-lg">
                      <div className="flex justify-between items-start mb-md">
                        <div>
                          <span className="bg-primary/10 text-primary px-sm py-xs rounded-lg font-label-md text-[10px] uppercase mb-xs inline-block">
                            {c.category}
                          </span>
                          <h4 className="font-headline-md text-[20px] text-primary">{c.title.split(' - ')[0]}</h4>
                        </div>
                        <div className="bg-surface-container-high px-md py-sm rounded-lg text-center min-w-[70px]">
                          {c.status === 'resolved' ? (
                            <>
                              <span className="block font-label-md text-label-md text-primary select-none">00:00</span>
                              <span className="text-[10px] text-outline uppercase select-none font-semibold">Completed</span>
                            </>
                          ) : (
                            <>
                              <span className="block font-label-md text-label-md text-primary">{formatTimer(c.timeLeft)}</span>
                              <span className="text-[10px] text-outline uppercase font-semibold">Time Left</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-sm mb-lg">
                        <div className="flex items-center gap-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-primary text-[20px] select-none">calendar_today</span>
                          <span className="text-body-md">{c.date}</span>
                        </div>
                        <div className="flex items-center gap-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-primary text-[20px] select-none">call</span>
                          <span className="text-body-md">{c.phone}</span>
                        </div>
                        <div className="flex items-center gap-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-primary text-[20px] select-none">location_on</span>
                          <span className="text-body-md">{c.location}</span>
                        </div>
                      </div>

                      <p className="text-on-surface-variant text-body-md line-clamp-4 mb-lg italic border-l-4 border-primary/20 pl-md">
                        "{c.fullText}"
                      </p>

                      <div className="mt-auto grid grid-cols-2 gap-md">
                        {c.status === 'resolved' ? (
                          <button 
                            className="bg-surface-container-high text-outline py-sm rounded-lg font-label-md flex items-center justify-center gap-xs cursor-not-allowed border border-outline-variant/30"
                            disabled
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="material-symbols-outlined text-[18px]">done_all</span>
                            Resolved
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => handleSolve(c.id, e)}
                            className="bg-primary text-on-primary py-sm rounded-lg font-label-md flex items-center justify-center gap-xs hover:bg-secondary transition-all active:scale-95 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            Solve
                          </button>
                        )}
                        <button 
                          onClick={(e) => handleDismiss(c.id, e)}
                          className="border border-error text-error py-sm rounded-lg font-label-md flex items-center justify-center gap-xs hover:bg-error/10 transition-all active:scale-95 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                          {c.status === 'resolved' ? 'Archive' : 'Dismiss'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FAB Floating action button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-xl right-xl z-50 bg-primary text-on-primary px-xl py-md rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-sm font-label-md group cursor-pointer border-none focus:outline-none"
      >
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform select-none">add_alert</span>
        Report an Issue
      </button>

      {/* Report an Issue Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-md animate-fade-in">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex justify-between items-center p-lg border-b border-outline-variant/30 bg-surface">
              <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">add_alert</span>
                Report Campus Issue
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer p-xs hover:bg-surface-container-high rounded-full select-none"
              >
                close
              </button>
            </div>
            
            <form onSubmit={handleCreateComplaint} className="p-lg space-y-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-xs" htmlFor="title">
                  Subject / Title <span className="text-error">*</span>
                </label>
                <input
                  id="title"
                  className="w-full px-md py-sm bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md"
                  placeholder="e.g. Water Leak in Admin Block"
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-xs" htmlFor="category">
                    Category <span className="text-error">*</span>
                  </label>
                  <select
                    id="category"
                    className="w-full px-md py-sm bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md cursor-pointer"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="security">Security</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="harassment">Campus Conduct</option>
                    <option value="medical">Medical Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-xs" htmlFor="priority">
                    Priority Level <span className="text-error">*</span>
                  </label>
                  <select
                    id="priority"
                    className="w-full px-md py-sm bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md cursor-pointer"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-xs" htmlFor="location">
                  Location Details <span className="text-error">*</span>
                </label>
                <input
                  id="location"
                  className="w-full px-md py-sm bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md"
                  placeholder="e.g. CSE Block, 2nd Floor Corridor"
                  required
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-xs" htmlFor="phone">
                  Contact Number (Optional)
                </label>
                <input
                  id="phone"
                  className="w-full px-md py-sm bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md"
                  placeholder="e.g. +91 99887 76655"
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-xs" htmlFor="desc">
                  Issue Description <span className="text-error">*</span>
                </label>
                <textarea
                  id="desc"
                  className="w-full px-md py-sm bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none font-body-md h-24 resize-none"
                  placeholder="Explain the safety alert or incident in details..."
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>

              <div className="pt-sm flex gap-md">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-sm border border-outline-variant text-on-surface-variant font-label-md rounded-lg active:scale-95 transition-all cursor-pointer hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-sm bg-primary text-on-primary font-label-md rounded-lg active:scale-95 transition-all cursor-pointer hover:bg-primary-container shadow-md"
                >
                  Submit Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
