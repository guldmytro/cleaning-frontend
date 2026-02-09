<script lang="ts">
    import Button from "$lib/assets/components/ui/Button.svelte";
    import LinkArrow from "$lib/assets/components/ui/LinkArrow.svelte";
    import SliderArrow from "$lib/assets/components/ui/SliderArrow.svelte";
    import Field from "$lib/assets/components/ui/Field.svelte";
    import Select from "$lib/assets/components/ui/Select.svelte";
    import Accordeon from "$lib/assets/components/ui/Accordeon.svelte";
    import Headline from "$lib/assets/components/ui/Headline.svelte";

    let phone = $state<string>('+41 79 123 45 67');

    let options = $state([
        {
            label: 'Zürich',
            value: 'zurich',
        },
        {
            label: 'Zug',
            value: 'zug',
        },
        {
            label: 'Luzern',
            value: 'luzern',
        },
        {
            label: 'Basel',
            value: 'basel',
        },
        {
            label: 'Bern',
            value: 'bern',
        },
    ]);

    let currentOption = $state({
        label: 'Zürich',
        value: 'zurich',
    });

    let accordeonItems = $state([
        {
            title: 'Frage №1',
            text: 'Jedes Objekt wird individuell bewertet – je nach Nutzung, Zustand und Leistungsumfang.'
        },
        {
            title: 'Frage №2',
            text: 'Jedes Objekt wird individuell bewertet – je nach Nutzung, Zustand und Leistungsumfang.'
        }
    ]);
</script>
<div class="content">
    <div class="group">
        <Button size="default" style="default" text="Default Default" />
        <Button size="small" style="default" text="Small Default" />
        <Button size="small" style="ghost" text="Small Ghost" />
        <Button size="extra-small" style="ghost" text="Extra-Small Ghost" />
    </div>
    <br>
    <br>
    <div class="group" style="position: relative; z-index: 100;">
        <LinkArrow href="https://google.com" ariaLabel="Google Link" />
        <SliderArrow ariaLabel="next" direction="left" />
        <SliderArrow ariaLabel="next" direction="right" />
        <Select {options} 
                {currentOption} 
                white={true}
                mobile={false}
                handleChange={(value: string) => currentOption = options.find(opt => opt.value === value) || options[0]} />
        <div class="select">
            <Select {options} 
                    {currentOption} 
                    white={true}
                    mobile={true}
                    handleChange={(value: string) => currentOption = options.find(opt => opt.value === value) || options[0]} />
        </div>
        <div style="width: 510px;">
            <Accordeon items={accordeonItems} />
        </div>
    </div>
    <br>
    <br>
    
    <br>
    <br>
    <div class="group" style="padding-block: 80px; background-color: white;  margin-inline: -30px; padding: 30px;">
        <Field label="Phone" name="phone"
               type="tel"
               placeholder="+41 79 123 45 67"
               value=""
               required={false}
               handleInput={(val: string) => phone = val}
               />
        <Field label="Phone" name="phone"
               type="tel"
               placeholder="+41 79 123 45 67"
               value={phone}
               required={true}
               handleInput={(val: string) => phone = val}
               />
        <Select {options} 
                {currentOption} 
                white={false}
                mobile={false}
                handleChange={(value: string) => currentOption = options.find(opt => opt.value === value) || options[0]} />
    </div>
    <div class="group">
        <Headline title="Headline 1" level={1} />
        <Headline title="Headline 2" level={2} />
        <Headline title="Headline 3" level={3} />
        <Headline title="Headline 4" level={4} />
        <Headline title="Headline 5" level={5} />
    </div>
</div>

<style>
    .content {
        padding: 0 30px;
    }

    .group {
        padding-block: 30px;
        display: flex;
        align-items: flex-start;
        gap: 15px;
    }
</style>