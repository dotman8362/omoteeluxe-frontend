import { FacebookIcon, PinterestIcon, XIcon, LinkedInIcon } from "./Icons.jsx";
import "./ShareLinks.css";

const SHARE_LINKS = [
  {
    id: "facebook",
    label: "Share on Facebook",
    Icon: FacebookIcon,
    getUrl: (title, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "pinterest",
    label: "Share on Pinterest",
    Icon: PinterestIcon,
    getUrl: (title, url) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  {
    id: "x",
    label: "Share on X",
    Icon: XIcon,
    getUrl: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "Share on LinkedIn",
    Icon: LinkedInIcon,
    getUrl: (title, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

function ShareLinks({
  title = "Hooked by Lade",
  url = typeof window !== "undefined" ? window.location.href : "",
}) {
  const handleShare = (event, shareUrl) => {
    event.preventDefault();

    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title, url })
        .catch(() => window.open(shareUrl, "_blank", "noopener,noreferrer"));
      return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <ul className="share-links">
      {SHARE_LINKS.map(({ id, label, Icon, getUrl }) => {
        const shareUrl = getUrl(title, url);

        return (
          <li key={id}>
            <a
              href={shareUrl}
              aria-label={label}
              className="share-links__icon"
              onClick={(event) => handleShare(event, shareUrl)}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default ShareLinks;
