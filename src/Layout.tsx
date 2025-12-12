const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full px-8 py-4 lg:px-24 lg:py-16">
      {children}
    </main>
  );
};

export default Layout;
