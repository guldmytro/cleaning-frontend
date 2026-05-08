<script lang="ts">
    import Button from "../ui/Button.svelte";
    import { m } from "$lib/paraglide/messages";
    import { page } from "$app/state";
    import Headline from "../ui/Headline.svelte";
    import Paragraph from "../ui/Paragraph.svelte";
    import Field from "../ui/Field.svelte";
    import UploadImages from "../ui/UploadImages.svelte";
    import { env } from "$env/dynamic/public";
    import { getLocale } from "$lib/paraglide/runtime";
    const PUBLIC_LOCAL_API_URL = env.PUBLIC_LOCAL_API_URL!;
    import type { CategoryArchive } from "$lib/types/category";
    import Happy from '$lib/assets/img/happy.png';
    import type { ServiceMenu } from "$lib/types/service";
    import { afterNavigate } from "$app/navigation";
    import Sprite from "../ui/Sprite.svelte";

    let base = PUBLIC_LOCAL_API_URL;
    base = base.replace('locale', getLocale());
    
    const categories = page.data?.categories;

    let stage = $state<1 | 2 | 3 | 4>(1);
    let activeTab = $state<number>(0);
    let services = $state<string[]>([]);
    let square = $state('');
    let requirements = $state('');
    let images = $state<File[]>([]);
    let name = $state('');
    let phone = $state('');
    let email = $state('');
    let address = $state('');
    let company = $state('');


    let stage1Valid = $derived(!!services.length);
    let stage2Valid = $derived(!!square.length);
    let stage3Valid = $derived(!!name.length && !!phone.length && !!email.length && !!address.length);
    
    function resetForm() {
        stage = 4;
        services = [];
        square = "";
        requirements = "";
        images = [];
        name = "";
        phone = "";
        email = "";
        company = "";
    }

    let loading = $state(false);
    
    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        loading = true;

        try {
            const fd = new FormData();

            // --- stage 1
            services.forEach((service) => {
                fd.append("services", service);
            });

            // --- stage 2
            fd.append("square", square);
            fd.append("requirements", requirements);

            images.forEach((file) => {
                fd.append("images", file);
            });

            // --- stage 3
            fd.append("name", name);
            fd.append("phone", phone);
            fd.append("email", email);
            fd.append("address", address);
            fd.append("company", company);

            const res = await fetch(`${base}send-offer/`, {
                method: "POST",
                body: fd
            });

            if (!res.ok) {
                throw new Error("Submit failed");
            }
            stage = 4;
            resetForm();
        } catch (err) {
            console.error(err);
        }
    }

    function getSelectedCount(category: CategoryArchive) {
        return category.services.filter(s => services.includes(s.short_title)).length;
    }

    let current = $derived.by(() => {
        if (!page.params?.service) return;
        if (!page.params?.service_category) return;
        const currentCategory = page.data?.categories.find((c: CategoryArchive) => c.slug === page.params?.service_category);

        return {
            currentCategory,
            
        }
    });

    afterNavigate(() => {
        if (!page.params?.service || !page.params?.service_category) return;
        activeTab = page.data?.categories.findIndex((c: CategoryArchive) => c.slug === page.params?.service_category) || 0;
        if (!Array.isArray(page?.data?.categories[activeTab]?.services)) return;

        const currentService = page?.data?.categories[activeTab].services.find((s: ServiceMenu) => s.slug === page.params.service);

        if (!currentService) return;
        services[0] = currentService.short_title;
    });

    const translations = {
        'en': {
            'area': 'Property area',
            'carpets': 'Number and area of the carpets',
            'sofas': 'Number of sofas and seating area'
        },
        'de': {
            'area': 'Objektfläche',
            'carpets': 'Anzahl und Fläche der Teppiche',
            'sofas': 'Anzahl der Sofas und Sitzfläche'
        }
    } as const;

    let helpText: string = $derived.by(() => {
        if (!services.length) {
            const translation = translations[getLocale()];
            const items = [translation.area];
            return items.join('. ');
        } else {
            const translation = translations[getLocale()];
            const items = [translation.area];
            if (services.includes('Teppichreinigung') || services.includes('Carpet Cleaning')) items.push(translation.carpets);
            if (services.includes('Polster- & Sofareinigung') || services.includes('Upholstery & Sofa Cleaning')) items.push(translation.sofas);
            return items.join('. ');
        }
        
    });
