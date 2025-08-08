import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
    try {
        const formData = await request.formData()
        const authorization = request.headers.get('authorization')

        // استخراج الـ Authorization header

        if (!authorization) {
            return NextResponse.json({
                success: false,
                message: 'Authorization token required'
            }, { status: 401 })
        }

        // استدعاء الـ API الخارجي
        const externalResponse = await fetch('https://rasidweather.com/api/set/liked/article', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': authorization,
                'ik': '7fG2TnI9lR6dE5kO3jW8qZ4xY1vB0cXp',
            },
            body: formData
        })

        if (!externalResponse.ok) {
            const errorText = await externalResponse.text()
            console.error('External API error:', errorText)
            throw new Error(`External API error: ${externalResponse.status}`)
        }

        const data = await externalResponse.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error('Error toggling article like:', error)
        return NextResponse.json({
            success: false,
            message: 'خطأ في تبديل الإعجاب'
        }, { status: 500 })
    }
}
