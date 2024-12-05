export type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  DOB: string;
  avatar?: string;
  banner?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  followers?: string[];
};

export type Media = {
  mediaId: string;
  url: string;
  tweetId: string;
  createdAt?: string;
  updatedAt: string;
};

export type Like = {
  userId: string;
  tweetId: string;
  likedAt: string;
};

export type Comment = {
  userId: string;
  tweetId: string;
};
export type Tweet = {
  _id: string;
  caption: string;
  userId: string;
  media?: Media[];
  likes?: Like[];
  comments?: Comment[];
  createdAt?: string;
  updatedAt: string;
  parentTweetId?: string;
};

export type Auth = {
  email: string;
  password: string;
};

export const MAX_IMAGES = 3;
export const MAX_CAPTION_LENGTH = 105;

export const defaultUser = {
  _id: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  DOB: "",
  email: "",
  createdAt: "",
  updatedAt: "",
};

export type CreateUserResponse = {
  success: boolean;
  message?: string;
};
export type AuthUserResponse = {
  success: boolean;
  data: User;
  message: string;
};

export type UserStore = {
  users: User[];
  user: User;
  setUser: (user: User) => void;
  createUser: (newUser: User) => Promise<CreateUserResponse | null>;
  authUser: ({ email, password }: Auth) => Promise<AuthUserResponse | null>;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  logoutUser: () => Promise<CreateUserResponse | null>;
};
