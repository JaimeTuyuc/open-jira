
import { db } from '@/database'
import { Entry, IEntry } from '../../../models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
            return postEntry(req, res)
        default:
            return res.status(400).json({ message: 'Invalid endpoint' })
    }
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description = '' } = req.body
    const newEntry = new Entry({
        description: description,
        createdAt: Date.now(),
    })
    
    try {
        await db.connect()
        await newEntry.save()
        await db.disconnect()
        return res.status(201).json(newEntry)
    } catch (error) {
        console.log(error, 'Unable to save your entry')
        await db.disconnect()
        return res.status(500).json({ message: 'Something went wrong, try again later '})
    }
}

const getEntries = async (res:NextApiResponse) => {
    await db.connect()
    const entries = await Entry.find().sort({ createdAt: 'ascending'})
    // Disconect to DB
    await db.disconnect()
    // Return data
    res.status(200).json(entries)
}
