import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

// Replace this with your MongoDB Atlas connection string
const uri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db('waitlist')
    const collection = db.collection('emails')

    // Check if email already exists
    const existingEmail = await collection.findOne({ email })
    if (existingEmail) {
      await client.close()
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

    await client.close()

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 