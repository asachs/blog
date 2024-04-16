import { Feed, FeedOptions } from "feed";
import { App } from "vuepress";
import { writeFile } from "node:fs/promises";

export async function buildRssFeed(app: App, prefix: string, options: FeedOptions): Promise<void> {
    const feed = new Feed(options);
    
    app.pages
        .filter(page => page.filePathRelative?.startsWith(prefix))
        .filter(page => !!page.permalink)
        .forEach(page => feed.addItem({
            title: page.title,
            id: page.permalink || undefined,
            link: page.permalink!,
            date: new Date(page.date),
            content: page.contentRendered,
        }));
    
    await writeFile(app.dir.dest("rss.xml"), feed.rss2(), { encoding: "utf-8" });
}