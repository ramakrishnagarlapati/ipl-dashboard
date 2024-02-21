// Write your code here
import './index.css'

function MatchCard({recentMatchDetails}) {
  return (
    <li className="recent-match-card">
      <img
        src={recentMatchDetails.competingTeamLogo}
        alt={`competing team ${recentMatchDetails.competingTeam}`}
        className="competing-team-logo"
      />
      <p className="recent-match-card-team-name">
        {recentMatchDetails.competingTeam}
      </p>
      <p className="recent-match-card-result">{recentMatchDetails.result}</p>
      <p className="recent-match-card-status">
        {recentMatchDetails.matchStatus}
      </p>
    </li>
  )
}
export default MatchCard
