import { create } from 'zustand';

export type AIAction =
  | 'Improve Description'
  | 'Generate Summary'
  | 'Rewrite Experience'
  | 'Suggest Skills'
  | 'Tailor to Role';

const AI_SAMPLE_TEXTS: Record<string, string> = {
  'Generate Summary':
    'Passionate Computer Science undergraduate at IIT Delhi with 2+ years of hands-on experience in full-stack development using React, Next.js, TypeScript, and Node.js. Proven track record of building scalable applications adopted by thousands of users. Winner of 2 national hackathons. Seeking to leverage strong problem-solving skills and modern engineering expertise at a high-growth product company.',
  'Improve Description':
    'Developed and shipped 5+ production-grade React components for the Razorpay merchant dashboard, directly serving 2M+ merchant accounts. Reduced API response latency by 40% through Redis caching and N+1 query elimination. Maintained 92% test coverage using Jest and React Testing Library. Collaborated in 2-week Agile sprints, reviewing 30+ pull requests.',
  'Rewrite Experience':
    'Led frontend development of 3 core features for the payments dashboard using React and TypeScript. Optimized bundle size by 28% using code-splitting and lazy loading. Mentored 2 junior interns and conducted daily stand-ups as scrum lead during the final sprint.',
  'Suggest Skills':
    'Based on your target role (Software Engineer) and existing experience, consider adding: Kubernetes, CI/CD (GitHub Actions), System Design, Redis, GraphQL, WebSockets, Jest, Webpack, Linux. These appear in 70%+ of matching job descriptions.',
  'Tailor to Role':
    'Tailored for "Senior Software Engineer at Flipkart": Emphasized React performance optimization, system design exposure, and cross-functional collaboration. Added keywords: Microservices, Kafka, REST APIs, Agile. Reworded project descriptions to highlight scale (users, throughput, uptime).',
};

interface AIStore {
  activeAction: AIAction | null;
  isStreaming: boolean;
  currentSuggestion: string;
  pendingSection: string | null;
  setAction: (action: AIAction) => void;
  streamSuggestion: (section: string) => Promise<void>;
  acceptSuggestion: () => void;
  discardSuggestion: () => void;
}

export const useAIStore = create<AIStore>((set, get) => ({
  activeAction: null,
  isStreaming: false,
  currentSuggestion: '',
  pendingSection: null,

  setAction: (action) => {
    set({ activeAction: action, currentSuggestion: '', pendingSection: null });
  },

  streamSuggestion: async (section: string) => {
    const action = get().activeAction;
    const fullText = AI_SAMPLE_TEXTS[action ?? 'Generate Summary'] ?? AI_SAMPLE_TEXTS['Generate Summary'];
    set({ isStreaming: true, currentSuggestion: '', pendingSection: section });

    await new Promise<void>((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        index++;
        set({ currentSuggestion: fullText.slice(0, index) });
        if (index >= fullText.length) {
          clearInterval(interval);
          set({ isStreaming: false });
          resolve();
        }
      }, 18);
    });
  },

  acceptSuggestion: () => {
    set({ activeAction: null, currentSuggestion: '', pendingSection: null });
  },

  discardSuggestion: () => {
    set({ activeAction: null, currentSuggestion: '', pendingSection: null });
  },
}));
