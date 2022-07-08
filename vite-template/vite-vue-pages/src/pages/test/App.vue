<template>
  <div>
    {{count}}
    <Button @click="count++">test</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from 'vant'

const count = ref(0)
</script>
