export const CrochetLoaders = async () => {
    try {
    const res = await fetch('http://localhost:4000/Products');
        if (!res.ok) {
            return {
                error: {
                    status: res.status,
                    message: res.statusText || "Failed to fetch recipes.",
                },
            };
        }

    const data = await res.json();
        if (!data || data.length === 0) {
            return {
                error: {
                    status: 404,
                    message: "No recipes found!",
                },
            };
        }

        return { data };
    } catch (err) {
        return {
            error: {
                status: 500,
                message: "Something went wrong while loading recipes.",
            },
        };
    }
};