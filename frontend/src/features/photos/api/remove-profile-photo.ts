export default async function removeProfilePhoto(token: string, imageId: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error on remove photo')
  }
}