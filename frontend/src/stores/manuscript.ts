import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useManuscriptStore = defineStore('manuscript', {
  state: () => ({
    hierarchy: useStorage('manuscript-hierarchy', {})
  }),
  actions: {
    updateHierarchy(newHierarchy) {
      this.hierarchy = newHierarchy
    }
  }
})
