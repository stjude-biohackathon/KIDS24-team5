<template>
  <div class="row">
    <div class="col-9">
      <div class="mt-3 p-6 border border-2 rounded-4">
        <div class="m-4">
          <div class="fs-2">Paste your manuscript</div>
          <editor-content :editor="editor" v-model="contents" />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="mt-3 p-6 border border-2 rounded-4" style="position: fixed">
        <div class="m-4">
          <button class="btn btn-primary fs-3" @click="submitMs">
            Next
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    sdfasdf
    <pre>{{ contents }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { marked } from 'marked'
import TurndownService from 'turndown'

const editor = ref<Editor | null>(null)
const contents = ref<string>(
  '<h1>Abstract</h1><p>The control over the extent and timing of G protein signaling is provided by the regulator of G protein signaling (RGS) proteins that deactivate G protein α subunits (Gα). Mammalian genomes encode 20 canonical RGS and 16 Gα genes with key roles in physiology and disease. To understand the principles governing the selectivity of Gα regulation by RGS, we examine the catalytic activity of all canonical human RGS proteins and their selectivity for a complete set of Gα substrates using real-time kinetic measurements in living cells. The data reveal rules governing RGS-Gα recognition, the structural basis of its selectivity, and provide principles for engineering RGS proteins with defined selectivity. The study also explores the evolution of RGS-Gα selectivity through ancestral reconstruction and demonstrates how naturally occurring non-synonymous variants in RGS alter signaling. These results provide a blueprint for decoding signaling selectivity and advance our understanding of molecular recognition principles.</p><h1>Introduction</h1><p>Heterotrimeric G proteins transduce a vast variety of extracellular stimuli, including hormones, ions, organic molecules, and light into the regulation of intracellular “effectors” to generate cellular responses (Neves et al., 2002). Collectively, G protein systems play a role in nearly every physiological process and in numerous pathologies (Heng et al., 2013; Kostenis et al., 2020; O’Hayre et al., 2014; Wang et al., 2018). G proteins are activated by the binding of GTP to the α subunits (Gα) that release them from inhibitory occlusion by the βγ dimer (Gβγ) (Glukhova et al., 2018; Lambert, 2008; Oldham et al., 2006; Syrovatkina et al., 2016). Mammalian genomes encode a conserved set of 16 Gα subunits, each possessing unique signaling properties and the ability to selectively engage a distinct set of effectors, including adenylate cyclases, phospholipase C isozymes, Rho guanine nucleotide exchange factors (GEFs), and ion channels (Hubbard and Hepler, 2006; Marinissen and Gutkind, 2001; Wettschureck and Offermanns, 2005).</p><p>The key determinant of G protein action in cells is their lifetime in an active state. Thus, the activation and deactivation of G proteins is tightly controlled and ought to occur with selectivity for individual G proteins to ensure the selectivity of downstream signaling (Siderovski and Willard, 2005; Syrovatkina et al., 2016; Wettschureck and Offermanns, 2005). Deciphering molecular mechanisms of this selectivity is of paramount importance for understanding how the signals are routed in the cells. A number of G protein activators have been described and demonstrated to act as GEFs on the Gα subunits with clear subtype selectivity (Cismowski et al., 1999; Garcia-Marcos et al., 2011; Tall et al., 2003). Among them, the largest class is the G protein-coupled receptor (GPCR) family (Fredriksson et al., 2003; Hilger et al., 2018; Mahoney and Sunahara, 2016). GPCRs exhibit clear preferences for activating particular Gα species, and there has been tremendous progress in understanding the molecular mechanisms in establishing this selectivity (Flock et al., 2017; Inoue et al., 2019; Masuho et al., 2015b; Okashah et al., 2019).</p><p>The opposing process of G protein deactivation occurs when G proteins hydrolyze guanosine triphosphate (GTP), a process assisted by the action of the GTPase-activating proteins (GAPs). The GAP action is essential for avoiding response saturation and for achieving temporal resolution dictated by individual physiological reactions (Ross, 2008). Most well-characterized GAPs for heterotrimeric G proteins belong to the regulator of G protein signaling (RGS) family, consisting of 20 canonical members in mammals (Dohlman and Thorner, 1997; Tesmer, 2009). RGS proteins bind to active Gα proteins and facilitate their GTPase activity, thereby accelerating the termination of G protein signaling (Berman et al., 1996b; Hunt et al., 1996; Ross and Wilkie, 2000; Saitoh et al., 1997; Watson et al., 1996). It is now well established that this action of RGS proteins is crucial for achieving the physiologically relevant timing and extent of GPCR signaling (Hollinger and Hepler, 2002; Kimple et al., 2011; Neubig, 2015). Accordingly, the loss of RGS-mediated control leads to a range of pathologies observed in mouse models (Bansal et al., 2007; Gaspari et al., 2018; Lee et al., 2010; Senese et al., 2020) and is increasingly associated with human diseases (Shamseldin et al., 2016; Squires et al., 2018). Studies in several members of the RGS family indicate that they exert considerable selectivity in recognizing Gα (Heximer et al., 1997; Snow et al., 1998; Soundararajan et al., 2008; Tesmer, 2009; Wang et al., 1998). There has been significant progress documenting cases of selective RGS-Gα interactions (Hollinger and Hepler, 2002), analyzing the structural basis for this selectivity (Soundararajan et al., 2008; Taylor et al., 2016), and mapping amino acid residues involved in specific recognition (Kimple et al., 2009; Kosloff et al., 2011). Although these studies provide insights into the selectivity of RGS action for isolated cases, a comprehensive understanding of the complete landscape of Gα preferences of RGS proteins is still lacking.</p><p>This study presents a map of Gα selectivity for all canonical RGS proteins. We monitored the temporal regulation of GPCR-mediated G protein signaling and quantitatively characterized the GAP activity of the RGS proteins, testing nearly all of the theoretically possible Gα-RGS pairings (300 combinations). Using the functional activity as a readout in the context of a physiologically relevant cellular environment allowed us ot document the preferences of RGS proteins for Gα substrates, revealing pairings and disallowed combinations. This information led to the identification of molecular determinants involved in the selectivity of Gα-RGS recognition. Applying computational algorithms, we also show how these determinants have evolved and can be used to create designer RGS proteins with novel selectivity profiles. Analysis of human genomic data further suggests that genetic variations in RGS selectivity determinants may contribute to non-disease traits, pathological dysregulation of GPCR signaling, and variable responsiveness to drug treatments.</p><h1>Results</h1><h2>Assaying Activity of All Canonical RGS Proteins on Gα Deactivation with a Real-Time Kinetic Approach in Living Cells</h2><p>To test their possible RGS-Gα coupling systematically, we used a cell-based system that provides a cellular environment to study the action of RGS in the context of GPCR signaling. This assay monitors RGS-induced acceleration of G protein deactivation by real-time bioluminescence resonance energy transfer (BRET) strategy tracking the kinetics of heterotrimer re-association upon antagonizing GPCR, a reaction catalyzed by RGS proteins physiologically (Figure 1A). The key features of the assay include a “bystander” approach that allows the use of unmodified Gα subunits (Figure 1B) and full-length RGS proteins (Figure 1C).</p>'
)

onMounted(() => {
  editor.value = new Editor({
    content: contents.value,
    onUpdate: () => {
      contents.value = editor.value?.getHTML() || ''
    },
    extensions: [StarterKit]
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

function submitMs() {
  // convert to the Markdown format
  var turndownService = new TurndownService()
  var markdown_contents = turndownService.turndown(contents.value)

  console.log('markdown_contents', markdown_contents)

  const lexer = new marked.Lexer()
  const tokens = lexer.lex(markdown_contents)
  console.log('parse', tokens)

  const hierarchy = []
  let currentHeading = null

  for (const token of tokens) {
    if (token.type === 'heading') {
      // Create a new heading object
      currentHeading = { heading: token.text, paragraphs: [] }
      hierarchy.push(currentHeading)
    } else if (token.type === 'paragraph' && currentHeading) {
      // Add paragraph to the current heading
      currentHeading.paragraphs.push(token.text)
    }
  }

  console.log('hierarchy', hierarchy)
}
</script>

<style>
div.tiptap {
  min-height: 400px;
}
</style>
