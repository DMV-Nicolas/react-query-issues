import { Link, useNavigate, useParams } from "react-router-dom"
import { LoadingIcon } from "../../share/components/LoadingIcon"
import { IssueComment } from "../components"
import { useIssue } from "../hooks"

export const IssueView = () => {
  const { id = "0" } = useParams()
  const { issueQuery, issueCommentsQuery } = useIssue(+id)
  const navigate = useNavigate()

  if (issueQuery.isLoading) {
    return <LoadingIcon />
  }

  if (!issueQuery.data) {
    return navigate("/issues/list")
  }

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros */}
      {issueCommentsQuery.isLoading && <LoadingIcon />}
      {issueCommentsQuery.data?.map((issue) => (
        <IssueComment key={issue.id} issue={issue} />
      ))}
    </div>
  )
}
