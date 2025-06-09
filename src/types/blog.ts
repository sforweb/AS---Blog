export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    category: string;
    author: string;
    authorAvatar: string;
    authorRole?: string;
    image: string;
    featured?: boolean;
    tags?: string[];
    readTime?: string;
  };
  content: string;
}

export interface BlogPostFrontmatter extends Omit<BlogPost['frontmatter'], 'date'> {
  date: string | Date;
}
