import InfoPage from '@/components/InfoPage';

export default function ReturnsPage() {
  return <InfoPage eyebrow="Customer care" title="RETURNS & EXCHANGES" intro="We want your Tomis shirt to fit the way you expect. Contact us promptly if you need a return or size exchange." sections={[
    { title: 'Eligibility', items: ['Returns are accepted within 14 days of delivery.', 'Items must be unworn and have their original tags attached.', 'Exchanges are available for a different size of the same product, subject to stock.'] },
    { title: 'How to start', paragraphs: ['Email hello@tomis.ng with your order number, the item you want to return or exchange, and the reason. Our support team will confirm the next step and return instructions.'] },
    { title: 'Refund timing', paragraphs: ['Refunds are processed to the original payment method after the returned item is received and approved. Your bank or payment provider may require additional processing time.'] },
  ]} />;
}
