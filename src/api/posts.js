const COHORT_NAME = '2301-FTB-ET-WEB-AM';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export async function fetchAllPosts(){
    try {
        const response = await fetch(`${BASE_URL}/posts`)
        const result = await response.json();
        console.log('Getting posts result: ',result);
        return result.data.posts;
      } catch (error) {
        console.log('Error retrieving posts: ',error)
      }
}

export async function makePost(token,postObj){
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title: postObj.title,
          description: postObj.description,
          price: postObj.price,
          willDeliver: postObj.willDeliver
        }
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.log('Error making a post: ',error)
  }
}