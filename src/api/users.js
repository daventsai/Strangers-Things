const COHORT_NAME = '2301-FTB-ET-WEB-AM';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export async function registerUser(username,password){
    
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        });
        const result = await response.json();
        console.log('Registering user result: ', result);
        return result;
    } catch (error) {
        console.log('Error registering user: ', error);
    }

}

export async function loginUser(username,password){
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password
              }
            })
          });
          const result = await response.json();
          console.log('Logging in user result: ', result);
          return result;
    } catch (error) {
        console.log('Error logging in to user: ', error)
    }
}

export async function fetchMe(token) {
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        });
        const result = await response.json();
        console.log("Result of fetchMe: ", result);
        return result;
    } catch (error) {
        console.error(error);
    }
}