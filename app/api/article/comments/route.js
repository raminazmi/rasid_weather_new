import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const articleId = searchParams.get('article_id')

        if (!articleId) {
            return NextResponse.json({
                success: false,
                message: 'Article ID is required'
            }, { status: 400 })
        }

        const response = await fetch(`https://rasidweather.com/api/article/comments?article_id=${articleId}`, {
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
            const errorText = await response.text()
            console.error('External API Error:', response.status, errorText)
            return NextResponse.json(
                {
                    success: false,
                    message: `خطأ في جلب التعليقات: ${response.status}`,
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

export async function POST(request) {
    try {
        const body = await request.json()
        const { article_id, content, token } = body

        if (!article_id || !content) {
            return NextResponse.json({
                success: false,
                message: 'Article ID and content are required'
            }, { status: 400 })
        }

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'يجب تسجيل الدخول لإضافة تعليق'
            }, { status: 401 })
        }

        const formData = new FormData()
        formData.append('article_id', article_id)
        formData.append('content', content)

        const headers = {
            'Accept': 'application/json',
            'ik': '7fG2TnI9lR6dE5kO3jW8qZ4xY1vB0cXp',
            'Authorization': `Bearer ${token}`
        }

        const response = await fetch(`https://rasidweather.com/api/article/comments`, {
            method: 'POST',
            body: formData,
            headers: headers
        })

        if (response.ok) {
            const data = await response.json()
            return NextResponse.json(data)
        } else {
            const errorText = await response.text()
            let errorData = {}
            try {
                errorData = JSON.parse(errorText)
            } catch (e) {
                errorData = { message: errorText }
            }

            console.error('External API Error:', response.status, errorData)
            return NextResponse.json(
                {
                    success: false,
                    message: errorData.message || `خطأ في إضافة التعليق: ${response.status}`,
                    error: errorData
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