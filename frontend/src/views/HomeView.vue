<template>
  <div class="home">
    <div ref="initialContent" style="display: none" v-html="value"></div>

    <div>EDITOR</div>
    <div id="editor" ref="editor"></div>
  </div>
</template>

<script>
/*
import { EditorState, Plugin } from "prosemirror-state";
import { history } from "prosemirror-history";
import { EditorView } from "prosemirror-view";
import { DOMParser, Schema } from "prosemirror-model";
import {menuBar, MenuElement, MenuItem} from "prosemirror-menu"

import {buildMenuItems, exampleSetup} from "prosemirror-example-setup"

import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {exampleSetup} from "prosemirror-example-setup"


import { toggleMark } from "prosemirror-commands";

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: `
      <section>
        <title>Section title</title>
        <para>
            <p>parag1</p>
            <p>another subpara</p>
          </para>
        <para>another paragraph</para>
      </section>

      <section>
        <para>note</para>
        <para>note</para>
      </section>`,
      state: {},
    };
  },
  mounted() {
    const schema = this.buildSchema();

    let sectionNode = schema.nodes.section;
function insertSection(type) {
  return function(state, dispatch) {
    let {$from} = state.selection, index = $from.index()
    if (!$from.parent.canReplaceWith(index, index, sectionNode))
      return false
    if (dispatch)
      dispatch(state.tr.replaceSelectionWith(sectionNode.create({type})))
    return true
  }
}


    // Ask example-setup to build its basic menu
    const menu = buildMenuItems(schema)

// The supported types of sections
    const sections = ["Introduction", "Results", "Data & Methods", "Discussion", "Conclusion"];

    // Add a dino-inserting item for each type of dino
    sections.forEach(name => menu.insertMenu.content.push(new MenuItem({
      title: "Insert " + name,
      label: name.charAt(0).toUpperCase() + name.slice(1),
      enable(state) { return insertSection(name)(state) },
      run: insertSection(name)
    })))


    this.state = EditorState.create({
      doc: DOMParser.fromSchema(schema).parse(this.$refs.initialContent),
    });
    this.view = new EditorView(this.$refs.editor, {
      state: this.state,
      dispatchTransaction: this.dispatchTransaction,
      plugins: exampleSetup({schema: schema, menuContent: menu.fullMenu}),
    });
    this.$refs.initialContent.remove();
  },
  methods: {
    buildSchema() {
      return new Schema({
        nodes: {
          text: {},
          p: {
            content: "text*",
            toDOM() {
              return ["p", 0];
            },
            parseDOM: [{ tag: "p" }],
          },
           para: {
            content: "(p)*",
            toDOM() {
              return ["para", 0];
            },
            parseDOM: [{ tag: "para" }],
          },
          title: {
            content: "text*",
            toDOM() {
              return ["title", 0];
            },
            parseDOM: [{ tag: "title" }],
          },
          section: {
            content: "(para|title)+",
            toDOM() {
              return ["section", 0];
            },
            parseDOM: [{ tag: "section" }],
          },
          doc: {
            content: "(section)+",
          },
        },
      });
    },
    dispatchTransaction(transaction) {
      let newState = this.view.state.apply(transaction);
      this.view.updateState(newState);
      this.value = this.$refs.editor.querySelector(".ProseMirror").innerHTML;
    },
    toggleStrong() {
      toggleMark(this.view.state.schema.marks.strong)(
        this.view.state,
        this.view.dispatch
      );
    },
  },
};
*/

</script>


<style>
#editor {
  border: 1px solid #ccc;
  height: 200px;
}

para {
  background-color: rgb(255, 255, 190);
  display:block;
  border: 1px;
  margin: 10px;
}
section {
  background-color: lightblue;
  border: 6px dashed #666;
  display:block;
  margin: 10px;
}
section > title {
  font-size:  2rem;
  font-weight: bold;
  display: block;
}
</style>