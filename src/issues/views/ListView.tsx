import { useState } from "react"
import { LoadingIcon } from "../../share/components/LoadingIcon"
import { IssueList, LabelPicker } from "../components"
import { useIssues } from "../hooks"

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const { issuesQuery } = useIssues()

  const handleChange = (labelName: string) => {
    if (selectedLabels.includes(labelName)) {
      setSelectedLabels((prev) => prev.filter((label) => label !== labelName))
    } else {
      setSelectedLabels((prev) => [...prev, labelName])
    }
  }

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList issues={issuesQuery.data || []} />
        )}
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={handleChange} />
      </div>
    </div>
  )
}
