import { useInfiniteQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../../helpers"
import { Issue } from "../interfaces"

interface QueryProps {
  pageParam?: number
  queryKey: (string | Props)[]
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps) => {
  console.log(queryKey)
  const [, args] = queryKey
  const { state, labels } = args as Props

  await sleep(2000)
  const params = new URLSearchParams()

  if (state) {
    params.append("state", state)
  }
  if (labels.length > 0) {
    params.append("labels", labels.join(","))
  }
  params.append("page", pageParam.toString())
  params.append("per_page", "5")

  const { data } = await githubApi.get<Issue[]>("/issues", { params })
  return data
}

interface Props {
  state?: string
  labels: string[]
}

export function useIssuesInfinite({ state, labels }: Props) {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", { state, labels }],
    queryFn: getIssues,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return
      return allPages.length + 1
    },
  })

  return { issuesQuery }
}
