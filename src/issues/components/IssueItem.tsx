import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { Issue } from "../interfaces"

interface Props {
  issue: Issue
}

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate()
  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === "open" && <FiInfo size={30} color="green" />}
        {issue.state === "closed" && <FiCheckCircle size={30} color="purple" />}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened 2 days ago by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  )
}
