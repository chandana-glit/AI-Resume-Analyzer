import { useLocation, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { DOMAIN_PROJECTS } from "../lib/domainProjects";
import { getRoadmapForMissingSkills } from "../utils/aiRoadmap";
import {
  ArrowLeft,
  CheckCircle2,
  Plus,
  Target,
  BookOpen,
  Calendar,
  ChevronRight,
} from "lucide-react";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No Analysis Results</h2>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  const domain = (result.domain || "").toLowerCase();
  const domainProjects = DOMAIN_PROJECTS[domain];

  // 🔥 Generate AI roadmap from missing skills
  const roadmaps = getRoadmapForMissingSkills(
    result.missingSkills.map((s: any) => s.skill)
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b sticky top-0 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
          <h1 className="font-bold">Analysis Results</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Score */}
        <Card className="p-8 mb-8 text-center border-2">
          <Target className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Match Score</h2>
          <div className={`text-6xl font-bold ${getScoreColor(result.matchScore)}`}>
            {result.matchScore}%
          </div>
          <p className="mt-3 text-sm">
            Detected Domain: <strong>{domain}</strong>
          </p>
        </Card>

        {/* Skills */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Matched */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex gap-2">
              <CheckCircle2 className="text-green-500" />
              Matched Skills
            </h3>
            {result.matchedSkills.map((s: any) => (
              <div key={s.skill} className="p-2 border rounded mb-2">
                {s.skill}
              </div>
            ))}
          </Card>

          {/* Missing */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex gap-2">
              <BookOpen className="text-amber-500" />
              Missing Skills
            </h3>
            {result.missingSkills.map((s: any) => (
              <div key={s.skill} className="p-2 border rounded mb-2">
                {s.skill}
              </div>
            ))}
          </Card>

          {/* Additional */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex gap-2">
              <Plus className="text-blue-500" />
              Additional Skills
            </h3>
            {result.additionalSkills.map((s: any) => (
              <div key={s.skill} className="p-2 border rounded mb-2">
                {s.skill}
              </div>
            ))}
          </Card>

        </div>

        {/* AI Roadmap */}
        {roadmaps.length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="font-semibold text-lg mb-6 flex gap-2">
              <Calendar />
              AI Generated Learning Roadmap
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((item: any) => (
                <div key={item.skill} className="border rounded-lg p-4">

                  <h4 className="font-semibold mb-3 text-primary">
                    {item.skill}
                  </h4>

                  {/* Learning Roadmap */}
                  {item.roadmap.length > 0 && (
                    <ul className="space-y-2 text-sm">
                      {item.roadmap.map((step: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <ChevronRight className="w-4 h-4 mt-1" />
                          Week {i + 1}: {step}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Interview / Process Suggestions */}
                  {item.suggestions.length > 0 && (
                    <ul className="space-y-2 text-sm">
                      {item.suggestions.map((tip: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <ChevronRight className="w-4 h-4 mt-1" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Domain Projects */}
        {domainProjects && (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">
              🚀 Recommended Projects
            </h3>

            <p>
              <strong>Mini Project:</strong> {domainProjects.miniProject}
            </p>

            <p className="mt-2">
              <strong>Major Project:</strong> {domainProjects.majorProject}
            </p>
          </Card>
        )}

      </main>
    </div>
  );
}