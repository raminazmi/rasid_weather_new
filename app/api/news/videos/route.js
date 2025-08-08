import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const onlyVideo = searchParams.get('only_video') || '1'

        const response = await fetch(`https://rasidweather.com/api/news?only_video=${onlyVideo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'ik': '7fG2TnI9lR6dE5kO3jW8qZ4xY1vB0cXp',
            }
        })

        if (response.ok) {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            throw new Error('Failed to fetch from external API')
        }
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch video news' },
            { status: 500 }
        )
    }
}
