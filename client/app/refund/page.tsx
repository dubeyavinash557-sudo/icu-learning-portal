import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy | ICU Learning Portal",
  description:
    "Read the ICU Learning Portal refund request process, eligibility considerations and support procedure.",
};

export default function RefundPage() {
  return (
    <>
      <Navbar />

      <LegalPage
        eyebrow="Payments"
        title="Refund Policy"
        intro="This page explains how to request a refund for an ICU Learning Portal course purchase. The exact eligibility shown at checkout or on the applicable invoice remains important for each transaction."
        sections={[
          {
            title: "Refund request window",
            paragraphs: [
              "For the current launch policy, refund requests should be submitted within 7 calendar days of the original course purchase. The request must be sent through the Contact page with the registered email address, course name and relevant payment reference.",
            ],
          },
          {
            title: "How to request a refund",
            bullets: [
              "Open the Contact page and use the available support channel.",
              "Provide the registered email address used for the purchase.",
              "Provide the course name and Razorpay payment or transaction reference, if available.",
              "Briefly explain the reason for the request. Do not send passwords, OTPs or full card details.",
            ],
          },
          {
            title: "Eligibility considerations",
            bullets: [
              "The purchase must be identifiable in the platform payment records.",
              "The request must fall within the stated request window unless applicable law requires otherwise.",
              "Where a course has been substantially consumed, downloaded or otherwise used, the request may require additional review.",
              "Fraudulent, duplicated or technically failed transactions may be handled separately from ordinary refund requests.",
            ],
          },
          {
            title: "Refund processing",
            paragraphs: [
              "After the request is reviewed, support may ask for additional transaction information. Approved refunds are processed through the appropriate payment route. The time taken for the funds to appear can depend on the payment provider and the learner's bank or payment method.",
            ],
          },
          {
            title: "Important",
            paragraphs: [
              "This policy should be reviewed by the site owner before final publication and kept consistent with the refund terms displayed at checkout, applicable consumer law and the payment provider's requirements.",
            ],
          },
        ]}
      />

      <Footer />
    </>
  );
}