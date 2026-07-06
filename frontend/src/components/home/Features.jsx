import React from 'react';
import Card from '../ui/Card';

const DEFAULT_FEATURES = [
  {
    id: 'complaint',
    icon: 'report_problem',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Complaint Submission',
    description: 'Submit safety concerns or incidents anonymously and track resolution in real-time.',
  },
  {
    id: 'forms',
    icon: 'description',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    title: 'Form Access',
    description: 'Quickly access and submit gate passes, visitor requests, and other security-related forms.',
  },
  {
    id: 'profile',
    icon: 'account_circle',
    iconBg: 'bg-on-tertiary-fixed-variant/10',
    iconColor: 'text-on-tertiary-fixed-variant',
    title: 'Profile Management',
    description: 'Manage your digital ID, update contact info, and view your personal security history.',
  },
  {
    id: 'help',
    icon: 'help',
    iconBg: 'bg-error/10',
    iconColor: 'text-error',
    title: 'Help Center',
    description: '24/7 access to campus emergency contacts, FAQs, and immediate security assistance.',
  },
];

export default function Features({ features = DEFAULT_FEATURES, onFeatureClick }) {
  return (
    <section className="features py-3xl bg-surface">
      <div className="container mx-auto px-gutter text-center mb-2xl">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-sm">Secure Campus Ecosystem</h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Everything you need to stay safe and reported, right at your fingertips.
        </p>
      </div>
      
      <div className="container mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
        {features.map((feature) => (
          <div key={feature.id} onClick={() => onFeatureClick?.(feature.id)} className="cursor-pointer">
            <Card 
              isGlass={false} 
              elevation="l1" 
              hoverable={true} 
              className="p-xl text-center flex flex-col items-center rounded-2xl h-full"
            >
              <div className={`w-16 h-16 ${feature.iconBg} ${feature.iconColor} rounded-full flex items-center justify-center mb-lg select-none`}>
                <span className="material-symbols-outlined text-[32px]">{feature.icon}</span>
              </div>
              <h4 className="font-headline-md text-[20px] mb-md text-on-surface">{feature.title}</h4>
              <p className="font-body-md text-on-surface-variant">{feature.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
