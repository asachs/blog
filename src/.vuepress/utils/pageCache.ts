import { App } from "vuepress";

export async function buildPageCache(app: App, name: string, prefix: string): Promise<void> {
    const pages = app.pages
        .filter(page => page.filePathRelative?.startsWith(prefix) && page.filePathRelative !== `${prefix}/README.md`)
        .map(page => ({
            ...page,
            excerpt: page.contentRendered.includes("<!-- more -->") ? page.contentRendered.split("<!-- more -->")[0] : null
        }))
        .filter(page => !!page.excerpt)

    pages.sort((a, b) => b.filePathRelative! > a.filePathRelative! ? 1 : -1)

    await app.writeTemp(`${name}.js`, `export const ${name} = ${JSON.stringify(pages)}`)
}