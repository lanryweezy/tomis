import InfoPage from '@/components/InfoPage';

export default function CookiesPage() {
  return <InfoPage eyebrow="Legal" title="COOKIE POLICY" intro="Cookies and similar technologies help the Tomis store remember preferences, keep the cart working, and understand how the site is used." sections={[
    { title: 'Essential technologies', paragraphs: ['Some storage is necessary for core functions such as theme preference, cart state, security, and checkout. These cannot be disabled when they are required for the store to work.'] },
    { title: 'Analytics and marketing', paragraphs: ['If analytics or marketing technologies are enabled, they should be disclosed with the relevant provider, purpose, duration, and choice mechanism. Customers can contact hello@tomis.ng with questions about data preferences.'] },
    { title: 'Updates', paragraphs: ['This policy will be updated when the site adds or changes analytics, advertising, personalization, or embedded third-party services.'] },
  ]} />;
}
