import axios from 'axios';

export default async function handler(req, res) {
  const imageUrl = req.query.imageUrl;
  const { data } = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(data);
}