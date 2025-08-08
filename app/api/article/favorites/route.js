import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const authorization = request.headers.get('authorization')
        const externalResponse = await fetch('https://rasidweather.com/api/article/favorites', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': authorization,
                'ik': '7fG2TnI9lR6dE5kO3jW8qZ4xY1vB0cXp',
            }
        })

        if (!externalResponse.ok) {
            throw new Error(`External API error: ${externalResponse.status}`)
        }

        const data = await externalResponse.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error('Error fetching article favorites:', error)
        return NextResponse.json({
            success: false,
            message: 'خطأ في جلب المفضلة'
        }, { status: 500 })
    }
}
