import { App } from "vuepress";

interface BuildPageCacheOptions {
  reverse?: boolean
  includeReadme?: boolean
  requireExcerpt?: boolean
}

const defaultBuildPageCacheOptions: BuildPageCacheOptions = {
  reverse: false,
  includeReadme: false,
  requireExcerpt: true
}

export async function buildPageCache(app: App, name: string, prefix: string, options: BuildPageCacheOptions = {}): Promise<void> {
  options = {
    ...defaultBuildPageCacheOptions,
    ...options
  }

  const pages = app.pages
    .filter(page => page.filePathRelative?.startsWith(prefix))
    .filter(page => options.includeReadme || page.filePathRelative !== `${prefix}/README.md`)
    .map(page => ({
      ...page,
      excerpt: page.contentRendered.includes("<!-- more -->") ? page.contentRendered.split("<!-- more -->")[0] : null
    }))
    .filter(page => !options.requireExcerpt || !!page.excerpt)

  pages.sort((a, b) => (b.filePathRelative! > a.filePathRelative! ? -1 : 1) * (options.reverse ? -1 : 1))

  await app.writeTemp(`${name}.js`, `export const ${name} = ${JSON.stringify(pages)}`)
}
