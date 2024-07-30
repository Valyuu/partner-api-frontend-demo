import { QuestionComponentProps } from '~/interfaces'
import { cn } from '~/utils'

export interface BrandQuestionProps
  extends QuestionComponentProps<Components.Schemas.V1GetBrandsItemOutput[], string> {}

export const BrandPageContent = ({ data, currentValue: brandId, onSelect }: BrandQuestionProps) => {
  if (!data) {
    return null
  }

  return (
    <div className="p-4">
      <h2 className="mb-6 text-xl font-semibold">Kies Merk</h2>
      <div className="grid grid-cols-4 gap-6">
        {data.map((brand) => (
          <div
            key={brand.id}
            className={cn(
              'flex cursor-pointer items-center space-x-3 rounded-lg border bg-white p-4 shadow transition-shadow hover:shadow-md',
              { 'border-blue-500 bg-blue-100': brandId === brand.id }
            )}
            onClick={() => onSelect(brand.id)}
          >
            <img src={brand.image} alt={brand.name} className="size-8 object-contain" />
            <span className="font-medium">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
