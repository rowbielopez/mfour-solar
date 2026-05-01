'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'framer-motion';
import { Calculator, TrendingDown, Sun, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const controls = animate(prevRef.current, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prevRef.current = value;
    return controls.stop;
  }, [value]);

  return (
    <span>
      {prefix}{display.toLocaleString('en-PH')}{suffix}
    </span>
  );
}

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(6000);
  const [roofSize, setRoofSize] = useState<'small' | 'medium' | 'large'>('medium');

  const roofMultiplier = { small: 0.6, medium: 1, large: 1.5 };
  const systemSizeRaw = (monthlyBill / 1000) * roofMultiplier[roofSize];
  const systemSize = Math.round(systemSizeRaw * 10) / 10;
  const systemCost = Math.round(systemSize * 55000);
  const monthlySavings = Math.round(monthlyBill * 0.75);
  const yearlyBenefit = monthlySavings * 12;
  const paybackYears = Math.round((systemCost / yearlyBenefit) * 10) / 10;
  const lifetime25 = yearlyBenefit * 25 - systemCost;

  const percent = Math.round(((monthlyBill - 1000) / (50000 - 1000)) * 100);

  return (
    <section id="calculator" className="py-24 bg-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="eyebrow justify-center text-solar-400">Solar Calculator</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
            How Much Can You Save?
          </h2>
          <p className="text-green-100/55 max-w-md mx-auto leading-relaxed">
            Move the slider to instantly estimate your solar savings, system size, and return on investment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/6 border border-white/10 rounded-2xl p-7 backdrop-blur-sm"
          >
            <h3 className="font-semibold text-white mb-7 flex items-center gap-2.5 text-base">
              <div className="w-8 h-8 bg-solar-500/15 rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-solar-400" />
              </div>
              Your Details
            </h3>

            {/* Bill slider */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-green-100/70 text-sm font-medium">Monthly Electricity Bill</label>
                <span className="font-display font-bold text-xl text-solar-400">
                  ₱{monthlyBill.toLocaleString('en-PH')}
                </span>
              </div>

              {/* Custom styled track */}
              <div className="relative">
                <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-solar-600 to-solar-400 rounded-full transition-all duration-100"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
                  style={{ zIndex: 2 }}
                />
                {/* Thumb visual */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-solar-500 rounded-full border-[3px] border-green-950 shadow-glow pointer-events-none transition-all duration-100"
                  style={{ left: `calc(${percent}% - 10px)`, zIndex: 1 }}
                />
              </div>

              <div className="flex justify-between text-xs text-green-100/25 mt-2.5">
                <span>₱1,000</span>
                <span>₱50,000</span>
              </div>
            </div>

            {/* Roof size selector */}
            <div>
              <label className="text-green-100/70 text-sm font-medium mb-3 block">
                Property / Roof Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setRoofSize(size)}
                    whileTap={{ scale: 0.97 }}
                    className={`py-3 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                      roofSize === size
                        ? 'bg-solar-500 text-green-950 shadow-glow'
                        : 'bg-white/5 text-green-100/55 hover:bg-white/10 hover:text-green-100/80'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              <p className="text-green-100/25 text-xs mt-2 text-center">
                Small &lt;80m² · Medium 80–200m² · Large &gt;200m²
              </p>
            </div>
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Sun, label: 'Recommended System', value: systemSize, suffix: ' kWp', sub: 'Optimal system size' },
                { icon: TrendingDown, label: 'Monthly Savings', value: monthlySavings, prefix: '₱', sub: 'Est. 75% reduction' },
                { icon: DollarSign, label: 'Estimated Cost', value: systemCost, prefix: '₱', sub: 'Installed & commissioned' },
                { icon: Calculator, label: 'Payback Period', value: paybackYears * 10, suffix: ' yrs', sub: 'Full ROI achieved', divisor: 10 },
              ].map(({ icon: Icon, label, value, prefix = '', suffix = '', sub, divisor = 1 }) => (
                <div
                  key={label}
                  className="bg-white/6 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 bg-solar-500/12 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-solar-400" />
                  </div>
                  <p className="text-green-100/45 text-xs mb-1">{label}</p>
                  <p className="font-display font-bold text-lg sm:text-xl text-white leading-none">
                    {prefix}
                    <AnimatedNumber value={Math.round(value / divisor * 10) / 10} />
                    {suffix}
                  </p>
                  <p className="text-green-100/35 text-xs mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* Lifetime savings highlight */}
            <div className="bg-solar-500/12 border border-solar-500/25 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-solar-400 text-xs font-semibold uppercase tracking-wide mb-1.5">25-Year Net Savings</p>
                  <p className="font-display font-bold text-3xl sm:text-4xl text-solar-500 leading-none">
                    ₱<AnimatedNumber value={lifetime25} />
                  </p>
                  <p className="text-green-100/45 text-xs mt-1.5">After full system cost recovery</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-green-100/35 mb-0.5">Bill reduction</p>
                  <p className="font-display font-bold text-2xl text-white">~75%</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 bg-solar-500 hover:bg-solar-400 text-green-950 font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 text-sm"
            >
              Get My Custom Quote — Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <p className="text-center text-green-100/25 text-xs mt-7">
          * Estimates based on average Meralco rates (₱9.70/kWh). Actual savings depend on location, usage patterns, and system performance.
        </p>
      </div>
    </section>
  );
}
