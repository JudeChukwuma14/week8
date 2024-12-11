const apiKey = 'YOUR_RAPIDAPI_KEY'; // Replace with your RapidAPI key
const apiHost = 'youtube-v31.p.rapidapi.com';
const container = document.getElementById('video-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Function to fetch videos
async function fetchVideos(query) {
  const url = `https://${apiHost}/search?part=snippet&q=${query}&type=video&maxResults=20`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    container.innerHTML = `<div class="text-danger">Error fetching videos: ${error.message}</div>`;
  }
}

// Function to display videos
function displayVideos(videos) {
  container.innerHTML = ''; // Clear previous results

  videos.forEach((video) => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.medium.url;
    const channelTitle = video.snippet.channelTitle;

    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
        <img src="${thumbnail}" alt="${title}">
      </a>
      <div class="video-card-title">${title}</div>
      <div class="video-card-channel">${channelTitle}</div>
    `;
    container.appendChild(videoCard);
  });
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchVideos(query);
  } else {
    alert('Please enter a search query!');
  }
});
