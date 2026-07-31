# ICU Learning Portal

Version: 2.0
Project Owner: Avinash Dubey

---

# Project Vision

ICU Learning Portal is a premium online learning platform for ICU Nurses.

The platform provides:

- Premium Courses
- ICU Notes
- Video Lessons
- Quiz System
- Certificates
- Live Classes
- Student Dashboard
- Admin Dashboard
- Payment System
- Progress Tracking

---

# Technology Stack

Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend
- Next.js App Router
- API Routes

Database
- PostgreSQL
- Prisma ORM

Authentication
- NextAuth

Deployment
- Vercel

Version Control
- Git
- GitHub

---

# Current Project Status

✅ Authentication

✅ Dashboard

✅ Dynamic Courses

✅ Dynamic Lessons

✅ Lesson Progress

✅ Certificate System

✅ Student Portal

✅ Prisma Database

✅ GitHub Repository

---

# Development Rules

1. Never rewrite the entire project.

2. Modify only required files.

3. Always work step by step.

4. Browser test after every feature.

5. Git Commit after every completed feature.

6. Git Push after every commit.

7. Keep code clean and production ready.

---

# Current Branch

main

---

# Latest Commit

Add dynamic certificate dashboard and lesson progress system

# Project Folder Structure

client/

├── app/
│
├── api/
│   ├── auth/
│   ├── lesson-progress/
│   ├── certificates/
│   ├── my-courses/
│   ├── payments/
│   └── quizzes/
│
├── courses/
│   ├── [id]/
│   │   ├── page.tsx
│   │   └── lesson/
│   │       └── [lessonId]/
│   │           └── page.tsx
│
├── dashboard/
│   └── page.tsx
│
├── login/
├── register/
├── certificates/
├── notes/
├── quiz/
└── profile/

--------------------------------------------------

components/

├── dashboard/
│
├── course/
│
├── auth/
│
├── ui/
│
└── shared/

--------------------------------------------------

lib/

├── prisma.ts
├── auth.ts
├── utils.ts

--------------------------------------------------

prisma/

├── schema.prisma
│
├── seed.ts
│
└── migrations/

--------------------------------------------------

public/

├── images/
├── certificates/
├── notes/
└── videos/

--------------------------------------------------

types/

database types

--------------------------------------------------

styles/

global styles

--------------------------------------------------

middleware

Authentication

--------------------------------------------------

.env

DATABASE_URL

NEXTAUTH_SECRET

NEXTAUTH_URL

--------------------------------------------------

package.json
tsconfig.json
next.config.ts
README.md

# Database Structure

The project uses PostgreSQL with Prisma ORM.

--------------------------------------------

## User

Stores student information.

Fields

- id
- fullName
- email
- mobile
- qualification
- hospital
- password
- role
- isPremium
- isVerified
- createdAt
- updatedAt

Relations

- Enrollments
- Lesson Progress
- Payments
- Certificates

--------------------------------------------

## Course

Stores all premium courses.

Fields

- id
- title
- slug
- description
- image
- instructor
- price
- duration
- language
- level
- rating
- students
- isPremium
- createdAt

Relations

- Lessons
- Enrollments
- Certificates

--------------------------------------------

## Lesson

Stores every lesson.

Fields

- id
- title
- description
- videoUrl
- notesUrl
- duration
- lessonOrder
- createdAt
- courseId

Relations

- Course
- Lesson Progress

--------------------------------------------

## Enrollment

Stores purchased/enrolled courses.

Fields

- id
- userId
- courseId
- progress
- completed
- enrolledAt

Relations

- User
- Course

--------------------------------------------

## LessonProgress

Stores completed lessons.

Fields

- id
- userId
- lessonId
- completed
- completedAt
- createdAt

Relations

- User
- Lesson

--------------------------------------------

## Payment

Stores payment history.

Fields

- id
- userId
- amount
- status
- paymentMethod
- transactionId
- createdAt

Relations

- User

--------------------------------------------

## Certificate

Stores generated certificates.

Fields

- id
- userId
- courseId
- certificateNo
- issuedAt

Relations

- User
- Course

# API Documentation

The project uses Next.js API Routes.

