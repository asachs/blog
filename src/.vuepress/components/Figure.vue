<template>
  <figure class="image-figure" :class="classes">
    <img :src="src" :alt="alt" :title="alt" />
    <figcaption>
      <slot></slot>
    </figcaption>
  </figure>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: String,
    width: Number
  },
  setup(props) {
    return {
      src: props.src,
      alt: props.alt,
      classes: {
        [`fig-${props.width}`]: !!props.width,
      },
    };
  },
});
</script>

<style>
.image-figure figcaption {
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
}

figure {
  padding: 1rem;
}

figure.fig-33 {
  width: 33%;
}

figure.fig-40 {
  width: 40%;
}

figure.fig-50 {
  width: 50%;
}

.clearfix {
  content: " ";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}

figure img {
  border-radius: 5px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
}

@media only screen and (max-width: 719px) {

  figure.fig-33,
  figure.fig-40,
  figure.fig-50 {
    margin: 1em 0;
    width: 100%;
  }
}
</style>
