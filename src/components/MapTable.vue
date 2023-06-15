<template>
  <div class="table-content" id="table">
    <button type="button" class="btn btn-danger" @click="deleteLocations">Delete row(s)</button>
    <VTable
      ref="locationsTable"
      class="table"
      :data="parentLocations"
      :page-size="pageSize"
      v-model:currentPage="currentPage"
      @totalPagesChanged="totalPages = $event"
      selectionMode="multiple"
      :selectOnClick="false"
      @stateChanged="selectedRows = $event.selectedRows"
    >
      <template #head="{ allRowsSelected, toggleAllRows }">
        <tr>
          <th class="checkbox-container">
            <input
              class="form-check-input"
              type="checkbox"
              :checked="allRowsSelected"
              @change="toggleAllRows"
            />
          </th>
          <th>Address</th>
        </tr>
      </template>
      <template #body="{ rows }">
        <VTr v-for="row in rows" :key="row.guid" :row="row" v-slot="{ isSelected, toggle }">
          <td class="checkbox-container">
            <input
              class="form-check-input"
              type="checkbox"
              :checked="isSelected"
              @change="toggle"
            />
          </td>
          <td>{{ row.formatted_address }}</td>
        </VTr>
      </template>
    </VTable>
    <VTPagination
      v-model:currentPage="currentPage"
      :hideSinglePage="false"
      :total-pages="totalPages"
      :boundary-links="true"
    />
  </div>
</template>

<script lang="ts">
import { type ILocation } from '@/types/locations'

export default {
  props: ['parentLocations'],
  data() {
    return {
      selectedRows: [] as ILocation[],
      totalPages: 1,
      currentPage: 1,
      pageSize: 10
    }
  },

  methods: {
    deleteLocations() {
      const updatedLocations = this.parentLocations.filter(
        (l: ILocation) => !this.selectedRows.includes(l)
      )
      this.selectedRows = []

      this.$emit('delete-locations', updatedLocations)
    }
  }
}
</script>
