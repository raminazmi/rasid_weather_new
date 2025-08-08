import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        const { id } = params
        const response = await fetch(`https://rasidweather.com/api/news/show/${id}`, {
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
                    message: `External API error: ${response.status}`,
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
                message: 'Internal server error',
                error: error.message
            },
            { status: 500 }
        )
    }
}
