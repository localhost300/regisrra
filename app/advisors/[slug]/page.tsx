import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BadgeCheck, Briefcase, ExternalLink, FileCheck2, MapPin } from 'lucide-react';
import { advisors } from '@/lib/data';
import { siteConfig } from '@/lib/site';
import ContactModal from '@/components/ContactModal';

export function generateStaticParams() {
  return advisors.map((advisor) => ({ slug: advisor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const advisor = advisors.find((item) => item.slug === slug);
  if (!advisor) return { title: 'Advisor profile' };
  const canonical = `/advisors/${advisor.slug}`;
  const title = `${advisor.name} — ${advisor.firm} Broker Profile`;
  const description = `Research ${advisor.name}, CRD ${advisor.crd}, a ${advisor.location} ${advisor.title.toLowerCase()} with ${advisor.years} years of experience at ${advisor.firm}.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Advisor Registry`,
      description,
      url: canonical,
      type: 'profile',
      firstName: advisor.firstName,
      lastName: advisor.lastName,
      images: [{ url: `${canonical}/opengraph-image`, width: 1200, height: 630, alt: `${advisor.name} professional profile` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${canonical}/opengraph-image`] },
    robots: { index: true, follow: true },
  };
}

export default async function Profile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const advisor = advisors.find((item) => item.slug === slug);
  if (!advisor) notFound();
  const brokerCheck = `https://brokercheck.finra.org/individual/summary/${advisor.crd}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/advisors/${advisor.slug}#person`,
    name: advisor.name,
    url: `${siteConfig.url}/advisors/${advisor.slug}`,
    jobTitle: advisor.title,
    description: advisor.bio,
    worksFor: { '@type': 'Organization', name: advisor.firm },
    workLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', streetAddress: advisor.streetAddress, addressLocality: advisor.city, addressRegion: advisor.region, postalCode: advisor.postalCode, addressCountry: 'US' },
    },
    knowsAbout: advisor.specialties,
    sameAs: [brokerCheck],
    identifier: { '@type': 'PropertyValue', name: 'FINRA CRD', value: advisor.crd },
  };

  return (
    <div className="profile-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="profile-hero">
        <div className="profile-ident">
          <div className="avatar xl">{advisor.initials}</div>
          <div>
            <p className="eyebrow"><BadgeCheck /> Registration record located</p>
            <h1>{advisor.name}</h1>
            <p>{advisor.title} · {advisor.firm}</p>
            <div className="profile-meta">
              <span><MapPin />{advisor.location}</span>
              <span><Briefcase />{advisor.years} years of experience</span>
            </div>
          </div>
        </div>
        <ContactModal advisorName={advisor.name} advisorSlug={advisor.slug} contactEnabled={advisor.contactEnabled} />
      </section>
      <nav className="profile-tabs">
        <a href="#overview">Overview</a>
        <a href="#registration">Registration</a>
        <a href="#qualifications">Qualifications</a>
        <a href="#services">Services</a>
        <a href="#disclosures">Disclosures</a>
        <a href="#source">Official source</a>
      </nav>
      <div className="profile-body">
        <article>
          <section id="overview">
            <p className="kicker">Professional overview</p>
            <h2>Registered financial professional in New York.</h2>
            <p>{advisor.bio}</p>
            <p>This registry presents publicly available registration information for research purposes. It does not independently recommend, endorse, or verify the quality of any financial professional.</p>
          </section>
          <section id="registration">
            <p className="kicker">Registration snapshot</p>
            <h2>Current registration details</h2>
            <div className="service-grid">
              <div><span>01</span><h3>{advisor.finraRegistrations} FINRA {advisor.finraRegistrations === 1 ? 'registration' : 'registrations'}</h3><p>Current registration categories are available through FINRA BrokerCheck.</p></div>
              <div><span>02</span><h3>{advisor.stateLicenses} state licenses</h3><p>U.S. state and territory licensing count from the current FINRA report.</p></div>
              <div><span>03</span><h3>{advisor.firms} {advisor.firms === 1 ? 'firm' : 'firms'}</h3><p>Current and previous FINRA-registered firms.</p></div>
              <div><span>04</span><h3>CRD {advisor.crd}</h3><p>Unique Central Registration Depository identifier.</p></div>
            </div>
          </section>
          <section id="qualifications">
            <p className="kicker">Experience &amp; qualifications</p>
            <h2>{advisor.years} years of experience</h2>
            <div className="timeline"><div><b>{advisor.firm}</b><span>Current registered firm</span><small>Registration history begins in {advisor.registrationSince}</small></div></div>
            <p>FINRA’s report lists {advisor.exams} securities industry exams passed and {advisor.sroRegistrations} current self-regulatory organization registrations. Consult the current BrokerCheck report for complete exam and jurisdiction details.</p>
          </section>
          <section id="services">
            <p className="kicker">Services</p>
            <h2>Financial guidance for every stage.</h2>
            <div className="service-grid">
              {advisor.services.map((service, index) => <div key={service}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service}</h3></div>)}
            </div>
          </section>
          <section id="disclosures">
            <p className="kicker">Disclosure record</p>
            <h2>{advisor.disclosures} disclosures reported</h2>
            <div className="credentials"><div><FileCheck2 /><span>The current FINRA BrokerCheck summary reports {advisor.disclosures === 0 ? 'no disclosure events' : `${advisor.disclosures} disclosure events`}. Always review the official record for the latest information.</span></div></div>
          </section>
          <section id="source">
            <p className="kicker">Official source</p>
            <h2>Verify before you invest.</h2>
            <p>BrokerCheck is FINRA’s free tool for researching the background and experience of financial brokers, advisers, and firms.</p>
            <a href={brokerCheck} target="_blank" rel="noreferrer" className="btn">Check this professional on FINRA’s BrokerCheck <ExternalLink size={16} /></a>
          </section>
        </article>
        <aside>
          <div className="profile-fact">
            <h3>At a glance</h3>
            <dl>
              <div><dt>Full name</dt><dd>{advisor.name}</dd></div>
              <div><dt>Firm</dt><dd>{advisor.firm}</dd></div>
              <div><dt>Experience</dt><dd>{advisor.years} years</dd></div>
              <div><dt>State licenses</dt><dd>{advisor.stateLicenses}</dd></div>
              <div><dt>Disclosures</dt><dd>{advisor.disclosures} reported</dd></div>
              <div><dt>CRD number</dt><dd>{advisor.crd}</dd></div>
            </dl>
          </div>
          <div className="contact-card source-card">
            <p className="kicker">Public record</p>
            <h3>Research this professional</h3>
            <p>Review employment, exams, licenses, and disclosures directly with FINRA.</p>
            <a href={brokerCheck} target="_blank" rel="noreferrer" className="btn full">Open official record <ExternalLink size={16} /></a>
          </div>
        </aside>
      </div>
    </div>
  );
}
