export interface Post {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    githubRepo: string;
    image: string;
    pitch: string;
    user: {
        _id: string;
        name: string;
        profilePicture: string;
        githubUsername: string;
    };
    tags: string[];
    views: number;
    reportCount: number;
    createdAt: string;
}
