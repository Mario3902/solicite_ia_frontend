import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Construction } from 'lucide-react'

const Complaints = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Gestão de Reclamações</span>
          </CardTitle>
          <CardDescription>
            Esta funcionalidade está em desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Construction className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Em Desenvolvimento</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Complaints
