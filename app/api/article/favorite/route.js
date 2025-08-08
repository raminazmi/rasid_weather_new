import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
    try {
        const formData = await request.formData()
        const authorization = request.headers.get('authorization')

        if (!authorization) {
            return NextResponse.json({
                success: false,
                message: 'Authorization token required'
            }, { status: 401 })
        }

        const externalResponse = await fetch('https://rasidweather.com/api/set/favorite/article', {
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
        console.error('Error toggling article favorite:', error)
        return NextResponse.json({
            success: false,
            message: 'خطأ في تبديل المفضلة'
        }, { status: 500 })
    }
}
