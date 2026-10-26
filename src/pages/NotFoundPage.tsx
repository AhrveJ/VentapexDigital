import { Seo } from '@/components/seo/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <Container className="py-24">
      <Seo title="Page not found" />
      <meta name="robots" content="noindex" />
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-ink-soft">The page you are looking for does not exist or has moved.</p>
      <Button to="/" className="mt-8 !bg-ink !text-white">Back to home</Button>
    </Container>
  );
}
