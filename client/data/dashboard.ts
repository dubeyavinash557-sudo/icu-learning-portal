import {
  BookOpen,
  Award,
  Clock,
  BarChart3,
} from "lucide-react";

export const student = {
  id: 1,
  name: "Avinash Dubey",
  email: "dubeyavinash557@gmail.com",
  membership: "Premium",
  experience: "4 Years ICU",
  hospital: "Max Super Speciality Hospital",
  progress: 42,
  streak: 18,
  certificates: 1,
};

export const courses = [
  {
    id: 1,
    title: "ICU Nursing Master Course",
    lessons: 120,
    completed: 52,
    progress: 43,
    color: "blue",
  },
  {
    id: 2,
    title: "Mechanical Ventilator",
    lessons: 80,
    completed: 35,
    progress: 44,
    color: "emerald",
  },
  {
    id: 3,
    title: "ECG Interpretation",
    lessons: 60,
    completed: 15,
    progress: 25,
    color: "purple",
  },
  {
    id: 4,
    title: "ABG Analysis",
    lessons: 45,
    completed: 20,
    progress: 45,
    color: "orange",
  },
  {
    id: 5,
    title: "Medical Coding",
    lessons: 100,
    completed: 10,
    progress: 10,
    color: "rose",
  },
];

export const recentActivity = [
  {
    title: "Completed Ventilator Basics",
    time: "Today",
  },
  {
    title: "Downloaded ICU Notes PDF",
    time: "Yesterday",
  },
  {
    title: "Passed ECG Quiz",
    time: "2 days ago",
  },
];

export const stats = [
  {
    title: "Total Courses",
    value: "5",
    icon: BookOpen,
  },
  {
    title: "Completed",
    value: "1",
    icon: Award,
  },
  {
    title: "Hours Learned",
    value: "148",
    icon: Clock,
  },
  {
    title: "Quiz Average",
    value: "92%",
    icon: BarChart3,
  },
];