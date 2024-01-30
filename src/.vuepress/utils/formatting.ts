import { PageHeader } from "vuepress"
import MarkdownIt from "markdown-it"

export function htmlDecode(input: string): string {
  return input.replace("&#39;", "'")
    .replace("&amp;", "&")
    .replace("&quot;", '"')
}

export function fixPageHeader(header: PageHeader) {
  header.title = htmlDecode(header.title)
  header.children.forEach(child => fixPageHeader(child))
}

export function mermaidCodeFencePlugin(md: MarkdownIt) {
  const original = md.renderer.rules.fence!
  md.renderer.rules.fence = (tokens, idx, options, ...resParams) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (token.info.startsWith('mermaid')) {
      const safeCaption = token.info.slice('mermaid'.length + 1).replace(/"/g, '&quot;')
      const safeCode = JSON.stringify(code).replace(/"/g, "&quot;")
      return `<ClientOnly><Mermaid :value="${safeCode}" caption="${safeCaption}" /></ClientOnly>`
    }

    return original(tokens, idx, options, ...resParams)
  }
}
