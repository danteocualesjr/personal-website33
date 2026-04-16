import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

async function readPostFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR);
    return entries.filter((e) => e.endsWith(".mdx") || e.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await readPostFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(POSTS_DIR, file);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data } = matter(raw);
      const slug = file.replace(/\.(mdx|md)$/, "");
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? new Date().toISOString(),
        tags: (data.tags as string[]) ?? [],
      } satisfies PostMeta;
    })
  );
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = await readPostFiles();
  const file = files.find((f) => f.replace(/\.(mdx|md)$/, "") === slug);
  if (!file) return null;

  const fullPath = path.join(POSTS_DIR, file);
  const raw = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? new Date().toISOString(),
    tags: (data.tags as string[]) ?? [],
    content,
  };
}