</script>
<form class="form stage-{stage}">
    {#if stage < 4}
        <div class="form-header gr">
            <div class="progress">
                <div class="progress-fill" style="width: {(stage / 3) * 100}%; max-width: 100%"></div>
            </div>
            <div class="form-header__row">
                <div class="stage">{stage}/3</div>
                <div class="controls">
                    {#if stage > 1 && stage !== 4}
                        <button type="button" 
                                class="btn-arrow btn-arrow_prev"
                                onclick={() => stage--}>
                            <span class="btn-arrow__img">
                                <Sprite id="arrow-step" />
                            </span>
                        </button>
                    {/if}
                    {#if stage < 3}
                        <button type="button" 
                                class="btn-arrow btn-arrow_next"
                                disabled={(stage === 1 && !stage1Valid) || (stage === 2 && !stage2Valid) || stage === 3}
                                onclick={() => stage++}>
                            <span class="btn-arrow__img">
                                <Sprite id="arrow-step" />
                            </span>
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
    <div class="form-content">
        {#if stage === 1}
            <div class="form-content__header gr" style="margin-bottom: var(--s-v-800);">
                <Headline title={m.stage1Title()} level={3} levelStyle={4} />
                <div class="p-wrapper">
                    <Paragraph 
                        text={m.stage1Subtitle()}
                        size="p"
                        weight="400"
                    />
                </div>
            </div>
            {#if Array.isArray(categories) && categories.length}
                <div class="tabs">
                    {#each categories as category, i (category.slug)}
                        {#if Array.isArray(category.services) && category.services.length}
                            <div class="tab-group">
                                <button type="button" class="tab" class:active={i === activeTab} onclick={() => activeTab === i ? activeTab = -1 : activeTab = i}>
                                    <span class="tab-col">
                                        <strong class="headline">
                                            {category.title}
                                        </strong>
                                        <span class="p">
                                            {#if category.slug === 'unterhaltsreinigung'}
                                                {#if getLocale() === 'de'}
                                                    Pflege für Büros & Gewerbeflächen
                                                {:else}
                                                    Office & Commercial Cleaning & Care
                                                {/if}
                                            {:else}
                                                {#if getLocale() === 'de'}
                                                    Gründliche Reinigung nach Bedarf
                                                {:else}
                                                    Deep Cleaning as Needed
                                                {/if}
                                            {/if}
                                        </span>
                                    </span>
                                    <span class="tab-arrow">
                                        <span class="cnt">{getSelectedCount(category)}/({category.services.length})</span>
                                        <span class="arw">
                                            <span class="arw-inner">
                                                <Sprite id="arrow-down"/>
                                            </span>
                                        </span>
                                    </span>
                                </button>
                                <div class="checkboxes-wrapper" class:active={activeTab === i}>
                                    <div class="checkboxes">
                                        {#each category.services as service (service.short_title)}
                                            <label class="label">
                                                <input class="checkbox" type="checkbox" name="services" value={service.short_title} bind:group={services}>
                                                <span class="label__text">{service.short_title}</span>
                                            </label>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                            <hr class="sep">
                        {/if}
                    {/each}
                </div>
            {/if}
        {:else if stage === 2}
            <div class="form-content__header gr" style="margin-bottom: var(--s-v-800);">
                <Headline title={m.stage2Title()} level={3} levelStyle={4} />
                <div class="p-wrapper">
                    <Paragraph 
                        text={m.stage2Subtitle()}
                        size="p"
                        weight="400"
                    />
                </div>
            </div>
            <div class="st2-fields">
                <div class="col gr">
                    <Field label={m.worksLabel()} 
                        name="square" 
                        value={square} 
                        required={true}
                        placeholder={m.worksPlaceholder()}
                        {helpText}
                        type="text"
                        rows={8}
                        handleInput={(val) => square = val} />
                    <Field label={m.stage2Requirements()} 
                        name="square" 
                        value={requirements} 
                        required={false}
                        placeholder={m.stage2RequirementsPlaceholder()}
                        type="text"
                        rows={8}
                        handleInput={(val) => requirements = val} />
                </div>
                <UploadImages bind:files={images} />
            </div>
        {:else if stage === 3}
            <div class="form-content__header gr" style="margin-bottom: var(--s-v-600);">
                <Headline title={m.stage3Title()} level={3} levelStyle={4} />
                <div class="p-wrapper">
                    <Paragraph 
                        text={m.stage3Subtitle()}
                        size="p"
                        weight="400"
                    />
                </div>
            </div>
            <div class="st3-fields">
                <Field label={m.stage3Name()} 
                        name="name" 
                        value={name} 
                        required={true}
                        placeholder={m.namePlaceholder()}
                        type="text"
                        handleInput={(val) => name = val} />
                <Field label={m.stage3Phone()} 
                        name="square" 
                        value={phone} 
                        required={true}
                        placeholder="+41 79 123 45 67"
                        type="tel"
                        handleInput={(val) => phone = val} />
                <Field label={m.stage3Email()} 
                        name="email" 
                        value={email} 
                        required={true}
                        placeholder={m.stage3EmailPlaceholder()}
                        type="email"
                        handleInput={(val) => email = val} />
                <div class="wide">
                    <Field label={m.stage3Address()} 
                        name="address" 
                        value={address} 
                        required={true}
                        placeholder={m.stage3AddressPlaceholder()}
                        type="text"
                        handleInput={(val) => address = val} />
                </div>
                <Field label={m.stage3Company()} 
                        name="company" 
                        value={company} 
                        required={false}
                        placeholder={m.stage3CompanyPlaceholder()}
                        type="text"
                        handleInput={(val) => company = val} />
                <div class="submit">
                    <Button 
                        text={m.submit()}
                        style="default"
                        size="small"
                        type="submit"
                        disabled={!stage1Valid || !stage2Valid || !stage3Valid || loading}
                        onClick={(e:SubmitEvent) => handleSubmit(e)} />
                    <ul class="sh-list">
                        <li><p class="submit__text">{@html String(m.sh1()).replace('[city]', page.data.currentCitySlug)}</p></li>
                        <li><p class="submit__text">{@html m.sh2()}</p></li>
                        <li><p class="submit__text">{@html m.sh3()}</p></li>
                    </ul>
                </div>
            </div>
            
        {:else if stage === 4}
            <div class="success gr">
                <div class="success-icon">
                    <img class="success-icon__img" src={Happy} alt="celebrate" width="64" height="64" loading="lazy">
                </div>
                <div class="success-content gr">
                    <Headline title={m.successTitle()} level={3} levelStyle={2} />
                    <Paragraph text={m.successSubtitle()} size="p" weight="400" />
                </div>
            </div>
        {/if}
        {#if stage < 3}
            <div class="bottom-controls">
                {#if stage > 1 && stage !== 4}
                    <Button text={m.formPrev()} size="small" style="ghost" type="button" onClick={() => stage--} />
                {/if}
                {#if stage < 3}
                    <Button text={m.formNext()} size="small" style="default" type="button" onClick={() => stage++} disabled={(stage === 1 && !stage1Valid) || (stage === 2 && !stage2Valid) || stage === 3} />
                {/if}
            </div>
        {/if}
    </div>
</form>

<style>
    .form {
        border-radius: 10px;
        overflow: hidden;
        background-color: var(--c-white);
    }

    .progress {
        height: 10px;
        background-color: #C6DBF8;
    }

    .progress-fill {
        height: 100%;
        background-color: var(--c-accent);
        transition: width 180ms ease;
        will-change: width;
    }

    .stage {
        line-height: 1.1;
        font-weight: 600;
    }

    .btn-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 45px;
        border: 2px solid var(--c-accent);
        border-radius: 6px;
        transition: opacity 200ms ease;
    }

    .btn-arrow:disabled {
        opacity: 0.5;
    }
    
    .btn-arrow_prev {
        background-color: transparent;
        color: var(--c-accent);
        transform: scaleX(-1);
    }

    .btn-arrow_next {
        background-color: var(--c-accent);
        color: var(--c-white);
    }
    
    .btn-arrow__img {
        width: 13px;
    }

    .form-header__row {
        justify-content: space-between;
        display: flex;
        align-items: center;
        padding: var(--s-v-400) var(--s-h-500);
        background-color: var(--c-white);
        box-shadow: 0 20px 115px 0 rgba(21, 25, 31, 0.04);
    }

    .controls {
        display: flex;
        column-gap: var(--s-h-50);
    }

    .form-content {
        padding: var(--s-v-1100) var(--s-h-500);
    }

    .p-wrapper {
        max-width: 440px;
        opacity: 0.7;
    }

    .form-content__header {
        row-gap: var(--s-v-300);
    }

    .tabs {
        position: relative;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        isolation: isolate;
        padding-block: calc(var(--s-v-700) + var(--s-v-200));
    }

    .tabs::after {
        content: '';
        display: block;
        position: absolute;
        left: -1000px;
        right: -1000px;
        top: 0;
        bottom: -1000px;
        background-color: #FAFAFA;
        z-index: -1;
    }

    .tab-group {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
    }

    .tab {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0;
        row-gap: var(--s-v-100);
        border: none;
        background-color: transparent;
    }

    .tab-col {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        row-gap: var(--s-v-100);
    }

    .headline {
        font-size: var(--h5);
        font-weight: 600;
        line-height: 1.1;
        font-family: 'Inter';
        color: var(--c-text);
    }

    .p {
        font-size: var(--p);
        font-weight: 400;
        line-height: 1.2;
    }

    .tab-arrow {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        column-gap: 4px;
    }

    .tab-arrow .cnt {
        font-size: var(--p-xs);
        font-weight: 600;
        white-space: nowrap;
        line-height: 1;
        font-family: 'Inter';
    }

    .tab-arrow .arw {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 200ms ease;
    }

    .arw-inner {
        width: 8px;
    }

    .active .arw {
        transform: rotate(-180deg);
    }

    .sep {
        display: block;
        width: 100%;
        padding: 0;
        margin-block: var(--s-v-700);
        height: 1px;
        background-color: #D9D9D9;
        border: none;
    }

    .sep:last-child {
        display: none;
    }

    .checkboxes-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.2s ease;
    }

    .checkboxes-wrapper.active {
        grid-template-rows: 1fr;
    }

    .checkboxes {
        display: flex;
        flex-wrap: wrap;
        padding-top: var(--s-v-400);
        gap: 12px;
        overflow: hidden;
    }

    .checkbox {
        appearance: none;
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
        z-index: -1;
        position: absolute;
    }

    .label {
        display: flex;
        gap: 8px;
        cursor: pointer;
    }

    .label__text {
        white-space: nowrap;
        font-size: var(--p-xs);
        font-weight: 600;
        padding: 16px 20px;
        border: 1px solid #D9E3E2;
        border-radius: 6px;
        line-height: 1;
        transition: color 180ms ease, border-color 180ms ease;
        will-change: color, border-color;
        background-color: var(--c-white);
    }

    .checkbox:checked + .label__text {
        color: var(--c-accent);
        border-color: var(--c-accent);
    }

    .st2-fields {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: var(--s-h-200);
    }

    .col {
        row-gap: var(--s-v-500);
    }

    .st3-fields {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: flex-start;
        column-gap: var(--s-h-100);
        row-gap: var(--s-v-500);
    }

    .sh-list {
        list-style: none;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        row-gap: 10px;
        margin-top: var(--s-v-250);
    }

    .submit {
        margin-top: var(--s-v-500);
    }

    :global(.submit button) {
        height: 55px;
    } 

    .submit__text {
        font-size: var(--p-xs);
        line-height: 1;
    }

    :global(.sh-list a) {
        text-decoration: underline;
    }

    .success {
        row-gap: var(--s-v-500);
        justify-items: center;
        text-align: center;
    }

    .success-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: var(--c-theme);
    }

    .success-content {
        row-gap: var(--s-v-300);
    }

    .bottom-controls {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        padding-top: var(--s-v-800);
        column-gap: var(--s-h-50);
    }

    .stage-1 .bottom-controls {
        padding-top: var(--s-v-300);
    }

    @media (max-width: 991px) {
        .st2-fields {
            grid-template-columns: minmax(0, 1fr);
            row-gap: var(--s-v-500);
        }

        .st3-fields {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: var(--s-v-500);
        }

        .wide {
            grid-column: 1 / -1;
            order: 1;
        }

        .submit {
            margin-top: 0;
            grid-column: 1 / -1;
            order: 2;
        }
    }

    @media (max-width: 834px) {
        .tab {
            padding-inline: clamp(12px, 3vw, 20px);
        }
    }

    @media (max-width: 575px) {
        .label__text {
            white-space: wrap;
            text-align: center;
        }

        .st3-fields {
            grid-template-columns: minmax(0, 1fr);
        }

        .success {
            justify-items: start;
            text-align: left;
        }

        .success-icon {
            width: 120px;
            height: 120px;
        }

        .success-icon__img {
            width: 54px;
            height: 54px;
        }

        .bottom-controls {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        :global(.bottom-controls button) {
            width: 100% !important;
            text-align: center;
        }
    }
</style>