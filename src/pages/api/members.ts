import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page, security_firm_name, phone_number } = req.query;
    let url = `http://165.22.46.7/psra/members/show.php?page=${page}`;

    // If a security_firm_name is provided, add it to the URL
    if (security_firm_name) {
        url += `&security_firm_name=${encodeURIComponent(security_firm_name.toString())}`;
    }

    // If a phone_number is provided, add it to the URL
    if (phone_number) {
        url += `&phone_number=${encodeURIComponent(phone_number.toString())}`;
    }

    console.log(url)

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        res.json(data);

        console.log("data::", data)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { page, security_firm_name } = req.query;
//     let url = `http://165.22.46.7/psra/members/show.php?page=${page}`;

//     // If a security_firm_name is provided, add it to the URL
//     if (security_firm_name) {
//         url += `&security_firm_name=${encodeURIComponent(security_firm_name.toString())}`;
//     }

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();

//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }