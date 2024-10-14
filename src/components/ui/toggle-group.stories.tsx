import '~/assets/styles/index.css'
import '~/assets/styles/font.css'

import type { Story } from '@ladle/react'

import { ToggleGroup, ToggleGroupItem } from './toggle-group'

export const ToggleGroupStory: Story = () => {
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-xl font-bold capitalize text-gray-800">Toggle Group</h2>
      <ToggleGroup type="single" defaultValue="option1" className="flex flex-col space-y-2">
        <ToggleGroupItem value="option1" className="w-full justify-start text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </ToggleGroupItem>
        <ToggleGroupItem value="option2" className="w-full justify-start text-left">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ToggleGroupItem>
        <ToggleGroupItem value="option3" className="w-full justify-start text-left">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
          dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
          amet.
        </ToggleGroupItem>
      </ToggleGroup>
      <h2 className="text-xl font-bold capitalize text-gray-800">Radio style</h2>
      <ToggleGroup type="single" defaultValue="optionA" className="flex flex-col">
        <ToggleGroupItem value="optionA" className="w-full justify-start text-left" radio>
          Option A
        </ToggleGroupItem>
        <ToggleGroupItem value="optionB" className="w-full justify-start text-left" radio>
          Option B
        </ToggleGroupItem>
        <ToggleGroupItem value="optionC" className="w-full justify-start text-left" radio>
          Option C
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default {
  title: 'Components',
  component: ToggleGroupStory,
}
