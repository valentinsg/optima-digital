import { Crown, Gem, Feather, Heart, Circle } from "lucide-react"

interface BrandValueProps {
  title: string
  icon: string
}

export default function BrandValue({ title, icon }: BrandValueProps) {
  const getIcon = () => {
    switch (icon) {
      case "crown":
        return <Crown className="h-6 w-6 text-[#c5a96d]" />
      case "gem":
        return <Gem className="h-6 w-6 text-[#c5a96d]" />
      case "feather":
        return <Feather className="h-6 w-6 text-[#c5a96d]" />
      case "heart":
        return <Heart className="h-6 w-6 text-[#c5a96d]" />
      case "circle":
        return <Circle className="h-6 w-6 text-[#c5a96d]" />
      default:
        return <Circle className="h-6 w-6 text-[#c5a96d]" />
    }
  }

  return (
    <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
      <div className="mb-3 group-hover:rotate-12 transition-transform duration-300">{getIcon()}</div>
      <h3 className="font-medium">{title}</h3>
    </div>
  )
}
