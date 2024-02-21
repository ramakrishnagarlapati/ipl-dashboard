// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

function TeamCard({teamDetails}) {
  return (
    <Link to={`/team-matches/${teamDetails.id}`} className="team-card-link">
      <li className="team-card">
        <img
          src={teamDetails.teamImageUrl}
          className="team-image"
          alt={`${teamDetails.name}`}
        />
        <p className="team-name">{teamDetails.name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
