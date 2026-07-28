import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://awaismalik.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Awais Malik | Software Developer & AI Robotics Enthusiast",
  description: "Portfolio of Awais Malik, a software developer and AI & robotics enthusiast building web applications, bots, machine-learning experiments, and intelligent systems.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Awais Malik | Software Developer & AI Robotics Enthusiast",
    description: "Web development, Discord bots, machine learning, and robotics projects by Awais Malik.",
    url: "/",
    siteName: "Awais Malik",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Awais Malik portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Awais Malik | Portfolio", description: "Software development, AI, and robotics projects by Awais Malik.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Awais Malik",
    jobTitle: "Software Developer, AI & Robotics Enthusiast",
    email: "mailto:awsmlk@proton.me",
    address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
    sameAs: ["https://github.com/awsmlk", "https://www.linkedin.com/in/awsmlk/", "https://www.instagram.com/awsmlks"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
