import { Metadata } from "next";
import { getJob } from "../../../../lib/jobs";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

const realImage =
  "https://stc-nonsens-s3-dev.s3.us-east-1.amazonaws.com/job/18973/shareJobPost.jpg";

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

  return {
    title: `Guido was here. ${job.title} at ${job.company}`,
    description: `Guido was here I hate linkedin with all my heart. ${job.description}`,
    openGraph: {
      title: `Guido was also here. ${job.title} at ${job.company}`,
      description: job.description,
      type: "article",
      url,
      images: [
        {
          url: realImage,
          width: 1200,
          height: 630,
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
      <img src={realImage} alt={job.title} className="mt-6 rounded" />
    </main>
  );
}
