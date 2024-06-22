import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { sleep } from "../helpers"
import { Label } from "../interfaces/label"

const getLabels = async () => {
  await sleep(2000)
  const { data } = await githubApi.get<Label[]>("/labels")
  return data
}

export function useLabels() {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 710400704,
        node_id: "MDU6TGFiZWw3MTA0MDA3MDQ=",
        url: "",
        name: "test data",
        color: "ffffff",
        default: false,
      },
      {
        id: 139734344,
        node_id: "MDU6TGFiZWwxMzk3MzQzNDQ=",
        url: "",
        name: "test data",
        color: "ffffff",
        default: false,
      },
      {
        id: 1757816973,
        node_id: "MDU6TGFiZWwxNzU3ODE2OTcz",
        url: "",
        name: "test data",
        color: "ffffff",
        default: false,
      },
      {
        id: 760751171,
        node_id: "MDU6TGFiZWw3NjA3NTExNzE=",
        url: "",
        name: "test data",
        color: "ffffff",
        default: false,
      },
      {
        id: 588833528,
        node_id: "MDU6TGFiZWw1ODg4MzM1Mjg=",
        url: "",
        name: "test data",
        color: "ffffff",
        default: false,
      },
    ],
  })

  return { labelsQuery }
}
