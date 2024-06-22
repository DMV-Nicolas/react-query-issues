import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../helpers"
import { Issue } from "../interfaces"

const getIssue = async (issueNumber: number) => {
  await sleep(2000)
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}

const getIssueComments = async (issueNumber: number) => {
  await sleep(2000)
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  )
  console.log(data)
  return data
}

export function useIssue(issueNumber: number) {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssue(issueNumber),
  })

  const issueCommentsQuery = useQuery({
    queryKey: ["issue", issueNumber, "comments"],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: !!issueQuery.data,
  })

  return { issueQuery, issueCommentsQuery }
}
