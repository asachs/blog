---
title: Projects
sidebar: false
comments: false
editLink: false
---

<PostList :posts="projects" />

<script>
import {projects} from "@temp/projects"

export default {
    setup() {
        return {
            projects
        }
    }
}
</script>