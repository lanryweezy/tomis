import InfoPage from '@/components/InfoPage';

export default function ShippingPage() {
  return <InfoPage eyebrow="Customer care" title="SHIPPING & DELIVERY" intro="We currently deliver within Nigeria, with Lagos and nationwide delivery windows shown clearly before purchase." sections={[
    { title: 'Delivery windows', items: ['Lagos: 1–2 working days.', 'Nationwide: 2–5 working days.', 'Orders are processed during our support hours, Monday to Friday, 9am–5pm WAT.'] },
    { title: 'Delivery pricing', paragraphs: ['Free delivery in Lagos applies to orders over ₦50,000. The final delivery charge and destination coverage should be confirmed at checkout before payment.'] },
    { title: 'Tracking and support', paragraphs: ['Order and tracking updates are sent using the contact details provided at checkout. If your order is delayed or the delivery information is incorrect, contact hello@tomis.ng or WhatsApp +234 903 396 7809 with your order number.'] },
  ]} />;
}
