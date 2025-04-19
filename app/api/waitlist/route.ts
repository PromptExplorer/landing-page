import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function POST(req: Request): Promise<Response> {
  try {
    console.log('API route started')
    const { email } = await req.json()
    console.log('Email received:', email)

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.log('Attempting MongoDB connection...')
    const client = await clientPromise
    console.log('MongoDB connected successfully')
    
    const db = client.db('waitlist')
    const collection = db.collection('emails')

    // Use a timeout promise to ensure the operation doesn't hang
    const timeout = new Promise<Response>((_, reject) =>
      setTimeout(() => {
        console.log('Operation timed out')
        reject(new Error('Database operation timed out'))
      }, 4000)
    )

    const dbOperation = async (): Promise<Response> => {
      console.log('Checking for existing email...')
      // Check if email already exists
      const existingEmail = await collection.findOne({ email })
      if (existingEmail) {
        console.log('Email already exists')
        return NextResponse.json(
          { message: 'Email already registered' },
          { status: 400 }
        )
      }

      console.log('Inserting new email...')
      // Add new email with timestamp
      await collection.insertOne({
        email,
        createdAt: new Date(),
      })
      console.log('Email inserted successfully')

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
      console.error('Error details:', error.message, error.stack)
    }
    
    return NextResponse.json(
      { message: 'Unable to process request. Please try again later.' },
      { status: 500 }
    )
  }
} 