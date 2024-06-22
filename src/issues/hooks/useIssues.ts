import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../../helpers"
import { Issue } from "../interfaces"

const getIssues = async (
  labels: string[] = [],
  page: number = 1,
  state?: string
) => {
  await sleep(2000)
  const params = new URLSearchParams()

  if (state) {
    params.append("state", state)
  }
  if (labels.length > 0) {
    params.append("labels", labels.join(","))
  }
  params.append("page", page.toString())
  params.append("per_page", "5")

  const { data } = await githubApi.get<Issue[]>("/issues", { params })
  return data
}

interface Props {
  state?: string
  labels: string[]
}

export function useIssues({ state, labels }: Props) {
  const [page, setPage] = useState(1)
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels, page }],
    queryFn: () => getIssues(labels, page, state),
  })

  const handleNextPage = () => {
    if (issuesQuery.data?.length !== 5) return
    setPage((prev) => prev + 1)
  }
  const handlePrevPage = () => {
    if (page === 1) return
    setPage((prev) => prev - 1)
  }

  useEffect(() => {
    setPage(1)
  }, [state, labels])

  return { issuesQuery, page, handleNextPage, handlePrevPage }
}
