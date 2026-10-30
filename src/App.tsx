import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ServicePage from '@/pages/ServicePage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import TeamMemberPage from '@/pages/TeamMemberPage';
import FaqPage from '@/pages/FaqPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="team/:slug" element={<TeamMemberPage />} />
        <Route path="faqs" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
