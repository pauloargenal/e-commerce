interface FooterProps {
  footerLocale: string;
}
export function Footer({ footerLocale }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-gray-600">{footerLocale}</p>
      </div>
    </footer>
  );
}
