import Link from "next/link";
import { BannerFrame } from "@/components/BannerFrame";
import { PageHero } from "@/components/PageHero";
import { posts } from "@/data/journal";

export const metadata = { title: "Giridhan Journal" };

export default function BlogPage() {
  return (
    <>
      <PageHero
        kicker="Giridhan Journal"
        title="Stories of Sustainability, Tradition & Impact"
        text="Goseva · Sustainable Living · Indian Heritage · Rural Entrepreneurship · Natural Products · Agriculture · Women Empowerment"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-forest/10 transition hover:-translate-y-1"
          >
            <BannerFrame src={post.image} alt={post.title} className="rounded-none" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-wider text-leaf">{post.category}</p>
              <h2 className="mt-2 font-serif text-3xl text-forest">{post.title}</h2>
              <p className="mt-3 text-muted">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
