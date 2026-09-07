import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact Us"
        title="Let’s Connect"
        text="Whether you are looking for Giridhan products, sustainable gifting, retail opportunities or international collaborations, we’d love to hear from you."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-forest">Giridhan Organics</h2>
          <p className="mt-1 text-sm uppercase tracking-[0.18em] text-leaf">Goshala | Farm</p>
          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Location</dt>
              <dd className="mt-1">{site.address}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Call Us</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="hover:text-leaf">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Email</dt>
              <dd className="mt-1">
                <a href={site.emailHref} className="hover:text-leaf">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Enquiries</dt>
              <dd className="mt-1 text-muted">
                Product Enquiries · Bulk Orders · Corporate Gifting · Partnerships
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex gap-4">
            <a href={site.facebook} className="text-sm hover:text-leaf" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={site.instagram} className="text-sm hover:text-leaf" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.whatsapp} className="text-sm hover:text-leaf" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
