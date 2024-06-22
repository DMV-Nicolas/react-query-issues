import { useQueryClient } from "@tanstack/react-query"
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { timeSince } from "../../helpers/time"
import { getIssue, getIssueComments } from "../hooks"
import { Issue } from "../interfaces"

interface Props {
  issue: Issue
}

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const preFetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number],
      queryFn: () => getIssue(issue.number),
    })
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number, "comments"],
      queryFn: () => getIssueComments(issue.number),
    })
  }

  const preSetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue)
  }

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={preSetData}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === "open" && <FiInfo size={30} color="green" />}
        {issue.state === "closed" && <FiCheckCircle size={30} color="purple" />}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened {timeSince(issue.created_at)} ago by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
          <div>
            {issue.labels.map((label) => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{
                  border: `1px solid #${label.color}`,
                  backgroundColor: `#${label.color}`,
                  color: "black",
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
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
