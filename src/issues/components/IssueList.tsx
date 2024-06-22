import { Issue } from "../interfaces"
import { IssueItem } from "./IssueItem"

interface Props {
  issues: Issue[]
  selectedState?: string
  onSelectedStateChange: (state: string | undefined) => void
}

export const IssueList = ({
  issues,
  selectedState,
  onSelectedStateChange,
}: Props) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${!selectedState && "active"}`}
              onClick={() => onSelectedStateChange(undefined)}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${selectedState === "open" && "active"}`}
              onClick={() => onSelectedStateChange("open")}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${selectedState === "closed" && "active"}`}
              onClick={() => onSelectedStateChange("closed")}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}
