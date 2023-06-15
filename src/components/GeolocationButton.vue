<template>
  <button type="button" class="btn btn-primary" @click="geolocationButton">Find my location</button>
</template>

<script lang="ts">
export default {
  props: ['map', 'showLocationOnTheMap'],
  methods: {
    geolocationButton() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.showLocationOnTheMap(position.coords.latitude, position.coords.longitude)
          },
          (error) => {
            this.$emit('error', error.message)
          }
        )
      } else {
        this.$emit('error', 'Please enable location services')
      }
    }
  }
}
</script>
