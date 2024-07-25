export type StepButtonItemType = {
  disabled: boolean
  hidden: boolean
  onClick: () => void
}

export type StepButtonsStateType = {
  prev: StepButtonItemType
  next: StepButtonItemType
}
