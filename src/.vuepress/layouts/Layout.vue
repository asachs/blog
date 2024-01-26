<template>
  <BaseLayout>
    <template #page-bottom>
        <AboutMe />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import BaseLayout from "@vuepress/theme-default/layouts/Layout.vue"

export default defineComponent({
    name: "ImprovedLayout",
    components: {
        BaseLayout,
    }
});
</script>

<style>
</style>