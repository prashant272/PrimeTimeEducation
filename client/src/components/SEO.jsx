import { getAwardName } from "../utils/brand.js";

/**
 * SEO Component for React 19 Native Metadata Hoisting.
 * Simply rendering <title> and <meta> tags inside components will 
 * automatically move them to the document head in React 19.
 */
export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage = "/images/primetimelogo.gif", 
  ogType = "website" 
}) {
  const brandName = getAwardName();
  const fullTitle = `${title} | ${brandName} 2026`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Search Engine Optimization */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={window.location.href} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
