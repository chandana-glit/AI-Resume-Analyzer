import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import ResumeUploader from "../components/ResumeUploader";
import JobDescriptionInput from "../components/JobDescriptionInput";
import { extractTextFromPDF } from "../lib/pdfParser";
import { analyzeSkills } from "../lib/skillAnalyzer";
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAnalyze = resumeFile && jobDescription.trim().length >= 20;

  const handleAnalyze = async () => {
    if (!canAnalyze || !resumeFile) return;
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Extract text from PDF
      const resumeText = await extractTextFromPDF(resumeFile);
      
      if (!resumeText.trim()) {
        throw new Error("Could not extract text from PDF. Please ensure your resume is not image-based.");
      }
      
      // Analyze skills
      const result = analyzeSkills(resumeText, jobDescription);
      
      // Navigate to results page
      navigate("/results", { state: { result } });
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze resume. Please try again.");
      setIsAnalyzing(false);
    }
  };

  const features = [
    {
      icon: Target,
      title: "Skill Gap Analysis",
      description: "Identify exactly which skills you need to develop"
    },
    {
      icon: TrendingUp,
      title: "Match Score",
      description: "See how well your resume matches the job requirements"
    },
    {
      icon: BookOpen,
      title: "Learning Roadmap",
      description: "Get a 4-week plan to master missing skills"
    },
    {
      icon: Sparkles,
      title: "Project Ideas",
      description: "Build portfolio projects that prove your skills"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-bold text-xl tracking-tight">AI Resume Analyzer</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Resume Analysis
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 max-w-4xl mx-auto">
            Turn Skill Gaps into a {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">
              Learning Plan
            </span>
          </h1>
          
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            Upload your resume, paste a job description, and get instant insights on skill gaps and personalized learning roadmaps.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Match Score", "Skill Gaps", "Learning Path", "Project Ideas"].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-1.5 px-3 py-1 bg-muted/80 rounded-full text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Analysis Section */}
      <section className="relative -mt-2">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="p-5 md:p-6 shadow-2xl shadow-primary/5 border-border/50 bg-card/80 backdrop-blur">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <ResumeUploader 
                onFileSelect={setResumeFile}
                selectedFile={resumeFile}
              />
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                className="w-full md:w-auto px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze My Resume
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              
              {!canAnalyze && (
                <p className="text-sm text-muted-foreground">
                  {!resumeFile && !jobDescription.trim() && "Upload your resume and paste a job description to get started"}
                  {!resumeFile && jobDescription.trim() && "Upload your resume (PDF)"}
                  {resumeFile && jobDescription.trim().length < 20 && `Add more details to the job description (${jobDescription.trim().length}/20 characters)`}
                </p>
              )}
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Prepare</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Go beyond simple keyword matching with intelligent analysis and actionable insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-muted/50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to placement readiness</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload & Paste", description: "Upload your PDF resume and paste the job description you're targeting" },
              { step: "02", title: "Get Analysis", description: "Our AI analyzes both documents and calculates your match score with detailed skill gaps" },
              { step: "03", title: "Follow Roadmap", description: "Get personalized learning paths, and project ideas to close skill gaps" }
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-12 pl-4">
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built to help you land your dream job</p>
        </div>
      </footer>
    </div>
  );
}
