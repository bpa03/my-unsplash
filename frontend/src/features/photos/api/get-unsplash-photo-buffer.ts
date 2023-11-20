export default async function getUnsplashPhotoBuffer(download: string): Promise<{buffer: ArrayBuffer; filename: string}> {
	const response = await fetch(download, {
		headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNPLASH_ACCESS_KEY}`
    },
    method: 'GET'
	})

	if (!response.ok) {
		throw new Error('Error on get download image')
	}

	const {url} = await response.json()
	const {searchParams, pathname} = new URL(url)
	const extension = searchParams.get('fm')
	const file = pathname.split('/')[1]
	const filename = `${file}.${extension}`

	const photo = await fetch(url)
	const buffer = await photo.arrayBuffer()

	return {buffer, filename}
}