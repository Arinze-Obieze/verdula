export default async function Payment(req, res) {
    // Accept only Post requests
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    try {
        // Send the post request to the Paystack API using Fetch

        const url = 'https://api.paystack.co/transaction/initialize';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        // Handle the response data
        if (response.ok) {
            const responseData = await response.json();
            console.log('API Response  from server', responseData);
            res.status(200).json(responseData);
        } else {
            console.log('Error sending data:', response.statusText);
            res.status(response.status).json({ error: 'An error occurred while initializing the transaction' });
        }
    } catch (error) {
        console.error('Error sending data:', error.message);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
}
