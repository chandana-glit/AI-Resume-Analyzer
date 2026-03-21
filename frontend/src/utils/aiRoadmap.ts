export const skillRoadmaps: Record<string, string[]> = {

"tensorflow": [
"Learn Python libraries like NumPy and Pandas",
"Understand machine learning concepts and neural networks",
"Learn TensorFlow basics and model training",
"Build a small project like image classification"
],

"python": [
"Learn Python syntax, variables, and control structures",
"Understand functions, modules, and file handling",
"Practice data structures like lists, dictionaries, and sets",
"Build small projects like a calculator or file organizer"
],

"sql": [
"Learn database fundamentals and relational databases",
"Understand SQL queries (SELECT, INSERT, UPDATE, DELETE)",
"Practice joins, grouping, and filtering data",
"Build a small project using a database system"
],

"react": [
"Learn JavaScript ES6 concepts",
"Understand React fundamentals like components and props",
"Learn state management and hooks",
"Build a small React web application"
],

"aws": [
"Learn cloud computing basics",
"Understand AWS core services (EC2, S3, IAM)",
"Deploy a simple web application on AWS",
"Monitor and manage resources"
],

"docker": [
"Learn containerization concepts",
"Understand Docker images and containers",
"Write Dockerfiles and run containers",
"Deploy a small containerized app"
],

"git": [
"Learn version control basics",
"Understand commits, branches, and merges",
"Practice GitHub workflows",
"Collaborate on a small project"
],

};


// Topics that are NOT learnable skills
// (interview stages, hiring processes etc.)
const processKeywords = [
"interview",
"screening",
"hiring",
"round",
"assessment",
"test",
"recruitment"
];


// Suggestions for those topics instead of a roadmap
function getPreparationSuggestions(topic: string): string[] {
return [
`Practice coding related to ${topic} on platforms like LeetCode or HackerRank`,
"Use mock interview platforms like Pramp or Interviewing.io",
"Review common interview questions and system design basics",
"Practice explaining your thought process while solving problems"
];
}


// Detect if a topic is a recruitment process
function isProcessTopic(skill: string): boolean {
const lower = skill.toLowerCase();
return processKeywords.some(keyword => lower.includes(keyword));
}


// Generate roadmap for learnable skills
export function generateRoadmap(skill: string): string[] {

const roadmap = skillRoadmaps[skill.toLowerCase()];

if (!roadmap) {
return [
`Learn fundamentals of ${skill}`,
`Practice core concepts of ${skill}`,
`Build small exercises using ${skill}`,
`Create a mini project using ${skill}`
];
}

return roadmap;

}


// Main function used by Results page
export function getRoadmapForMissingSkills(skills: string[]) {

const fastMode = skills.length > 4; // if many skills, compress roadmap

return skills.map((skill) => {

if (isProcessTopic(skill)) {
return {
skill,
roadmap: [],
suggestions: getPreparationSuggestions(skill)
};
}

let roadmap = generateRoadmap(skill);

// compress roadmap if too many skills
if (fastMode) {
roadmap = roadmap.slice(0, 2);
}

return {
skill,
roadmap,
suggestions: []
};

});

}