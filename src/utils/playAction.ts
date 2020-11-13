import { AnimationAction, AnimationMixer, LoopOnce } from "three"

export const playAction = (action: AnimationAction, idle: AnimationAction, mixer: AnimationMixer) => {
  mixer.addEventListener('finished', () => {
    idle.reset().play()
  })

  idle.fadeOut(1)
  action
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(1)
    .setLoop(LoopOnce, 0)
    .play()
}
