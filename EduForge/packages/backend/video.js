const { YoutubeTranscript } = require('youtube-transcript');

const getTranscript = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    res.json({ transcript });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
};

module.exports = {
  getTranscript,
};
