export const fetchUsers = async (searchUser, userPerPage, page) => {
    try {
        const response = await fetch(
            `https://api.github.com/search/users?q=${searchUser}&per_page=${userPerPage}&page=${page}`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchMoreUsers = async (searchUser, userPerPage, nextPage) => {
    try {
        const response = await fetch(
            `https://api.github.com/search/users?q=${searchUser}&per_page=${userPerPage}&page=${nextPage}`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
