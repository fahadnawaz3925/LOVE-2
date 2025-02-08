"use server"

interface WikipediaResponse {
  query: {
    search: Array<{
      pageid: number
      title: string
      snippet: string
    }>
  }
}

interface WikipediaImageResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number
        title: string
        thumbnail?: {
          source: string
        }
        terms?: {
          description?: string[]
        }
      }
    }
  }
}

export async function searchWikipedia(query: string, limit = 10) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=${limit}&origin=*`

  try {
    const response = await fetch(searchUrl)
    const data: WikipediaResponse = await response.json()

    const results = await Promise.all(
      data.query.search.map(async (result) => {
        const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|pageterms&titles=${encodeURIComponent(result.title)}&format=json&pithumbsize=300&origin=*`
        const imageResponse = await fetch(imageUrl)
        const imageData: WikipediaImageResponse = await imageResponse.json()

        const page = Object.values(imageData.query.pages)[0]
        const image = page.thumbnail?.source
        const description = page.terms?.description?.[0]

        return {
          id: result.pageid,
          name: result.title,
          description: description || "No description available",
          image: image || null,
          birthDate: null, // We'd need to parse the content to get this information
          country: null, // We'd need to parse the content to get this information
        }
      }),
    )

    return results
  } catch (error) {
    console.error("Error fetching data from Wikipedia:", error)
    throw new Error("Failed to fetch data from Wikipedia: " + (error.message || "Unknown error"))
  }
}

