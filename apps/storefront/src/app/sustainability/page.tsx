import InfoPage from '@/components/InfoPage';

export default function SustainabilityPage() {
  return <InfoPage eyebrow="Tomis" title="SUSTAINABILITY" intro="Tomis is a Lagos-born brand working toward a more considered approach to product, production, and wardrobe choice." sections={[
    { title: 'A smaller, focused wardrobe', paragraphs: ['Our signature model is intentionally focused: one half-collar silhouette in a considered range of colours. We believe buying fewer, more useful pieces can be a better starting point than chasing constant novelty.'] },
    { title: 'Made in Lagos', paragraphs: ['Our shirts are crafted in Lagos, Nigeria. We are continuing to document the people, processes, materials, and production decisions behind each collection so that future claims can be specific and verifiable.'] },
    { title: 'What comes next', paragraphs: ['As Tomis grows, this page will publish more detail about material sourcing, packaging, production partners, repair or reuse options, and measurable progress.'] },
  ]} />;
}
