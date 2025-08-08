import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const authorization = request.headers.get('authorization')

        if (!authorization) {
            return NextResponse.json({
                success: false,
                message: 'Authorization token required'
            }, { status: 401 })
        }

        const externalResponse = await fetch('https://rasidweather.com/api/user', {
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
        console.error('Error fetching user profile:', error)
        return NextResponse.json({
            success: false,
            message: 'خطأ في جلب بيانات المستخدم'
        }, { status: 500 })
    }
}
