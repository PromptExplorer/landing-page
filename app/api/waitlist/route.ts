import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<Response> {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('waitlist')
    const collection = db.collection('emails')

    // Use a timeout promise to ensure the operation doesn't hang
    const timeout = new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Database operation timed out')), 4000)
    )

    const dbOperation = async (): Promise<Response> => {
      // Check if email already exists
      const existingEmail = await collection.findOne({ email })
      if (existingEmail) {
        return NextResponse.json(
          { message: 'Email already registered' },
          { status: 400 }
        )
      }

      // Add new email with timestamp
      await collection.insertOne({
        email,
        createdAt: new Date(),
      })

      return NextResponse.json(
        { message: 'Successfully joined waitlist' },
        { status: 200 }
      )
    }

    // Race between timeout and database operation
    return await Promise.race([dbOperation(), timeout])
  } catch (error) {
    console.error('Waitlist API Error:', error)
    
    // More specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message === 'Database operation timed out') {
        return NextResponse.json(
          { message: 'Service is temporarily busy. Please try again.' },
          { status: 503 }
        )
      }
    }
    
    return NextResponse.json(
      { message: 'Unable to process request. Please try again later.' },
      { status: 500 }
    )
  }
} 