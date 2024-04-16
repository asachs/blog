<template>
    <div class="posts-list">
        <div class="post" v-for="post in posts" @click="router.push(post.permalink || post.path)">
            <h3 class="post__title">
                {{ post.title }}
            </h3>

            <div class="post__excerpt" v-html="post.excerpt"></div>

            <div class="post__metadata">
            <DateTime class="post__date" :time="post.frontmatter.date" format="YYYY-MM-DD" />
            <span class="post__tag" v-for="tag in (post.frontmatter?.tags || [])">#{{ tag }}</span>
            <a class="post__keep-reading" :href="post.permalink || post.path">Keep Reading &rarr;</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {} from 'vue'
import {useRouter} from 'vue-router'
import { PageCacheEntry } from '../utils/pageCache';

export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        return {
            posts: props.posts as PageCacheEntry[],
            router: useRouter()
        }
    }
}
</script>

<style>
    .posts-list .post {
        margin-left: 1rem;
        margin-right: 2rem;
        margin-bottom: 2rem;
        padding-left: 1rem;
        cursor: pointer;

        border-left: 4px solid rgba(180, 180, 180, 0.0);
        transition: border-color 0.2s ease-in-out;
    }

    .posts-list .post:hover {
        border-color: var(--c-brand);
    }

    .posts-list .post__title {
        margin-top: 2rem;
        padding-top: 0;
        margin-bottom: 0;
    }

    .posts-list .post__title a {
        color: var(--c-text);
    }

    .posts-list .post__excerpt .header-anchor {
        display: none;
    }

    .posts-list .post__excerpt h1 {
        font-size: 1.4rem;
        padding-top: 0;
        margin-top: 1rem;
    }

    .posts-list .post__excerpt h1:first-child + p {
        margin-top: 0;
    }

    .posts-list .post__keep-reading {
        margin-left: 0.5rem;
    }

    .posts-list .post__date {
        font-size: 0.9rem;
        opacity: 0.7;
        margin: 0 0.5rem;
    }

    .posts-list .post__tag {
        font-size: 0.9rem;
        font-weight: bold;
        margin: 0 5px;
    }
</style>