'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  Globe,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  ShieldCheck,
  UtensilsCrossed,
  Plus,
  Minus,
  ShoppingBag,
  Flame,
  Leaf,
  Info
} from 'lucide-react';

interface TemplateProps {
  business: {
    name: string;
    category: string;
    address: string;
    district: string;
    phone?: string;
    rating?: number;
    reviews_count?: number;
    photos?: string[];
    location?: { lat: number; lng: number };
  };
  copy: {
    tagline: string;
    hero_title: string;
    hero_subtitle: string;
    about_story: string;
    primary_color: string;
    accent_color: string;
    signature_offerings: Array<{ title: string; description: string; price_npr?: string }>;
    review_themes: Array<{
      sentiment: string;
      original_testimonial_summary: string;
      customer_archetype: string;
    }>;
    faqs: Array<{ question: string; answer: string }>;
    nepali_content: { hero_title: string; tagline: string; about_snippet: string };
  };
  previewMode?: boolean;
}

// Canonical Sandar Momo Defaults
const DEFAULT_PHONE = '+977-9867333080';
const DEFAULT_WHATSAPP_PHONE = '9779867333080';

export function normalizeWhatsAppPhone(rawPhone?: string): string {
  if (!rawPhone || !rawPhone.trim()) return DEFAULT_WHATSAPP_PHONE;
  const digits = rawPhone.replace(/[^0-9]/g, '');
  if (!digits) return DEFAULT_WHATSAPP_PHONE;
  if (digits.startsWith('977')) {
    return digits;
  }
  if (digits.length === 10 && (digits.startsWith('98') || digits.startsWith('97'))) {
    return `977${digits}`;
  }
  if (digits.length >= 7) {
    return `977${digits}`;
  }
  return DEFAULT_WHATSAPP_PHONE;
}

export function normalizeDisplayPhone(rawPhone?: string): string {
  if (!rawPhone || !rawPhone.trim()) return DEFAULT_PHONE;
  return rawPhone;
}

// Cleans raw titles to natural dish names for WhatsApp messages
// e.g., "Signature Buff Steamed Momo (शानदार बफ मःमः - NPR 160)" -> "Buff Steamed Momo"
export function cleanDishNameForOrder(rawTitle: string): string {
  let cleaned = rawTitle
    .replace(/\s*\([^)]*\)/g, '')   // Remove parenthetical notes/Devanagari
    .replace(/\s*-\s*NPR.*$/i, '') // Remove trailing price if outside parens
    .trim();

  // "Signature Buff Steamed Momo" -> "Buff Steamed Momo" to match the natural customer request:
  // 'Hello Sandar Momo, I want to order 2 plates of Buff Steamed Momo for takeaway'
  if (/^signature\s+buff/i.test(cleaned)) {
    cleaned = cleaned.replace(/^signature\s+/i, '');
  }
  return cleaned;
}

export function getItemUnit(dishName: string, quantity: number): string {
  const isJar = /jar|chutney|paste|achar/i.test(dishName);
  if (isJar) {
    return quantity === 1 ? 'jar' : 'jars';
  }
  return quantity === 1 ? 'plate' : 'plates';
}

export function formatWhatsAppOrderMessage(
  businessName: string,
  rawTitle: string,
  quantity: number,
  orderType: 'takeaway' | 'dine-in' = 'takeaway'
): string {
  const cleanBusiness = businessName.toLowerCase().includes('sandar')
    ? 'Sandar Momo'
    : businessName;
  const dishName = cleanDishNameForOrder(rawTitle);
  const unit = getItemUnit(dishName, quantity);

  return `Hello ${cleanBusiness}, I want to order ${quantity} ${unit} of ${dishName} for ${orderType}`;
}

export interface MenuItemData {
  id: string;
  title: string;
  nepaliTitle?: string;
  price_npr: string;
  priceNumeric: number;
  description: string;
  nepaliDescription?: string;
  category: 'Chef Specials' | 'Traditional Plates' | 'Extras & Chutney';
  badge?: string;
  spiceLevel: number;
  spiceLabel: string;
  dietary: 'Buff' | 'Chicken' | 'Veg' | 'Sides';
  unit: 'plate' | 'jar';
  image: string;
}

