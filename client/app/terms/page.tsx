import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | ICU Learning Portal",
  description:
    "Read the terms governing account use, course access, payments, content and certificates on ICU Learning Portal.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <LegalPage
        eyebrow="Terms"
        title="Terms & Conditions"
        intro="These terms describe how learners may use ICU Learning Portal, purchase eligible courses and access protected educational content."
        sections={[
          {
            title: "Account registration",
            bullets: [
              "You must provide accurate information when creating an account and keep your login credentials secure.",
              "One person should use one learner account unless the site owner has expressly authorised another arrangement.",
              "You are responsible for activity performed through your account when that activity results from your failure to protect your credentials.",
            ],
          },
          {
            title: "Course access",
            bullets: [
              "Free courses are available according to the access rules shown on the relevant course page.",
              "Premium course access is granted only after the LMS successfully verifies the corresponding purchase or an authorised administrator grants access.",
              "Course access is intended for the purchasing learner and must not be shared, resold or transferred without permission.",
            ],
          },
          {
            title: "Educational use and clinical responsibility",
            paragraphs: [
              "ICU Learning Portal provides educational material for learning and revision. Course content does not replace hospital policies, local protocols, supervised clinical training, prescribing authority, professional judgement or emergency services. Learners must follow the requirements of their employer, institution and applicable professional regulations.",
            ],
          },
          {
            title: "Copyright and content protection",
            bullets: [
              "Course videos, notes, assessments, graphics, text and other original platform materials are protected content.",
              "Do not copy, redistribute, upload, sell, publish, record or commercially reuse protected course material without permission.",
              "Sharing account credentials to bypass paid access is prohibited.",
            ],
          },
          {
            title: "Payments",
            paragraphs: [
              "Premium purchases are processed through the payment flow shown on the website. The amount, course and payment status are verified before paid access is granted. A successful payment should result in the corresponding course enrollment becoming available in the learner account.",
            ],
          },
          {
            title: "Certificates",
            paragraphs: [
              "Certificates are issued only for courses and completion pathways that explicitly provide them. Learners must satisfy the applicable lesson, assessment and completion requirements shown by the LMS before a certificate becomes eligible.",
            ],
          },
          {
            title: "Suspension or termination",
            paragraphs: [
              "Access may be suspended or terminated for suspected fraud, payment abuse, credential sharing, unauthorised redistribution of protected content, security abuse or other material violations of these terms.",
            ],
          },
          {
            title: "Changes to the service",
            paragraphs: [
              "Course content, pricing, features and website functionality may change as the platform develops. Material policy changes will be reflected on the website where appropriate.",
            ],
          },
        ]}
      />

      <Footer />
    </>
  );
}