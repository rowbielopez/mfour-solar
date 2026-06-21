'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Calculator, TrendingDown, Sun, DollarSign, ArrowRight, Home, CalendarRange } from 'lucide-react';
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

// Roof size → home-size label
function roofLabel(m2: number) {
  if (m2 < 80) return 'Small Home';
  if (m2 <= 200) return 'Medium Home';
  return 'Large Home';
}

const YEAR_OPTIONS = [1, 3, 5, 10, 20];

// Calibrated to MFour's hybrid solar + battery package quote:
// 6 kW + 16 kWh battery · ₱350,000 · ₱13,248/mo savings · ~2.2-year payback.
const COST_PER_KW = 58333; // ₱350,000 / 6 kW (installed, hybrid + battery)
const SAVINGS_PER_KW = 2208; // ₱/month per kW (6 kW → ₱13,248, day + night offset)
const AREA_PER_KW = 6; // m² of usable roof per kW (6 kW ≈ 36 m²)

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(12000);
  const [roofSize, setRoofSize] = useState(120); // m²
  const [year, setYear] = useState(5);

  // System is sized to offset the whole bill, capped by what the roof can physically fit.
  const idealKw = monthlyBill / SAVINGS_PER_KW;
  const roofMaxKw = roofSize / AREA_PER_KW;
  const systemSize = Math.round(Math.min(idealKw, roofMaxKw) * 10) / 10;

  const systemCost = Math.round(systemSize * COST_PER_KW);
  const monthlySavings = Math.round(systemSize * SAVINGS_PER_KW); // ≤ bill (size ≤ idealKw)
  const reductionPct = Math.min(100, Math.round((monthlySavings / monthlyBill) * 100));
  const yearlyBenefit = monthlySavings * 12;
  const paybackYears = Math.round((systemCost / yearlyBenefit) * 10) / 10;

  // Year-driven projection
  const grossByYear = yearlyBenefit * year;
  const netByYear = Math.round(grossByYear - systemCost);
  const roiByYear = Math.round((netByYear / systemCost) * 100);

  const billPercent = Math.round(((monthlyBill - 1000) / (50000 - 1000)) * 100);
  const roofPercent = Math.round(((roofSize - 20) / (400 - 20)) * 100);

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
            Adjust the sliders and pick a time horizon to instantly estimate your solar savings, system size, and return on investment.
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

              <div className="relative">
                <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-solar-600 to-solar-400 rounded-full transition-all duration-100"
                    style={{ width: `${billPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  aria-label="Monthly electricity bill"
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2"
                  style={{ zIndex: 2 }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-solar-500 rounded-full border-[3px] border-green-950 shadow-glow pointer-events-none transition-all duration-100"
                  style={{ left: `calc(${billPercent}% - 10px)`, zIndex: 1 }}
                />
              </div>

              <div className="flex justify-between text-xs text-green-100/25 mt-2.5">
                <span>₱1,000</span>
                <span>₱50,000</span>
              </div>
            </div>

            {/* Roof size slider */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-green-100/70 text-sm font-medium flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-solar-400" /> Roof Size
                </label>
                <span className="font-display font-bold text-xl text-solar-400">
                  {roofSize} m²
                </span>
              </div>

              <div className="relative">
                <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-solar-400 rounded-full transition-all duration-100"
                    style={{ width: `${roofPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={20}
                  max={400}
                  step={5}
                  value={roofSize}
                  onChange={(e) => setRoofSize(Number(e.target.value))}
                  aria-label="Roof size in square meters"
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2"
                  style={{ zIndex: 2 }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-solar-500 rounded-full border-[3px] border-green-950 shadow-glow pointer-events-none transition-all duration-100"
                  style={{ left: `calc(${roofPercent}% - 10px)`, zIndex: 1 }}
                />
              </div>

              <div className="flex justify-between items-center text-xs mt-2.5">
                <span className="text-green-100/25">20 m²</span>
                <span className="inline-flex items-center rounded-full bg-solar-500/15 text-solar-400 font-semibold px-2.5 py-0.5">
                  {roofLabel(roofSize)}
                </span>
                <span className="text-green-100/25">400 m²</span>
              </div>
            </div>

            {/* Year filter */}
            <div>
              <label className="text-green-100/70 text-sm font-medium mb-3 flex items-center gap-1.5">
                <CalendarRange className="w-3.5 h-3.5 text-solar-400" /> Savings Horizon
              </label>
              <div className="grid grid-cols-5 gap-2">
                {YEAR_OPTIONS.map((y) => (
                  <motion.button
                    key={y}
                    onClick={() => setYear(y)}
                    whileTap={{ scale: 0.96 }}
                    aria-pressed={year === y}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      year === y
                        ? 'bg-solar-500 text-green-950 shadow-glow'
                        : 'bg-white/5 text-green-100/55 hover:bg-white/10 hover:text-green-100/80'
                    }`}
                  >
                    {y}y
                  </motion.button>
                ))}
              </div>
              <p className="text-green-100/25 text-xs mt-2 text-center">
                Estimates update instantly as you adjust the sliders and horizon.
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
                { icon: Sun, label: 'Recommended System', value: systemSize, suffix: ' kW', sub: 'Hybrid solar + battery', divisor: 1 },
                { icon: TrendingDown, label: 'Monthly Savings', value: monthlySavings, prefix: '₱', sub: `Est. ${reductionPct}% reduction`, divisor: 1 },
                { icon: DollarSign, label: 'Estimated Cost', value: systemCost, prefix: '₱', sub: 'Installed & commissioned', divisor: 1 },
                { icon: Calculator, label: 'Payback Period', value: paybackYears * 10, suffix: ' yrs', sub: 'Estimated full ROI', divisor: 10 },
              ].map(({ icon: Icon, label, value, prefix = '', suffix = '', sub, divisor }) => (
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
                    <AnimatedNumber value={Math.round((value / divisor) * 10) / 10} />
                    {suffix}
                  </p>
                  <p className="text-green-100/35 text-xs mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* Year-driven projection highlight */}
            <div className="bg-solar-500/12 border border-solar-500/25 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-solar-400 text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Net Savings by Year {year}
                  </p>
                  <p className="font-display font-bold text-3xl sm:text-4xl text-solar-500 leading-none">
                    ₱<AnimatedNumber value={netByYear} />
                  </p>
                  <p className="text-green-100/45 text-xs mt-1.5">
                    After recovering the full system cost
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-green-100/35 mb-0.5">Return on investment</p>
                  <p className="font-display font-bold text-2xl text-white">
                    {roiByYear > 0 ? '+' : ''}{roiByYear}%
                  </p>
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

        <p className="text-center text-green-100/40 text-xs mt-7 max-w-2xl mx-auto leading-relaxed">
          Based on a hybrid solar + battery package similar to our 6 kW / 16 kWh system.
        </p>
        <p className="text-center text-green-100/25 text-xs mt-2 max-w-2xl mx-auto leading-relaxed">
          * Estimates are for planning purposes only. Actual savings may vary depending on roof orientation,
          sunlight exposure, electricity rates, system design, and site assessment.
        </p>
      </div>
    </section>
  );
}
