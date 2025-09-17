// lib/jobs.ts

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  image: string;
};

// Fake job data
const jobs: Job[] = [
  {
    id: "1",
    title: "Electrician",
    company: "Bright Sparks Ltd.",
    location: "New York, NY",
    description:
      "We are looking for a skilled electrician to join our growing team. Must have experience with residential wiring and troubleshooting.",
    image: "https://i.imgur.com/mTSRunG.jpg",
  },
  {
    id: "2",
    title: "Plumber",
    company: "Pipe Pros Inc.",
    location: "Chicago, IL",
    description:
      "Join our plumbing experts. Work on a variety of residential and commercial projects. Experience in pipe fitting required.",
    image: "https://i.imgur.com/mTSRunG.jpg",
  },
  {
    id: "3",
    title: "Welder",
    company: "SteelWorks Co.",
    location: "Houston, TX",
    description:
      "Seeking an experienced welder for structural and fabrication projects. Must know MIG and TIG welding techniques.",
    image: "https://i.imgur.com/mTSRunG.jpg",
  },
];

// Simulate async DB/API fetch
export async function getJob(id: string): Promise<Job | null> {
  await new Promise((resolve) => setTimeout(resolve, 200)); // fake delay
  return jobs.find((job) => job.id === id) ?? null;
}

export async function getAllJobs(): Promise<Job[]> {
  await new Promise((resolve) => setTimeout(resolve, 200)); // fake delay
  return jobs;
}
