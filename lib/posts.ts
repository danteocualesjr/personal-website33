import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTimeMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const WORDS_PER_MINUTE = 225;

function countWords(text: string): number {
  const stripped = text
    // Drop fenced code blocks
    .replace(/```[\s\S]*?```/g, " ")
    // Drop inline code
    .replace(/`[^`]*`/g, " ")
    // Drop HTML/MDX tags
    .replace(/<[^>]+>/g, " ")
    // Drop markdown link/image syntax, keep link text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1");
  const words = stripped.match(/\b[\w'-]+\b/g);
  return words ? words.length : 0;
}

function estimateReadingTime(content: string): number {
  const words = countWords(content);
  if (words === 0) return 1;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

async function readPostFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR);
    return entries.filter((e) => e.endsWith(".mdx") || e.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await getAllPostsWithContent();
  return posts.map(({ content: _content, ...meta }) => meta);
}

export async function getAllPostsWithContent(): Promise<Post[]> {
  const files = await readPostFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(POSTS_DIR, file);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.(mdx|md)$/, "");
      return {
        slug,
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? new Date().toISOString(),
        tags: (data.tags as string[]) ?? [],
        readingTimeMinutes: estimateReadingTime(content),
        content,
      } satisfies Post;
    })
  );
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAdjacentPosts(slug: string): Promise<{
  prev: PostMeta | null;
  next: PostMeta | null;
}> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  // Posts are sorted newest-first: older post is at a larger index.
  return {
    prev: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
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
    readingTimeMinutes: estimateReadingTime(content),
    content,
  };
}
