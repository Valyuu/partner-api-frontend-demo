export type QuestionComponentProps<TData, TValue = string> = {
  data?: TData
  currentValue?: TValue
  onSelect: (value: TValue) => void
}
