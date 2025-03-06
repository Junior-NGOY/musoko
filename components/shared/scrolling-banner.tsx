import { Truck, ShoppingCart } from "lucide-react"

interface ScrollingBannerProps {
  message?: string
  backgroundColor?: string
  textColor?: string
  speed?: "slow" | "medium" | "fast"
}

export function ScrollingBanner({
  message = "achat en ligne livraison à domicile",
  backgroundColor = "bg-green-500",
  textColor = "text-white",
  speed = "slow",
}: ScrollingBannerProps) {
  const speedClass = {
    slow: "animate-scroll-slow",
    medium: "animate-scroll-medium",
    fast: "animate-scroll-fast",
  }

  return (
    <div className={`w-full ${backgroundColor} overflow-hidden py-2`}>
      <div className="relative flex">
        <div className={`flex ${speedClass[speed]} whitespace-nowrap`}>
          {[...Array(2)].map((_, index) => (
            <div key={index} className={`flex items-center ${textColor} font-medium min-w-full`}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span className="uppercase tracking-wider mr-4">{message}</span>
              <Truck className="mr-2 h-5 w-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

