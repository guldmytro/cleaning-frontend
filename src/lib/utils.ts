export function replaceStringWithCity(str: string, city: string) {
    return str.replace(/\[(city|yourcity)\]/g, city);
}

export function parseBodyMarkup(input: string) {
    const result = [];

    // TextSide
    const textSideRegex = /\[TextSide title="(.*?)"\]([\s\S]*?)\[\/TextSide\]/g;
    let match;

    while ((match = textSideRegex.exec(input))) {
        const title = match[1];
        const content = match[2];

        const paragraphs = [...content.matchAll(/\[P\]([\s\S]*?)\[\/P\]/g)]
            .map(p => p[1].trim());

        result.push({
            type: "textSide",
            title,
            paragraphs
        });
    }

    // ListSide
    const listSideRegex = /\[ListSide title="(.*?)"\]([\s\S]*?)\[\/ListSide\]/g;

    while ((match = listSideRegex.exec(input))) {
        const title = match[1];
        const content = match[2];

        const items = [...content.matchAll(/\[item\]([\s\S]*?)\[\/item\]/g)]
            .map(i => i[1].trim());

        result.push({
            type: "listSide",
            title,
            items
        });
    }

    return result;
}

export type AccordeonItem = {
    title: string;
    text: string;
};

export function parseFaqMarkup(input: string): AccordeonItem[] {
    const result: AccordeonItem[] = [];

    const faqRegex = /\[faq title="(.*?)"\]([\s\S]*?)\[\/faq\]/g;
    let match;

    while ((match = faqRegex.exec(input))) {
        result.push({
            title: match[1].trim(),
            text: match[2].trim()
        });
    }

    return result;
}

export function normalizeMediaURL(url: string, lURL:string): string {
    try {
        const localURL = new URL(lURL);
        const imageURL = new URL(url);
        imageURL.host = localURL.host;
        imageURL.port = localURL.port;
        return imageURL.toString();
    } catch(e) {
        return '';
    }

}