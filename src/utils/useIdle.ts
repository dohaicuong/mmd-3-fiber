import { useEffect } from "react"
import { SkinnedMesh } from "three"
import { Action } from "./loadAnimation"

export const useIdle = ({ model, actions }: { model?: SkinnedMesh, actions?: Action[] }) => {
  useEffect(() => {
    if(model?.visible) {
      actions?.find(x => x.name === 'idle')?.animation.play()
    }
    // eslint-disable-next-line
  }, [model?.visible])
}