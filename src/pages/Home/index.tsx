import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { artistService } from '../../services/artistService'
import { HeroSection } from './HeroSection'
import { AboutSection } from './AboutSection'
import { MostRequestedSection } from './MostRequestedSection'
import { FeaturedVideosSection } from './FeaturedVideosSection'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { ErrorMessage } from '../../components/ui/ErrorMessage'
import type { Artist } from '../../types'

export default function Home() {
  const { t } = useTranslation()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchArtist = () => {
    setError(false)
    setLoading(true)
    artistService.getProfile()
      .then(setArtist)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchArtist()
  }, [])

  if (loading) return <LoadingSpinner />

  if (error) return (
    <ErrorMessage
      message={t('common.error')}
      onRetry={fetchArtist}
    />
  )

  if (!artist) return null

  return (
    <main>
      <HeroSection artist={artist} />
      <AboutSection artist={artist} />
      <MostRequestedSection />
      <FeaturedVideosSection />
    </main>
  )
}