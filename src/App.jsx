import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  ShoppingCart, 
  Heart, 
  Search, 
  MessageSquare, 
  GraduationCap,
  TrendingUp,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  Sun,
  Moon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Dashboard from './components/Dashboard'
import UsersComponent from './components/Users'
import Providers from './components/Providers'
import Products from './components/Products'
import Connections from './components/Connections'
import LostFound from './components/LostFound'
import Complaints from './components/Complaints'
import Scholarships from './components/Scholarships'
import FinancialMarket from './components/FinancialMarket'
import SettingsComponent from './components/Settings'

import './App.css'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'users', label: 'Usuários', icon: Users, path: '/users' },
  { id: 'providers', label: 'Prestadores', icon: Briefcase, path: '/providers' },
  { id: 'products', label: 'Marketplace', icon: ShoppingCart, path: '/products' },
  { id: 'connections', label: 'Conexões', icon: Heart, path: '/connections' },
  { id: 'lost-found', label: 'Achados/Perdidos', icon: Search, path: '/lost-found' },
  { id: 'complaints', label: 'Reclamações', icon: MessageSquare, path: '/complaints' },
  { id: 'scholarships', label: 'Bolsas', icon: GraduationCap, path: '/scholarships' },
  { id: 'financial', label: 'Mercado', icon: TrendingUp, path: '/financial' },
  { id: 'settings', label: 'Configurações', icon: Settings, path: '/settings' }
]

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Aplica tema escuro
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div>
                      <h1 className="font-bold text-lg text-sidebar-foreground">Solicite IA</h1>
                      <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSidebar}
                    className="lg:hidden"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeMenu === item.id
                    
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveMenu(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                          isActive 
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' 
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.id === 'complaints' && notifications > 0 && (
                          <Badge variant="destructive" className="ml-auto text-xs">
                            {notifications}
                          </Badge>
                        )}
                      </motion.button>
                    )
                  })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-sidebar-border">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent/30">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.jpg" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-sidebar-foreground truncate">
                        Administrador
                      </p>
                      <p className="text-xs text-sidebar-foreground/60 truncate">
                        admin@solicite.ao
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-xl font-semibold">
                    {menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Gerencie sua plataforma Solicite IA
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="relative"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>

                <Avatar className="h-8 w-8">
                  <AvatarImage src="/admin-avatar.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UsersComponent />} />
                <Route path="/providers" element={<Providers />} />
                <Route path="/products" element={<Products />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/lost-found" element={<LostFound />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/financial" element={<FinancialMarket />} />
                <Route path="/settings" element={<SettingsComponent />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </Router>
  )
}

export default App

