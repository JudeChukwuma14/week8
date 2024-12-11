const apiKey = 'a5969c0527msh5eeb0186b57aa82p1289cejsnd5be4ded650f';
const apiHost = 'youtube-v31.p.rapidapi.com';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost,
  },
};

// Fetch and display videos
async function fetchVideos(query = '') {
  const url = `https://${apiHost}/search?part=id%2Csnippet&type=video&maxResults=50&q=${query}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayVideos(data.items);
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}

// Display videos in a grid
function displayVideos(videos) {
  const container = document.getElementById('video-container');
  container.innerHTML = '';

  videos.forEach((video) => {
    const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
    const videoId = video.id.videoId;

    const videoCard = `
      <div class="video-card">
        <img src="${thumbnails.high.url}" alt="${title}" class="thumbnail">
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
        <div class="video-info">
          <div class="video-title">${title}</div>
          <div class="channel-name">${channelTitle}</div>
          <div class="video-date">${new Date(publishedAt).toLocaleDateString()}</div>
        </div>
      </div>
    `;
    container.innerHTML += videoCard;
  });
}

// Add search functionality
document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  fetchVideos(query);
});

// Initial fetch
fetchVideos();
