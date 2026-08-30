import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * ============================================================
 * ICU INTERVIEW QUIZ EXPANSION
 * ============================================================
 *
 * Purpose:
 * - Find the existing ICU Nursing Interview course
 * - Find its existing quiz
 * - Keep existing questions
 * - Add new professional questions
 * - Stop exactly at 50 total questions
 * - Safe to run more than once
 * - Does NOT delete courses
 * - Does NOT delete lessons
 * - Does NOT delete enrollments
 * - Does NOT delete payments
 * - Does NOT delete quiz attempts
 *
 * Existing Prisma QuizQuestion fields:
 *
 * question
 * optionA
 * optionB
 * optionC
 * optionD
 * correctAnswer
 * explanation
 * marks
 *
 * ============================================================
 */

const COURSE_SLUG =
  "icu-nursing-interview-clinical-viva-masterclass";

const TARGET_QUESTION_COUNT = 50;

type QuizQuestionData = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  marks: number;
};

/*
 * ============================================================
 * 45 ADDITIONAL ICU INTERVIEW QUESTIONS
 * ============================================================
 *
 * The script will only insert the number required to reach
 * 50 total questions.
 *
 * If the quiz already contains more questions, nothing is
 * deleted.
 */

const additionalQuestions: QuizQuestionData[] = [
  // ==========================================================
  // ICU FUNDAMENTALS
  // ==========================================================

  {
    question:
      "What is the primary purpose of continuous monitoring in an ICU patient?",
    optionA:
      "To detect important changes in the patient's condition promptly",
    optionB:
      "To eliminate the need for clinical assessment",
    optionC:
      "To reduce communication between healthcare professionals",
    optionD:
      "To replace all laboratory investigations",
    correctAnswer: "A",
    explanation:
      "Continuous monitoring helps the clinical team identify significant changes in a patient's condition promptly.",
    marks: 1,
  },

  {
    question:
      "During an ICU handover, which information is most important to communicate?",
    optionA:
      "Current clinical condition, treatments, risks, and pending care",
    optionB:
      "Only the patient's admission date",
    optionC:
      "Only the patient's room number",
    optionD:
      "Only the patient's dietary preference",
    correctAnswer: "A",
    explanation:
      "A safe ICU handover should communicate the patient's current condition, active treatments, risks, and important pending care.",
    marks: 1,
  },

  {
    question:
      "Which approach is most appropriate when prioritizing care for multiple critically ill patients?",
    optionA:
      "Prioritize immediate life-threatening problems",
    optionB:
      "Treat patients strictly according to admission time",
    optionC:
      "Choose tasks based only on convenience",
    optionD:
      "Delay assessment until documentation is complete",
    correctAnswer: "A",
    explanation:
      "Critical care priorities should focus first on immediate threats to life and patient safety.",
    marks: 1,
  },

  {
    question:
      "Why is accurate ICU documentation important?",
    optionA:
      "It supports continuity, communication, safety, and legal accountability",
    optionB:
      "It removes the need for verbal communication",
    optionC:
      "It replaces clinical assessment",
    optionD:
      "It is required only after discharge",
    correctAnswer: "A",
    explanation:
      "Accurate documentation supports continuity of care, communication, patient safety, and professional accountability.",
    marks: 1,
  },

  {
    question:
      "A professional ICU nurse should respond to a sudden deterioration by:",
    optionA:
      "Assessing the patient promptly and escalating according to the clinical situation",
    optionB:
      "Waiting until the next routine observation",
    optionC:
      "Documenting first and assessing later",
    optionD:
      "Ignoring the change if the patient was previously stable",
    correctAnswer: "A",
    explanation:
      "Sudden deterioration requires prompt assessment and appropriate escalation based on the patient's condition.",
    marks: 1,
  },

  // ==========================================================
  // AIRWAY
  // ==========================================================

  {
    question:
      "What is a major priority when assessing an acutely deteriorating ICU patient?",
    optionA:
      "Assessing airway, breathing, and circulation",
    optionB:
      "Checking the patient's entertainment preferences",
    optionC:
      "Completing discharge paperwork",
    optionD:
      "Reviewing the patient's meal schedule",
    correctAnswer: "A",
    explanation:
      "Airway, breathing, and circulation are fundamental priorities during assessment of acute deterioration.",
    marks: 1,
  },

  {
    question:
      "What is an important nursing responsibility for a patient with an endotracheal tube?",
    optionA:
      "Monitoring tube position, airway patency, and patient response",
    optionB:
      "Disconnecting the tube routinely",
    optionC:
      "Ignoring ventilator alarms",
    optionD:
      "Removing fixation without assessment",
    correctAnswer: "A",
    explanation:
      "Patients with endotracheal tubes require close monitoring of tube security, airway patency, ventilation, and clinical response.",
    marks: 1,
  },

  {
    question:
      "What should an ICU nurse do when a ventilated patient develops a sudden high-priority airway concern?",
    optionA:
      "Assess the patient and airway immediately and seek appropriate assistance",
    optionB:
      "Silence the alarm and leave the patient",
    optionC:
      "Wait for the next scheduled round",
    optionD:
      "Change all ventilator settings without assessment",
    correctAnswer: "A",
    explanation:
      "A sudden airway concern requires immediate patient assessment and appropriate escalation rather than simply silencing alarms.",
    marks: 1,
  },

  {
    question:
      "Why is airway suctioning performed when clinically indicated?",
    optionA:
      "To help remove airway secretions that may impair airway patency or ventilation",
    optionB:
      "To routinely replace oxygen therapy",
    optionC:
      "To eliminate the need for monitoring",
    optionD:
      "To prevent every possible respiratory complication",
    correctAnswer: "A",
    explanation:
      "Clinically indicated suctioning can help remove secretions that interfere with airway patency or ventilation.",
    marks: 1,
  },

  {
    question:
      "Which finding may indicate difficulty with airway clearance?",
    optionA:
      "Visible or audible respiratory secretions with impaired ventilation",
    optionB:
      "Normal respiratory effort with clear breath sounds",
    optionC:
      "Stable oxygenation without respiratory distress",
    optionD:
      "Normal airway assessment findings",
    correctAnswer: "A",
    explanation:
      "Respiratory secretions associated with impaired ventilation can indicate a need for further airway assessment and management.",
    marks: 1,
  },

  // ==========================================================
  // VENTILATOR
  // ==========================================================

  {
    question:
      "What is the main purpose of mechanical ventilation?",
    optionA:
      "To support ventilation and gas exchange when the patient cannot maintain adequate respiratory function",
    optionB:
      "To replace all cardiovascular support",
    optionC:
      "To eliminate the need for patient assessment",
    optionD:
      "To guarantee immediate recovery from every respiratory illness",
    correctAnswer: "A",
    explanation:
      "Mechanical ventilation provides respiratory support when a patient cannot maintain adequate ventilation or gas exchange independently.",
    marks: 1,
  },

  {
    question:
      "A ventilator alarm should be approached by the nurse by:",
    optionA:
      "Assessing the patient first and then evaluating the ventilator and airway",
    optionB:
      "Always silencing the alarm without assessment",
    optionC:
      "Ignoring the alarm if oxygen saturation is currently normal",
    optionD:
      "Changing multiple settings without identifying the problem",
    correctAnswer: "A",
    explanation:
      "The patient should be assessed first when a ventilator alarm occurs, followed by systematic evaluation of the airway and ventilator.",
    marks: 1,
  },

  {
    question:
      "What does PEEP primarily help maintain during mechanical ventilation?",
    optionA:
      "Positive pressure in the airways at the end of expiration",
    optionB:
      "Continuous arterial blood pressure",
    optionC:
      "Normal blood glucose concentration",
    optionD:
      "Cardiac electrical conduction",
    correctAnswer: "A",
    explanation:
      "PEEP means positive end-expiratory pressure and maintains airway pressure at the end of expiration.",
    marks: 1,
  },

  {
    question:
      "Which parameter is commonly associated with the amount of gas delivered during a volume-controlled breath?",
    optionA:
      "Tidal volume",
    optionB:
      "Heart rate",
    optionC:
      "Blood glucose",
    optionD:
      "Urine color",
    correctAnswer: "A",
    explanation:
      "Tidal volume represents the volume of gas delivered with each ventilator breath in volume-targeted ventilation.",
    marks: 1,
  },

  {
    question:
      "Why should ventilator settings be interpreted together with the patient's clinical condition?",
    optionA:
      "Ventilator values must be evaluated in the context of patient response and gas exchange",
    optionB:
      "Ventilator numbers are independent of patient condition",
    optionC:
      "Patient assessment is unnecessary when a ventilator is functioning",
    optionD:
      "Only the alarm volume determines clinical status",
    correctAnswer: "A",
    explanation:
      "Ventilator parameters are meaningful when interpreted together with clinical assessment and the patient's response.",
    marks: 1,
  },

  {
    question:
      "Which measurement is especially useful for evaluating oxygenation?",
    optionA:
      "Oxygen saturation",
    optionB:
      "Body height alone",
    optionC:
      "Blood group alone",
    optionD:
      "Pain score alone",
    correctAnswer: "A",
    explanation:
      "Oxygen saturation is a commonly used clinical measurement for evaluating oxygenation.",
    marks: 1,
  },

  {
    question:
      "What is an important nursing action when caring for a mechanically ventilated patient?",
    optionA:
      "Regularly assess respiratory status, airway security, and ventilator response",
    optionB:
      "Ignore ventilator alarms",
    optionC:
      "Disconnect the circuit routinely",
    optionD:
      "Change settings without clinical indication",
    correctAnswer: "A",
    explanation:
      "Mechanical ventilation requires ongoing assessment of respiratory status, airway security, and response to ventilatory support.",
    marks: 1,
  },

  // ==========================================================
  // ECG
  // ==========================================================

  {
    question:
      "What is the purpose of using a systematic approach to ECG interpretation?",
    optionA:
      "To ensure important ECG features are assessed consistently",
    optionB:
      "To eliminate the need for patient assessment",
    optionC:
      "To diagnose every condition from one ECG feature",
    optionD:
      "To replace continuous cardiac monitoring",
    correctAnswer: "A",
    explanation:
      "A systematic ECG approach helps ensure important features are reviewed consistently.",
    marks: 1,
  },

  {
    question:
      "Which ECG feature represents the electrical activity associated with atrial depolarization?",
    optionA:
      "P wave",
    optionB:
      "QRS complex",
    optionC:
      "T wave",
    optionD:
      "ST segment",
    correctAnswer: "A",
    explanation:
      "The P wave represents atrial depolarization.",
    marks: 1,
  },

  {
    question:
      "Which ECG component represents ventricular depolarization?",
    optionA:
      "QRS complex",
    optionB:
      "P wave",
    optionC:
      "T wave",
    optionD:
      "PR segment",
    correctAnswer: "A",
    explanation:
      "The QRS complex represents ventricular depolarization.",
    marks: 1,
  },

  {
    question:
      "What does the T wave generally represent on an ECG?",
    optionA:
      "Ventricular repolarization",
    optionB:
      "Atrial depolarization",
    optionC:
      "Ventricular depolarization",
    optionD:
      "Atrial contraction only",
    correctAnswer: "A",
    explanation:
      "The T wave generally represents ventricular repolarization.",
    marks: 1,
  },

  {
    question:
      "When an ICU patient develops a new clinically significant rhythm change, the nurse should:",
    optionA:
      "Assess the patient and correlate the rhythm with the clinical condition",
    optionB:
      "Assume the monitor is always correct without assessment",
    optionC:
      "Ignore the rhythm if the patient has no previous history",
    optionD:
      "Disconnect monitoring immediately",
    correctAnswer: "A",
    explanation:
      "A new rhythm change should be correlated with the patient's clinical condition and assessed promptly.",
    marks: 1,
  },

  // ==========================================================
  // ABG
  // ==========================================================

  {
    question:
      "What is the normal arterial blood pH range commonly used for ABG interpretation?",
    optionA:
      "7.35 to 7.45",
    optionB:
      "6.80 to 7.00",
    optionC:
      "7.80 to 8.00",
    optionD:
      "8.20 to 8.40",
    correctAnswer: "A",
    explanation:
      "A commonly accepted arterial blood pH reference range is 7.35 to 7.45.",
    marks: 1,
  },

  {
    question:
      "Which ABG value primarily reflects the respiratory component of acid-base balance?",
    optionA:
      "PaCO₂",
    optionB:
      "PaO₂",
    optionC:
      "Sodium",
    optionD:
      "Hemoglobin",
    correctAnswer: "A",
    explanation:
      "PaCO₂ is closely related to the respiratory component of acid-base balance.",
    marks: 1,
  },

  {
    question:
      "Which ABG value primarily reflects the metabolic component of acid-base balance?",
    optionA:
      "HCO₃⁻",
    optionB:
      "PaO₂",
    optionC:
      "PaCO₂ only",
    optionD:
      "Oxygen saturation only",
    correctAnswer: "A",
    explanation:
      "Bicarbonate is a major indicator of the metabolic component of acid-base balance.",
    marks: 1,
  },

  {
    question:
      "A systematic ABG interpretation should begin by assessing:",
    optionA:
      "The pH",
    optionB:
      "The patient's height",
    optionC:
      "The patient's meal preference",
    optionD:
      "The patient's room number",
    correctAnswer: "A",
    explanation:
      "Assessment of pH provides the starting point for determining the overall acid-base status.",
    marks: 1,
  },

  {
    question:
      "Which combination is most useful when evaluating acid-base balance?",
    optionA:
      "pH, PaCO₂, and HCO₃⁻",
    optionB:
      "Heart rate, height, and weight only",
    optionC:
      "Temperature, height, and blood group only",
    optionD:
      "Respiratory rate and meal intake only",
    correctAnswer: "A",
    explanation:
      "pH, PaCO₂, and HCO₃⁻ are central values used to assess acid-base balance.",
    marks: 1,
  },

  // ==========================================================
  // SHOCK
  // ==========================================================

  {
    question:
      "What is a fundamental concern in shock?",
    optionA:
      "Inadequate tissue perfusion",
    optionB:
      "Improved tissue oxygenation in every case",
    optionC:
      "Normal perfusion regardless of cause",
    optionD:
      "Absence of physiological changes",
    correctAnswer: "A",
    explanation:
      "Shock involves inadequate tissue perfusion and can result in impaired oxygen delivery to tissues.",
    marks: 1,
  },

  {
    question:
      "Which finding can be important when assessing tissue perfusion?",
    optionA:
      "Mental status, urine output, skin findings, and hemodynamic parameters",
    optionB:
      "Hair length alone",
    optionC:
      "Meal preference alone",
    optionD:
      "Patient's occupation alone",
    correctAnswer: "A",
    explanation:
      "Assessment of perfusion includes clinical findings such as mental status, urine output, skin findings, and hemodynamic parameters.",
    marks: 1,
  },

  {
    question:
      "Which type of shock is associated with inadequate circulating volume?",
    optionA:
      "Hypovolemic shock",
    optionB:
      "Cardiogenic shock",
    optionC:
      "Obstructive shock",
    optionD:
      "Distributive shock",
    correctAnswer: "A",
    explanation:
      "Hypovolemic shock is associated with inadequate intravascular volume.",
    marks: 1,
  },

  {
    question:
      "Which type of shock is associated with primary cardiac pump failure?",
    optionA:
      "Cardiogenic shock",
    optionB:
      "Hypovolemic shock",
    optionC:
      "Distributive shock",
    optionD:
      "Obstructive shock",
    correctAnswer: "A",
    explanation:
      "Cardiogenic shock results from inadequate cardiac pump function.",
    marks: 1,
  },

  {
    question:
      "Which type of shock involves abnormal distribution of blood flow and vascular tone?",
    optionA:
      "Distributive shock",
    optionB:
      "Hypovolemic shock",
    optionC:
      "Cardiogenic shock",
    optionD:
      "Obstructive shock",
    correctAnswer: "A",
    explanation:
      "Distributive shock involves abnormal vascular tone and distribution of blood flow.",
    marks: 1,
  },

  // ==========================================================
  // SEPSIS
  // ==========================================================

  {
    question:
      "Why is early recognition of sepsis important?",
    optionA:
      "Sepsis can progress rapidly and requires timely clinical management",
    optionB:
      "Sepsis always resolves without treatment",
    optionC:
      "Monitoring is unnecessary in sepsis",
    optionD:
      "Only dietary treatment is required",
    correctAnswer: "A",
    explanation:
      "Sepsis is a serious time-sensitive condition in which timely recognition and management are important.",
    marks: 1,
  },

  {
    question:
      "Which clinical priority is important when caring for a patient with suspected sepsis?",
    optionA:
      "Prompt assessment, monitoring, escalation, and treatment according to protocol",
    optionB:
      "Delaying assessment until symptoms disappear",
    optionC:
      "Avoiding vital-sign monitoring",
    optionD:
      "Waiting for discharge planning",
    correctAnswer: "A",
    explanation:
      "Patients with suspected sepsis require prompt assessment, monitoring, escalation, and appropriate treatment according to clinical protocols.",
    marks: 1,
  },

  {
    question:
      "What can persistent tissue hypoperfusion contribute to in severe critical illness?",
    optionA:
      "Organ dysfunction",
    optionB:
      "Guaranteed normal organ function",
    optionC:
      "Improved oxygen delivery in every case",
    optionD:
      "Immediate recovery",
    correctAnswer: "A",
    explanation:
      "Persistent inadequate tissue perfusion can contribute to cellular injury and organ dysfunction.",
    marks: 1,
  },

  // ==========================================================
  // EMERGENCY
  // ==========================================================

  {
    question:
      "During a cardiac arrest, the ICU nurse should primarily follow:",
    optionA:
      "Current resuscitation protocols and the coordinated team response",
    optionB:
      "Personal preference instead of protocol",
    optionC:
      "Routine non-emergency documentation first",
    optionD:
      "The patient's previous meal schedule",
    correctAnswer: "A",
    explanation:
      "Cardiac arrest management requires a coordinated response following current resuscitation protocols.",
    marks: 1,
  },

  {
    question:
      "What is an important principle during an emergency response?",
    optionA:
      "Clear communication and defined team roles",
    optionB:
      "Multiple people giving unrelated instructions",
    optionC:
      "Avoiding closed-loop communication",
    optionD:
      "Delaying escalation",
    correctAnswer: "A",
    explanation:
      "Clear communication and defined team roles support coordinated emergency care.",
    marks: 1,
  },

  {
    question:
      "What should a nurse do if a patient's condition deteriorates beyond the nurse's scope or available resources?",
    optionA:
      "Escalate promptly to the appropriate clinician or emergency team",
    optionB:
      "Manage the situation alone regardless of severity",
    optionC:
      "Wait until the end of the shift",
    optionD:
      "Avoid documenting the deterioration",
    correctAnswer: "A",
    explanation:
      "Prompt escalation is appropriate when deterioration exceeds the nurse's scope, resources, or ability to safely manage the situation.",
    marks: 1,
  },

  {
    question:
      "Why is checking patient identification important before clinical interventions?",
    optionA:
      "It helps reduce wrong-patient errors",
    optionB:
      "It is required only for discharge",
    optionC:
      "It replaces medication verification",
    optionD:
      "It is unnecessary in an ICU",
    correctAnswer: "A",
    explanation:
      "Correct patient identification is a fundamental patient-safety measure that helps reduce wrong-patient errors.",
    marks: 1,
  },

  // ==========================================================
  // MEDICATION SAFETY
  // ==========================================================

  {
    question:
      "What is an important principle of ICU medication administration?",
    optionA:
      "Use verified orders, appropriate checks, and institutional protocols",
    optionB:
      "Administer medications based on memory alone",
    optionC:
      "Use unverified messages as medication orders",
    optionD:
      "Skip identification when the patient is critically ill",
    correctAnswer: "A",
    explanation:
      "Medication administration should follow verified orders, appropriate safety checks, and institutional protocols.",
    marks: 1,
  },

  {
    question:
      "Why are high-alert medications handled with additional safeguards?",
    optionA:
      "Errors involving them can cause significant patient harm",
    optionB:
      "They never require monitoring",
    optionC:
      "They are always harmless",
    optionD:
      "They can be administered without verification",
    correctAnswer: "A",
    explanation:
      "High-alert medications require additional safeguards because medication errors involving them can cause significant harm.",
    marks: 1,
  },

  {
    question:
      "What should be done when a medication order appears unclear or unsafe?",
    optionA:
      "Clarify the order through the appropriate clinical process before administration",
    optionB:
      "Guess the intended dose",
    optionC:
      "Administer the medication immediately",
    optionD:
      "Ignore the discrepancy",
    correctAnswer: "A",
    explanation:
      "An unclear or potentially unsafe medication order should be clarified through the appropriate clinical process before administration.",
    marks: 1,
  },

  {
    question:
      "Medication reconciliation is primarily used to:",
    optionA:
      "Identify discrepancies between medication lists and actual therapy",
    optionB:
      "Eliminate medication documentation",
    optionC:
      "Replace patient assessment",
    optionD:
      "Prevent all adverse events automatically",
    correctAnswer: "A",
    explanation:
      "Medication reconciliation helps identify discrepancies between medication histories, current orders, and actual therapy.",
    marks: 1,
  },

  // ==========================================================
  // INFECTION CONTROL
  // ==========================================================

  {
    question:
      "What is a fundamental infection-prevention practice in the ICU?",
    optionA:
      "Appropriate hand hygiene",
    optionB:
      "Avoiding all patient contact",
    optionC:
      "Reusing contaminated equipment without processing",
    optionD:
      "Skipping aseptic precautions",
    correctAnswer: "A",
    explanation:
      "Appropriate hand hygiene is a fundamental component of infection prevention in healthcare settings.",
    marks: 1,
  },

  {
    question:
      "Why is aseptic technique important during invasive procedures?",
    optionA:
      "It helps reduce the risk of introducing microorganisms",
    optionB:
      "It eliminates the need for hand hygiene",
    optionC:
      "It guarantees that infection can never occur",
    optionD:
      "It replaces patient monitoring",
    correctAnswer: "A",
    explanation:
      "Aseptic technique is used to reduce the risk of introducing microorganisms during invasive procedures.",
    marks: 1,
  },

  {
    question:
      "What is an important nursing action when caring for an invasive device?",
    optionA:
      "Assess the device site and indication and follow appropriate infection-prevention practices",
    optionB:
      "Ignore the insertion site",
    optionC:
      "Keep every device indefinitely",
    optionD:
      "Avoid documentation",
    correctAnswer: "A",
    explanation:
      "Invasive devices should be assessed regularly, maintained appropriately, and reviewed for ongoing indication according to clinical practice.",
    marks: 1,
  },

  // ==========================================================
  // RENAL / FLUID BALANCE
  // ==========================================================

  {
    question:
      "Why is urine output monitored closely in many critically ill patients?",
    optionA:
      "It can provide information about renal function and perfusion",
    optionB:
      "It directly diagnoses every kidney disease",
    optionC:
      "It replaces blood testing",
    optionD:
      "It has no relationship to critical illness",
    correctAnswer: "A",
    explanation:
      "Urine output can provide useful information about renal function, fluid status, and organ perfusion.",
    marks: 1,
  },

  {
    question:
      "What is an important component of fluid balance monitoring?",
    optionA:
      "Comparing relevant fluid intake and output",
    optionB:
      "Recording only oral intake",
    optionC:
      "Ignoring urine output",
    optionD:
      "Recording fluid status only at discharge",
    correctAnswer: "A",
    explanation:
      "Fluid balance assessment involves monitoring relevant intake and output over time.",
    marks: 1,
  },

  // ==========================================================
  // NEURO / ASSESSMENT
  // ==========================================================

  {
    question:
      "Why is neurological assessment important in an ICU patient?",
    optionA:
      "It can help identify changes in neurological status",
    optionB:
      "It replaces cardiovascular monitoring",
    optionC:
      "It is required only before discharge",
    optionD:
      "It is unnecessary in sedated patients",
    correctAnswer: "A",
    explanation:
      "Neurological assessment helps identify changes in consciousness, neurological function, and clinical status.",
    marks: 1,
  },

  {
    question:
      "A change in level of consciousness in an ICU patient should be:",
    optionA:
      "Assessed promptly and correlated with the patient's clinical condition",
    optionB:
      "Ignored if vital signs are unchanged",
    optionC:
      "Documented only at discharge",
    optionD:
      "Automatically considered normal",
    correctAnswer: "A",
    explanation:
      "A change in consciousness can indicate clinical deterioration and should be assessed promptly.",
    marks: 1,
  },

  // ==========================================================
  // INTERVIEW / PROFESSIONAL SKILLS
  // ==========================================================

  {
    question:
      "In an ICU nursing interview, a strong answer to a clinical scenario should generally be:",
    optionA:
      "Structured, prioritized, safety-focused, and clinically relevant",
    optionB:
      "Long but unrelated to the scenario",
    optionC:
      "Based entirely on guessing",
    optionD:
      "Focused only on salary expectations",
    correctAnswer: "A",
    explanation:
      "Strong clinical interview answers should demonstrate structured thinking, prioritization, patient safety, and clinical relevance.",
    marks: 1,
  },

  {
    question:
      "If an interview candidate does not know the answer to a clinical question, the safest professional response is to:",
    optionA:
      "Acknowledge the limitation and explain how they would seek appropriate guidance",
    optionB:
      "Invent an answer confidently",
    optionC:
      "Hide the uncertainty",
    optionD:
      "Give unrelated information",
    correctAnswer: "A",
    explanation:
      "Acknowledging limitations and describing an appropriate escalation or learning approach demonstrates professional safety and honesty.",
    marks: 1,
  },

  {
    question:
      "What does clinical prioritization demonstrate during an ICU nursing interview?",
    optionA:
      "The ability to identify urgent problems and organize care safely",
    optionB:
      "The ability to memorize unrelated information",
    optionC:
      "The ability to avoid communication",
    optionD:
      "The ability to complete paperwork before patient assessment",
    correctAnswer: "A",
    explanation:
      "Clinical prioritization demonstrates the ability to recognize urgent problems and organize safe patient care.",
    marks: 1,
  },

  {
    question:
      "Why is escalation an important part of ICU nursing practice?",
    optionA:
      "It helps ensure deteriorating or high-risk patients receive appropriate clinical support",
    optionB:
      "It removes the nurse's responsibility for observation",
    optionC:
      "It should only occur after discharge",
    optionD:
      "It is unnecessary when documentation is complete",
    correctAnswer: "A",
    explanation:
      "Timely escalation helps ensure that patients with deterioration or complex needs receive appropriate clinical support.",
    marks: 1,
  },

  {
    question:
      "What is the best approach when answering a clinical viva question about an emergency?",
    optionA:
      "State the immediate priorities, assessment, escalation, and appropriate management principles",
    optionB:
      "Start with unrelated background information",
    optionC:
      "Avoid mentioning patient safety",
    optionD:
      "Give an answer without prioritization",
    correctAnswer: "A",
    explanation:
      "Emergency viva answers are stronger when they clearly identify priorities, assessment, escalation, and safe management principles.",
    marks: 1,
  },

  // ==========================================================
  // PATIENT SAFETY
  // ==========================================================

  {
    question:
      "What is the purpose of using a structured safety checklist in critical care?",
    optionA:
      "To reduce omissions and improve consistency of important safety checks",
    optionB:
      "To replace clinical judgment completely",
    optionC:
      "To eliminate documentation",
    optionD:
      "To prevent communication between team members",
    correctAnswer: "A",
    explanation:
      "Structured checklists can reduce omissions and improve consistency of important safety processes.",
    marks: 1,
  },

  {
    question:
      "What should an ICU nurse do when noticing a potential patient-safety hazard?",
    optionA:
      "Address it promptly within scope and escalate through the appropriate process",
    optionB:
      "Ignore it if no harm has occurred yet",
    optionC:
      "Wait until the end of the month",
    optionD:
      "Remove the documentation",
    correctAnswer: "A",
    explanation:
      "Potential safety hazards should be addressed promptly and escalated through the appropriate clinical or organizational process.",
    marks: 1,
  },

  {
    question:
      "Why is communication with the multidisciplinary ICU team important?",
    optionA:
      "Critical care patients often require coordinated care from multiple professionals",
    optionB:
      "Only one healthcare professional is involved in ICU care",
    optionC:
      "Communication replaces patient assessment",
    optionD:
      "Communication is required only during discharge",
    correctAnswer: "A",
    explanation:
      "ICU care is multidisciplinary, so clear communication supports coordinated assessment and management.",
    marks: 1,
  },

  // ==========================================================
  // FINAL INTERVIEW QUESTIONS
  // ==========================================================

  {
    question:
      "Which statement best describes professional ICU nursing practice?",
    optionA:
      "It combines clinical assessment, monitoring, patient safety, communication, and evidence-based care",
    optionB:
      "It depends only on technical skills",
    optionC:
      "It requires no documentation",
    optionD:
      "It avoids multidisciplinary communication",
    correctAnswer: "A",
    explanation:
      "Professional ICU nursing combines assessment, monitoring, safety, communication, teamwork, and appropriate clinical care.",
    marks: 1,
  },

  {
    question:
      "When asked to describe your response to a critically ill patient in an interview, what should you emphasize?",
    optionA:
      "Systematic assessment, prioritization, timely escalation, and patient safety",
    optionB:
      "Only the patient's diagnosis",
    optionC:
      "Only documentation",
    optionD:
      "Only the medication list",
    correctAnswer: "A",
    explanation:
      "A strong response demonstrates systematic assessment, prioritization, escalation, and patient-safety awareness.",
    marks: 1,
  },

  {
    question:
      "What is the most important principle when performing an unfamiliar ICU procedure?",
    optionA:
      "Follow appropriate training, institutional policy, supervision, and patient-safety requirements",
    optionB:
      "Perform it without supervision regardless of experience",
    optionC:
      "Use social media instructions as the only source",
    optionD:
      "Skip safety checks to save time",
    correctAnswer: "A",
    explanation:
      "Unfamiliar procedures should be performed according to appropriate training, institutional policy, supervision, and patient-safety requirements.",
    marks: 1,
  },
];

