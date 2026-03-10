📔 Virtual Diary......
A modern full-stack journaling and productivity application that allows users to securely record their daily thoughts, track moods, manage tasks, and revisit memories.
Designed with a focus on privacy, usability, and real-world product architecture.

## 🚀 Live Demo

For working Website.....

[Click here](https://virtual-diary-six.vercel.app/)


📌 Problem Statement
Most journaling apps focus only on writing entries. However, real daily reflection also includes:

Tracking mood
Managing tasks
Reviewing past memories
Maintaining personal productivity

Virtual Diary solves this by combining journaling + mood tracking + task management in a single application.

✨ Features
🔒 Secure Journaling

Write daily journal entries
Entries are encrypted before storing in Firestore
Protects user privacy

🗂️ Memories System

View all past entries
Search by title, content, date, and tags
Favorite important memories

😊 Mood Tracking
Users can attach a mood to each journal entry:
😊 Happy
😢 Sad
😡 Angry
😌 Calm
😴 Tired
🤩 Excited
Mood indicators appear in the memories list for quick emotional history.

⭐ Favorite Memories
Pin important entries and access them quickly.
📊 Dashboard Overview
Personal dashboard shows:

Profile picture
Total journal entries
Daily inspirational quote
Quick navigation

☁️ Cloud Profile Images
Profile pictures are stored using Cloudinary CDN for optimized delivery.
✅ Task Management
Built-in Todo widget to manage daily tasks:

Add tasks
Mark complete
Delete tasks
Firestore synced

🔍 Smart Search
Search memories using:
Title
Content
Tags
Date
🌙 Dark Mode
Full dark/light theme support.
📱 Mobile Friendly


⚙️ Tech Stack
Technology             Purpose

React                  Frontend UI

Vite                   Fast development environment 

Firebase Auth          User authentication      

Firestore              NoSQL database

Cloudinary             Image hosting

TailwindCSSUI          styling

Vercel                 Deployment

🏗️ Architecture
Layer                     Technology

Frontend                  React + Vite

Backend                   Firebase Firestore

Authentication            Firebase Auth

Image Storage             CloudinaryHostingVercel

Responsive UI              TailwindCSS.



📦 Installation
Clone the repository:

git clone https://github.com/sumith75/virtual-diary.git

Install dependencies:

hnpm install

Run development server:

npm run dev

🔑 Environment Variables
Create a .env file in the root of your project and add the following:
envVITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=
