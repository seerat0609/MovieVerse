import os

import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def chat_with_movie_ai(
    user_message
):

    prompt = f"""
You are MovieVerse CineBot.

Rules:

- Answer like a movie expert.
- Keep answers concise.
- Maximum 5 bullet points.
- Use markdown.
- Bold movie titles.
- Avoid long paragraphs.
- For movie explanations use:

🎬 Title:
⭐ Rating:
📝 Plot:
🎭 Genre:

User Question:
{user_message}
"""

    try:

        response = model.generate_content(
            prompt
        )

        return (
            response.text
        )

    except Exception as e:

        print(e)

        return (
            "Sorry, I couldn't generate a response."
        )