import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, Construction } from 'lucide-react'

const Providers = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Gestão de Prestadores</span>
          </CardTitle>
          <CardDescription>
            Gerencie prestadores de serviços da plataforma
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

export default Providers

