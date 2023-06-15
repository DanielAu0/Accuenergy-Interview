<template>
  <div class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <img class="navbar-brand" src="@/assets/accuenergy-logo.png" alt="img" />
      <div class="input-group input-group-lg">
        <input
          id="autocomplete"
          type="search"
          class="form-control me-2"
          placeholder="Search Location"
          v-on:keyup.enter="getLocation"
        />
        <button type="submit" class="btn btn-primary" @click="getLocation">Search</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      autocomplete: {} as any
    }
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement
    )
  },
  methods: {
    getLocation() {
      let place = this.autocomplete.getPlace()

      if (place && place.geometry && place.formatted_address) {
        this.createLocation(place.geometry.location.lat(), place.geometry.location.lng())
      }
    },
    createLocation(lat: number, long: number) {
      axios
        .get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            lat +
            ',' +
            long +
            '&key=' +
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        )
        .then((response) => {
          if (response.data.error_message) {
            this.$emit('error', response.data.error_message)
          } else {
            const formatted_address = response.data.results[0].formatted_address
            this.$emit('add-location', { lat, long, formatted_address })
          }
        })
        .catch((error) => {
          this.$emit('error', error.message)
        })
    }
  }
}
</script>
