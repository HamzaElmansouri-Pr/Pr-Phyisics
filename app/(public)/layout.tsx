import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <svg className="bg-wave" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path
          d="M0,300 C 200,250 300,350 500,300 S 800,200 1000,280 S 1300,350 1440,300"
          fill="none"
          stroke="#1a2c4d"
          strokeWidth="1.5"
        />
        <path
          d="M0,420 C 200,470 300,380 500,430 S 800,500 1000,440 S 1300,380 1440,430"
          fill="none"
          stroke="#132038"
          strokeWidth="1.5"
        />
      </svg> */}

      <Header />
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}
