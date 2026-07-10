# Welcome to Resumind!

Resume Analyzer is a full-stack web application that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and human recruiters alike. Users upload a resume along with a target job description, and the app returns a detailed analysis — an overall ATS score, category-wise feedback (tone, content, structure, skills), and actionable tips to improve their chances of getting past automated filters and into the hands of hiring managers.
Features

📄 Resume Upload & Preview — Upload a resume (PDF) and view it alongside the analysis
🎯 ATS Score — Get an overall compatibility score (0–100) with a visual score indicator
✅ Actionable Feedback — Categorized suggestions (good vs. needs improvement) with specific, practical tips
📊 Score Breakdown — Visual gradient and icon-based indicators reflecting resume strength at a glance
📁 Application Tracking — Save and revisit past resume analyses tied to specific job applications
🖼️ Resume Card View — Quick-glance cards showing company, job title, and score for each submission

Tech Stack

Frontend: React, TypeScript, Tailwind CSS
Routing: React Router
Build Tool: Vite
Styling/UI: Custom components (ScoreCircle, ResumeCard, ATS feedback panel)

Getting Started
bash# Clone the repository
git clone <repo-url>
cd resume-analyzer

# Install dependencies
npm install

# Run the development server
npm run dev
The app will be available at http://localhost:5173.
Project Structure
app/
├── components/
│   ├── ResumeCard.tsx     # Card view for individual resumes
│   ├── ScoreCircle.tsx    # Circular score visualization
│   ├── ATS.tsx            # ATS feedback and suggestions panel
│   └── Navbar.tsx
├── routes/
│   ├── home.tsx
│   └── resume.tsx
└── app.css
Roadmap

 AI-powered resume rewriting suggestions
 Support for multiple resume versions per user
 Export analysis as PDF report
 Job description matching with keyword gap analysis

Built with ❤️ using React Router & Puter.
