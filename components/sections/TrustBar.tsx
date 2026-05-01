import { Shield, Award, Zap, Star } from 'lucide-react';

const items = [
  { icon: Star, text: '4.9/5 Average Rating', sub: '200+ verified reviews' },
  { icon: Award, text: 'DOE & ERC Certified', sub: 'Philippines licensed' },
  { icon: Shield, text: '10-Year Warranty', sub: 'Workmanship guarantee' },
  { icon: Zap, text: '500+ Installations', sub: 'Across the Philippines' },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
          {items.map(({ icon: Icon, text, sub }) => (
            <div
              key={text}
              className="flex items-center gap-3 py-4 px-4 sm:px-6 group"
            >
              <div className="w-8 h-8 rounded-lg bg-solar-500/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-solar-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-green-950 truncate">{text}</p>
                <p className="text-xs text-gray-400 truncate">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
