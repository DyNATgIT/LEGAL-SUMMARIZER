export async function summarizeContract(file: File) {
    const form = new FormData();
    form.append("file", file);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const res = await fetch(`${API_URL}/api/summarize`, {
        method: "POST",
        body: form,
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json(); // { summary, risk_flags, extracted_clauses }
}
