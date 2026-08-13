import InfoPage from '@/components/InfoPage';

export default function TermsPage() {
  return <InfoPage eyebrow="Legal" title="TERMS OF SERVICE" intro="These terms govern use of the Tomis website and purchases made through the store." sections={[
    { title: 'Orders and availability', paragraphs: ['An order is accepted only after payment authorization and order confirmation. Product availability, colour options, delivery windows, and prices may change before an order is confirmed. If we cannot fulfil a confirmed order, we will contact you and arrange a refund or alternative.'] },
    { title: 'Product information', paragraphs: ['We aim to describe colours, fabric, fit, care, and images accurately. Screen settings can affect how colours appear. Customers should review the size guide and contact support if they need fit advice.'] },
    { title: 'Contact', paragraphs: ['Questions about these terms can be sent to hello@tomis.ng. Tomis may update these terms when the store, products, or applicable requirements change; the current version will be published on this page.'] },
  ]} />;
}
