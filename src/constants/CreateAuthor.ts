export type DPost = {
    title:string,
    description:string,
    avatar:string,
    author_id:number
}

export type DPosts = DPost[]
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};


export type PostState = {
  posts: DPosts;
  loading: boolean;
  error: string | null;
  pagination: Pagination;
};