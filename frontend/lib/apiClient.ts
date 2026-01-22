export async function summarizeContract(file: File) {
    const form = new FormData();
    form.append("file", file);

    let API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    if (API_URL.endsWith("/")) {
        API_URL = API_URL.slice(0, -1);
    }

    try {
        const res = await fetch(`${API_URL}/api/summarize`, {
            method: "POST",
            body: form,
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server error (${res.status}): ${errorText || res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("API Call Failed:", error);
        throw error;
    }
}
