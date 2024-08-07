import { QuestionComponentProps } from '~/interfaces'
import { cn } from '~/utils'

export type CategoryQuestionProps = QuestionComponentProps<Components.Schemas.V1GetCategoriesItemOutput[], string>

export const CategoryPageContent = ({ data, currentValue: categoryId, onSelect }: CategoryQuestionProps) => {
  if (!data) {
    return null
  }
  return (
    <div className="p-4">
      <h2 className="mb-6 text-xl font-semibold">Kies Categorie</h2>
      <div className="grid grid-cols-3 gap-6">
        {data.map((category) => (
          <div
            key={category.id}
            className={cn(
              'flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-shadow hover:shadow-lg',
              { 'border-blue-500 bg-blue-100': categoryId === category.id }
            )}
            onClick={() => onSelect(category.id)}
          >
            <div className="mb-4 flex size-32 items-center justify-center">
              <img src={category.image} alt={category.name} className="max-h-full max-w-full object-contain" />
            </div>
            <span className="text-center font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
