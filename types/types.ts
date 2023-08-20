declare global {
  interface GitUser {
    name: string;
    html_url: string;
    avatar_url: string;
    blog: string;
    public_repos: number;
    bio: string;
  }

  interface GitRepo {
    name: string;
    description: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    private: boolean;
    language: string | null;
    visibility: string;
  }

}

export {};
