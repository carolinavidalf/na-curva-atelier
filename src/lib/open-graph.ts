import { absoluteUrl } from "./site-url";

export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const DEFAULT_OG_IMAGE_WIDTH = 1600;
export const DEFAULT_OG_IMAGE_HEIGHT = 1024;

type OpenGraphMetaInput = {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  type?: "website" | "article";
};

export function openGraphMeta({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  imageWidth = DEFAULT_OG_IMAGE_WIDTH,
  imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  imageType = "image/jpeg",
  type = "website",
}: OpenGraphMetaInput) {
  const imageUrl = absoluteUrl(image);
  const pageUrl = absoluteUrl(pathname);

  return [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: "Na Curva" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: pageUrl },
    { property: "og:locale", content: "pt_PT" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: imageType },
    { property: "og:image:width", content: String(imageWidth) },
    { property: "og:image:height", content: String(imageHeight) },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
}