--------------------------------------------

## Authentication APIs

/api/auth/signin

Purpose

User Login

Status

Completed

--------------------------------------------

/api/auth/signout

Purpose

Logout

Status

Completed

--------------------------------------------

/api/auth/session

Purpose

Current Logged In User

Status

Completed

--------------------------------------------

## Course APIs

/api/my-courses

Purpose

Returns all enrolled courses of current user.

Returns

- Course
- Progress
- Completed Status

Status

Completed

--------------------------------------------

## Lesson APIs

/api/lesson-progress

Method

POST

Purpose

Marks lesson as completed.

Updates

- Lesson Progress
- Enrollment Progress

Automatically

- Creates Certificate after Course Completion

Status

Completed

--------------------------------------------

## Certificate APIs

/ api/certificates/latest

Method

GET

Purpose

Returns latest certificate.

Returns

- Certificate Number
- Course
- Issue Date

Status

Completed

--------------------------------------------

## Planned APIs

/api/notes

Status

Pending

--------------------------------------------

/api/quiz

Status

Pending

--------------------------------------------

/api/payment

Status

Pending

--------------------------------------------

/api/live-classes

Status

Pending

--------------------------------------------

/api/admin

Status

Pending

--------------------------------------------

/api/profile

Status

Pending

# Feature Roadmap

====================================

STUDENT MODULE

====================================

Authentication

✅ Login

✅ Register

✅ Logout

✅ Session

------------------------------------

Dashboard

✅ Premium Dashboard

✅ Continue Learning

✅ My Courses

✅ Learning Analytics

✅ Study Calendar

✅ Student Profile

✅ Notifications

✅ Achievements

✅ Certificate Widget

------------------------------------

Courses

✅ Course Listing

✅ Dynamic Course Page

✅ Lesson Player

✅ Lesson Navigation

✅ Video Player

✅ Notes Download

✅ Lesson Progress

✅ Course Progress

✅ Course Completion

------------------------------------

Certificates

✅ Auto Certificate Generation

✅ Dashboard Certificate

⬜ Download PDF

⬜ Verify Certificate

------------------------------------

Quiz

⬜ Quiz Module

⬜ Quiz Result

⬜ Quiz Leaderboard

------------------------------------

Notes

⬜ Premium Notes

⬜ Download Notes

------------------------------------

Live Classes

⬜ Upcoming Classes

⬜ Zoom Integration

⬜ Class Recording

------------------------------------

Payments

⬜ Razorpay

⬜ Purchase History

⬜ Invoice

------------------------------------

Profile

⬜ Edit Profile

⬜ Change Password

⬜ Upload Photo

====================================

ADMIN MODULE

====================================

⬜ Admin Login

⬜ Dashboard

⬜ User Management

⬜ Course Management

⬜ Lesson Management

⬜ Notes Upload

⬜ Quiz Management

⬜ Live Classes

⬜ Certificate Management

⬜ Payments

⬜ Analytics

====================================

FUTURE FEATURES

====================================

⬜ AI Mentor

⬜ Discussion Forum

⬜ Mobile App

⬜ Push Notifications

⬜ Offline Videos

⬜ Referral System

⬜ Affiliate System

⬜ Multi Language

⬜ Dark Mode Improvement

⬜ Email Notifications

⬜ WhatsApp Notifications

⬜ LMS Analytics

⬜ Subscription Plans

# Development Rules & Workflow

====================================

CODING RULES

====================================

✔ Use TypeScript

✔ Use Prisma ORM

✔ Use Server Components whenever possible

✔ Use Client Components only when required

✔ Reusable Components First

✔ Keep API Logic inside app/api

✔ Keep Database Logic inside Prisma

✔ Follow Clean Folder Structure

✔ Mobile Responsive Design

✔ Premium UI Design

====================================

FILE NAMING

====================================

Components

PascalCase

Example

StudentProfile.tsx

RecentCertificate.tsx

ContinueLearning.tsx

------------------------------------

API Routes

lowercase

lesson-progress

my-courses

certificates

------------------------------------

Utilities

camelCase

prisma.ts

auth.ts

utils.ts

====================================

GIT WORKFLOW

====================================

1.

