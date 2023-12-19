import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/github-stats', async (req, res) => {
    try {
        const response = await fetch('https://github-readme-stats.vercel.app/api?username=yanoojp&show_icons=true&count_private=true');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        res.setHeader('Content-Type', response.headers.get('Content-Type'));
        
        response.body.pipe(res);
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        res.status(500).send('Error fetching data');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