const SANDAR_AUTHENTIC_ITEMS: MenuItemData[] = [
  {
    id: 'buff-steamed',
    title: 'Signature Buff Steamed Momo (शानदार बफ मःमः - NPR 160)',
    nepaliTitle: 'शानदार बफ मःमः',
    price_npr: 'NPR 160',
    priceNumeric: 160,
    description: '10 juicy hand-pleated momos filled with seasoned fresh buffalo mince, mountain ginger, and scallions. Served piping hot with Sandar’s legendary fire-roasted timur and tomato chutney.',
    nepaliDescription: '१० वटा रसिला बफ मःमः, ताजा मसला र अदुवाको सुगन्धित मिश्रण सहित। प्रख्यात पिरो टिमुर गोलभेडाको अचारसँग पस्किएको।',
    category: 'Chef Specials',
    badge: 'Legendary Bestseller',
    spiceLevel: 3,
    spiceLabel: 'High Timur Kick',
    dietary: 'Buff',
    unit: 'plate',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'buff-c-momo',
    title: 'Spicy Buff C-Momo (सी मःमः - NPR 210)',
    nepaliTitle: 'सी मःमः',
    price_npr: 'NPR 210',
    priceNumeric: 210,
    description: 'Crispy wok-tossed buffalo momos glazed in fiery red chili sauce, crunchy bell peppers, charred shallots, hot green chilies, and garlic shoots. Kathmandu’s favorite evening rush comfort.',
    nepaliDescription: 'तातो कराहीमा भुटिएको क्रिस्पी बफ सी मःमः, हरियो क्याप्सिकम, प्याज र पिरो खुर्सानीको विशेष सस सहित।',
    category: 'Chef Specials',
    badge: 'Fiery Wok Sauté',
    spiceLevel: 4,
    spiceLabel: 'Extra Hot',
    dietary: 'Buff',
    unit: 'plate',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chicken-jhol',
    title: 'Chicken Steamed & Jhol Momo (चिकेन झोल मःमः - NPR 240)',
    nepaliTitle: 'चिकेन झोल मःमः',
    price_npr: 'NPR 240',
    priceNumeric: 240,
    description: 'Tender chicken dumplings steeped in our slow-simmered, rich nutty sesame and roasted soybean (bhatmas) jhol broth, infused with fresh cilantro and crushed timur pepper.',
    nepaliDescription: 'नरम चिकेन मःमः, भुटेको तिल र भटमासको स्वादिलो बाक्लो झोल, हरियो धनियाँ र टिमुरको बास्ना सहित।',
    category: 'Traditional Plates',
    badge: 'Soulful Jhol Broth',
    spiceLevel: 2,
    spiceLabel: 'Medium Spiced',
    dietary: 'Chicken',
    unit: 'plate',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'veg-paneer',
    title: 'Fresh Veg Steamed Paneer Momo (NPR 180)',
    nepaliTitle: 'ताजा भेज पनिर मःमः',
    price_npr: 'NPR 180',
    priceNumeric: 180,
    description: 'Delicate hand-folded momos stuffed with rich fresh dairy paneer, shredded hill cabbage, carrots, ginger, and subtle mountain herbs. Paired with sweet-and-sour sesame dip.',
    nepaliDescription: 'ताजा पनिर, बन्दा र गाजरको हल्का मसलादार मिश्रण। शुद्ध शाकाहारी पारखीहरूका लागि उत्कृष्ट रोजाइ।',
    category: 'Traditional Plates',
    badge: 'Pure Vegetarian',
    spiceLevel: 1,
    spiceLabel: 'Mild Aromatic',
    dietary: 'Veg',
    unit: 'plate',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'timur-chutney-jar',
    title: 'Extra Signature Timur Chutney Jar (NPR 40)',
    nepaliTitle: 'शानदार टिमुर अचार जार',
    price_npr: 'NPR 40',
    priceNumeric: 40,
    description: 'The taste that made Sankhamul famous: an extra takeaway jar of Sandar’s authentic house-ground chutney with wild Himalayan timur berries, fire-roasted plum tomatoes, and pure mustard oil.',
    nepaliDescription: 'शंखमुलको चर्चित पिरो टिमुर अचारको थप जार। पार्सल तथा घरमा समेत स्वाद लिनको लागि उपयुक्त।',
    category: 'Extras & Chutney',
    badge: 'Signature Condiment',
    spiceLevel: 4,
    spiceLabel: 'Pure Timur Fire',
    dietary: 'Sides',
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  },
];

