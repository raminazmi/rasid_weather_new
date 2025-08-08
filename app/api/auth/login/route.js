import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
    try {
        const body = await request.json()
        const { username, password } = body

        if (!username || !password) {
            return NextResponse.json({
                success: false,
                message: 'اسم المستخدم وكلمة المرور مطلوبان'
            }, { status: 400 })
        }

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        const response = await fetch(`https://rasidweather.com/api/login`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'ik': '7fG2TnI9lR6dE5kO3jW8qZ4xY1vB0cXp',
            }
        })

        if (response.ok) {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            const errorText = await response.text()
            console.error('External API Error:', response.status, errorText)
            return NextResponse.json(
                {
                    success: false,
                    message: `خطأ في تسجيل الدخول: ${response.status}`,
                    error: errorText
                },
                { status: response.status }
            )
        }
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'خطأ في الخادم الداخلي',
                error: error.message
            },
            { status: 500 }
        )
    }
}
