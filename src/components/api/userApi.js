/* eslint-disable consistent-return */
export const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`https://api.github.com/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export const fetchFollowers = async (followersUrl) => {
    try {
        const response = await fetch(followersUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching followers data:", error);
    }
};

export const fetchFollowing = async (followingUrl) => {
    try {
        const response = await fetch(followingUrl.replace("{/other_user}", ""));
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching following data:", error);
    }
};

export const fetchRepos = async (reposUrl) => {
    try {
        const response = await fetch(reposUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching repos data:", error);
    }
};
