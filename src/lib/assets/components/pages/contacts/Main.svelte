<script lang="ts">
    import { m } from "$lib/paraglide/messages";
    import Container from "../../global/Container.svelte";
    import Socials from "../../global/Socials.svelte";
    import Headline from "../../ui/Headline.svelte";
    import Paragraph from "../../ui/Paragraph.svelte";


</script>

<main class="contacts">
    <Container>
        <div class="contacts-row gr">
            <div class="contacts-header gr">
                <Headline title={m.contactsTitle()} level={1} levelStyle={1} />
                <div class="p-wrapper">
                    <Paragraph text={m.contactsSubtitle()} size="p" weight="400" />
                </div>
            </div>
            <Socials contacts={true} />
        </div>
    </Container>
</main>

<style>
    .contacts {
        padding-top: 234px;
    }

    .contacts-row {
        row-gap: var(--s-v-800);
    }

    .contacts-header {
        row-gap: var(--s-v-400);
    }

    .p-wrapper {
        max-width: 470px;
    }

    @media (max-width: 834px) {
        .contacts {
            padding-top: clamp(185px, calc(144.97px + 10.675vw), 234px);
        }
    }
</style>