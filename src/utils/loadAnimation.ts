import { AnimationAction, AnimationClip, AnimationMixer, SkinnedMesh } from "three"
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader"

export type Motion = {
  name: string
  url: string
}
export type Action = {
  name: string
  animation: AnimationAction
}

export const loadModelWithActions = async (modelUrl: string, motions?: Motion[]) => {
  const loader = new MMDLoader()
  const model = await loadModel(loader, modelUrl)
  const mixer = new AnimationMixer(model)

  const actions = await Promise.all(
    motions?.map(async motion => {
      const clip = await loadAnimation(loader, model, motion.url)
      const animation = mixer.clipAction(clip)
  
      return {
        name: motion.name,
        animation,
      }
    }) ?? []
  )

  // TODO
  // const actionList = actions.reduce((total, current) => {
  //   total[current.name] = current.animation
  //   return total
  // }, {})

  return {
    model,
    mixer,
    actions
  }
}

export const loadModel = (loader: MMDLoader, modelUrl: string): Promise<SkinnedMesh> => {
  return new Promise((resolve, reject) => {
    loader.load(
      modelUrl,
      model => resolve(model),
      _progress => {},
      error => reject(error)
    )
  })
}

export const loadAnimation = (loader: MMDLoader, rootModel: SkinnedMesh, animationUrl: string): Promise<AnimationClip> => {
  return new Promise((resolve, reject) => {
    loader.loadAnimation(
      animationUrl,
      rootModel,
      animationClip => resolve(animationClip as AnimationClip),
      _progress => {},
      error => reject(error)
    )
  })
}