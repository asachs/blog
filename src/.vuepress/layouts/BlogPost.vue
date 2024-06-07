<template>
  <BaseLayout>
    <template #sidebar-bottom>
      <section class="vp-sidebar-group">
        <p class="vp-sidebar-item vp-sidebar-heading">About</p>
        <ul class="post-metadata__list">
          <li class="post-metadata__item">
            Authored
            <DateTime class="post-metadata__date" :time="frontmatter.date" />
          </li>

          <li class="post-metadata__item">
            <span class="tag" v-for="tag in frontmatter.tags || []"
              >#{{ tag }}</span
            >
          </li>
        </ul>
      </section>
    </template>

    <template #page-bottom>
      <AboutMe />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { usePageFrontmatter } from "@vuepress/client"
import BaseLayout from "@vuepress/theme-default/layouts/Layout.vue"

export default defineComponent({
  name: "BlogPost",
  components: {
    BaseLayout,
  },
  setup() {
    const frontmatter = usePageFrontmatter();

    return {
      frontmatter,
    };
  },
});
</script>

<style>
.post-metadata__list {
    margin: 0;
}

.post-metadata__item {
  padding: .2rem 1rem;
  list-style: none;
}

.post-metadata__date {
  font-size: 0.9rem;
  opacity: 0.7;
}

.tag {
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 5px;
}
</style>
