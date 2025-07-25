const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const recommendVideos = async (req, res) => {
  const { topic } = req.query;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: topic,
      type: 'video',
      maxResults: 5,
    });

    const videos = response.data.items.map(item => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
};

module.exports = {
  recommendVideos,
};
