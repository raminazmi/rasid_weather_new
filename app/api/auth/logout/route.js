import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        // استخراج الـ Authorization header
        const authorization = request.headers.get('authorization')

        if (!authorization) {
            return NextResponse.json({
                success: false,
                message: 'Authorization token required'
            }, { status: 401 })
        }

        // استدعاء الـ API الخارجي
        const externalResponse = await fetch('https://rasidweather.com/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization,
                'ik': '7fG2TnI9lR6dE5kO3jW8qZ4xY1vB0cXp'
            }
        })

        if (!externalResponse.ok) {
            throw new Error(`External API error: ${externalResponse.status}`)
        }

        const data = await externalResponse.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error('Error logging out:', error)
        return NextResponse.json({
            success: false,
            message: 'خطأ في تسجيل الخروج'
        }, { status: 500 })
    }
}
