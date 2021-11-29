import useSWR from 'swr'
import { getToken } from './userAuth'

export const USER_NAME_URL = userId => `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
export const USER_SCORES_URL = userId => `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/scores`


const fetcher = extractData => async url => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json().then(extractData)
}


const useUserScores = (userId) => {
  const { data: name, error } = useSWR(userId && USER_NAME_URL(userId), fetcher(data => data.name))
  const { data: scores } = useSWR(userId && USER_SCORES_URL(userId), fetcher(data => data.scores))

  return { name, scores, error }
}


export default useUserScores
