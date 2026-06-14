import { useNavigate } from 'react-router-dom'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { session } = useAuth()

  function handleRequireLogin() {
    if (!session) navigate('/login')
    else if (session.role === 'admin') navigate('/admin')
    else navigate('/dashboard')
  }

  return (
    <div className="font-body-md text-on-surface">
      <TopNavBar />

      <main>
        {/* Hero Section */}
        <section className="relative h-[921px] flex items-center justify-center overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YEJawirySko6QKDd5Z7jOkMQxTBWrgZLvAM3p_rWk4rC4vjK_eAJ4rrafLGRVgXsc1Shg1fMXRwL9H2wJtxM8Qs_GReCWJeG4cVmHVjj57Rx8zfgniCdIMHsopGT3_HaX5b4Oh6-ND703r9Nyg-ortwhGRMFjP6MtchUh5Bs6OnPxmNjslrSM16IRlrfhMMQXssF2-GsFTGCFI8VRDROlPd8gI30m0YDo-qCV4Rln5D3Gc3rQTQ6fAtyE_ruGMdMXadwuhqFO_sr"
            alt="Grand luxury hotel lobby"
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="relative z-10 text-center max-w-4xl px-margin-mobile">
            <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-[0.3em] mb-4 block">
              Refined Excellence
            </span>
            <h1 className="font-headline-xl text-headline-xl text-on-primary mb-8 leading-tight">
              A Sanctuary of Quiet Elegance and Unrivaled Service.
            </h1>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                className="bg-primary text-on-primary px-10 py-4 font-label-md uppercase tracking-wider hover:bg-opacity-90 transition-all border border-primary"
                onClick={handleRequireLogin}
              >
                Reserve Your Stay
              </button>
              <button className="bg-transparent text-on-primary px-10 py-4 font-label-md uppercase tracking-wider border border-on-primary hover:bg-on-primary hover:text-primary transition-all">
                Explore Amenities
              </button>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="bg-surface-container py-xl border-b border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
            {[
              { stat: '24/7', label: 'Concierge Service' },
              { stat: '5★', label: 'Global Rating' },
              { stat: '120+', label: 'Luxury Suites' },
              { stat: '12', label: 'Michelin Stars' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="font-headline-lg text-headline-lg text-primary mb-1">{stat}</div>
                <div className="font-label-md text-label-md text-on-surface-variant uppercase">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Room Types Bento Grid */}
        <section className="py-xl px-margin-desktop max-w-[1440px] mx-auto">
          <div className="mb-lg">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Our Signature Accommodations</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Tailored experiences designed for the discerning traveler, where every detail is curated for comfort and prestige.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[800px]">
            {/* Deluxe Suite — Large */}
            <div className="md:col-span-8 group relative overflow-hidden border border-outline-variant">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLecw5rL1lZmIKaU-sVEGUvBMgMWi0LeFPkjanE1ta-ozmfaWAe3abzMM9B6DmJH58FCayYXwa1UzXv9yweeK13uPh1zM0lHeg-CEXPK7H6XjAZVT1b9MKynL0lY3zG7kXQrDXrvPcxtj7WZQns4-AXZp8TBxy2HKvGjfzEP1wnV75S-VRyN83ET8n_z2XUM69DpBlWJFUPCm-v5lara94kI2Cj-GimJz_aO703Zr4kz5Kifr6uXnzIypnBFAelfZJxrOLCTXUCWxo"
                alt="Imperial Deluxe Suite"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-lg w-full text-on-primary">
                <span className="inline-block px-3 py-1 bg-secondary text-on-secondary font-label-sm uppercase tracking-widest mb-4">
                  Most Requested
                </span>
                <h3 className="font-headline-lg text-headline-lg mb-2">The Imperial Deluxe</h3>
                <p className="font-body-md text-body-md text-surface-variant/90 max-w-md mb-6">
                  Experience the pinnacle of hospitality with panoramic views, a private study, and personalized butler service.
                </p>
                <div className="flex items-center gap-6">
                  <span className="font-body-md font-bold">From $1,200 / Night</span>
                  <button
                    className="bg-on-primary text-primary px-6 py-2 font-label-md uppercase tracking-wider"
                    onClick={handleRequireLogin}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="h-full group relative overflow-hidden border border-outline-variant">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz2fyo0PRvxsIg9Ov0n6aQC7UHJBlf0vyJhO_7xLcGfMwhkz_Ik09tM2YfU5RTpvbMCh7VvMp773ONiR_ROKBVAIZLCS79E2hLmlphuGOzRihMJ0XQVKffhUICvf_bMpjbfKpy2xSvb1_9N5PJneAvFV0iF6XkV2fV8HHumn-4vaFtL0peIyTwqqU1MjHWlAgtXl2FA8KzBOa4je1KzCzuIUYFkKLrnYsggs22prf7pRQ1PWZFQDJjFUCKUEORMi0BB2c3gNMSnK-l"
                  alt="Executive Standard Room"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-md text-on-primary">
                  <h3 className="font-headline-md text-headline-md mb-1">Executive Standard</h3>
                  <p className="font-body-sm text-body-sm text-surface-variant/80 mb-4">
                    Precision-engineered for the modern professional.
                  </p>
                  <a className="font-label-md uppercase tracking-wider border-b border-on-primary pb-1 hover:text-secondary-fixed transition-colors" href="#">
                    View Gallery
                  </a>
                </div>
              </div>
              <div className="bg-surface-container p-md flex flex-col justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">spa</span>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">Wellness &amp; Spa</h4>
                <p className="font-body-sm text-on-surface-variant mb-4">
                  Complimentary access to our world-class hydrotherapy circuit for all residents.
                </p>
                <a className="text-secondary font-label-md uppercase tracking-wider flex items-center gap-2" href="#">
                  Explore Amenities <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-on-primary-fixed py-xl">
          <div className="max-w-[1440px] mx-auto px-margin-desktop">
            <div className="grid md:grid-cols-2 gap-xl items-center">
              <div>
                <span className="material-symbols-outlined text-secondary-fixed text-6xl mb-8">format_quote</span>
                <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6 leading-relaxed">
                  "The attention to detail at Luxe Concierge is unparalleled. From the seamless check-in to the intuitive room controls, every moment felt curated for my absolute comfort."
                </h2>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-secondary">
                    <img
                      alt="Guest Alexander Vance"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyqJk3S5ZkTkzshuxCICiYqmxW_sCRiBGtn6BWMWdk_gLJ7M_NU3FRTwEyagqbVWdqfXPWkSkjVMC8LspYSynkpF33NqsVHje4x2mR5ushKqMhMEP_5eqbl0cx9lzMU-GTrAsKLwU5rhM4PSFkGKqRTZf_L9giFrmdcgbAQuJ6TxECo8sOeSNfCos3kPWkSU4QH4zApsYEF2HDjELCtsiH5mEmoBxD2BuVbQBz1rGmVRIeHi56m4zFI50lsf4RlbWz_xlmWqNmLvGm"
                    />
                  </div>
                  <div>
                    <div className="font-body-md font-bold text-on-primary">Alexander Vance</div>
                    <div className="font-label-sm text-on-primary-fixed-variant uppercase tracking-widest">Global Executive, FinTech Corp</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  className="w-full aspect-square object-cover rounded-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw1xIYQWxm8NRXbmjdEin3If7NJyJQEYU_hFfjhhedlPyQ7zNXXprx9T7R2FsS7Mz83F11g_CkeXM4-4ZQfnARp2Z732mkRSQPk-aEwli_laBe_4gdP6vyyvT0ysyaLLQEdca9as6Wb6QNRwmUYsZGdD27CnCBd3EYkfVzPmx-L0DDPNo_g4sV6Pltadc7TaJ80vC-NMoaLByqvO9W4Qonr-FrjIzfu0HqY5jMZ0bMfKi8YgvlUxmLOEh7IK3KiUJNOWEsvUPy5EnG"
                  alt="Concierge desk"
                />
                <div className="absolute -bottom-8 -left-8 bg-surface p-md border border-outline-variant hidden md:block max-w-[240px]">
                  <p className="font-label-md text-primary uppercase mb-2">Heritage Award</p>
                  <p className="font-body-sm text-on-surface-variant">Voted Best Boutique Experience 2023 by Elite Traveler.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-xl bg-surface">
          <div className="max-w-[1000px] mx-auto text-center px-margin-mobile">
            <h2 className="font-headline-xl text-headline-xl text-primary mb-6">Ready to Experience the Extraordinary?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              Secure your reservation today and enjoy exclusive member benefits, including early check-in and curated dining experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                className="border border-outline-variant focus:border-secondary focus:ring-secondary px-6 py-4 font-body-md w-full sm:w-64 rounded"
                type="date"
              />
              <button
                className="bg-primary text-on-primary px-12 py-4 font-label-md uppercase tracking-wider hover:bg-opacity-90 transition-all"
                onClick={handleRequireLogin}
              >
                Check Availability
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Concierge Quick-Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card border border-outline-variant px-8 py-3 rounded-full items-center gap-8 shadow-lg z-[60] hidden md:flex">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
          <span className="font-label-md uppercase tracking-wider text-primary">Imperial Suite Admin</span>
        </div>
        <div className="h-4 w-[1px] bg-outline-variant" />
        <div className="flex gap-6">
          <button className="font-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider" onClick={handleRequireLogin}>
            Create Reservation
          </button>
          <button className="font-label-md text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider">
            Guest Search
          </button>
        </div>
        <div className="h-4 w-[1px] bg-outline-variant" />
        <button className="bg-error text-on-error px-4 py-1 rounded-full font-label-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
          Emergency Lockout
        </button>
      </div>
    </div>
  )
}
