import { NextResponse } from 'next/server'

// Add export for dynamic route handling
export const dynamic = 'force-dynamic'
export const revalidate = 0

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  console.log('Attempting to get access token...')
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
      // Disable fetch cache
      cache: 'no-store',
    })

    const data = await response.json()
    console.log('Access token response:', data)
    return data
  } catch (error) {
    console.error('Error getting access token:', error)
    throw error
  }
}

const getNowPlaying = async () => {
  console.log('Getting now playing...')
  try {
    const { access_token } = await getAccessToken()
    console.log('Got access token, fetching now playing...')

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      // Disable fetch cache
      cache: 'no-store',
    })

    console.log('Now playing response status:', response.status)
    return response
  } catch (error) {
    console.error('Error getting now playing:', error)
    throw error
  }
}

export async function GET() {
  try {
    console.log('Starting Spotify API request...')
    console.log('Using refresh token:', refresh_token?.slice(0, 10) + '...')
    
    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      console.log('No track playing or error:', response.status)
      return new NextResponse(
        JSON.stringify({ isPlaying: false }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        }
      )
    }

    const song = await response.json()
    console.log('Successfully got song data:', {
      isPlaying: song.is_playing,
      title: song.item?.name,
      artist: song.item?.artists?.[0]?.name,
      progress: song.progress_ms,
      duration: song.item?.duration_ms
    })

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ')
    const albumImageUrl = song.item.album.images[0].url
    const songUrl = song.item.external_urls.spotify
    const progress_ms = song.progress_ms
    const duration_ms = song.item.duration_ms

    return new NextResponse(
      JSON.stringify({
        isPlaying,
        title,
        artist,
        albumImageUrl,
        songUrl,
        progress_ms,
        duration_ms,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  } catch (error) {
    console.error('Error in GET route:', error)
    return new NextResponse(
      JSON.stringify({ isPlaying: false, error: 'Failed to fetch' }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  }
} 