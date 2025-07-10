import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Briefcase, 
  ShoppingCart, 
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula carregamento de dados da API
    const fetchStats = async () => {
      try {
        // Aqui faria a chamada real para a API
        // const response = await fetch('/api/admin/dashboard')
        // const data = await response.json()
        
        // Dados simulados
        const mockData = {
          overview: {
            total_users: 15420,
            total_providers: 2340,
            total_products: 8750,
            total_complaints: 156
          },
          growth: {
            new_users_30d: 1250,
            new_providers_30d: 180,
            new_products_30d: 650,
            new_complaints_30d: 23
          },
          charts: {
            daily_conversations: [
              { date: '2024-01-01', count: 120 },
              { date: '2024-01-02', count: 145 },
              { date: '2024-01-03', count: 165 },
              { date: '2024-01-04', count: 180 },
              { date: '2024-01-05', count: 195 },
              { date: '2024-01-06', count: 210 },
              { date: '2024-01-07', count: 225 }
            ],
            top_product_categories: [
              { category: 'Eletrônicos', count: 2340 },
              { category: 'Veículos', count: 1890 },
              { category: 'Casa & Jardim', count: 1560 },
              { category: 'Roupas', count: 1230 },
              { category: 'Esportes', count: 980 }
            ],
            top_provider_specialties: [
              { specialty: 'Eletricista', count: 450 },
              { specialty: 'Canalizador', count: 380 },
              { specialty: 'Pintor', count: 320 },
              { specialty: 'Mecânico', count: 290 },
              { specialty: 'Cabeleireira', count: 250 }
            ],
            complaint_status: [
              { status: 'Pendente', count: 45 },
              { status: 'Em Andamento', count: 67 },
              { status: 'Resolvida', count: 234 },
              { status: 'Rejeitada', count: 12 }
            ]
          }
        }
        
        setStats(mockData)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats.overview.total_users.toLocaleString(),
      change: `+${stats.growth.new_users_30d}`,
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Prestadores Ativos',
      value: stats.overview.total_providers.toLocaleString(),
      change: `+${stats.growth.new_providers_30d}`,
      changeType: 'positive',
      icon: Briefcase,
      color: 'green'
    },
    {
      title: 'Produtos Ativos',
      value: stats.overview.total_products.toLocaleString(),
      change: `+${stats.growth.new_products_30d}`,
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'purple'
    },
    {
      title: 'Reclamações',
      value: stats.overview.total_complaints.toLocaleString(),
      change: `+${stats.growth.new_complaints_30d}`,
      changeType: 'negative',
      icon: MessageSquare,
      color: 'red'
    }
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {stat.changeType === 'positive' ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                    <span>nos últimos 30 dias</span>
                  </div>
                </CardContent>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600`} />
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversas Diárias */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Conversas Diárias</span>
              </CardTitle>
              <CardDescription>
                Atividade dos últimos 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stats.charts.daily_conversations}>
                  <defs>
                    <linearGradient id="conversationsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    className="text-xs"
                  />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    formatter={(value) => [value, 'Conversas']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#conversationsGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status das Reclamações */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Status das Reclamações</span>
              </CardTitle>
              <CardDescription>
                Distribuição por status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.charts.complaint_status}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {stats.charts.complaint_status.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categorias de Produtos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Top Categorias - Produtos</span>
              </CardTitle>
              <CardDescription>
                Categorias mais populares
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.charts.top_product_categories} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="category" type="category" width={100} className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Especialidades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Top Especialidades</span>
              </CardTitle>
              <CardDescription>
                Prestadores mais procurados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.charts.top_provider_specialties}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="specialty" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Atividade Recente</span>
            </CardTitle>
            <CardDescription>
              Últimas ações na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Novo usuário registrado', user: 'João Silva', time: '2 min atrás', type: 'user' },
                { action: 'Produto publicado', user: 'Maria Santos', time: '5 min atrás', type: 'product' },
                { action: 'Reclamação resolvida', user: 'Sistema', time: '10 min atrás', type: 'complaint' },
                { action: 'Prestador verificado', user: 'Admin', time: '15 min atrás', type: 'provider' },
                { action: 'Nova conexão criada', user: 'Ana Costa', time: '20 min atrás', type: 'connection' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'product' ? 'bg-green-500' :
                    activity.type === 'complaint' ? 'bg-red-500' :
                    activity.type === 'provider' ? 'bg-purple-500' :
                    'bg-pink-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">por {activity.user}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Dashboard

