import { NextPage } from 'next'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
import flatten from 'lodash/flatten'
import { useState, useEffect } from 'react'
import fetchJsonp from 'fetch-jsonp'
import useTranslation from '../../hooks/useTranslation'
import WithLocale from '../../containers/withLocale'
import PageLayout from '../../components/PageLayout/PageLayout'
import LocalSwitcher from '../../components/LocalSwitcher/LocalSwitcher'
import TextSection from '../../components/Section/TextSection'
import ChapterSection, { cities } from '../../components/Section/ChapterSection'
import Button from '../../components/Button/Button'
import ContactSection from '../../components/Section/ContactSection'
import SocialMediaSection from '../../components/Section/SocialMediaSection'
import TwitterFeed from '../../components/TwitterFeed'
import Events from '../../components/Events'
import StarRateIcon from '@material-ui/icons/StarRate'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import SchoolIcon from '@material-ui/icons/School'
import { mediaquery } from '../../style/style'

export const Index: NextPage = () => {
  const { t, locale } = useTranslation()
  const meetupNames = cities
    .filter(
      ({ cityContent: { data } }) => !data.is_inactive && data.meetup_name
    )
    .map(({ cityContent: { data } }) => data.meetup_name)

  const [events, setEvents] = useState<any>({})
  const [hasEvents, setHasEvents] = useState(false)
  const [showMoreLink, setShowMoreLink] = useState(true)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    if (events.firstBatch) {
      const secondBatch = [...events.allEvents].splice(6, 10)
      if (!secondBatch.length) setShowMoreLink(false)
      setEvents({ ...events, secondBatch })
      return
    }

    setLoading(true)
    Promise.all(
      meetupNames.map(meetupName =>
        fetchJsonp(`https://api.meetup.com/${meetupName}/events`).then(resp =>
          resp.json()
        )
      )
    ).then(jsons => {
      const mixEvents = flatten(jsons.map(({ data }) => data.splice(0, 10)))
      mixEvents.sort(
        (a, b) => Date.parse(a.local_date) - Date.parse(b.local_date)
      )

      if (mixEvents.length) {
        const firstBatch = [...mixEvents].splice(0, 6)
        setEvents({ firstBatch, allEvents: mixEvents })
        setHasEvents(true)
      } else {
        setHasEvents(false)
      }
    })

    setLoading(false)
  }, [showMoreLink])

  return (
    <PageLayout
      siteTitle='homepage.siteTitle'
      siteDescription='homepage.siteDescription'
    >
      <section>
        <LocalSwitcher />
      </section>

      <TextSection>
        <Grid container justify='space-between'>
          <Grid item xs={12} md={5}>
            <h2>{t('homepage.otsInitiative.title')}</h2>
            <p>{t('homepage.otsInitiative.description')}</p>
            <p>{t('homepage.otsInitiative.description2')}</p>
            <Link href={`/[lang]/about`} as={`/${locale}/about`}>
              <a className='link'>{t('homepage.otsInitiative.learnMore')}</a>
            </Link>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className='placeholder'></div>
          </Grid>
        </Grid>
      </TextSection>

      <TextSection>
        <Grid container justify='space-between'>
          <Grid item xs={12} md={5}>
            <div className='placeholder'></div>
          </Grid>
          <Grid item xs={12} md={5}>
            <h2>{t('homepage.otsCommunity.title')}</h2>
            <p>{t('homepage.otsCommunity.description')}</p>
            <Link href={`/[lang]/community`} as={`/${locale}/community`}>
              <a className='link'>{t('homepage.otsCommunity.learnMore')}</a>
            </Link>
          </Grid>
        </Grid>
      </TextSection>

      <TextSection classname='grey' title={t('homepage.waysToJoin.title')}>
        <Grid container justify='space-between' spacing={10}>
          <Grid item xs={12} md={4}>
            <div className='ways-to-join-wrapper'>
              <div className='round-icon'>
                <SchoolIcon
                  style={{ fontSize: 170, color: 'white', marginTop: '10px' }}
                />
              </div>
              <h3>{t('homepage.waysToJoin.learner.title')}</h3>
              <p className='ways-to-join'>
                {t('homepage.waysToJoin.learner.description')}
              </p>
              <Button href=''>{t('homepage.waysToJoin.learner.cta')}</Button>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className='ways-to-join-wrapper'>
              <div className='round-icon'>
                <StarRateIcon style={{ fontSize: 200, color: 'white' }} />
              </div>
              <h3>{t('homepage.waysToJoin.support.title')}</h3>
              <p className='ways-to-join'>
                {t('homepage.waysToJoin.support.description')}
              </p>
              <Button href=''>{t('homepage.waysToJoin.support.cta')}</Button>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className='ways-to-join-wrapper'>
              <div className='round-icon'>
                <EmojiPeopleIcon
                  style={{ fontSize: 180, color: 'white', marginTop: '10px' }}
                />
              </div>
              <h3>{t('homepage.waysToJoin.coach.title')}</h3>
              <p className='ways-to-join'>
                {t('homepage.waysToJoin.coach.description')}
              </p>
              <Button href=''>{t('homepage.waysToJoin.coach.cta')}</Button>
            </div>
          </Grid>
        </Grid>
      </TextSection>

      <TextSection title={t('chapter.title')} anchor='find-events'>
        <ChapterSection />

        <h4 className='chapter-events'>{t('chapter.events')}</h4>
        <Events
          title={t('city.suggestEvent')}
          events={events}
          isLoading={isLoading}
          hasEvents={hasEvents}
          showMoreLink={showMoreLink}
          setShowMoreLink={setShowMoreLink}
          hasMixedGroups
        />
      </TextSection>

      <TwitterFeed screenName='OpenTechSchool' />

      <ContactSection />

      <SocialMediaSection />

      <style jsx>{`
        .link {
          text-align: center;
          display: block;
        }

        .ways-to-join-wrapper {
          text-align: center;
        }

        .ways-to-join {
          margin-bottom: 30px;
        }

        h3 {
          text-transform: uppercase;
          text-align: center;
        }

        .placeholder {
          background: var(--pink);
          min-height: 500px;
          width: 100%;
          margin: 40px 0;
        }

        .round-icon {
          background: var(--mainBlue);
          height: 200px;
          width: 200px;
          margin: 0 auto;
          text-align: center;
          border-radius: 200px;
          margin-bottom: 12px;
        }

        .chapter-events {
          font-family: var(--secondaryFont);
          font-weight: 500;
          font-size: 22px;
          color: #828282;
          text-align: center;
          text-transform: uppercase;
          margin-top: 40px;
        }

        @media (${mediaquery.tabletToDesktop}) {
          .a {
            text-align: left;
          }

          .ways-to-join {
            margin-bottom: 36px;
          }
        }
      `}</style>
    </PageLayout>
  )
}

export default WithLocale(Index)
