const API_URL = process.env.REACT_APP_API_URL

//connect react frontend to backend
export const getImages = async (nextCursor) => {
  //search (loadmore)
const params = new URLSearchParams();

if (nextCursor) {
  params.append('next_cursor', nextCursor)
}

  //api call
  const response = await fetch(`${API_URL}/photos?${params}`);
  const responseJSON = await response.json();

  return responseJSON
}
