import { defineStore } from 'pinia'

export const useManuscriptStore = defineStore('manuscript', {
  state: () => ({
    hierarchy: {}
  }),
  actions: {
    updateHierarchy(newHierarchy) {
      this.hierarchy = newHierarchy
    }
  }
})
