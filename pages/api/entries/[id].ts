

import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = 
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query 

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID provided' })
    }
    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)
        case 'GET':
            return getSingleEntry(req,res)
        default:
            return res.status(400).json({ message: 'Invalid endpoint' })
    }
}

const getSingleEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    await db.connect()
    const entryFound = await Entry.findById(id);

    if (!entryFound) {
        return res.status(400).json({ message: 'No entry found with the giving ID'})
    }
    await db.disconnect()
    return res.status(200).json(entryFound)
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query 
    await db.connect()
    const entyToUpdate = await Entry.findById(id)
    if (!entyToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No entry found with that ID'})
    }

    const { description = entyToUpdate.description, status = entyToUpdate.status } = req.body

    try {
        const updatedEntryResult = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconnect()
        return res.status(200).json(updatedEntryResult!)
    } catch (error) {
        await db.disconnect()
        console.log(error, 'Unable to update your entry')
        return res.status(500).json({ message: 'Something went wrong, try again later '})
    }
}