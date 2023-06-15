<template>
  <NavBar
    @error="updateError"
    @add-location="addLocation"
  ></NavBar>
  <ErrorMessage :error="error"></ErrorMessage>
  <TimeDisplay @error="updateError" :parentLocations="parentLocations"></TimeDisplay>
  <div class="content">
    <MapComponent @error="updateError" :parentLocations="parentLocations"></MapComponent>
    <MapTable :parentLocations="parentLocations" @delete-locations="deleteLocations"></MapTable>
  </div>
</template>

<script lang="ts">
import {} from 'googlemaps'
import ErrorMessage from '@/components/ErrorMessage.vue'
import NavBar from '@/components/NavBar.vue'
import MapTable from '@/components/MapTable.vue'
import TimeDisplay from '@/components/TimeDisplay.vue'
import MapComponent from '@/components/MapComponent.vue'
import { type ILocation } from '@/types/locations'


export default {
  components: {
    ErrorMessage,
    NavBar,
    MapTable,
    TimeDisplay,
    MapComponent
  },
  data() {
    return {
      parentLocations: [] as ILocation[],
      error: ''
    }
  },
  methods: {
    deleteLocations(childLocations: ILocation[]) {
      this.parentLocations = childLocations
    },
    addLocation(childLocations: ILocation) {
      this.parentLocations.unshift(childLocations)
    },
    updateError(error: string) {
      this.error = error
    }
  }
}
</script>