git status

2.

git add .

3.

git commit -m "Meaningful Message"

4.

git push origin main

====================================

COMMIT MESSAGE STYLE

====================================

Examples

Build Premium Dashboard

Add Lesson Progress System

Add Dynamic Certificates

Improve My Courses UI

Add Payment Integration

Fix Dashboard Bugs

====================================

TESTING CHECKLIST

====================================

Before Every Commit

✔ Website Runs

✔ No Red Errors

✔ Browser Check

✔ Database Check

✔ Prisma Studio Check

✔ Dashboard Check

✔ API Check

✔ Mobile Responsive

====================================

DEPLOYMENT CHECKLIST

====================================

Before Production

✔ Environment Variables

✔ Database Connected

✔ Build Successful

✔ No TypeScript Errors

✔ No ESLint Errors

✔ Images Working

✔ Videos Working

✔ Certificates Working

✔ Payments Working

✔ Authentication Working

====================================

PROJECT PRINCIPLE

====================================

Never rush.

Always build production-ready code.

Write reusable code.

Keep documentation updated.

Commit every completed feature.

Push every stable version to GitHub.

# Project Timeline & Version History

====================================

VERSION 1

====================================

Project Initialization

✔ Next.js Setup

✔ Tailwind CSS

✔ Prisma Setup

✔ Authentication

------------------------------------

VERSION 2

====================================

Landing Website

✔ Home Page

✔ Navbar

✔ Hero Section

✔ Featured Courses

✔ Footer

------------------------------------

VERSION 3

====================================

Premium Dashboard

✔ Dashboard UI

✔ Sidebar

✔ Header

✔ Student Profile

✔ Progress Cards

✔ Analytics

✔ Study Calendar

------------------------------------

VERSION 4

====================================

Dynamic Course System

✔ Course Database

✔ Dynamic Course Pages

✔ Lesson Pages

✔ Video Player

✔ Notes Download

------------------------------------

VERSION 5

====================================

Learning Progress

✔ Lesson Completion

✔ Course Progress

✔ Continue Learning

✔ My Courses

------------------------------------

VERSION 6

====================================

Certificate System

✔ Auto Certificate Generation

✔ Dashboard Latest Certificate

✔ Certificate Database

------------------------------------

VERSION 7

====================================

Upcoming Features

⬜ Quiz System

⬜ Notes System

⬜ Payment Gateway

⬜ Live Classes

------------------------------------

VERSION 8

====================================

Admin Panel

⬜ Dashboard

⬜ Course Management

⬜ Lesson Management

⬜ User Management

⬜ Analytics

------------------------------------

VERSION 9

====================================

Production Features

⬜ Email Notifications

⬜ WhatsApp Notifications

⬜ AI Mentor

⬜ Discussion Forum

⬜ Mobile Optimization

------------------------------------

VERSION 10

====================================

Production Launch

⬜ Final Testing

⬜ Deployment

⬜ SEO Optimization

⬜ Performance Optimization

⬜ Public Release

# Tech Stack

====================================

FRONTEND

====================================

Framework

Next.js 16

Language

TypeScript

Styling

Tailwind CSS

Icons

Lucide React

====================================

BACKEND

====================================

Next.js App Router

Server Components

API Routes

====================================

DATABASE

====================================

PostgreSQL

Prisma ORM

====================================

AUTHENTICATION

====================================

NextAuth

Session Based Authentication

====================================

FILE STORAGE

====================================

Videos

Local Storage (Current)

Future

Cloudinary / AWS S3

------------------------------------

Notes

PDF Files

====================================

PAYMENT

====================================

Current

Pending

Future

Razorpay

====================================

DEPLOYMENT

====================================

Current

Local Development

Future

Vercel

Database

Neon PostgreSQL

====================================

VERSION CONTROL

====================================

Git

GitHub

Branch

main

====================================

DEVELOPMENT TOOLS

====================================

VS Code

Prisma Studio

Git

PowerShell

Chrome Browser

====================================

FUTURE INTEGRATIONS

====================================

Cloudinary

Razorpay

Zoom

Google Meet

OpenAI API

WhatsApp API

Resend Email

Firebase Push Notification