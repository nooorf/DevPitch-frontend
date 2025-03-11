export interface Post {
    _id: string;
    title: string;
    description: string;
    category: string;
    link: string;
    image: string;
    views: number;
    createdAt: string;
    user: {
        _id: string;
        name: string;
        profilePicture: string;
        githubUsername: string;
    };
    reportCount: number;
    pitch: string;
}
