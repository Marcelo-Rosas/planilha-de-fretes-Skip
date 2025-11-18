import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Operacional' },
  { to: '/param-ltl', label: 'Param_LTL' },
  { to: '/param-lotacao', label: 'Param_Lotacao' },
  { to: '/param-antt', label: 'Param_ANTT' },
  { to: '/param-conteiner', label: 'Param_Conteiner' },
  { to: '/tabela-ltl', label: 'Tabela_LTL' },
  { to: '/tabela-lotacao', label: 'Tabela_Lotacao' },
  { to: '/eixos', label: 'Eixos' },
  { to: '/coeficientes-antt', label: 'Coeficientes_ANTT' },
  { to: '/icms-interestadual', label: 'ICMS_Interestadual' },
]

const NavContent = ({ isMobile }: { isMobile?: boolean }) => (
  <nav
    className={cn(
      'flex items-center gap-4 lg:gap-6',
      isMobile && 'flex-col items-start gap-2',
    )}
  >
    {navLinks.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          cn(
            'text-sm font-medium transition-colors hover:text-primary',
            isActive ? 'text-primary font-semibold' : 'text-muted-foreground',
            isMobile && 'text-lg w-full p-2 rounded-md',
          )
        }
      >
        {label}
      </NavLink>
    ))}
  </nav>
)

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex items-center">
          <NavLink to="/" className="text-lg font-bold">
            Cotação de Fretes Operacional
          </NavLink>
        </div>

        <div className="hidden md:flex flex-grow items-center justify-end">
          <NavContent />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[50vw]">
              <div className="p-4">
                <NavContent isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
