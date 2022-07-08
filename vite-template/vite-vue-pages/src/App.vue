<template>
  <div>
    {{count}}
    <Button @click="count++">test</Button>
    <p>???</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from 'vant'

const count = ref(0)
</script>

<style lang="scss">

div{
  padding: 100px;

  p {
    color: orange;
  }
}

</style>

