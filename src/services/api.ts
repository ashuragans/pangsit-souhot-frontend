const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL;

async function fetchData(endpoint: string) {
  if (!STRAPI_URL) {
    console.error("VITE_STRAPI_API_URL is not configured. Please ensure it is set in your .env file and that the file is in the project root.");
    return null;
  }
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    if (!response.ok) {
      console.error(`API Error for ${endpoint}: ${response.status} ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Network error or invalid JSON for ${endpoint}:`, error);
    return null;
  }
}

export async function registerUser(userData: any) {
  const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function loginUser(userData: any) {
  const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}

export async function getMe(token: string) {
  const response = await fetch(`${STRAPI_URL}/api/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

export function getPublishedReviews() {
  return fetchData('reviews?populate=*');
}

export function getSocialPosts() {
  return fetchData('social-posts?populate=*');
}

export async function submitReview(review: { name: string; rating: number; text: string; }) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // *** THE FIX IS HERE: 'is_published' is now true by default ***
      body: JSON.stringify({ data: { ...review, is_published: true } }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit review: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in submitReview:", error);
    throw error;
  }
}