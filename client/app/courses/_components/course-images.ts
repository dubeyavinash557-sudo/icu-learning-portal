/* ================================================================
   ICU LEARNING PORTAL
   PROFESSIONAL COURSE IMAGE SYSTEM

   File:
   app/courses/_components/course-images.ts

   Architecture:
   - Prisma is the single source of truth for courses.
   - This file contains presentation-only visual metadata.
   - Exactly 12 canonical course slugs are mapped.
   - Legacy URLs are handled by next.config.ts redirects.
   - Unknown courses receive a professional fallback.
================================================================ */

export type CourseImageConfig = {
  image: string;
  label: string;
  shortLabel: string;
  gradient: string;
  accent: string;
};

/* ================================================================
   CANONICAL 12-COURSE IMAGE CATALOGUE
================================================================ */

const COURSE_IMAGES: Record<string, CourseImageConfig> = {
  /* 01. ICU NURSING MASTERY */
  "icu-nursing-mastery-program": {
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&q=90",
    label: "ICU NURSING",
    shortLabel: "ICU",
    gradient: "from-blue-950 via-blue-800 to-cyan-700",
    accent: "cyan",
  },

  /* 02. MECHANICAL VENTILATION */
  "mechanical-ventilation-respiratory-care-masterclass": {
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1600&q=90",
    label: "MECHANICAL VENTILATION",
    shortLabel: "VENTILATION",
    gradient: "from-indigo-950 via-blue-800 to-cyan-700",
    accent: "cyan",
  },

  /* 03. ECG & CARDIAC RHYTHM */
  "ecg-cardiac-rhythm-interpretation-masterclass": {
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1600&q=90",
    label: "ECG & CARDIAC RHYTHM",
    shortLabel: "ECG",
    gradient: "from-red-950 via-rose-800 to-orange-600",
    accent: "rose",
  },

  /* 04. ABG & ACID-BASE */
  "abg-analysis-acid-base-disorders-masterclass": {
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&q=90",
    label: "ABG & ACID-BASE",
    shortLabel: "ABG",
    gradient: "from-emerald-950 via-teal-800 to-cyan-700",
    accent: "emerald",
  },

  /* 05. ICU EMERGENCY */
  "icu-emergency-critical-care-management": {
    image:
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?w=1600&q=90",
    label: "ICU EMERGENCY",
    shortLabel: "EMERGENCY",
    gradient: "from-red-950 via-red-800 to-orange-600",
    accent: "red",
  },

  /* 06. ICU EMERGENCY DRUGS */
  "icu-emergency-drugs-critical-care-pharmacology": {
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=90",
    label: "ICU EMERGENCY DRUGS",
    shortLabel: "DRUGS",
    gradient: "from-orange-950 via-orange-700 to-amber-500",
    accent: "amber",
  },

  /* 07. CRITICAL CARE PROCEDURES */
  "critical-care-procedures-bedside-skills": {
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=90",
    label: "CRITICAL CARE PROCEDURES",
    shortLabel: "PROCEDURES",
    gradient: "from-violet-950 via-indigo-800 to-blue-600",
    accent: "violet",
  },

  /* 08. NEURO ICU */
  "neuro-icu-neurocritical-care-program": {
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=90",
    label: "NEURO ICU",
    shortLabel: "NEURO ICU",
    gradient: "from-purple-950 via-violet-800 to-fuchsia-600",
    accent: "purple",
  },

  /* 09. CARDIAC ICU */
  "cardiac-icu-hemodynamic-monitoring-masterclass": {
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=1600&q=90",
    label: "CARDIAC ICU",
    shortLabel: "CARDIAC ICU",
    gradient: "from-rose-950 via-red-800 to-orange-600",
    accent: "rose",
  },

  /* 10. ADVANCED CRITICAL CARE NURSING */
  "advanced-critical-care-nursing-program": {
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=90",
    label: "ADVANCED CRITICAL CARE",
    shortLabel: "ADVANCED",
    gradient: "from-indigo-950 via-blue-800 to-cyan-600",
    accent: "blue",
  },

  /* 11. SEPSIS & SHOCK */
  "sepsis-shock-multiorgan-failure-masterclass": {
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=1600&q=90",
    label: "SEPSIS & SHOCK",
    shortLabel: "SEPSIS",
    gradient: "from-red-950 via-orange-800 to-amber-600",
    accent: "orange",
  },

  /* 12. ICU INTERVIEW & VIVA */
  "icu-nursing-interview-clinical-viva-masterclass": {
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=90",
    label: "ICU INTERVIEW & VIVA",
    shortLabel: "INTERVIEW",
    gradient: "from-cyan-950 via-blue-800 to-indigo-700",
    accent: "cyan",
  },
};

/* ================================================================
   FALLBACK
================================================================ */

const DEFAULT_COURSE_IMAGE: CourseImageConfig = {
  image:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=90",
  label: "PROFESSIONAL ICU LEARNING",
  shortLabel: "ICU LMS",
  gradient: "from-slate-950 via-blue-900 to-cyan-700",
  accent: "cyan",
};

/* ================================================================
   GET COURSE IMAGE CONFIG
================================================================ */

export function getCourseImageConfig(
  slug?: string | null
): CourseImageConfig {
  if (!slug) {
    return DEFAULT_COURSE_IMAGE;
  }

  return COURSE_IMAGES[slug] ?? DEFAULT_COURSE_IMAGE;
}

/* ================================================================
   GET COURSE IMAGE ONLY
================================================================ */

export function getCourseImage(slug?: string | null): string {
  return getCourseImageConfig(slug).image;
}

/* ================================================================
   GET COURSE LABEL
================================================================ */

export function getCourseImageLabel(slug?: string | null): string {
  return getCourseImageConfig(slug).label;
}

/* ================================================================
   CHECK WHETHER COURSE HAS CUSTOM IMAGE
================================================================ */

export function hasCourseImage(slug?: string | null): boolean {
  if (!slug) {
    return false;
  }

  return Boolean(COURSE_IMAGES[slug]);
}

/* ================================================================
   EXPORT MAP
================================================================ */

export { COURSE_IMAGES };