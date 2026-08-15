import { site } from "@/lib/site";

/*
  Keyless Google Maps embed (no API key / billing required).
  Uses the public maps embed endpoint pointed at the business address.
  Allowed in the CSP via frame-src https://www.google.com.
*/
export function GoogleMap({ className }: { className?: string }) {
  const query = encodeURIComponent(site.address.full);
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className={className}>
      <iframe
        title={`Map to ${site.name}, ${site.address.full}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[320px] w-full rounded-[12px] border border-hairline grayscale-[0.2]"
        allowFullScreen
      />
    </div>
  );
}
