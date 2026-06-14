import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-highest border-t border-outline-variant">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-md flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:items-start items-center">
          <span className="font-headline-md text-headline-md text-primary mb-2">LUXE CONCIERGE</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-tighter">
            ©2024 LUXE CONCIERGE HOSPITALITY GROUP. ALL RIGHTS RESERVED.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all">Privacy Policy</a>
          <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all">Terms of Service</a>
          <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all">Accessibility</a>
          <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary underline transition-all">Contact Support</a>
        </nav>
      </div>
    </footer>
  )
}
