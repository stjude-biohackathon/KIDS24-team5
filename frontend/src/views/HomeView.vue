<template>
  <button class="btn btn-primary" @click="addAnnotation">Add annotation</button>
  <div class="row">
    <div class="col-9">
      <div class="mt-3 p-6 border border-2 rounded-4">
        <div class="m-4">
          <editor-content :editor="editor" v-model="contents" />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="mt-3 p-6 border border-2 rounded-4">
        <div class="m-4">
          <h5>Suggestions</h5>
        </div>
      </div>
    </div>

    <pre>{{ contents }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Annotation, AnnotationMagic } from 'tiptap-annotation-magic'

import submitChat from '@/lib/ollama-client'

interface AnnotationData {
  name: string
  magicNumber: number
}

const editor = ref<Editor | null>(null)
const contents = ref<string>('<p>I’m running Tiptap with Vue.js. 🎉</p>')

onMounted(() => {
  submitChat('Hello').then((response) => {
    console.log('response was', response)
  })

  editor.value = new Editor({
    content: contents.value,
    onUpdate: () => {
      contents.value = editor.value?.getHTML() || ''
    },

    extensions: [
      StarterKit,
      AnnotationMagic<AnnotationData>().configure({
        onAnnotationListChange: (annotations: Annotation<AnnotationData>[]) => {
          // Callback when annotation is created/deleted/updated
        },
        onSelectionChange: (selectedAnnotations: Annotation<AnnotationData>[]) => {
          // Callback when the selected editor text changes
        },
        styles: {
          // CSS classes to use for different fragments
          leftFragment: 'fragment-left',
          rightFragment: 'fragment-right',
          middleFragment: 'fragment-middle',
          normal: 'annotation-normal'
        }
      })
    ]
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

function addAnnotation() {
  editor.value.chain().focus().addAnnotation({ name: 'tes123t', magicNumber: 1 }).run()
}
</script>
