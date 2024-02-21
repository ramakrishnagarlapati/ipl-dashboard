// Write your code here
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {useState, useEffect} from 'react'
import MatchCard from '../MatchCard'
import './index.css'

function TeamMatches() {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [teamMatches, setTeamMatches] = useState([])
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json()

      const convertResponseObject = object => ({
        umpires: object.umpires,
        result: object.result,
        manOfTheMatch: object.man_of_the_match,
        id: object.id,
        date: object.date,
        venue: object.venue,
        competingTeam: object.competing_team,
        competingTeamLogo: object.competing_team_logo,
        // use value of the key 'competing_team' for alt as `latest match ${competing_team}`
        firstInnings: object.first_innings,
        secondInnings: object.second_innings,
        matchStatus: object.match_status,
      })
      const {
        team_banner_url: teamBannerUrl,
        latest_match_details: latestMatchDetails,
        recent_matches: recentMatches,
      } = data
      setTeamMatches({
        teamBannerUrl,
        latestMatchDetails: convertResponseObject(latestMatchDetails),
        recentMatches: recentMatches.map(eachItem =>
          convertResponseObject(eachItem),
        ),
      })
      setIsLoading(false)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])
  console.log(teamMatches)
  return (
    <div className={`team-matches-container ${id}-background`}>
      {isLoading ? (
        <div>
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <div className="team-matches-content-wrapper">
          <img
            src={teamMatches.teamBannerUrl}
            className="team-banner-img"
            alt="team banner"
          />
          <div className="latest-matches-container">
            <h1 className="latest-matches-heading">Latest Matches</h1>
            <div className="latest-match-details">
              <div className="latest-match-details-left">
                <div>
                  <p className="competing-team">
                    {teamMatches.latestMatchDetails.competingTeam}
                  </p>
                  <p className="match-date">
                    {teamMatches.latestMatchDetails.date}
                  </p>
                  <p className="match-venue">
                    {teamMatches.latestMatchDetails.venue}
                  </p>
                  <p className="match-result">
                    {teamMatches.latestMatchDetails.result}
                  </p>
                </div>
                <img
                  src={teamMatches.latestMatchDetails.competingTeamLogo}
                  alt={`latest match ${teamMatches.latestMatchDetails.competingTeam}`}
                  className="competing-team-logo"
                />
              </div>
              <ul className="latest-match-key-points-list">
                <li className="latest-match-key-item">
                  <p className="latest-match-key-item-heading">First Innings</p>
                  <p className="latest-match-key-item-value">
                    {teamMatches.latestMatchDetails.firstInnings}
                  </p>
                </li>
                <li className="latest-match-key-item">
                  <p className="latest-match-key-item-heading">
                    Second Innings
                  </p>
                  <p className="latest-match-key-item-value">
                    {teamMatches.latestMatchDetails.secondInnings}
                  </p>
                </li>
                <li className="latest-match-key-item">
                  <p className="latest-match-key-item-heading">
                    Man of the Match
                  </p>
                  <p className="latest-match-key-item-value">
                    {teamMatches.latestMatchDetails.manOfTheMatch}
                  </p>
                </li>
                <li className="latest-match-key-item">
                  <p className="latest-match-key-item-heading">Umpires</p>
                  <p className="latest-match-key-item-value">
                    {teamMatches.latestMatchDetails.umpires}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <ul className="recent-macthes-list">
            {teamMatches.recentMatches.map(eachMatch => (
              <MatchCard key={eachMatch.id} recentMatchDetails={eachMatch} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TeamMatches
