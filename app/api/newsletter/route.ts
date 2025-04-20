import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://zzl870624:JHvXM9tNFlfFOMW8@landing-page-cluster.v5swxyb.mongodb.net/?retryWrites=true&w=majority&appName=landing-page-cluster"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const client = new MongoClient(uri)
    
    try {
      await client.connect()
      const database = client.db('newsletter')
      const collection = database.collection('subscribers')

      // Check if email already exists
      const existingSubscriber = await collection.findOne({ email })
      
      if (existingSubscriber) {
        return NextResponse.json(
          { message: 'Email already subscribed' },
          { status: 400 }
        )
      }

      // Insert new subscriber
      await collection.insertOne({
        email,
        subscribedAt: new Date(),
      })

      return NextResponse.json(
        { message: 'Successfully subscribed to the newsletter' },
        { status: 200 }
      )
    } finally {
      await client.close()
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { message: 'Failed to subscribe to the newsletter' },
      { status: 500 }
    )
  }
} 