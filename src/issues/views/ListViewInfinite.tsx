import { useState } from "react"
import { LoadingIcon } from "../../share/components/LoadingIcon"
import { IssueList, LabelPicker } from "../components"
import { useIssuesInfinite } from "../hooks/"

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState<string>()
  const { issuesQuery } = useIssuesInfinite({
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
            issues={issuesQuery.data?.pages.flat() || []}
            selectedState={selectedState}
            onSelectedStateChange={(state: string | undefined) =>
              setSelectedState(state)
            }
          />
        )}
        <div className="d-flex mt-2 justify-content-center">
          <button
            className="btn btn-outline-primary"
            disabled={!issuesQuery.hasNextPage}
            onClick={() => issuesQuery.fetchNextPage()}
          >
            Cargar mas...
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={handleChange} />
      </div>
    </div>
  )
}
