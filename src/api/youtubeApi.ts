export const fetchYoutubeVideoDetails = async (videoId: string) => {
    const vidurl = `https://www.youtube.com/watch?v=${videoId}`
    const response = await fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`, {
        method: 'GET',
    })
    return await response.json()
}