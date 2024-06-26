'use server'

export async function fetchSearchedUsers(query: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
      method: 'POST',
      headers: {
        // Authorization: bearerToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm: query }),
    })
    if (response.ok) {
      const result = await response.json()
      // console.log('this should search for users ====', result)
      return result
    }
  } catch (err) {
    console.log(err)
    console.error(err, 'FAILED TO SEARCH FOR USERS')
  }
}
