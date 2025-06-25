const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("usernameInput");
const profileDiv = document.getElementById("profile");

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  
  if (username === "") {
    profileDiv.innerHTML = "<p>Please enter a username!</p>";
    return;
  }
  
  profileDiv.innerHTML = "<p>Loading...</p>";

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("User not found!");
      }
      return response.json();
    })
    .then(data => {
      profileDiv.innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar" />
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || 'No bio available'}</p>
        <p>Followers: ${data.followers} | Following: ${data.following}</p>
        <p>Public Repos: ${data.public_repos}</p>
        <a href="${data.html_url}" target="_blank">View on GitHub</a>
      `;
    })
    .catch(error => {
      profileDiv.innerHTML = `<p>${error.message}</p>`;
    });
});
