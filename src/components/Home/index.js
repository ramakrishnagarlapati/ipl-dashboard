// Write your code here
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

function Home() {
  const [teamsList, setTeamsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const data = await response.json()
      const {teams} = data
      setTeamsList(
        teams.map(eachTeam => ({
          id: eachTeam.id,
          name: eachTeam.name,
          teamImageUrl: eachTeam.team_image_url,
        })),
      )
      setIsLoading(false)
    }
    fetchData().catch(console.error)
  }, [])
  return (
    <div className="app-container">
      <div className="ipl-dashboard">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="logo-name">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams-list">
            {teamsList.map(eachTeam => (
              <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
