import { Metadata } from "next";
import { getJob } from "../../../../lib/jobs";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "This job posting does not exist.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/jobs/${job.id}`;

  // ⚡️ TEMPORARY: hardcode a real thumbnail_url from your backend
  const realImage =
    "https://stc-nonsens-s3-dev.s3.us-east-1.amazonaws.com/job/18360/shareJobPost.jpg";

  return {
    title: `${job.title} at ${job.company}`,
    description: job.description,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description,
      type: "article",
      url,
      images: [
        {
          url: realImage, // 👈 use real backend thumbnail_url here
          width: 655,
          height: 343,
          alt: `${job.title} at ${job.company}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.company}`,
      description: job.description,
      images: [realImage],
    },
  };
}

export default async function JobPage({ params }: Props) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return <h1>Job Not Found</h1>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p>
        {job.company} – {job.location}
      </p>
      <p className="mt-4">{job.description}</p>
      <img src={job.image} alt={job.title} className="mt-6 rounded" />
    </main>
  );
}
