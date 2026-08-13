import InfoPage from '@/components/InfoPage';

export default function SizeGuidePage() {
  return <InfoPage eyebrow="Fit guide" title="SIZE GUIDE" intro="Our half-collar shirt has a relaxed fit. Until our full measurement chart is published, compare the fit notes below with a shirt you already own or contact support before ordering." sections={[
    { title: 'Current fit notes', paragraphs: ['The shirt is relaxed and designed to fit true to size. Sizes currently available are S, M, L, XL, and XXL.', 'For the most accurate recommendation, email hello@tomis.ng with your usual shirt size, chest measurement, height, and preferred fit. Our team will help before you place an order.'] },
    { title: 'How to measure', items: ['Measure your chest around the fullest part while keeping the tape level.', 'Measure a well-fitting shirt from armpit to armpit and double the result.', 'Compare both measurements and choose the size that matches your preferred ease.'] },
    { title: 'Need help?', paragraphs: ['If you are between sizes or prefer an oversized fit, contact us before ordering. Exchanges are available for a different size when the item is unworn and has its tags attached.'] },
  ]} />;
}
