import { notFound } from "next/navigation";
import { BannerFrame } from "@/components/BannerFrame";
import { posts } from "@/data/journal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Journal" };
}

export default async function JournalPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <div className="mx-auto max-w-5xl px-4 pt-8 md:px-6 md:pt-12">
        <BannerFrame
          src={post.image}
          alt={post.title}
          className="rounded-3xl shadow-sm ring-1 ring-forest/10"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 space-y-5 text-muted leading-relaxed">
        <p className="text-xs uppercase tracking-[0.28em] text-leaf">{post.category}</p>
        <h1 className="font-serif text-4xl text-forest md:text-5xl">{post.title}</h1>
        {post.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
