import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | ICU Learning Portal",
  description:
    "Read how ICU Learning Portal collects, uses and protects learner account and payment-related information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <LegalPage
        eyebrow="Privacy"
        title="Privacy Policy"
        intro="This policy explains the main categories of information ICU Learning Portal may collect when you register, use courses, contact support or make a payment."
        sections={[
          {
            title: "Information we collect",
            bullets: [
              "Account information such as your name, email address, mobile number, qualification and professional information that you choose to provide.",
              "Learning information such as enrollments, lesson progress, quiz attempts and certificate records needed to operate the LMS.",
              "Support information that you send through contact or WhatsApp support, including the details needed to investigate an issue.",
              "Payment and transaction references needed to reconcile your purchase. Card, UPI and other payment credentials are handled by the payment provider rather than stored as raw payment credentials in the LMS.",
            ],
          },
          {
            title: "How we use information",
            bullets: [
              "Create and maintain your student account.",
              "Provide course access, lesson progress, assessments and eligible certificates.",
              "Process and verify course payments and prevent fraudulent or duplicated transactions.",
              "Respond to support requests and investigate technical problems.",
              "Improve course structure, website performance, security and learner experience.",
            ],
          },
          {
            title: "Payments and third-party services",
            paragraphs: [
              "Course payments are processed through Razorpay. Razorpay may process payment information according to its own privacy and security terms. ICU Learning Portal receives the transaction references required to confirm a purchase and grant the corresponding course access.",
            ],
          },
          {
            title: "Data security",
            paragraphs: [
              "We use reasonable technical and organisational safeguards for account, learning and transaction records. No internet service can guarantee absolute security, so users should never share passwords, OTPs, card details or other authentication credentials with support staff or anyone else.",
            ],
          },
          {
            title: "Data retention",
            paragraphs: [
              "We retain account, enrollment, learning and transaction records for as long as reasonably necessary to operate the service, maintain learner history, satisfy accounting or legal obligations, resolve disputes and protect the platform.",
            ],
          },
          {
            title: "Your choices",
            paragraphs: [
              "You may contact support to ask about your account information or request correction of inaccurate profile information. Some records may need to be retained where required for security, legal, accounting or transaction purposes.",
            ],
          },
          {
            title: "Contact",
            paragraphs: [
              "For privacy questions, contact ICU Learning Portal through the Contact page. Before production launch, configure the official domain support mailbox, for example support@iculearningportal.com, and use that address consistently across the website.",
            ],
          },
        ]}
      />

      <Footer />
    </>
  );
}