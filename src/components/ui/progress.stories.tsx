import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import type { Story } from '@ladle/react'
import { useEffect, useState } from 'react'

import { Progress } from './progress'

export const ProgressBarStory: Story = () => {
  const [randomProgress, setRandomProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomProgress(Math.floor(Math.random() * 101))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const values = [0, 25, 50, 75, 100]

  return (
    <div className="space-y-8 p-4">
      {values.map((progress) => (
        <div key={progress} className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Progress at {progress}%</p>
          <Progress value={progress} />
        </div>
      ))}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Random Progress: {randomProgress}%</p>
        <Progress value={randomProgress} />
      </div>
    </div>
  )
}

export default {
  title: 'Components',
  component: ProgressBarStory,
}
