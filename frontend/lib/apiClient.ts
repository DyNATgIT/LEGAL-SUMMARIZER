export async function summarizeContract(file: File) {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("http://localhost:8000/api/summarize", {
        method: "POST",
        body: form,
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json(); // { summary, risk_flags, extracted_clauses }
}
