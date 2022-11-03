import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'

const sendData = async (req: NextApiRequest, res: NextApiResponse,) => {
    const session = await getSession({ req })
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
    );
    oauth2Client.setCredentials({
        // @ts-ignore
        refresh_token: session.refreshToken,
        // @ts-ignore
        access_token: session.accessToken,
    })
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client, })
    const resData = await calendar.calendarList.list()
    const calendars = resData.data.items;

    res.json({ calendars })
};

export default sendData