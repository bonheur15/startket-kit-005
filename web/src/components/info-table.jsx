import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function InfoTable({ title, badge, rows }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{title}</CardTitle>
        {badge && badge}
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="text-sm font-mono font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
