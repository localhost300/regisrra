import { ImageResponse } from 'next/og';
import { advisors } from '@/lib/data';

export const alt = 'Financial professional profile on Advisor Registry';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';


export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const advisor =
    advisors.find((advisor) => advisor.slug === slug)
    ?? advisors[0];


  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '70px',
          background: '#ffffff',
          color: '#111827',
        }}
      >

        <div
          style={{
            fontSize: 32,
            color: '#6b7280',
            marginBottom: 20,
          }}
        >
          Advisor Registry
        </div>


        <div
          style={{
            fontSize: 70,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {advisor.name}
        </div>


        <div
          style={{
            fontSize: 38,
            marginBottom: 15,
          }}
        >
          {advisor.title}
        </div>


        <div
          style={{
            fontSize: 30,
            color: '#4b5563',
          }}
        >
          {advisor.firm}
        </div>


      </div>
    ),
    {
      ...size,
    }
  );
}