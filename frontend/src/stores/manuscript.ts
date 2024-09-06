import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useManuscriptStore = defineStore('manuscript', {
  state: () => ({
    hierarchy: useStorage('manuscript-hierarchy', {})
  }),
  actions: {
    updateHierarchy(newHierarchy) {
      this.hierarchy = newHierarchy
    },
    updateParagraphSuggestions(heading, suggestions) {
      const section = this.hierarchy.find((section) => section.heading === heading)
      if (section) {
        section.paragraph_suggestions = suggestions
      }
    }
  }
})
