<template>
  <div class="map-container">
    <GeolocationButton
      :map="map"
      :showLocationOnTheMap="showLocationOnTheMap"
      @error="$emit('error', $event)"
    ></GeolocationButton>
    <div class="map-content" id="map"></div>
  </div>
</template>

<script lang="ts">
import GeolocationButton from '@/components/GeolocationButton.vue'
import { type ILocation } from '@/types/locations'

const ZOOM = 15
const DEFAULT_LAT = 43.74841283162366
const DEFAULT_LNG = -79.28946285767238

export default {
  props: ['parentLocations'],

  components: {
    GeolocationButton
  },
  data() {
    return {
      map: {} as any,
      markers: {} as any
    }
  },

  mounted() {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: ZOOM,
      center: new google.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    })
  },

  watch: {
    parentLocations: {
      handler: function () {
        if (
          this.parentLocations.length > 0 &&
          this.parentLocations.length > Object.keys(this.markers).length
        ) {
          const latest_location = this.parentLocations[0]
          this.showLocationOnTheMap(latest_location.lat, latest_location.long)

          this.createMarker(
            latest_location.lat,
            latest_location.long,
            latest_location.formatted_address
          )
        } else if (this.parentLocations.length < Object.keys(this.markers).length) {
          this.deleteMarkers()
        }
      },
      deep: true
    }
  },

  methods: {
    showLocationOnTheMap(lat: number, long: number) {
      this.map.setCenter(new google.maps.LatLng(lat, long))
    },
    createMarker(lat: number, long: number, address: string) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: this.map
      })

      this.markers[address] = marker
    },
    deleteMarkers() {
      const parentAddresses = this.parentLocations.map((l: ILocation) => l.formatted_address)

      const markersToDelete = Object.keys(this.markers).filter((k) => !parentAddresses.includes(k))

      for (const address of markersToDelete) {
        let marker = this.markers[address]

        if (marker) {
          marker.setVisible(false)
          marker.setMap(null)
          marker = null

          delete this.markers[address]
        }
      }
    }
  }
}
</script>
