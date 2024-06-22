import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../../helpers"
import { Issue } from "../interfaces"

const getIssues = async (labels: string[], state?: string) => {
  await sleep(2000)
  const params = new URLSearchParams()

  if (state) {
    params.append("state", state)
  }
  if (labels.length > 0) {
    params.append("labels", labels.join(","))
  }
  params.append("page", "1")
  params.append("per_page", "5")

  const { data } = await githubApi.get<Issue[]>("/issues", { params })
  return data
}

interface Props {
  state?: string
  labels: string[]
}

export function useIssues({ state, labels }: Props) {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels }],
    queryFn: () => getIssues(labels, state),
  })

  return { issuesQuery }
}
