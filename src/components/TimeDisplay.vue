<template>
  <div class="alert alert-primary" role="alert">
    Local time of the latest searched location: {{ time }}
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  props: ['parentLocations'],

  data() {
    return {
      time: ''
    }
  },

  watch: {
    parentLocations: {
      handler: function () {
        if (this.parentLocations.length > 0) {
          const latest_location = this.parentLocations[0]

          this.getTime(latest_location.lat, latest_location.long)
        } else {
          this.time = ''
        }
      },
      deep: true
    }
  },

  methods: {
    getTime(lat: number, long: number) {
      const targetDate = new Date()
      const timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60

      axios
        .get(
          'https://maps.googleapis.com/maps/api/timezone/json?location=' +
            lat +
            ',' +
            long +
            '&timestamp=' +
            timestamp +
            '&key=' +
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        )
        .then((response) => {
          if (response.data.error_message) {
            this.$emit('error', response.data.error_message)
          } else {
            const result = response.data
            const offsets = result.dstOffset * 1000 + result.rawOffset * 1000
            const localDate = new Date(timestamp * 1000 + offsets)
            this.time = localDate.toLocaleString() + ` (${result.timeZoneName})`
          }
        })
        .catch((error) => {
          this.$emit('error', error.message)
        })
    }
  }
}
</script>
