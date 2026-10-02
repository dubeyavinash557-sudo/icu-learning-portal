import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | ICU Learning Portal",
  description:
    "Read the ICU Learning Portal refund, cancellation, payment-failure and course-access policy for digital course purchases.",
};

export default function RefundPage() {
  return (
    <>
      <Navbar />

      <LegalPage
        eyebrow="Payments & Consumer Support"
        title="Refund & Cancellation Policy"
        intro="This policy explains how ICU Learning Portal handles cancellation, refund requests, duplicate or failed payments, and course-access issues for digital course purchases. The terms shown on the applicable checkout page and invoice form part of the purchase information, subject to applicable law."
        sections={[
          {
            title: "Cancellation before payment",
            paragraphs: [
              "You may leave or close the Razorpay checkout before completing a payment without creating a course purchase. No cancellation request is required for an order that was never successfully paid.",
            ],
          },

          {
            title: "Refund request window",
            paragraphs: [
              "Under the current launch policy, a learner may request a refund within 7 calendar days of the original course purchase. The request should be submitted through the Contact page using the registered email address, course name and available Razorpay payment or transaction reference.",
              "The 7-day window is the website's stated commercial refund policy and does not limit any refund, cancellation or other consumer right that cannot lawfully be excluded or restricted under applicable law.",
            ],
          },

          {
            title: "When a refund may be considered",
            bullets: [
              "The purchase is identifiable in the ICU Learning Portal payment records and the request is within the stated refund window, subject to the eligibility rules below.",
              "A paid course was not made available because of a platform-side access or delivery failure and the issue cannot reasonably be resolved.",
              "The learner was charged more than once for the same course purchase because of a duplicate transaction.",
              "The course or service is materially different from the description or access conditions presented at the time of purchase, or another refund is required by applicable law.",
              "A payment was deducted but the transaction did not complete correctly; the payment status will be verified before any refund or other resolution is confirmed.",
            ],
          },

          {
            title: "Digital course usage and refund review",
            bullets: [
              "Because the courses are digital services, a refund request may require review of whether course access has already been substantially used, downloaded or otherwise consumed.",
              "Refund eligibility is not determined only by whether a learner has started a course; each request is reviewed against this policy, the transaction record, the access actually provided and applicable law.",
              "Fraudulent transactions, deliberate payment abuse or attempts to obtain paid content without valid payment are handled separately and may be excluded from the ordinary refund process, subject to applicable law.",
            ],
          },

          {
            title: "How to request a refund",
            bullets: [
              "Open the Contact page and submit the refund request through the available support channel.",
              "Use the same email address registered with your ICU Learning Portal account.",
              "Provide the course name, purchase date, amount paid and Razorpay payment or transaction reference, if available.",
              "Briefly describe the reason for the request and include any relevant screenshot or error message if the issue is technical.",
              "Never send your password, OTP, CVV, full card number or other payment credentials to ICU Learning Portal support.",
            ],
          },

          {
            title: "Refund processing",
            paragraphs: [
              "After receiving a request, ICU Learning Portal will verify the account, course, payment status and applicable eligibility. If a refund is approved, it will be initiated through the appropriate payment route and returned to the original payment method where supported by the payment provider. The time for the funds to appear in the learner's account can depend on Razorpay, the issuing bank and the payment method.",
              "Razorpay's merchant terms state that merchant-initiated refunds are routed to the same payment method used for the transaction. Refund and cancellation queries should first be raised with the merchant.",
            ],
          },

          {
            title: "Payment failure, pending payment or money deducted without access",
            bullets: [
              "If a payment fails and no successful payment is recorded, do not repeatedly retry immediately if you are unsure whether your bank has already been debited.",
              "If money was deducted but the course is not unlocked, contact support with the registered email address, course name, transaction date, amount and Razorpay payment reference. We will verify the transaction before asking you to make another payment.",
              "A pending or failed transaction is not treated as successful course purchase proof until the payment is verified by the platform.",
            ],
          },

          {
            title: "Support and grievance contact",
            paragraphs: [
              "For refund, cancellation, payment or course-access questions, contact support@iculearningportal.com or use the Contact page. Please include enough transaction information for us to locate the payment, but never include passwords, OTPs or full card details.",
              "Before production launch, the site owner should ensure that the legal business name, principal business address and any legally required grievance or designated contact details are published consistently across the website and checkout experience.",
            ],
          },

          {
            title: "Policy updates",
            paragraphs: [
              "This policy may be updated when the service, payment flow or applicable requirements change. The version published on this page should remain consistent with the refund, cancellation and access information displayed to learners at the time of purchase.",
            ],
          },
        ]}
      />

      <Footer />
    </>
  );
}