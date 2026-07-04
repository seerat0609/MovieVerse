const API_URL = "https://movieverse-51ns.onrender.com";

export async function getRecommendations(
  movieName
) {
  const response = await fetch(
    `${API_URL}/recommend/${movieName}`
  );

  const data =
    await response.json();

  return data;
}

export async function sendChatMessage(
  message
) {
  const response = await fetch(
    `${API_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        message,
      }),
    }
  );

  const data =
    await response.json();

  return data;
}