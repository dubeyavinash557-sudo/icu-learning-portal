import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async redirects() {
    return [
      // ============================================================
      // LEGACY PUBLIC COURSE ROUTES
      // ============================================================

      {
        source: "/courses/abg",
        destination:
          "/courses/abg-analysis-acid-base-disorders-masterclass",
        permanent: true,
      },

      {
        source: "/courses/ecg",
        destination:
          "/courses/ecg-cardiac-rhythm-interpretation-masterclass",
        permanent: true,
      },

      {
        source: "/courses/ventilator",
        destination:
          "/courses/mechanical-ventilation-respiratory-care-masterclass",
        permanent: true,
      },

      {
        source: "/courses/mechanical-ventilation",
        destination:
          "/courses/mechanical-ventilation-respiratory-care-masterclass",
        permanent: true,
      },

      {
        source: "/courses/icu-nursing",
        destination:
          "/courses/icu-nursing-mastery-program",
        permanent: true,
      },

      {
        source: "/courses/icu-emergency-drugs",
        destination:
          "/courses/icu-emergency-drugs-critical-care-pharmacology",
        permanent: true,
      },

      {
        source: "/courses/emergency-care",
        destination:
          "/courses/icu-emergency-critical-care-management",
        permanent: true,
      },

      {
        source: "/courses/icu-nursing-interview-viva",
        destination:
          "/courses/icu-nursing-interview-clinical-viva-masterclass",
        permanent: true,
      },

      {
        source: "/courses/critical-care-nursing",
        destination:
          "/courses/advanced-critical-care-nursing-program",
        permanent: true,
      },

      // ============================================================
      // LEGACY PREMIUM COURSE ROUTES
      // ============================================================

      {
        source: "/courses/premium/abg-analysis",
        destination:
          "/courses/abg-analysis-acid-base-disorders-masterclass",
        permanent: true,
      },

      {
        source: "/courses/premium/ecg-cardiac-rhythm",
        destination:
          "/courses/ecg-cardiac-rhythm-interpretation-masterclass",
        permanent: true,
      },

      {
        source: "/courses/premium/mechanical-ventilation",
        destination:
          "/courses/mechanical-ventilation-respiratory-care-masterclass",
        permanent: true,
      },

      {
        source: "/courses/premium/icu-nursing-mastery",
        destination:
          "/courses/icu-nursing-mastery-program",
        permanent: true,
      },

      {
        source: "/courses/premium/icu-emergency-drugs",
        destination:
          "/courses/icu-emergency-drugs-critical-care-pharmacology",
        permanent: true,
      },

      {
        source: "/courses/premium/icu-emergency-management",
        destination:
          "/courses/icu-emergency-critical-care-management",
        permanent: true,
      },

      {
        source: "/courses/premium/critical-care-procedures",
        destination:
          "/courses/critical-care-procedures-bedside-skills",
        permanent: true,
      },

      {
        source: "/courses/premium/cardiac-icu",
        destination:
          "/courses/cardiac-icu-hemodynamic-monitoring-masterclass",
        permanent: true,
      },

      {
        source: "/courses/premium/neuro-icu",
        destination:
          "/courses/neuro-icu-neurocritical-care-program",
        permanent: true,
      },

      {
        source: "/courses/premium/critical-care-nursing",
        destination:
          "/courses/advanced-critical-care-nursing-program",
        permanent: true,
      },

      {
        source: "/courses/premium/sepsis-shock",
        destination:
          "/courses/sepsis-shock-multiorgan-failure-masterclass",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;