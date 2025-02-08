export async function searchPeople(query: string) {
  try {
    const res = await fetch(`https://api.example.com/people?query=${query}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch people data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching people:", error);
    return null;
  }
}
