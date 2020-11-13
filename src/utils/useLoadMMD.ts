import { useEffect, useState } from "react"
import { AnimationMixer, SkinnedMesh } from "three"
import { Action, loadModelWithActions, Motion } from "./loadAnimation"
import { playAction as play } from 'utils/playAction'

type useLoadMMDOptions = {
  modelUrl: string
  motions?: Motion[]
}
type useLoadMMDPayload = {
  model?: SkinnedMesh
  mixer?: AnimationMixer
  actions?: Action[]
}
const useLoadMMD = (options: useLoadMMDOptions) => {
  const [state, setState] = useState<useLoadMMDPayload>({})
  useEffect(() => {
    const start = async () => {
      const data = await loadModelWithActions(
        options.modelUrl,
        options.motions
      )
      setState(data)
    }
    start()
    // eslint-disable-next-line
  }, [])

  const playAction = (actionName: string, idleName: string) => {
    const { mixer, actions } = state
    const idle = actions?.find(x => x.name === idleName)?.animation
    const action = actions?.find(x => x.name === actionName)?.animation
    if(!mixer || !action || !idle) return null

    play(action, idle, mixer)
  }

  return {
    ...state,
    playAction
  }
}
export default useLoadMMD