// Apple / Linear Style Spotlight Card with mouse-following hairline illumination
function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#161617]/90 transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px -z-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function RestaurantTemplate({ business, copy, previewMode = false }: TemplateProps) {
  const [lang, setLang] = useState<'en' | 'np'>('en');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedTime, setSelectedTime] = useState<string>('Evening Rush (18:00)');
  const [diningMode, setDiningMode] = useState<'dine-in' | 'takeaway'>('takeaway');

  // Quantities per menu item for dynamic ordering (defaulting to 2 plates for momo, 1 for jar)
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({
    'buff-steamed': 2,
    'buff-c-momo': 1,
    'chicken-jhol': 1,
    'veg-paneer': 1,
    'timur-chutney-jar': 1,
  });

  // Order types per item ('takeaway' | 'dine-in')
  const [itemOrderTypes, setItemOrderTypes] = useState<Record<string, 'takeaway' | 'dine-in'>>({
    'buff-steamed': 'takeaway',
    'buff-c-momo': 'takeaway',
    'chicken-jhol': 'takeaway',
    'veg-paneer': 'takeaway',
    'timur-chutney-jar': 'takeaway',
  });

  // Identify if this is Sandar Momo
  const isSandar = business.name.toLowerCase().includes('sandar') || business.name.toLowerCase().includes('momo');
  const brandName = isSandar ? 'Sandar Momo' : business.name;

  // Normalized phone handling
  const targetPhone = normalizeWhatsAppPhone(business.phone);
  const displayPhone = normalizeDisplayPhone(business.phone);

  const heroImage =
    business.photos?.[0] ||
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=85';

  const baseWhatsAppUrl = `https://wa.me/${targetPhone}?text=`;

  const reservationUrl = `${baseWhatsAppUrl}${encodeURIComponent(
    `Hello ${brandName}! I would like to reserve a table for ${guestCount} guests at ${selectedTime} (${diningMode === 'takeaway' ? 'Advance Takeaway Pickup' : 'Dine-In'}).`
  )}`;

  const mapQuery = encodeURIComponent(`${business.name} ${business.address} Kathmandu Nepal`);
  const googleMapEmbedUrl = `https://maps.google.com/maps?width=100%25&height=500&hl=en&q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  // Menu items list
  const menuItems: MenuItemData[] = useMemo(() => {
    if (isSandar) {
      return SANDAR_AUTHENTIC_ITEMS;
    }

    // Fallback/dynamic mapping for other restaurants
    if (copy.signature_offerings && copy.signature_offerings.length > 0) {
      return copy.signature_offerings.map((item, idx) => {
        const id = `item-${idx}`;
        const numericMatch = (item.price_npr || '').match(/\d+/);
        const priceNum = numericMatch ? parseInt(numericMatch[0], 10) : 200;
        const isJar = /jar|chutney|achar/i.test(item.title);
        return {
          id,
          title: item.title,
          price_npr: item.price_npr || `NPR ${priceNum}`,
          priceNumeric: priceNum,
          description: item.description,
          category: idx === 0 || idx === 1 ? 'Chef Specials' : isJar ? 'Extras & Chutney' : 'Traditional Plates',
          badge: idx === 0 ? 'Chef Signature' : 'Popular Choice',
          spiceLevel: 2,
          spiceLabel: 'Traditional Spicing',
          dietary: /veg|paneer/i.test(item.title) ? 'Veg' : /chicken/i.test(item.title) ? 'Chicken' : 'Buff',
          unit: isJar ? 'jar' : 'plate',
          image: idx === 0
            ? 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
        };
      });
    }

    return SANDAR_AUTHENTIC_ITEMS;
  }, [isSandar, copy.signature_offerings]);

  // Tab definitions
  const tabs = ['All', 'Chef Specials', 'Traditional Plates', 'Extras & Chutney'] as const;

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return menuItems;
    return menuItems.filter(item => item.category === activeTab);
  }, [activeTab, menuItems]);

  const updateQuantity = (id: string, delta: number) => {
    setItemQuantities(prev => {
      const current = prev[id] ?? 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const toggleOrderType = (id: string, type: 'takeaway' | 'dine-in') => {
    setItemOrderTypes(prev => ({ ...prev, [id]: type }));
  };

  // Aggregated Takeaway Tray calculation
  const selectedTraySummary = useMemo(() => {
    const selected = menuItems.filter(item => (itemQuantities[item.id] ?? 0) > 0);
    const totalCount = selected.reduce((sum, item) => sum + (itemQuantities[item.id] ?? 0), 0);
    const totalNpr = selected.reduce((sum, item) => sum + item.priceNumeric * (itemQuantities[item.id] ?? 0), 0);

    const textItems = selected.map(item => {
      const qty = itemQuantities[item.id] ?? 1;
      const cleanName = cleanDishNameForOrder(item.title);
      const unit = getItemUnit(cleanName, qty);
      return `${qty} ${unit} of ${cleanName}`;
    });

    const formattedCombined = `Hello ${brandName}, I want to order ${textItems.join(', ')} for takeaway. (Total: NPR ${totalNpr})`;
    return {
      count: totalCount,
      totalNpr,
      whatsappUrl: `${baseWhatsAppUrl}${encodeURIComponent(formattedCombined)}`,
      formattedCombined,
    };
  }, [menuItems, itemQuantities, brandName, baseWhatsAppUrl]);

  return (
    <div className="relative min-h-screen bg-black font-sans text-[#F5F5F7] selection:bg-[#0071E3] selection:text-white">
      {/* Apple-style Frosted Nav */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 border-b border-white/[0.08] bg-black/70 px-6 py-3.5 backdrop-blur-2xl transition-all lg:px-12"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg tracking-tight text-white flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-amber-500" />
              <span>{business.name}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-[#86868B]">
              {business.district || 'Sankhamul'} · Kathmandu
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:gap-4">
            <button
              onClick={() => setLang((l) => (l === 'en' ? 'np' : 'en'))}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-stone-200 transition-colors hover:bg-white/10"
            >
              {lang === 'en' ? 'नेपाली' : 'English'}
            </button>

            {/* Direct Telephone link defaulting to +977-9867333080 */}
            <a
              href={`tel:${displayPhone}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#86868B] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{displayPhone}</span>
            </a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={reservationUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm bg-white text-black hover:bg-[#F5F5F7] transition-all shadow-md flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'en' ? 'Book Table' : 'टेबुल बुक'}</span>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section — Apple Keynote Scale */}
      <section className="relative pt-16 sm:pt-24 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-6 max-w-4xl">
          
          {/* Dynamic Island Style Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#161617] px-3.5 py-1.5 text-xs text-[#86868B] shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-stone-300 font-medium">Sankhamul Marg · Kathmandu</span>
            <span className="text-stone-600">|</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 inline" /> 4.7 ★ Google Verified
            </span>
            <span className="hidden sm:inline text-stone-500">(420+ Patrons)</span>
          </motion.div>

          {/* Big Confident Apple Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-7xl lg:text-8xl"
          >
            {lang === 'en' ? (
              <>
                Pure flavor. <br />
                <span className="apple-text-gradient">Handcrafted for Kathmandu.</span>
              </>
            ) : (
              <>
                शानदार स्वाद। <br />
                <span className="apple-text-gradient">शंखमुलको मौलिक र ऐतिहासिक परिकार।</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="max-w-2xl text-lg font-normal leading-relaxed tracking-tight text-[#86868B] sm:text-xl"
          >
            {lang === 'en'
              ? (copy.hero_subtitle || 'Hand-pleated buffalo and chicken momos paired with Kathmandu’s most addictive fire-roasted timur chutney. Steaming non-stop in Sankhamul.')
              : (copy.nepali_content?.about_snippet || 'शंखमुल पुल नजिकै दशकौंदेखि लाखौं ग्राहकको मन जित्न सफल शानदार मःमःमा यहाँहरुलाई हार्दिक स्वागत छ।')}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={reservationUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#0071E3]/25 transition-colors hover:bg-[#0077ED]"
            >
              <span>{lang === 'en' ? 'Reserve Table on WhatsApp' : 'ह्वाट्सएपमा टेबुल बुक गर्नुहोस्'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#menu"
              className="px-6 py-3.5 rounded-full font-medium text-sm bg-[#161617] hover:bg-[#202022] border border-white/10 text-white transition-colors flex items-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Explore Authentic Menu' : 'हाम्रो मेनु हेर्नुहोस्'}</span>
            </motion.a>

            <a
              href="#location"
              className="flex items-center gap-1.5 px-4 py-3.5 text-xs text-[#86868B] transition-colors hover:text-white"
            >
              <Navigation className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Sankhamul Bridge Location</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Cinematic Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="relative mt-14 overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#161617] p-2 shadow-2xl sm:p-3"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] sm:aspect-[21/9]">
            <img
              src={heroImage}
              alt={business.name}
              className="h-full w-full object-cover contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    Culinary Landmark
                  </span>
                  <span className="text-xs text-stone-400">Est. Sankhamul</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mt-1.5">
                  {business.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>{business.address || 'Sankhamul Marg (Near Sankhamul Bridge), Kathmandu'}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 bg-black/70 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full text-xs text-white">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{business.rating || 4.7}</span>
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-300">{business.reviews_count || 420}+ Reviews</span>
                <span className="text-stone-500">•</span>
                <span className="text-emerald-400 font-medium">Hot Parcel Takeaway Ready</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Menu Showcase with Apple-style Fluid Tabs and Dynamic WhatsApp Ordering */}
      <section id="menu" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 text-xs font-semibold text-[#0071E3] uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Authentic Sankhamul Menu</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              {lang === 'en' ? 'Signature Offerings.' : 'हाम्रा विशिष्ट परिकारहरू'}
            </h2>
            <p className="text-[#86868B] text-sm sm:text-base">
              {lang === 'en'
                ? 'Hand-crafted daily with generational spices, thin hand-rolled dough, and our signature fire-roasted timur achar.'
                : 'दैनिक ताजा मसला, पातलो मःमःको खोल र ऐतिहासिक पिरो टिमुर अचार सहित तयार पारिएको।'}
            </p>
          </div>

          {/* Fluid Sliding Tab Bar */}
          <div className="scrollbar-none flex items-center self-start overflow-x-auto rounded-full border border-white/[0.08] bg-[#161617] p-1.5 md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'text-black font-semibold' : 'text-[#86868B] hover:text-white'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid with Spotlight Cards & Dynamic Ordering */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const quantity = itemQuantities[item.id] ?? (item.unit === 'jar' ? 1 : 2);
            const orderType = itemOrderTypes[item.id] ?? 'takeaway';
            const dynamicMessage = formatWhatsAppOrderMessage(brandName, item.title, quantity, orderType);
            const itemWhatsAppUrl = `${baseWhatsAppUrl}${encodeURIComponent(dynamicMessage)}`;
            const cleanDish = cleanDishNameForOrder(item.title);
            const unitLabel = getItemUnit(cleanDish, quantity);

            return (
              <SpotlightCard key={item.id} className="p-6 sm:p-7 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  
                  {/* Photo & Badges */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center gap-1">
                        {item.dietary === 'Veg' && <Leaf className="w-3 h-3 text-emerald-400" />}
                        {item.dietary === 'Buff' && <Flame className="w-3 h-3 text-amber-400" />}
                        {item.dietary === 'Chicken' && <Flame className="w-3 h-3 text-orange-400" />}
                        <span>{item.badge || item.dietary}</span>
                      </span>

                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white shrink-0 shadow-lg">
                        {item.price_npr}
                      </span>
                    </div>

                    {/* Spice Level Indicator */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] text-amber-400 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                      <span>{'🌶️'.repeat(item.spiceLevel)}</span>
                      <span className="text-stone-300 font-medium text-[10px]">{item.spiceLabel}</span>
                    </div>
                  </div>

                  {/* Title & Nepali subtitle */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-[#0071E3] transition-colors">
                      {cleanDish}
                    </h3>
                    {item.nepaliTitle && (
                      <p className="text-xs text-amber-500/90 font-medium mt-0.5">
                        {item.nepaliTitle}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed mt-2 line-clamp-3">
                      {lang === 'en' ? item.description : (item.nepaliDescription || item.description)}
                    </p>
                  </div>
                </div>

                {/* Dynamic Item Ordering Controls */}
                <div className="pt-5 mt-5 border-t border-white/[0.08] space-y-3.5">
                  
                  {/* Quantity and Order Type Selector */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Stepper */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full hover:bg-white/15 text-stone-300 flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-mono font-semibold text-white min-w-[70px] text-center text-[11px]">
                        {quantity} {unitLabel}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full hover:bg-white/15 text-stone-300 flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Takeaway vs Dine-in Toggle */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 text-[11px]">
                      <button
                        onClick={() => toggleOrderType(item.id, 'takeaway')}
                        className={`px-2.5 py-1 rounded-full transition-all ${
                          orderType === 'takeaway'
                            ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        Takeaway
                      </button>
                      <button
                        onClick={() => toggleOrderType(item.id, 'dine-in')}
                        className={`px-2.5 py-1 rounded-full transition-all ${
                          orderType === 'dine-in'
                            ? 'bg-[#0071E3]/20 text-[#0071E3] font-semibold border border-[#0071E3]/30'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        Dine-in
                      </button>
                    </div>
                  </div>

                  {/* Primary WhatsApp Order Button formatted dynamically */}
                  <motion.a
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href={itemWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-full font-medium text-xs bg-[#0071E3] hover:bg-[#0077ED] text-white flex items-center justify-between shadow-md transition-all group/btn"
                  >
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Order on WhatsApp</span>
                    </span>
                    <span className="font-mono text-[11px] text-white/90 flex items-center gap-1">
                      <span>NPR {item.priceNumeric * quantity}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </span>
                  </motion.a>

                  {/* Dynamic Message Preview Pill */}
                  <div className="text-[10px] text-stone-500 font-mono truncate px-1" title={dynamicMessage}>
                    💬 &quot;{dynamicMessage}&quot;
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Floating / Sticky Takeaway Order Bar */}
        {selectedTraySummary.count > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky bottom-6 z-30 max-w-3xl mx-auto bg-[#161617]/95 backdrop-blur-xl border border-white/20 p-4 rounded-full shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3 pl-2">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <div>
                <p className="font-semibold text-white text-sm">
                  Takeaway Order: {selectedTraySummary.count} Items
                </p>
                <p className="text-[11px] text-stone-400 font-mono">
                  Estimated Total: <span className="text-white font-bold">NPR {selectedTraySummary.totalNpr}</span>
                </p>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={selectedTraySummary.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full font-medium text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/30"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send Complete Order on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        )}
      </section>

      {/* Sankhamul Heritage & Craftsmanship Story */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              The Sandar Tradition · Sankhamul
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
              {lang === 'en'
                ? 'Generations of Hand-Pleated Craftsmanship.'
                : 'दशकौंदेखि जोगाइएको मौलिक मःमःको परम्परा'}
            </h2>
            <p className="text-[#86868B] text-sm sm:text-base leading-relaxed">
              {lang === 'en'
                ? (copy.about_story || 'Sandar Momo stands as an undisputed culinary landmark of Sankhamul. Built on generations of dedication to honest flavor, our kitchen serves hundreds of bustling plates every single day to students, neighborhood families, and momo pilgrims from across Kathmandu and Lalitpur. We source only fresh, quality cuts, finely minced and seasoned with authentic mountain spices, wrapped thin, and steamed to juicy perfection.')
                : (copy.nepali_content?.about_snippet || 'शंखमुल पुल नजिकै दशकौंदेखि लाखौं ग्राहकको मन जित्न सफल शानदार मःमःमा यहाँहरुलाई हार्दिक स्वागत छ। हाम्रो मौलिक स्वादको अनुभव लिनुहोस्।')}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#161617] border border-white/[0.08]">
                <p className="text-2xl font-mono font-bold text-white">100%</p>
                <p className="text-xs text-[#86868B] mt-1">Fresh Ground Daily</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#161617] border border-white/[0.08]">
                <p className="text-2xl font-mono font-bold text-amber-400">420+</p>
                <p className="text-xs text-[#86868B] mt-1">Local Verified Reviews</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#161617] border border-white/[0.08]">
                <p className="text-2xl font-mono font-bold text-emerald-400">30 Sec</p>
                <p className="text-xs text-[#86868B] mt-1">Sankhamul Bridge Walk</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
                  alt="Momo Steaming"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 rounded-2xl bg-[#161617] border border-white/[0.08] space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <p className="text-xs text-stone-300 font-medium">
                  &quot;The fiery timur achar is simply unmatched in the entire Kathmandu valley.&quot;
                </p>
                <p className="text-[10px] text-stone-500 font-mono">— Sankhamul Regular</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-5 rounded-2xl bg-[#161617] border border-white/[0.08] space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#0071E3]" />
                <p className="text-xs font-semibold text-white">Hygienic Preparation</p>
                <p className="text-[11px] text-stone-400">
                  Clean stainless steel multi-tier steamers, fresh local cuts, and purified water.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh Momo Preparation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Heritage Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-[#86868B]">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Generational Craftsmanship</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {lang === 'en' ? (
                <>
                  Rooted in Kathmandu. <br />
                  <span className="apple-text-gradient">Crafted with Heritage.</span>
                </>
              ) : (
                <>
                  काठमाडौँको मौलिक स्वाद। <br />
                  <span className="apple-text-gradient">परम्परागत शुद्धता।</span>
                </>
              )}
            </h2>
            <p className="text-base leading-relaxed text-[#86868B] sm:text-lg">
              {copy.about_story}
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
              <div>
                <div className="text-2xl font-bold text-white sm:text-3xl">100%</div>
                <div className="text-xs text-[#86868B]">Fresh Daily Prep</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white sm:text-3xl">4.8 ★</div>
                <div className="text-xs text-[#86868B]">Google Patron Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white sm:text-3xl">300+</div>
                <div className="text-xs text-[#86868B]">Daily Happy Patrons</div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#161617] p-3 shadow-2xl">
              <img
                src={business.photos?.[1] || business.photos?.[0] || heroImage}
                alt="Craftsmanship"
                className="aspect-[4/3] w-full rounded-[24px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <Star className="h-5 w-5 fill-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Authentic Himalayan Spices
                    </div>
                    <div className="text-xs text-stone-400">
                      Cold-pressed mustard oil & fresh roasted timur
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patron Praise & Review Themes */}
      <section className="mx-auto max-w-7xl space-y-12 px-6 py-20 lg:px-12">
        <div className="max-w-xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">
            Verified Patrons
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Loved Across the Valley.
          </h2>
          <p className="text-sm text-[#86868B]">
            Grounded in genuine customer experiences from Google Maps reviews.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {copy.review_themes.map((theme, idx) => (
            <SpotlightCard key={idx} className="flex flex-col justify-between space-y-6 p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                    {theme.sentiment}
                  </span>
                </div>
                <p className="text-base italic leading-relaxed text-stone-300">
                  &ldquo;{theme.original_testimonial_summary}&rdquo;
                </p>
              </div>

              <div className="border-t border-white/[0.06] pt-4">
                <span className="text-xs font-semibold text-white">{theme.customer_archetype}</span>
                <span className="block text-[11px] text-stone-500">Kathmandu Valley Regular</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Interactive Google Maps & Directions */}
      <section id="location" className="mx-auto max-w-7xl space-y-12 px-6 py-24 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider">Find Us</p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Directions & Map.
            </h2>
            <p className="text-[#86868B] text-sm">
              {business.address || 'Sankhamul Marg (Near Sankhamul Bridge), Kathmandu'} · Open daily 11:00 — 20:30
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-white/20 md:self-auto"
          >
            <Compass className="w-4 h-4 text-[#0071E3]" />
            <span>Open in Google Maps</span>
          </motion.a>
        </div>

        <div className="grid overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#161617] shadow-2xl lg:grid-cols-12">
          {/* Map Frame */}
          <div className="min-h-[460px] w-full lg:col-span-8">
            <iframe
              title={`Map - ${business.name}`}
              src={googleMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '460px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Details Sidebar */}
          <div className="flex flex-col justify-between space-y-8 border-t border-white/[0.08] p-8 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                  Location & Landmark
                </span>
                <p className="text-lg font-semibold text-white mt-1">
                  {business.address || 'Sankhamul Marg, Ward 10'}
                </p>
                <span className="text-xs text-[#86868B]">
                  2-Minute Walk from Sankhamul Bridge connecting KTM & Lalitpur
                </span>
              </div>

              <div>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-[#86868B]">
                  Service Hours
                </span>
                <p className="text-xs text-stone-200 mt-1 font-mono">Sunday — Friday: 11:00 — 20:30</p>
                <p className="text-xs text-stone-200 font-mono">Saturday: 10:30 — 21:00</p>
                <span className="text-[11px] text-emerald-400 mt-1 block">● Hot steamers running non-stop</span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868B] block">
                  Direct Telephone & Orders
                </span>
                <a
                  href={`tel:${displayPhone}`}
                  className="text-sm font-mono text-white hover:text-[#0071E3] transition-colors flex items-center gap-2 mt-1"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{displayPhone}</span>
                </a>
              </div>
            </div>

            <div className="space-y-3 border-t border-white/[0.08] pt-6">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-full text-xs font-semibold bg-[#0071E3] hover:bg-[#0077ED] text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#0071E3]/20"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Turn-by-Turn Directions</span>
              </motion.a>

              <a
                href={`${baseWhatsAppUrl}${encodeURIComponent(
                  `Hello ${brandName}! I have an inquiry about opening hours, table availability, and takeaway parcel pickup at Sankhamul.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-xs font-medium text-[#86868B] transition-colors hover:border-white/20 hover:text-white"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat with Staff on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Table Reservation Experience */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-12">
        <SpotlightCard className="space-y-8 p-8 sm:p-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
              <Check className="w-3 h-3" />
              <span>Instant Confirmation on WhatsApp</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Reserve a Table or Pre-Order Takeaway.
            </h2>
            <p className="text-[#86868B] text-sm">
              Skip the evening rush. Zero booking charges. Direct WhatsApp coordination with Sankhamul staff.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs text-[#86868B] font-medium block">Party Size</label>
              <div className="flex items-center gap-2">
                {[1, 2, 4, 6, 8].map(count => (
                  <button
                    key={count}
                    onClick={() => setGuestCount(count)}
                    className={`flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all ${
                      guestCount === count
                        ? 'border-[#0071E3] bg-[#0071E3]/20 text-white font-semibold'
                        : 'border-white/10 text-[#86868B] hover:border-white/20'
                    }`}
                  >
                    {count} {count === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#86868B] font-medium block">Service Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDiningMode('takeaway')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    diningMode === 'takeaway'
                      ? 'border-amber-500 bg-amber-500/20 text-white font-semibold'
                      : 'border-white/10 text-[#86868B] hover:border-white/20'
                  }`}
                >
                  🥡 Advance Takeaway
                </button>
                <button
                  onClick={() => setDiningMode('dine-in')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    diningMode === 'dine-in'
                      ? 'border-[#0071E3] bg-[#0071E3]/20 text-white font-semibold'
                      : 'border-white/10 text-[#86868B] hover:border-white/20'
                  }`}
                >
                  🍽️ Table Dine-In
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs text-[#86868B] font-medium block">Preferred Time Window</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Lunch (12:30)',
                  'Afternoon (15:30)',
                  'Evening Rush (18:00)',
                  'Dinner (19:30)',
                ].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedTime === time
                        ? 'border-[#0071E3] bg-[#0071E3]/20 text-white font-semibold'
                        : 'border-white/10 text-[#86868B] hover:border-white/20'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={reservationUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 rounded-full font-medium text-sm bg-white text-black hover:bg-[#F5F5F7] flex items-center justify-center gap-2 transition-colors shadow-xl"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Confirm Booking on WhatsApp ({displayPhone})</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </SpotlightCard>
      </section>

      {/* Frequently Asked Questions */}
      {copy.faqs && copy.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-12">
          <div className="space-y-2 pb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">
              Need to Know
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions.
            </h2>
          </div>

          <div className="space-y-4">
            {copy.faqs.map((faq, idx) => (
              <SpotlightCard key={idx} className="p-6 sm:p-8">
                <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#86868B]">{faq.answer}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 px-6 lg:px-12 text-center text-xs text-[#86868B] space-y-2">
        <p className="text-white font-medium">{business.name}</p>
        <p>{business.address || 'Sankhamul Marg (Near Sankhamul Bridge), Kathmandu'}</p>
        <p className="text-stone-400 font-mono">Tel: {displayPhone}</p>
        <p className="text-stone-600 text-[11px] pt-4">
          © {new Date().getFullYear()} {business.name}. All rights reserved. Powered by Sunya.
        </p>
      </footer>
    </div>
  );
}
