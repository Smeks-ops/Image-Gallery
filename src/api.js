const API_URL = process.env.REACT_APP_API_URL

//connect react frontend to backend
export const getImages = async () => {
  const response = await fetch(`${API_URL}/photos`);
  const responseJSON = await response.json();

  return responseJSON
}
