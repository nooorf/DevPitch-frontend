export const isValidGitHubUrl = (url: string): boolean => {
    // Regular expression to match GitHub repository URLs with optional .git extension
    const githubUrlRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\.git)?$/;
    return githubUrlRegex.test(url);
}; 