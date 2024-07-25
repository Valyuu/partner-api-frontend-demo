import { FC, useLayoutEffect } from 'react'
import { useSnapshot } from 'valtio'

import { NavigationDestination, QuestionSection } from '~/constants'
import { navigationState, questionResultsState } from '~/stores'

export const ConfirmationPage: FC = () => {
  const questionResults = useSnapshot(questionResultsState)

  const { isFunctional } = questionResults

  const { stepCount } = useSnapshot(navigationState.progress)

  useLayoutEffect(() => {
    navigationState.buttons.prev.hidden = false
    navigationState.buttons.prev.disabled = false
    navigationState.buttons.prev.navigateTo = window.history.length
      ? {
          destination: NavigationDestination.HistoryBack,
          index: undefined,
        }
      : isFunctional
        ? {
            destination: NavigationDestination.Conditions,
            index: questionResults[QuestionSection.Condition].length - 1,
          }
        : {
            destination: NavigationDestination.Problems,
            index: undefined,
          }
    navigationState.buttons.next.hidden = true
    navigationState.progress.currentStep = Object.values(stepCount).reduce((acc, val) => acc + val, 0)
  }, [])

  return (
    <div className="p-4">
      Answers:
      <pre>{JSON.stringify(questionResults)}</pre>
    </div>
  )
}
