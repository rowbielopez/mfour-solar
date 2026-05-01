'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Send, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

function validateClient(form: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  if (!form.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[\d\s+\-()]{7,20}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number.';
  if (!form.email.trim()) errors.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (form.message.length > 2000) errors.message = 'Message must be under 2000 characters.';
  return errors;
}

export default function ContactPageContent() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    type: 'Residential',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const errors = validateClient(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else if (res.status === 422) {
        const data = await res.json();
        setFieldErrors(data.errors ?? {});
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(
          data.error ?? 'Something went wrong. Please try calling or messaging us on Facebook.'
        );
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="inline-block text-solar-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Get In Touch
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight mb-5">
              Let's Start Your Solar Journey
            </h1>
            <p className="text-green-100/70 text-lg">
              Fill out the form or reach out directly to{' '}
              <span className="text-white font-medium">Engr. Mark Daryll Acosta</span>.
              We respond within 24 hours on business days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  lines: ['0915-971-7213 · 0917-383-7446', '(078) 304-5569 · Mon–Sat, 8AM–6PM'],
                  href: 'tel:+639159717213',
                  action: 'Call now',
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  lines: ['jua_electrical_services@yahoo.com', 'We reply within 24 hours'],
                  href: 'mailto:jua_electrical_services@yahoo.com',
                  action: 'Send email',
                },
                {
                  icon: MessageCircle,
                  title: 'Facebook',
                  lines: ['Message us on Facebook', 'Usually replies instantly'],
                  href: 'https://www.facebook.com/profile.php?id=61588860696904',
                  action: 'Open Facebook',
                },
                {
                  icon: MapPin,
                  title: 'Office',
                  lines: ['#10 Cagelco Village Phase 2', 'Div. Rd. Pallua Sur, Tuguegarao City, 3500'],
                  href: '#map',
                  action: 'Get directions',
                },
              ].map(({ icon: Icon, title, lines, href, action }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-950/15 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-solar-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-solar-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-950 text-sm mb-1">{title}</h3>
                      {lines.map((l) => (
                        <p key={l} className="text-gray-400 text-xs">{l}</p>
                      ))}
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-solar-600 hover:text-solar-500 mt-2 transition-colors"
                      >
                        {action} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-green-950 mb-2">
                      Message Received!
                    </h3>
                    <p className="text-gray-500 max-w-sm">
                      Thank you, {form.name}! Our team will reach out within 24 hours to schedule your
                      free site assessment.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-display font-bold text-xl text-green-950 mb-6">
                      Request a Free Quote
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Juan dela Cruz"
                            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${fieldErrors.name ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:ring-green-950/20 focus:border-green-950/30'}`}
                          />
                          {fieldErrors.name && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{fieldErrors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            placeholder="+63 912 345 6789"
                            className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${fieldErrors.phone ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:ring-green-950/20 focus:border-green-950/30'}`}
                          />
                          {fieldErrors.phone && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{fieldErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="juan@example.com"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${fieldErrors.email ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:ring-green-950/20 focus:border-green-950/30'}`}
                        />
                        {fieldErrors.email && (
                          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Property Type
                        </label>
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-950/20 focus:border-green-950/30 transition-all bg-white"
                        >
                          <option>Residential</option>
                          <option>Commercial</option>
                          <option>Industrial</option>
                          <option>Agricultural</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about your property, monthly electricity bill, and any specific requirements..."
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${fieldErrors.message ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-gray-200 focus:ring-green-950/20 focus:border-green-950/30'}`}
                        />
                        <div className="flex justify-between mt-1.5">
                          {fieldErrors.message ? (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{fieldErrors.message}
                            </p>
                          ) : <span />}
                          <p className="text-xs text-gray-400 ml-auto">{form.message.length}/2000</p>
                        </div>
                      </div>

                      {submitError && (
                        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-600">{submitError}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                            </svg>
                            Sending…
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-gray-400 text-xs text-center">
                        By submitting, you agree to our Privacy Policy. We'll never spam you.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Map placeholder */}
          <motion.div
            id="map"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 bg-white rounded-2xl border border-gray-100 overflow-hidden h-72 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-950/5 to-solar-500/5 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 bg-solar-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-950" />
              </div>
              <p className="font-semibold text-green-950">#10 Cagelco Village Phase 2, Pallua Sur</p>
              <p className="text-gray-400 text-sm">Tuguegarao City, Cagayan 3500</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-green text-sm px-5 py-2"
              >
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
