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