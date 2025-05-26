export default function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-background p-8 rounded-lg shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
      <p className="text-lg italic mb-6 text-foreground/80">"{quote}"</p>
      <p className="font-medium text-foreground">— {author}</p>
    </div>
  )
}
