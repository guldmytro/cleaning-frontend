<script lang="ts">
    import Container from "$lib/assets/components/global/Container.svelte";
    import Headline from "$lib/assets/components/ui/Headline.svelte";
    import Paragraph from "$lib/assets/components/ui/Paragraph.svelte";
    import { getLocale } from "$lib/paraglide/runtime";
</script>

{#if getLocale() === 'de'}
<main class="page">
    <Container>
        <div class="html-block">
            <div class="page-header">
                <Headline title="Impressum" level={1} levelStyle={1} />
            </div>
            <div class="text-wrapper gr">
                <div class="box">
                    <h2>Allgemein</h2>
                    <p>
                        Swissworx GmbH
                        <br>
                        Baarerstraße 43 6300 Zug 
                    </p>
                    <p>
                        Email: office@swiss-worx.ch
                        <br>
                        Support: 041 505 00 002
                    </p>
                </div>
                <div class="box">
                    <h2>Streitschlichtung</h2>
                    <p>
                        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.<br>
                        Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren 
                        vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                </div>
                <div class="box">
                    <h2>Haftung für Inhalte</h2>
                    <p>
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p>
                       Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen. 
                    </p>
                </div>
                <div class="box">
                    <h2>Haftung für Links</h2>
                    <p>
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                    </p>
                    <p>
                        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                    </p>
                </div>
                <div class="box">
                    <h2>Urheberrecht</h2>
                    <p>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                    </p>
                    <p>
                        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                    </p>
                </div>
                <div class="box">
                    <h2>Bildnachweise</h2>
                    <p>
                        Wir verwenden Bilder von istockphoto.com
                    </p>
                </div>
            </div>
        </div>
    </Container>
</main>
{:else}
<main class="page">
    <Container>
        <div class="html-block">
            <div class="page-header">
                <Headline title="Imprint" level={1} levelStyle={1} />
            </div>
            <div class="text-wrapper gr">
                <div class="box">
                    <h2>General</h2>
                    <p>
                        Swissworx GmbH
                        <br>
                        Baarerstraße 43 6300 Zug
                    </p>
                    <p>
                        Email: office@swiss-worx.ch
                        <br>
                        Support: 041 505 00 002
                    </p>
                </div>
                <div class="box">
                    <h2>Dispute Resolution</h2>
                    <p>
                        The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr<br>
                        Our email address can be found above in the imprint.We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.
                    </p>
                </div>
                <div class="box">
                    <h2>Liability for Content</h2>
                    <p>
                        As a service provider, we are responsible for our own content on these pages in accordance with § 7 para. 1 TMG and general laws. However, according to §§ 8 to 10 TMG, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
                    </p>
                    <p>
                       Obligations to remove or block the use of information in accordance with general laws remain unaffected. Liability in this respect is only possible from the point in time at which a specific legal violation becomes known. Upon becoming aware of such legal violations, we will remove the relevant content immediately.
                    </p>
                </div>
                <div class="box">
                    <h2>Liability for Links</h2>
                    <p>
                        Our website contains links to external third-party websites over whose content we have no control. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the linked pages is always responsible for the content of those pages.
                    </p>
                    <p>
                        The linked pages were checked for possible legal violations at the time of linking. Illegal content was not identifiable at the time of linking. Permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations, we will remove such links immediately.
                    </p>
                </div>
                <div class="box">
                    <h2>Copyright</h2>
                    <p>
                        The content and works created by the website operator on these pages are subject to German copyright law. Any duplication, processing, distribution, or any form of commercialization beyond the scope of copyright law requires the prior written consent of the respective author or creator. Downloads and copies of this site are permitted for private, non-commercial use only.
                    </p>
                    <p>
                        Insofar as the content on this site was not created by the website operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we will remove such content immediately.
                    </p>
                </div>
                <div class="box">
                    <h2>Image Credits</h2>
                    <p>
                        We use images from istockphoto.com.
                    </p>
                </div>
            </div>
        </div>
    </Container>
</main>
{/if}

<style>
    .page {
        padding-top: 234px;
    }

    .page-header {
        margin-bottom: var(--s-v-1000);
    }

    .html-block {
        max-width: 590px;
    }

    .text-wrapper {
        row-gap: var(--s-v-800);
    }

    h2 {
        font-size: var(--h3);
        font-weight: 600;
        letter-spacing: -0.03em;
        line-height: 1.1;
        margin-bottom: var(--s-v-500);
    }

    p + p {
        margin-top: var(--s-v-300);
    }



    @media (max-width: 834px) {
        .page {
            padding-top: clamp(185px, calc(144.97px + 10.675vw), 234px);
        }
    }

</style>