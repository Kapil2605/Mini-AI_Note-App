export const summarizeText = async (text: string): Promise<string> => {
    const res = await fetch("/api/deepseek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (res.ok) {
      return data.summary || text;  // agar summary nahi mili to wahi text return karo
    } else {
      return text;  // error hua to bhi original text return karo
    }
};
