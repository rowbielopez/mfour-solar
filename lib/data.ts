export const services = [
  {
    id: 'installation',
    icon: 'Zap',
    title: 'Solar Panel Installation',
    shortDesc:
      'Complete residential and commercial solar systems designed and installed by certified engineers.',
    description:
      'Our expert team designs and installs custom solar power systems tailored to your energy needs and property layout. From site assessment to commissioning, we handle every step with precision and care.',
    benefits: [
      'Reduce electricity bills by up to 80%',
      'Increase property value',
      'Government incentives and net metering',
      'Zero-emission clean energy',
      '25-year panel performance warranty',
    ],
    steps: [
      { step: '01', title: 'Site Assessment', desc: 'We evaluate your roof, shading, and electrical setup.' },
      { step: '02', title: 'Custom Design', desc: 'Our engineers design the optimal system for your property.' },
      { step: '03', title: 'Installation', desc: 'Certified installers mount panels and wire the system.' },
      { step: '04', title: 'Commissioning', desc: 'System testing, meralco coordination, and handover.' },
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
  },
  {
    id: 'maintenance',
    icon: 'Settings',
    title: 'Maintenance & Repair',
    shortDesc:
      'Keep your solar system performing at peak efficiency with our scheduled maintenance programs.',
    description:
      'Regular maintenance ensures your solar investment delivers maximum returns year after year. We offer preventive maintenance packages and fast-response repair services to minimize downtime.',
    benefits: [
      'Maximize energy output and ROI',
      'Early fault detection',
      'Panel cleaning and inspection',
      'Inverter health monitoring',
      'Priority response within 24 hours',
    ],
    steps: [
      { step: '01', title: 'Inspection', desc: 'Visual and electrical inspection of all components.' },
      { step: '02', title: 'Cleaning', desc: 'Professional panel cleaning to restore full efficiency.' },
      { step: '03', title: 'Testing', desc: 'Performance testing and output verification.' },
      { step: '04', title: 'Report', desc: 'Detailed health report and recommendations.' },
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 'consultation',
    icon: 'ClipboardList',
    title: 'Consultation & Assessment',
    shortDesc:
      'Expert guidance to help you choose the right solar solution for your home or business.',
    description:
      'Not sure where to start? Our energy consultants will analyze your electricity consumption, assess your property, and recommend the most cost-effective solar solution—with a detailed ROI projection.',
    benefits: [
      'Unbiased expert recommendation',
      'Detailed ROI and savings projection',
      'Net metering application support',
      'Financing options guidance',
      'No-obligation free initial consult',
    ],
    steps: [
      { step: '01', title: 'Energy Audit', desc: 'Review your electricity bills and usage patterns.' },
      { step: '02', title: 'Site Visit', desc: 'Physical inspection of your property and roof.' },
      { step: '03', title: 'Proposal', desc: 'Customized proposal with system size and cost.' },
      { step: '04', title: 'Decision', desc: 'You choose the best option—no pressure.' },
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  },
];

export const projects = [
  {
    id: 1,
    title: 'Cebu Residential Estate',
    location: 'Cebu City, Cebu',
    type: 'Residential',
    capacity: '10 kWp',
    description: 'Complete rooftop solar installation for a 4-bedroom family home. System covers 100% of monthly electricity consumption.',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80',
    tags: ['Residential', 'Grid-Tied'],
    year: '2024',
  },
  {
    id: 2,
    title: 'BGC Commercial Building',
    location: 'Bonifacio Global City, Taguig',
    type: 'Commercial',
    capacity: '100 kWp',
    description: 'Large-scale rooftop installation for a 5-story commercial building. Achieved 60% reduction in monthly utility costs.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    tags: ['Commercial', 'Grid-Tied', 'Net Metering'],
    year: '2024',
  },
  {
    id: 3,
    title: 'Davao Farm & Resort',
    location: 'Davao del Norte',
    type: 'Agriculture',
    capacity: '30 kWp',
    description: 'Off-grid solar system with battery storage for a remote farm resort. Provides 24/7 clean energy independence.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    tags: ['Off-Grid', 'Battery Storage'],
    year: '2023',
  },
  {
    id: 4,
    title: 'Quezon City Townhouse Complex',
    location: 'Quezon City, Metro Manila',
    type: 'Residential',
    capacity: '50 kWp',
    description: 'Community solar installation across 8 townhouse units with shared monitoring dashboard.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    tags: ['Residential', 'Community Solar'],
    year: '2023',
  },
  {
    id: 5,
    title: 'Iloilo School Campus',
    location: 'Iloilo City, Iloilo',
    type: 'Institutional',
    capacity: '75 kWp',
    description: 'Solar installation for a private school campus. System powers classrooms, labs, and administrative offices.',
    image: 'https://images.unsplash.com/photo-1554213543-9b3fc7e0b40a?w=800&q=80',
    tags: ['Institutional', 'Grid-Tied'],
    year: '2024',
  },
  {
    id: 6,
    title: 'Laguna Manufacturing Plant',
    location: 'Sta. Rosa, Laguna',
    type: 'Industrial',
    capacity: '200 kWp',
    description: 'Industrial-scale solar system for a manufacturing facility. Delivering significant cost savings on high daytime energy loads.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
    tags: ['Industrial', 'Net Metering'],
    year: '2023',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Maria Santos',
    role: 'Homeowner',
    location: 'Quezon City',
    content:
      'Our electricity bill dropped from ₱8,500 to just ₱900 per month. The MFour Solar team was professional, clean, and finished ahead of schedule. Best investment we\'ve made for our home.',
    rating: 5,
    avatar: 'MS',
  },
  {
    id: 2,
    name: 'Engr. Ramon Reyes',
    role: 'Property Developer',
    location: 'Cebu City',
    content:
      'We\'ve partnered with MFour Solar on three condominium projects. Their technical expertise and project management are top-tier. Our buyers love the solar features.',
    rating: 5,
    avatar: 'RR',
  },
  {
    id: 3,
    name: 'Carla Mendoza',
    role: 'Restaurant Owner',
    location: 'BGC, Taguig',
    content:
      'Running a restaurant means high energy costs. MFour Solar helped us reduce our monthly bill by 65%. The ROI was faster than projected. Highly recommend!',
    rating: 5,
    avatar: 'CM',
  },
  {
    id: 4,
    name: 'Atty. Jose Villanueva',
    role: 'Law Firm Principal',
    location: 'Makati City',
    content:
      'The consultation process was thorough and transparent. They gave us realistic projections—no overselling. Our office solar system has been running flawlessly for 18 months.',
    rating: 5,
    avatar: 'JV',
  },
];

export const faqs = [
  {
    question: 'How much does a solar panel installation cost in the Philippines?',
    answer:
      'A typical residential solar system (5–10 kWp) costs between ₱250,000 to ₱600,000 depending on size, brand, and system type. We offer flexible financing options and can help you maximize available incentives. Most homeowners recover their investment within 5–7 years.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'A standard residential installation takes 1–3 days. Commercial projects may take 1–2 weeks depending on system size. The entire process from consultation to commissioning typically takes 3–6 weeks, including permitting and Meralco/local utility coordination.',
  },
  {
    question: 'What maintenance does a solar system require?',
    answer:
      'Solar panels are low-maintenance. We recommend professional cleaning every 6 months and an annual electrical inspection. Our monitoring system alerts you to any performance issues. Most components carry 10–25 year warranties.',
  },
  {
    question: 'How much can I save on electricity bills?',
    answer:
      'Most residential clients reduce their electricity bill by 60–90%. A properly sized system can bring a ₱6,000/month bill down to under ₱1,000. Savings depend on your current consumption, system size, and local electricity rates.',
  },
  {
    question: 'Will solar work during cloudy or rainy days?',
    answer:
      'Yes. Modern solar panels generate electricity even on cloudy days, though at reduced efficiency (typically 10–25% of peak output). The Philippines receives abundant sunshine year-round, making it one of the best countries for solar energy.',
  },
  {
    question: 'What is net metering and can I benefit from it?',
    answer:
      'Net metering allows you to sell excess solar energy back to your utility company (e.g., Meralco) and receive credits on your bill. We handle the net metering application process for you, and most grid-tied systems qualify for this program.',
  },
];

export const stats = [
  { value: '500+', label: 'Installations Completed' },
  { value: '12 MW', label: 'Total Capacity Installed' },
  { value: '98%', label: 'Client Satisfaction Rate' },
  { value: '₱2M+', label: 'Monthly Savings for Clients' },
];

export const whyChooseUs = [
  {
    icon: 'Award',
    title: 'DOE & ERC Certified',
    desc: 'Fully licensed and certified by the Department of Energy and Energy Regulatory Commission Philippines.',
  },
  {
    icon: 'Shield',
    title: '10-Year Workmanship Warranty',
    desc: 'We stand behind our work with a decade-long warranty on installation workmanship.',
  },
  {
    icon: 'Users',
    title: 'Local Expert Team',
    desc: 'Our engineers and installers are locally trained and understand Philippine climate and grid conditions.',
  },
  {
    icon: 'TrendingUp',
    title: 'Proven ROI',
    desc: 'Average client ROI achieved within 5–7 years, backed by real data from 500+ installations.',
  },
  {
    icon: 'Headphones',
    title: '24/7 After-Sales Support',
    desc: 'Dedicated support team available around the clock for monitoring, troubleshooting, and maintenance.',
  },
  {
    icon: 'Leaf',
    title: 'Eco-First Approach',
    desc: 'We source Tier-1 solar panels with the highest efficiency and lowest environmental footprint.',
  },
];
