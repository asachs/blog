import { App } from "vuepress";

interface BuildPageCacheOptions {
  reverse?: boolean
  includeReadme?: boolean
  requireExcerpt?: boolean
}

export interface PageCacheEntry {
  title: string
  path: string
  permalink: string
  filePathRelative: string
  frontmatter: Record<string, any>
  slug: string
  date: string

  excerpt: string | null
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
      title: page.title,
      path: page.path,
      permalink: page.permalink,
      filePathRelative: page.filePathRelative,
      frontmatter: page.frontmatter,
      slug: page.slug,
      date: page.date,

      excerpt: page.contentRendered.includes("<!-- more -->") ? page.contentRendered.split("<!-- more -->")[0] : null
    }))
    .filter(page => !options.requireExcerpt || !!page.excerpt)

  pages.sort((a, b) => (b.filePathRelative! > a.filePathRelative! ? -1 : 1) * (options.reverse ? -1 : 1))

  await app.writeTemp(`${name}.js`, `export const ${name} = ${JSON.stringify(pages)}`)
}
