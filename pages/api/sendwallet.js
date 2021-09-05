import axios from 'axios'
export default async function handler(req, res) {
  let status
  if (req.method === 'POST') {
    try {
      const res = await axios.post(
        `https://discord.com/api/webhooks/${process.env.WEBHOOK_URL}`,
        {
          content: `discord: ${req.query.discord}; wallet: ${req.query.wallet}`
        }
      )
      status = [
        200,
        'Successfully submitted. You will receive your role once you are verified.',
        'status-green'
      ]
    } catch (err) {
      status = [500, 'Server Error', 'status-red']
    }
  } else {
    status = [400, 'There was an error.', 'status-red']
  }
  res.status(status[0]).json({ msg: status[1], color: status[2] })
}