/*
 * ============================================================
 * MAIN
 * ============================================================
 */

async function main() {
  console.log("");
  console.log("============================================================");
  console.log(" ICU INTERVIEW QUIZ EXPANSION");
  console.log("============================================================");
  console.log("");

  console.log("🔎 Finding ICU Interview course...");

  const course = await prisma.course.findUnique({
    where: {
      slug: COURSE_SLUG,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      quizzes: {
        select: {
          id: true,
          title: true,
          description: true,
          questions: {
            select: {
              id: true,
              question: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    throw new Error(
      `Course not found with slug: ${COURSE_SLUG}`
    );
  }

  console.log(`✅ Course found: ${course.title}`);
  console.log(`   Course ID: ${course.id}`);
  console.log("");

  if (course.quizzes.length === 0) {
    throw new Error(
      "No quiz exists for the ICU Interview course."
    );
  }

  /*
   * Prefer the existing interview assessment quiz.
   * If the exact title is not found, use the first quiz.
   */

  const quiz =
    course.quizzes.find(
      (item) =>
        item.title
          .toLowerCase()
          .includes("interview") ||
        item.title
          .toLowerCase()
          .includes("viva")
    ) ?? course.quizzes[0];

  console.log(`📝 Quiz found: ${quiz.title}`);
  console.log(`   Quiz ID: ${quiz.id}`);
  console.log(
    `   Existing questions: ${quiz.questions.length}`
  );
  console.log("");

  /*
   * ==========================================================
   * ALREADY AT TARGET
   * ==========================================================
   */

  if (
    quiz.questions.length >=
    TARGET_QUESTION_COUNT
  ) {
    console.log(
      `✅ Quiz already contains ${quiz.questions.length} questions.`
    );

    console.log(
      `🎯 Target was ${TARGET_QUESTION_COUNT}.`
    );

    console.log(
      "🛡️ No database changes were required."
    );

    return;
  }

  /*
   * ==========================================================
   * CALCULATE REQUIRED QUESTIONS
   * ==========================================================
   */

  const requiredCount =
    TARGET_QUESTION_COUNT -
    quiz.questions.length;

  console.log(
    `📌 Questions required to reach ${TARGET_QUESTION_COUNT}: ${requiredCount}`
  );

  /*
   * ==========================================================
   * DUPLICATE PROTECTION
   * ==========================================================
   *
   * We compare the complete question text.
   */

  const existingQuestionTexts =
    new Set(
      quiz.questions.map((item) =>
        item.question.trim().toLowerCase()
      )
    );

  const uniqueQuestions =
    additionalQuestions.filter(
      (question) =>
        !existingQuestionTexts.has(
          question.question
            .trim()
            .toLowerCase()
        )
    );

  if (uniqueQuestions.length === 0) {
    throw new Error(
      "No new unique questions are available to add."
    );
  }

  /*
   * Only add exactly what is required.
   */

  const questionsToInsert =
    uniqueQuestions.slice(0, requiredCount);

  console.log(
    `➕ New questions selected: ${questionsToInsert.length}`
  );

  /*
   * ==========================================================
   * DATABASE INSERT
   * ==========================================================
   */

  const result =
    await prisma.quizQuestion.createMany({
      data: questionsToInsert.map(
        (question) => ({
          quizId: quiz.id,
          question: question.question,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctAnswer:
            question.correctAnswer,
          explanation:
            question.explanation,
          marks: question.marks,
        })
      ),
    });

  console.log("");
  console.log(
    `✅ Inserted ${result.count} new quiz questions.`
  );

  /*
   * ==========================================================
   * VERIFY FINAL COUNT
   * ==========================================================
   */

  const finalCount =
    await prisma.quizQuestion.count({
      where: {
        quizId: quiz.id,
      },
    });

  console.log("");
  console.log(
    `📊 Final quiz question count: ${finalCount}`
  );

  if (
    finalCount ===
    TARGET_QUESTION_COUNT
  ) {
    console.log("");
    console.log(
      "🎉 SUCCESS: ICU Interview Quiz now has exactly 50 questions."
    );
  } else if (
    finalCount >
    TARGET_QUESTION_COUNT
  ) {
    console.warn("");
    console.warn(
      `⚠️ Quiz contains ${finalCount} questions, which is above the target of ${TARGET_QUESTION_COUNT}.`
    );
  } else {
    console.warn("");
    console.warn(
      `⚠️ Quiz contains ${finalCount} questions. More questions are required to reach ${TARGET_QUESTION_COUNT}.`
    );
  }

  console.log("");
  console.log("============================================================");
  console.log(" Quiz expansion completed");
  console.log("============================================================");
  console.log("");
}

/*
 * ============================================================
 * EXECUTION
 * ============================================================
 */

main()
  .catch((error) => {
    console.error("");
    console.error("❌ QUIZ EXPANSION FAILED");
    console.error("");

    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });