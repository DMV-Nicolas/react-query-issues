import { useState } from "react"
import { IssueList } from "../components/IssueList"
import { LabelPicker } from "../components/LabelPicker"

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

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
        <IssueList />
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={handleChange} />
      </div>
    </div>
  )
}
