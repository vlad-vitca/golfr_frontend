import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useUserScores from '../../lib/useUserScores'
import { USER_SCORES_URL } from '../../lib/useUserScores'

const GolferScores = () => {
  const router = useRouter()
  const { userid } = router.query
  const { name, scores, error } = useUserScores(userid)

  if (error) {
    return <Layout> {error.info.errors} </Layout>
  }

  return (
    <Layout>
      {
        name && (
          <>
            <h1> The scores of user {name}: </h1>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={name}
                fetchUrl={USER_SCORES_URL(userid)}
              />
            ))}
          </>
        )
      }
    </Layout>
  )
}

export default GolferScores
