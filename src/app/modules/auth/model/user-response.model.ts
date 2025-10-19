export interface UserResponse {
  exists: boolean;
  user: User;
}

export interface User {
  id: string;
  email: string;
  createdAt: number;
}
