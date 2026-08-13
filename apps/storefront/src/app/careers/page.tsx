import InfoPage from '@/components/InfoPage';

export default function CareersPage() {
  return <InfoPage eyebrow="Tomis" title="CAREERS" intro="Tomis is building a focused modern menswear brand from Lagos. We are not listing an open role at this time." sections={[
    { title: 'Work with us', paragraphs: ['When roles become available across design, production, operations, customer care, or creative work, they will be published here with a clear description and application route.'] },
    { title: 'General enquiries', paragraphs: ['For a relevant introduction, email hello@tomis.ng with your background, location, and the kind of work you would like to contribute. Please do not send sensitive personal information.'] },
  ]} />;
}
