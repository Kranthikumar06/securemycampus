import React from 'react';

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 1,
    tag: 'Security Alert',
    time: '2h ago',
    tagType: 'secondary', // maps to border/text colors
    title: 'Emergency Drills Scheduled for Block A',
    description: 'Regular safety maintenance and fire drills will be conducted this Friday between 10 AM and 12 PM.',
  },
  {
    id: 2,
    tag: 'Update',
    time: '5h ago',
    tagType: 'primary',
    title: 'New Surveillance Cameras Installed',
    description: 'Enhancing campus-wide security with 50 new high-definition units installed at key entry points.',
  },
  {
    id: 3,
    tag: 'Event',
    time: '1d ago',
    tagType: 'tertiary',
    title: 'Campus Safety Workshop 2024',
    description: 'Join us for a hands-on workshop on personal safety and reporting procedures in the main auditorium.',
  },
];

export default function Announcements({ announcements = DEFAULT_ANNOUNCEMENTS, onViewAll }) {
  const getTagColorClass = (tagType) => {
    switch (tagType) {
      case 'secondary':
        return 'text-secondary';
      case 'primary':
        return 'text-primary';
      case 'tertiary':
        return 'text-tertiary';
      default:
        return 'text-on-surface-variant';
    }
  };

  return (
    <section className="announcement-section py-2xl bg-surface-container-low">
      <div className="container mx-auto px-gutter">
        <div className="flex items-center justify-between mb-xl">
          <div className="flex items-center gap-sm">
            <span className="p-xs bg-error-container text-on-error-container rounded-lg material-symbols-outlined select-none">
              campaign
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Latest Safety Updates</h2>
          </div>
          <button 
            onClick={onViewAll}
            className="text-primary font-label-md text-label-md flex items-center gap-xs hover:underline cursor-pointer bg-transparent border-none p-0 focus:outline-none"
          >
            View All <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id}
              className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <span className={`text-caption font-caption uppercase tracking-wider ${getTagColorClass(announcement.tagType)}`}>
                {announcement.tag} • {announcement.time}
              </span>
              <h3 className="font-headline-md text-[18px] mt-sm mb-md group-hover:text-primary transition-colors">
                {announcement.title}
              </h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2">
                {announcement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
