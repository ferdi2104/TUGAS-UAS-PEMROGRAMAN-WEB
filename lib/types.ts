export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  runtime: string;
  rating: number;
  genre: string;
  subgenre: string | null;
  imageUrl: string;
  videoUrl: string | null;
  tag: string | null;
  featured: boolean;
}

export interface Comment {
  id: string;
  movieId: string;
  username: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Category {
  id?: string;
  name: string;
  icon: string;
  description: string | null;
  color: string;
  tag: string;
}
