import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import PageContainer from './PageContainer';
import ScrollToTop from '../ui/ScrollToTop';
import ScrollToTopButton from '../ui/ScrollToTopButton';

export default function AppShell() {
  return (
    <>
      <ScrollToTop />
      <TopNav />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
