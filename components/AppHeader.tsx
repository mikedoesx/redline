import Link from "next/link"

export function AppHeader() {
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Your App
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-red-600">
            Features
          </Link>
          <Link href="#integrations" className="text-sm font-medium hover:text-red-600">
            Integrations
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-red-600">
            Testimonials
          </Link>
          <Link href="#mobile" className="text-sm font-medium hover:text-red-600">
            Mobile App
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-red-600">
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
