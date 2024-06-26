import { useState } from "react"
import { LoadingIcon } from "../../share/components/LoadingIcon"
import { IssueList, LabelPicker } from "../components"
import { useIssues } from "../hooks"

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState<string>()
  const { issuesQuery, page, handleNextPage, handlePrevPage } = useIssues({
    state: selectedState,
    labels: selectedLabels,
  })

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
          <IssueList
            issues={issuesQuery.data || []}
            selectedState={selectedState}
            onSelectedStateChange={(state: string | undefined) =>
              setSelectedState(state)
            }
          />
        )}
        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isFetching || page === 1}
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isFetching || issuesQuery.data?.length !== 5}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={handleChange} />
      </div>
    </div>
  )
}
