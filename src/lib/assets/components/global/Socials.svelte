<script lang="ts">
    import Paragraph from "../ui/Paragraph.svelte";
    import Sprite from "../ui/Sprite.svelte";

    type Social = {
        icon: 'marker' | 'letter' | 'phone';
        href: string;
        label: string;
    }

    const socials: Social[] = [
        {
            icon: 'phone',
            href: 'tel:04150500002',
            label: '041 505 00 002'
        },
        {
            icon: 'letter',
            href: 'mailto:office@swiss-worx.ch',
            label: 'office@swiss-worx.ch'
        },
        {
            icon: 'marker',
            href: 'https://maps.app.goo.gl/NXaesymHu7STWmkU9',
            label: 'Baarerstraße 43, 6300 Zug'
        }
    ];

    export let contacts = false;
</script>

{#if socials.length}
    <div class="socials gr" class:contacts>
        {#each socials as social (social.icon)}
            <a href={social.href} class="social-link">
                <span class="social-link__icon">
                    <Sprite id={social.icon} />
                </span>
                <Paragraph text={social.label} size="p-s" weight="600" lineHeight="short" />
            </a>
        {/each}
    </div>
{/if}

<style>
    .socials {
        row-gap: var(--s-v-200);
    }

    .socials.contacts {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--s-h-100);
    }

    .social-link {
        display: flex;
        flex-flow: row nowrap;
        column-gap: 16px;
        align-items: center;
    }

    .socials.contacts .social-link {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: var(--s-v-300);
        background-color: var(--c-white);
        border-radius: 6px;
        padding-block: var(--s-h-200);
        padding-inline: var(--s-v-600);
    }
    
    .social-link__icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background-color: var(--c-white);
        border-radius: 50%;
    }

    .socials.contacts .social-link__icon {
        background-color: var(--c-theme);
    }

    .social-link:last-child .social-link__icon {
        padding: 11px;
    }

    .social-link:first-child .social-link__icon {
        padding: 9.5px;
    }

    .social-link:nth-child(2) .social-link__icon {
        padding: 8px;
    }

    @media (max-width: 899px) {
        .socials.contacts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 575px) {
        .socials.contacts {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    }
</style>