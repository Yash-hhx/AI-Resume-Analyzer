import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "~/constants";
import {resume} from "react-dom/server";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback For Your Dream Job!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])


  return <main className="bg-[url('/images/bg-main.svg)] bg-cover">
    <Navbar />


    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions & Check AI-powered feedback</h2>
      </div>

    {resumes.length > 0 && (
     <div className="resumes-section">
    {resumes.map((item: Resume, i: number) => (
        <ResumeCard key={item.id} resume={item}/>
    ))}
     </div>
        )}
    </section>

  </main>
}
