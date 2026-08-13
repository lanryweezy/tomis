import InfoPage from '@/components/InfoPage';

export default function PrivacyPage() {
  return <InfoPage eyebrow="Legal" title="PRIVACY POLICY" intro="This page explains the personal information Tomis uses to operate the store and support orders." sections={[
    { title: 'Information we use', paragraphs: ['We may use information you provide, including your name, email address, phone number, shipping address, order details, and support messages, to process orders, provide delivery updates, answer questions, and improve the store.'] },
    { title: 'Payments and service providers', paragraphs: ['Payment details are handled by our payment provider. Tomis should not receive or store your full card details. Service providers may process information only as needed to provide payment, delivery, hosting, analytics, or customer-support services.'] },
    { title: 'Your choices', paragraphs: ['To ask about, correct, or delete personal information associated with an order or support request, email hello@tomis.ng. Marketing emails can be declined or unsubscribed from at any time.'] },
  ]} />;
}
