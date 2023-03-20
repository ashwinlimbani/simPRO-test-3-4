export interface Comment {
  body: string;
  id: number;
  postId: number;
  user: { id: number; username: string };
}
