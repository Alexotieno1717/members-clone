import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query;
  const url = `http://165.22.46.7/psra/members/show.ph?page=${page}`;

  try {
    const securityFirmName = req.query.security_firm_name;

    const queryParams = new URLSearchParams();
    if (securityFirmName) queryParams.append('security_firm_name', securityFirmName.toString());

    const response = await fetch(`${url}?${queryParams}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
