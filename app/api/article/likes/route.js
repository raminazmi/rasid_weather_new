import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const article_id = searchParams.get('article_id')
        const authorization = request.headers.get('authorization')

        if (!article_id) {
            return NextResponse.json({
                success: false,
                message: 'article_id is required'
            }, { status: 400 })
        }

        const externalResponse = await fetch(`https://rasidweather.com/api/article/likes?article_id=${article_id}`, {
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
        console.error('Error fetching article likes:', error)
        return NextResponse.json({
            success: false,
            message: 'خطأ في جلب الإعجابات'
        }, { status: 500 })
    }
}
