import Grid from '@material-ui/core/Grid'
import { NextPage } from 'next'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout/PageLayout'
import ChapterSection from '../../components/Section/ChapterSection'
import LocalSwitcher from '../../components/LocalSwitcher/LocalSwitcher'
import useTranslation from '../../hooks/useTranslation'
import WithLocale from '../../containers/withLocale'
import TextSection from '../../components/Section/TextSection'
import ContactSection from '../../components/Section/ContactSection'

const Community: NextPage = () => {
  const { t, locale } = useTranslation()

  return (
    <PageLayout
      siteTitle={t('community.siteTitle')}
      siteDescription={t('community.siteDescription')}
    >
      <section>
        <LocalSwitcher />
      </section>

      <TextSection title='Community'>
        <Grid container justify='space-around'>
          <Grid item xs={12} md={5}>
            <p>{t('community.description')}</p>
          </Grid>
        </Grid>
      </TextSection>

      <TextSection classname='pink' title='Our values'>
        <Grid container justify='flex-end'>
          <Grid item xs={12} md={5}>
            <h2>{t('about.coreValue.empowerment.title')}</h2>
            <h2>{t('about.coreValue.handsOn.title')}</h2>
            <h2>{t('about.coreValue.welcoming.title')}</h2>
          </Grid>
          <Grid item xs={12} md={5}>
            <h2>{t('about.coreValue.openness.title')}</h2>
            <h2>{t('about.coreValue.transparency.title')}</h2>
            <h2>{t('about.coreValue.nonProfit.title')}</h2>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container justify='flex-end'>
          <Grid item xs={12} md={5}>
            <Link
              href={`/[lang]/about#core-values`}
              as={`/${locale}/about#core-values`}
            >
              <a>{t('community.readCommunityValues')}</a>
            </Link>
            <br />
            <Link
              href={`/[lang]/codeOfConduct`}
              as={`/${locale}/codeOfConduct`}
            >
              <a>{t('community.readCodeOfConduct')}</a>
            </Link>
          </Grid>
          <Grid item xs={12} md={5}></Grid>
        </Grid>
      </TextSection>

      <TextSection classname='grey' title={t('community.getInvolved.title')}>
        <Grid container justify='space-between' spacing={10}>
          <Grid item xs={12} md={4}>
            <div className='placeholder-sm'></div>
            <h3>{t('community.getInvolved.learner.title')}</h3>
            <p>
              {t('community.getInvolved.learner.description')}
              <br />
              <br />
              <Link href={`/[lang]#find-events`} as={`/${locale}#find-events`}>
                <a>{t('community.getInvolved.learner.link')}</a>
              </Link>
            </p>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className='placeholder-sm'></div>
            <h3>{t('community.getInvolved.coach.title')}</h3>
            <p>
              {t('community.getInvolved.coach.description')}
              <br />
              <br />
              <Link
                href={`/[lang]/guides#coaching-guidelines`}
                as={`/${locale}/guides#coaching-guidelines`}
              >
                <a>{t('community.getInvolved.coach.link')}</a>
              </Link>
            </p>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className='placeholder-sm'></div>
            <h3>{t('community.getInvolved.organizer.title')}</h3>
            <p>
              {t('community.getInvolved.organizer.description')}
              <br />
              <br />
              <Link
                href={`/[lang]/guides#organize-meetup`}
                as={`/${locale}/guides#organize-meetup`}
              >
                <a>{t('community.getInvolved.organizer.link')}</a>
              </Link>
            </p>
          </Grid>
        </Grid>
      </TextSection>

      <TextSection title={t('community.formats.title')} anchor='event-formats'>
        <p>{t('community.formats.description')}</p>
        <p>{t('community.formats.description2')}</p>
        <p>{t('community.formats.description3')}</p>
        <Grid container justify='space-between'>
          <Grid item xs={12} md={5}>
            <h2>{t('community.formats.workshop.title')}</h2>
            <p>{t('community.formats.workshop.description')}</p>
            <h3>{t('community.formats.who')}</h3>
            <p>{t('community.formats.workshop.who')}</p>
            <h3>{t('community.formats.when')}</h3>
            <p>{t('community.formats.workshop.when')}</p>
          </Grid>
          <Grid item xs={12} md={5}>
            <h2>{t('community.formats.coLearning.title')}</h2>
            <p>{t('community.formats.coLearning.description')}</p>
            <h3>{t('community.formats.who')}</h3>
            <p>{t('community.formats.coLearning.who')}</p>
            <h3>{t('community.formats.when')}</h3>
            <p>{t('community.formats.coLearning.when')}</p>
          </Grid>
        </Grid>
      </TextSection>

      <ChapterSection title={t('chapter.title')} />

      <ContactSection />

      <style jsx>{`
        h1 {
          text-align: center;
        }

        :global(.pink) h2 {
          color: white;
        }

        :global(.pink) a {
          color: white;
          text-decoration: underline;
        }
      `}</style>
    </PageLayout>
  )
}

export default WithLocale(Community)
