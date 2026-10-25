import type { PipelineStage } from "@/types";

export const intelligenceIntro = {
  eyebrow: "Direction",
  title: "Building toward intelligent systems",
  lead: "I have a strong software engineering foundation, and I am now building deeper expertise in AI and Data Science.",
  body: "This is my current specialization rather than a finished credential. The way I am learning it is by building it: the retrieval pipeline in JuriBot Sentinel, the recognition pipeline in FaceAttend, and the assistant in EDT Collaboratif are all real applications of the areas below — engineered inside working systems, not isolated exercises.",
} as const;

export const focusAreas = [
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Model fundamentals and applying them to concrete problems rather than benchmark datasets.",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Exploring, cleaning and interpreting data with Pandas and NumPy to reach defensible conclusions.",
  },
  {
    id: "rag",
    title: "RAG",
    description: "Retrieval-augmented architectures that keep generated output grounded in real source material.",
  },
  {
    id: "llm",
    title: "LLMs",
    description: "Integrating language models into products — prompting, context design, streaming and evaluation.",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Detection, embeddings and identity matching with OpenCV and DeepFace.",
  },
  {
    id: "data-processing",
    title: "Data Processing",
    description: "Pipelines that turn scraped, scanned and unstructured input into something a system can query.",
  },
] as const;

export const pipelineStages: PipelineStage[] = [
  {
    id: "data",
    index: "01",
    label: "Data",
    title: "Acquire the raw material",
    description:
      "Sources are rarely clean or structured. Web scraping, document collection and image capture bring the raw input in.",
    tools: ["Web Scraping", "OpenCV", "Document collection"],
  },
  {
    id: "processing",
    index: "02",
    label: "Processing",
    title: "Make it machine-readable",
    description:
      "OCR extracts text from scans, content is normalised and chunked, and inconsistent records are cleaned into a usable shape.",
    tools: ["OCR", "Pandas", "NumPy", "Chunking"],
  },
  {
    id: "analysis",
    index: "03",
    label: "Analysis",
    title: "Understand what is there",
    description:
      "Exploring the processed data to find structure, distribution and relationships before assuming what a model should do with it.",
    tools: ["Pandas", "Data Analysis", "Feature exploration"],
  },
  {
    id: "model",
    index: "04",
    label: "Model",
    title: "Represent and retrieve",
    description:
      "Embeddings map content into vector space; models are selected and evaluated against the actual task, not a generic score.",
    tools: ["Embeddings", "ChromaDB", "ArcFace", "Machine Learning"],
  },
  {
    id: "intelligence",
    index: "05",
    label: "Intelligence",
    title: "Reason over the retrieved context",
    description:
      "Hybrid retrieval selects the relevant passages, and the LLM reasons over them — grounded in sources rather than generating freely.",
    tools: ["RAG", "LLM", "Hybrid search"],
  },
  {
    id: "application",
    index: "06",
    label: "Application",
    title: "Ship it as a product",
    description:
      "The part I am already fluent in: wrapping the pipeline in an API, an interface and an architecture that holds up in production.",
    tools: ["FastAPI", "Angular", "Docker", "PostgreSQL"],
  },
];
